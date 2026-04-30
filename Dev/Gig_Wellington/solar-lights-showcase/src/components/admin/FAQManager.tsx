'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

type FAQ = {
  id: number;
  question: string;
  answer: string;
  order_index: number;
  created_at: string;
};

export default function FAQManager() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order_index: 0
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const { error } = await supabase
        .from('faqs')
        .insert([formData]);

      if (error) throw error;
      
      setShowAddForm(false);
      setFormData({ question: '', answer: '', order_index: 0 });
      fetchFAQs();
    } catch (error) {
      console.error('Error adding FAQ:', error);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const faq = faqs.find(f => f.id === id);
      if (!faq) return;

      const { error } = await supabase
        .from('faqs')
        .update({
          question: faq.question,
          answer: faq.answer,
          order_index: faq.order_index
        })
        .eq('id', id);

      if (error) throw error;
      
      setEditingId(null);
      fetchFAQs();
    } catch (error) {
      console.error('Error updating FAQ:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchFAQs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  const updateFAQ = (id: number, field: string, value: string | number) => {
    setFaqs(faqs.map(f => 
      f.id === id ? { ...f, [field]: value } : f
    ));
  };

  if (loading) {
    return <div className="text-center py-8">Loading FAQs...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage FAQs</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={18} />
          Add FAQ
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Add New FAQ</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Question"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <textarea
              placeholder="Answer"
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              rows={4}
            />
            <input
              type="number"
              placeholder="Order Index"
              value={formData.order_index}
              onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg"
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

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-lg shadow-md p-6">
            {editingId === faq.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => updateFAQ(faq.id, 'question', e.target.value)}
                  className="w-full px-3 py-2 border rounded font-semibold"
                  placeholder="Question"
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => updateFAQ(faq.id, 'answer', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  rows={4}
                  placeholder="Answer"
                />
                <input
                  type="number"
                  value={faq.order_index}
                  onChange={(e) => updateFAQ(faq.id, 'order_index', parseInt(e.target.value))}
                  className="w-32 px-3 py-2 border rounded"
                  placeholder="Order"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(faq.id)}
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
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-lg mb-2">{faq.question}</p>
                    <p className="text-gray-600">{faq.answer}</p>
                    <p className="text-xs text-gray-400 mt-2">Order: {faq.order_index}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => setEditingId(faq.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
