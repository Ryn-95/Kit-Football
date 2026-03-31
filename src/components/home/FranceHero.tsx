import Link from 'next/link';
import Image from 'next/image';

export default function FranceHero() {
  return (
    <div className="w-full relative bg-white">
      {/* Container adaptatif qui garde le ratio de l'image (environ 16:9) */}
      <div className="relative w-full aspect-[4/3] md:aspect-[21/9] lg:aspect-[2.5/1]">
        <img 
          src="/Images/herosection.jpg" 
          alt="Hero Section" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}
