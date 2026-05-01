'use client';

import { useState, useEffect } from 'react';
import { supabase, type Product, isSupabaseConfigured } from '@/lib/supabase';
import { Plus, Edit, Trash2, Save, X, Upload, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Street Lights',
    image_url: '',
    show_price: false
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      if (!isSupabaseConfigured) {
        // Mock data for testing when Supabase is not configured
        const mockProducts: Product[] = [
          {
            id: 1,
            name: 'Solar Street Light Pro',
            description: 'High-powered LED street light with advanced solar panel',
            category: 'Street Lights',
            image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
            show_price: true,
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            name: 'Solar Panel 200W',
            description: 'High-efficiency monocrystalline solar panel',
            category: 'Accessories',
            image_url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop',
            show_price: true,
            created_at: new Date().toISOString()
          }
        ];
        setProducts(mockProducts);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Make sure the "product-images" bucket exists in Supabase Storage.');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleAdd = async () => {
    try {
      let imageUrl = formData.image_url;

      if (imageFile) {
        if (!isSupabaseConfigured) {
          // For mock data, just use a placeholder URL
          imageUrl = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop';
        } else {
          const uploadedUrl = await uploadImage(imageFile);
          if (!uploadedUrl) return;
          imageUrl = uploadedUrl;
        }
      }

      if (!isSupabaseConfigured) {
        // Handle mock data addition
        const newProduct: Product = {
          id: Math.max(...products.map(p => p.id), 0) + 1,
          name: formData.name,
          description: formData.description,
          category: formData.category,
          image_url: imageUrl || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
          show_price: formData.show_price,
          created_at: new Date().toISOString()
        };
        setProducts(prev => [...prev, newProduct]);
        alert('Product added successfully! (Note: Using mock data - configure Supabase for persistent storage)');
      } else {
        const { error } = await supabase
          .from('products')
          .insert([{ ...formData, image_url: imageUrl }]);

        if (error) throw error;
        alert('Product added successfully!');
      }
      
      setShowAddForm(false);
      setFormData({ name: '', description: '', category: 'Street Lights', image_url: '', show_price: false });
      setImageFile(null);
      setImagePreview('');
      if (isSupabaseConfigured) fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const product = products.find(p => p.id === id);
      if (!product) return;

      if (!isSupabaseConfigured) {
        // Handle mock data update
        setProducts(prev => prev.map(p => 
          p.id === id ? { ...p, ...product } : p
        ));
        setEditingId(null);
        alert('Product updated successfully! (Note: Using mock data - configure Supabase for persistent storage)');
        return;
      }

      const { error } = await supabase
        .from('products')
        .update({
          name: product.name,
          description: product.description,
          category: product.category,
          image_url: product.image_url
        })
        .eq('id', id);

      if (error) throw error;
      
      setEditingId(null);
      fetchProducts();
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) return;

    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured) {
        // Handle mock data deletion
        console.log('Deleting mock product with ID:', id);
        setProducts(prev => prev.filter(p => p.id !== id));
        alert('Product deleted successfully! (Note: Using mock data - configure Supabase for persistent storage)');
        return;
      }

      console.log('Attempting to delete product with ID:', id);
      
      const { data, error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
        .select();

      console.log('Delete response:', { data, error });

      if (error) {
        console.error('Delete error:', error);
        alert(`Failed to delete product: ${error.message}`);
        return;
      }
      
      if (data && data.length > 0) {
        alert('Product deleted successfully!');
        fetchProducts();
      } else {
        alert('Product not found or already deleted.');
        fetchProducts();
      }
    } catch (error: any) {
      console.error('Error deleting product:', error);
      alert(`Error: ${error.message || 'Failed to delete product'}`);
    }
  };

  const updateProduct = (id: number, field: string, value: string) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  return (
    <>
      {/* Configuration Warning */}
      {!isSupabaseConfigured && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-yellow-600" size={20} />
            <div>
              <h3 className="font-semibold text-yellow-800">Database Not Configured</h3>
              <p className="text-yellow-700 text-sm">
                Supabase environment variables are not set. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black-900">Manage Products</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            >
              <option>Street Lights</option>
              <option>Accessories</option>
            </select>

            {/* Show Price Toggle */}
            <div className="flex items-center gap-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.show_price}
                  onChange={(e) => setFormData({ ...formData, show_price: e.target.checked })}
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Show Price</span>
              </label>
            </div>
            
            {/* Image Upload Section */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                    <Upload size={20} className="mr-2 text-gray-400" />
                    <span className="text-gray-600">
                      {imageFile ? imageFile.name : 'Click to upload image'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Upload a product image (JPG, PNG, WebP)
                  </p>
                </div>
                {imagePreview && (
                  <div className="relative w-24 h-24 border rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="px-4 py-2 border rounded-lg md:col-span-2"
              rows={3}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAdd}
              disabled={uploading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Save'}
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setImageFile(null);
                setImagePreview('');
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48 w-full bg-gray-100">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon size={48} className="text-gray-300" />
                </div>
              )}
            </div>
            <div className="p-4">
              {editingId === product.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Name"
                  />
                  <select
                    value={product.category}
                    onChange={(e) => updateProduct(product.id, 'category', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option>Street Lights</option>
                    <option>Accessories</option>
                  </select>
                  <textarea
                    value={product.description}
                    onChange={(e) => updateProduct(product.id, 'description', e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    rows={3}
                    placeholder="Description"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(product.id)}
                      className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      <Save size={16} /> Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex items-center gap-1 px-3 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                      <X size={16} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <span className="inline-block text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded mb-2">
                    {product.category}
                  </span>
                  <h3 className="font-semibold text-black-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingId(product.id)}
                      className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}
