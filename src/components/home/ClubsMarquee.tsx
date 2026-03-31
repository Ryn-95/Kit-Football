import { CLUBS } from "../../data/mock";
import Image from "next/image";

export default function ClubsMarquee() {
  // Duplicate for infinite scroll effect
  const multipliedClubs = [...CLUBS, ...CLUBS, ...CLUBS, ...CLUBS];

  return (
    <section className="py-12 bg-white overflow-hidden border-b border-gray-100">
      <div className="relative flex w-full">
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {multipliedClubs.map((club, i) => (
            <div key={`${club.id}-${i}`} className="mx-8 md:mx-12 flex-shrink-0">
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all cursor-pointer shadow-sm">
                <Image 
                  src={club.logo} 
                  alt={club.name} 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}
