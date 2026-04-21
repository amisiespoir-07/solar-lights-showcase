import Header from '@/components/Header';

export default function Info() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About Solar Lumina</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
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
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Solar?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Environmentally Friendly</h3>
                    <p className="text-gray-600">Zero emissions and clean energy from the sun</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Cost Effective</h3>
                    <p className="text-gray-600">No electricity bills and minimal maintenance costs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Easy Installation</h3>
                    <p className="text-gray-600">Simple setup with no wiring required</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Reliable Performance</h3>
                    <p className="text-gray-600">Consistent lighting even during power outages</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">Contact Us</h2>
            <p className="text-blue-700 mb-4">
              Have questions about our products or need help with your solar lighting project? 
              Our team of experts is here to help you make the right choice.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Email</h3>
                <p className="text-blue-700">info@solarlumina.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Phone</h3>
                <p className="text-blue-700">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Address</h3>
                <p className="text-blue-700">123 Solar Street, Green City, GC 12345</p>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Business Hours</h3>
                <p className="text-blue-700">Monday - Friday: 9AM - 6PM</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
