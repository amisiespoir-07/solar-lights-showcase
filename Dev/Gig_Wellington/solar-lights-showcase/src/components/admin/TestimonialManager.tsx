'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  created_at: string;
};

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .insert([formData]);

      if (error) throw error;
      
      setShowAddForm(false);
      setFormData({ name: '', role: '', content: '', rating: 5 });
      fetchTestimonials();
    } catch (error) {
      console.error('Error adding testimonial:', error);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const testimonial = testimonials.find(t => t.id === id);
      if (!testimonial) return;

      const { error } = await supabase
        .from('testimonials')
        .update({
          name: testimonial.name,
          role: testimonial.role,
          content: testimonial.content,
          rating: testimonial.rating
        })
        .eq('id', id);

      if (error) throw error;
      
      setEditingId(null);
      fetchTestimonials();
    } catch (error) {
      console.error('Error updating testimonial:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const updateTestimonial = (id: number, field: string, value: string | number) => {
    setTestimonials(testimonials.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  if (loading) {
    return <div className="text-center py-8">Loading testimonials...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Testimonials</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={18} />
          Add Testimonial
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New Testimonial</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Customer Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Role/Title"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="px-4 py-2 border rounded-lg"
            >
              <option value={5}>5 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={2}>2 Stars</option>
              <option value={1}>1 Star</option>
            </select>
            <textarea
              placeholder="Testimonial Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="px-4 py-2 border rounded-lg md:col-span-2"
              rows={4}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
            {editingId === testimonial.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={testimonial.name}
                  onChange={(e) => updateTestimonial(testimonial.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Name"
                />
                <input
                  type="text"
                  value={testimonial.role}
                  onChange={(e) => updateTestimonial(testimonial.id, 'role', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Role"
                />
                <select
                  value={testimonial.rating}
                  onChange={(e) => updateTestimonial(testimonial.id, 'rating', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
                <textarea
                  value={testimonial.content}
                  onChange={(e) => updateTestimonial(testimonial.id, 'content', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  rows={4}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(testimonial.id)}
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
                <div className="mb-3">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <p className="text-yellow-500 text-sm mt-1">{'⭐'.repeat(testimonial.rating)}</p>
                </div>
                <p className="text-gray-600 text-sm mb-4 italic">"{testimonial.content}"</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(testimonial.id)}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
