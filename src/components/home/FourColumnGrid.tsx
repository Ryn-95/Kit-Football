import Link from 'next/link';

export default function FourColumnGrid() {
  const items = [
    {
      title: "Maillots Extérieurs Saison 24/25",
      description: "Les nouveaux maillots extérieurs transforment les couleurs de votre club de cœur en styles uniques pour la rue et le terrain.",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/maillots?type=Extérieur",
      linkText: "Acheter"
    },
    {
      title: "Collection Survêtements",
      description: "Préparez-vous pour l'entraînement ou la détente avec nos survêtements officiels des plus grands clubs.",
      image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/maillots/type/training",
      linkText: "Acheter"
    },
    {
      title: "Légendes Rétro",
      description: "Revivez les moments de gloire. Les maillots historiques qui ont marqué l'histoire du football, fidèlement reproduits.",
      image: "/Images/Generated Image March 28, 2026 - 10_33PM (1).jpg",
      link: "/maillots/type/retro",
      linkText: "Acheter"
    },
    {
      title: "Éditions Spéciales",
      description: "Des collaborations uniques et des maillots en édition limitée pour les supporters les plus passionnés.",
      image: "/Images/Generated Image March 28, 2026 - 10_21PM.jpg",
      link: "/maillots?type=Third",
      linkText: "Acheter"
    }
  ];

  return (
    <div className="w-full px-6 lg:px-10 py-10">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((item, index) => (
          <Link href={item.link} key={index} className="flex flex-col group cursor-pointer">
            <div className="w-full aspect-square overflow-hidden mb-4 bg-gray-100">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="font-bold text-black text-sm mb-2">{item.title}</h3>
            <p className="text-black text-sm mb-4 line-clamp-3">{item.description}</p>
            <span className="text-black font-bold text-sm underline underline-offset-4 mt-auto w-fit hover:text-gray-600 transition-colors">
              {item.linkText}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
