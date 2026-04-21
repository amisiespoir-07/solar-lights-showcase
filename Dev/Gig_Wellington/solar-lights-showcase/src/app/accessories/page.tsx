import Header from '@/components/Header';

const accessories = [
  { id: 1, name: 'Solar Panel 100W', price: '$89.90', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&h=300&fit=crop', description: 'High-efficiency monocrystalline solar panel' },
  { id: 2, name: 'Lithium Battery 12V', price: '$129.90', image: 'https://images.unsplash.com/photo-1581094794479-3a6516b91875?w=300&h=300&fit=crop', description: 'Long-life lithium battery for energy storage' },
  { id: 3, name: 'MPPT Controller', price: '$59.90', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop', description: 'Smart charge controller for optimal performance' },
  { id: 4, name: 'Solar Cable 10m', price: '$29.90', image: 'https://images.unsplash.com/photo-1603792550247-2a9b9a833851?w=300&h=300&fit=crop', description: 'Weather-resistant solar connection cable' },
  { id: 5, name: 'LED Bulb Set', price: '$39.90', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=300&fit=crop', description: 'Energy-efficient LED bulbs for solar systems' },
  { id: 6, name: 'Mounting Bracket', price: '$49.90', image: 'https://images.unsplash.com/photo-1581094794479-3a6516b91875?w=300&h=300&fit=crop', description: 'Durable mounting hardware for installation' },
];

export default function Accessories() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Accessories</h1>
          <p className="text-lg text-gray-600 mb-12">
            Complete your solar installation with our high-quality accessories and components.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accessories.map((accessory) => (
              <div key={accessory.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square">
                  <img
                    src={accessory.image}
                    alt={accessory.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{accessory.name}</h3>
                  <p className="text-gray-600 mb-4">{accessory.description}</p>
                  <p className="text-2xl font-bold text-green-600">{accessory.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
