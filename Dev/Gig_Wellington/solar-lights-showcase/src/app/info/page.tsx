'use client';

import Header from '@/components/Header';
import { ChevronDown, Star, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How long do solar lights last?',
    answer: 'Our solar lights are designed to last 5-10 years with proper maintenance. The LED bulbs can last up to 50,000 hours, and the solar panels maintain 80% efficiency after 25 years.'
  },
  {
    question: 'Do solar lights work in cloudy weather?',
    answer: 'Yes! Solar lights can charge even on cloudy days, though they may not reach full capacity. The built-in batteries store energy for multiple days of operation, ensuring consistent lighting.'
  },
  {
    question: 'What maintenance is required?',
    answer: 'Minimal maintenance is needed. Simply clean the solar panels every few months to remove dust and debris. Check batteries every 2-3 years and replace if necessary.'
  },
  {
    question: 'How bright are solar street lights?',
    answer: 'Our solar street lights range from 2,000 to 10,000 lumens depending on the model, providing excellent illumination comparable to traditional street lights.'
  },
  {
    question: 'Can I install solar lights myself?',
    answer: 'Yes! Most of our solar lights are designed for easy DIY installation. They require no wiring or electrical work. Simply mount them in a sunny location and they\'re ready to go.'
  },
  {
    question: 'What warranty do you offer?',
    answer: 'We offer a 2-year warranty on all products covering manufacturing defects. Extended warranties are available for commercial installations.'
  }
];

const testimonials = [
  {
    name: 'Michael Chen',
    role: 'Property Manager',
    content: 'Solar Lumina transformed our parking lot lighting. The installation was seamless, and we\'ve seen a 70% reduction in energy costs. Highly recommended!',
    rating: 5
  },
  {
    name: 'Sarah Johnson',
    role: 'Homeowner',
    content: 'I installed their solar garden lights around my property. They look beautiful and work perfectly every night. No more electricity bills for outdoor lighting!',
    rating: 5
  },
  {
    name: 'David Martinez',
    role: 'City Council Member',
    content: 'We equipped our community park with Solar Lumina street lights. The quality is outstanding and the environmental impact is exactly what we needed.',
    rating: 5
  }
];

export default function Info() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Solar Lumina</h1>
          
          {/* Mission and Benefits */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At Solar Lumina, we're committed to providing sustainable lighting solutions that 
                harness the power of the sun. Our mission is to make renewable energy accessible 
                and affordable for everyone, reducing carbon footprints while providing reliable 
                illumination for communities worldwide.
              </p>
              <p className="text-gray-600">
                We believe in quality, innovation, and environmental responsibility. Every product 
                we offer is carefully selected to meet the highest standards of performance and durability.
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
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
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
          </div>
          
          {/* Contact Section */}
          <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl p-8 shadow-xl text-white">
            <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-6 text-blue-50">
              Have questions about our products or need help with your solar lighting project? 
              Our team of experts is here to help you make the right choice.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-blue-50">info@solarlumina.com</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-blue-50">+1 (555) 123-4567</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-blue-50">123 Solar Street, Green City, GC 12345</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <h3 className="font-semibold mb-2">Business Hours</h3>
                <p className="text-blue-50">Monday - Friday: 9AM - 6PM</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
