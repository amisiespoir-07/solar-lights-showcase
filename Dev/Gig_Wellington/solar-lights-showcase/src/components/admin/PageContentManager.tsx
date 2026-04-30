'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, Edit, X } from 'lucide-react';

type PageContent = {
  id: number;
  page_name: string;
  section_name: string;
  content_key: string;
  content_value: string;
  content_type: string;
};

export default function PageContentManager() {
  const [contents, setContents] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedPage, setSelectedPage] = useState('home');

  const pages = ['home', 'street-lights', 'accessories', 'info'];

  useEffect(() => {
    fetchContents();
  }, [selectedPage]);

  const fetchContents = async () => {
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page_name', selectedPage)
        .order('section_name', { ascending: true });

      if (error) throw error;
      setContents(data || []);
    } catch (error) {
      console.error('Error fetching page content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const content = contents.find(c => c.id === id);
      if (!content) return;

      const { error } = await supabase
        .from('page_content')
        .update({
          content_value: content.content_value
        })
        .eq('id', id);

      if (error) throw error;
      
      setEditingId(null);
      fetchContents();
    } catch (error) {
      console.error('Error updating content:', error);
    }
  };

  const updateContent = (id: number, value: string) => {
    setContents(contents.map(c => 
      c.id === id ? { ...c, content_value: value } : c
    ));
  };

  const groupedContents = contents.reduce((acc, content) => {
    if (!acc[content.section_name]) {
      acc[content.section_name] = [];
    }
    acc[content.section_name].push(content);
    return acc;
  }, {} as Record<string, PageContent[]>);

  if (loading) {
    return <div className="text-center py-8">Loading page content...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Page Content</h2>
      </div>

      {/* Page Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Page</label>
        <select
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          {pages.map(page => (
            <option key={page} value={page}>
              {page.charAt(0).toUpperCase() + page.slice(1).replace('-', ' ')}
            </option>
          ))}
        </select>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {Object.entries(groupedContents).map(([section, items]) => (
          <div key={section} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
              {section.replace('-', ' ')} Section
            </h3>
            <div className="space-y-4">
              {items.map((content) => (
                <div key={content.id} className="border-b pb-4 last:border-b-0">
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {content.content_key.replace('_', ' ')}
                  </label>
                  {editingId === content.id ? (
                    <div className="space-y-2">
                      {content.content_value.length > 100 ? (
                        <textarea
                          value={content.content_value}
                          onChange={(e) => updateContent(content.id, e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg"
                          rows={4}
                        />
                      ) : (
                        <input
                          type="text"
                          value={content.content_value}
                          onChange={(e) => updateContent(content.id, e.target.value)}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(content.id)}
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
                    <div className="flex justify-between items-start">
                      <p className="text-gray-600 flex-1">{content.content_value}</p>
                      <button
                        onClick={() => setEditingId(content.id)}
                        className="ml-4 text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={18} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
