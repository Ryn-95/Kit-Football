import Link from 'next/link';
import Image from 'next/image';

export default function FranceHero() {
  return (
    <div className="w-full relative bg-white">
      {/* Container adaptatif qui garde le ratio de l'image (environ 16:9) */}
      <div className="relative w-full aspect-[4/3] md:aspect-[21/9] lg:aspect-[2.5/1]">
        <Image 
          src="/Images/herosection.jpg" 
          alt="Boutique KIT FOOTBALL - Maillots de foot 2024-2025 à prix cassés" 
          fill
          priority
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}
