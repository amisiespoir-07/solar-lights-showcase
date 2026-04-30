'use client';

import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

type PageContent = {
  [key: string]: string;
};

export default function StreetLights() {
  const [pageContent, setPageContent] = useState<PageContent>({});

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data } = await supabase
        .from('page_content')
        .select('*')
        .eq('page_name', 'street-lights');

      if (data) {
        const contentObj: PageContent = {};
        data.forEach(item => {
          contentObj[`${item.section_name}_${item.content_key}`] = item.content_value;
        });
        setPageContent(contentObj);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {pageContent.hero_title || 'Street Lights'}
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            {pageContent.hero_description || 'High-quality solar street lights for all your outdoor lighting needs. Energy-efficient, durable, and environmentally friendly solutions.'}
          </p>
          <ProductGrid />
        </div>
      </main>
    </div>
  );
}
