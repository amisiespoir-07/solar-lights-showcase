export default function BannerSection() {
  return (
    <section className="relative py-20 bg-cover bg-center" 
             style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=400&fit=crop)' }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">SOLAR LUMINA</h2>
        <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
          High-quality solar lighting solutions for streets, gardens, and public spaces. 
          Cost-effective, eco-friendly, and sustainable.
        </p>
      </div>
    </section>
  );
}
