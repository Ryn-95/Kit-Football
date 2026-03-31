import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full relative">
      <div className="w-full aspect-[21/9] md:aspect-[3/1] lg:aspect-[4/1] relative overflow-hidden bg-[#050505] flex items-center justify-center">
        {/* Sleek, dark image behind the hero */}
        <Image 
          src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2400&auto=format&fit=crop" 
          alt="Welcome to Kit Football" 
          fill
          priority
          className="object-cover opacity-50 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-black/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,255,0,0.08)_0%,transparent_60%)]"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center mt-12 md:mt-0">
          <span className="text-[var(--color-brand-volt)] font-bold tracking-[0.3em] text-[10px] sm:text-xs md:text-sm uppercase drop-shadow-md mb-2">
            The New Standard
          </span>
          <h1 className="text-white font-heading font-black italic text-5xl sm:text-7xl md:text-9xl uppercase leading-none tracking-tighter drop-shadow-2xl">
            KIT <br className="md:hidden" /><span className="text-[var(--color-brand-volt)] glow">FOOTBALL</span>
          </h1>
          <span className="text-gray-300 font-sans font-bold text-xs sm:text-sm md:text-base tracking-[0.4em] uppercase mt-4 mb-8 opacity-80">
            PREMIUM JERSEYS
          </span>
          <a href="/collections" className="bg-[var(--color-brand-volt)] text-black font-heading font-black italic text-lg uppercase tracking-wider py-4 px-10 rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(204,255,0,0.4)]">
            Découvrir la collection
          </a>
        </div>
      </div>
    </section>
  );
}
