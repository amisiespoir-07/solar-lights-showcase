'use client';

import Header from '@/components/Header';
import { ChevronDown, Star, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
};

type FAQ = {
  id: number;
  question: string;
  answer: string;
  order_index: number;
};

type PageContent = {
  [key: string]: string;
};

export default function Info() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [pageContent, setPageContent] = useState<PageContent>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const [testimonialsRes, faqsRes, contentRes] = await Promise.all([
        supabase.from('testimonials').select('*').order('id', { ascending: true }),
        supabase.from('faqs').select('*').order('order_index', { ascending: true }),
        supabase.from('page_content').select('*').eq('page_name', 'info')
      ]);

      if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
      if (faqsRes.data) setFaqs(faqsRes.data);
      
      // Convert page content array to object for easy access
      if (contentRes.data) {
        const contentObj: PageContent = {};
        contentRes.data.forEach(item => {
          contentObj[`${item.section_name}_${item.content_key}`] = item.content_value;
        });
        setPageContent(contentObj);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {pageContent.hero_title || 'About Solar Lumina'}
          </h1>
          
          {/* Mission and Benefits */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {pageContent.mission_title || 'Our Mission'}
              </h2>
              <p className="text-gray-600">
                {pageContent.mission_content || 'Loading...'}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose Solar?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Environmentally Friendly</h3>
                    <p className="text-gray-600">Zero emissions and clean energy from the sun</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Cost Effective</h3>
                    <p className="text-gray-600">No electricity bills and minimal maintenance costs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Easy Installation</h3>
                    <p className="text-gray-600">Simple setup with no wiring required</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Reliable Performance</h3>
                    <p className="text-gray-600">Consistent lighting even during power outages</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Our Customers Say</h2>
            {loading ? (
              <p className="text-center text-gray-600">Loading testimonials...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              ))}
              </div>
            )}
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            {loading ? (
              <p className="text-center text-gray-600">Loading FAQs...</p>
            ) : (
              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                <div key={index} className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-green-600 flex-shrink-0 transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4 text-gray-600 bg-gradient-to-b from-green-50/30 to-transparent">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
              </div>
            )}
          </div>

          {/* Expertise & Other Products Section */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 shadow-xl text-white">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {pageContent.expertise_title || 'Years of Expertise'}
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  {pageContent.expertise_content || 'Loading...'}
                </p>
                <p className="text-gray-300 mb-8">
                  {pageContent.expertise_subcontent || ''}
                </p>
                <Link
                  href="/accessories"
                  className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg"
                >
                  Discover Our Other Products
                </Link>
              </div>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl p-8 shadow-xl text-white">
            <h2 className="text-3xl font-semibold mb-4">
              {pageContent.contact_title || 'Contact Us'}
            </h2>
            <p className="mb-6 text-blue-50">
              {pageContent.contact_description || 'Loading...'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-blue-50">{pageContent.contact_email || 'info@solarlumina.com'}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-blue-50">{pageContent.contact_phone || '+1 (555) 123-4567'}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-blue-50">{pageContent.contact_address || '123 Solar Street, Green City'}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h3 className="font-semibold mb-2">Business Hours</h3>
                <p className="text-blue-50">{pageContent.contact_hours || 'Monday - Friday: 9AM - 6PM'}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
