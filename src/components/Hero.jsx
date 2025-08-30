import Spline from '@splinetool/react-spline';
import { Home, DollarSign } from 'lucide-react';

export default function Hero() {
  return (
    <header className="relative w-full h-[70vh] sm:h-[80vh] bg-black text-white overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/1VHYoewWfi45VYZ5/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-white pointer-events-none" />

      <div className="relative z-10 h-full container mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-10 sm:pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs sm:text-sm backdrop-blur border border-white/20 mb-4">
            <Home className="w-4 h-4" />
            <span className="font-medium tracking-wide">Real Estate Commission Toolkit</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold leading-tight drop-shadow">
            Calculate your commissions with clarity and confidence
          </h1>
          <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-white/90 max-w-2xl">
            Built for agents and teams. Estimate splits, fees, and take-home in seconds—whether you represent the buyer or the seller.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-white text-gray-900 rounded-full px-4 py-2 shadow">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm font-medium">All-in-one calculator</span>
            </div>
            <div className="hidden sm:inline-flex text-white/90 text-sm">
              No sign-up required
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
