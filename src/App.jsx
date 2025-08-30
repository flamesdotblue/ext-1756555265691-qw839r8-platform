import Hero from './components/Hero';
import CommissionCalculator from './components/CommissionCalculator';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Hero />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-16 relative z-10">
        <section className="bg-white/90 backdrop-blur shadow-xl rounded-2xl border border-gray-200 p-6 sm:p-8">
          <CommissionCalculator />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
