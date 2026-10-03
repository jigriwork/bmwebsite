export const site = {
  name: 'Brand Mark',
  odia: 'ବ୍ରାଣ୍ଡ ମାର୍କ',
  tagline: 'Fashion & Footwear',
  city: 'Berhampur',
  url: 'https://www.brandmarkfashion.com',
  description:
    "Brand Mark is Berhampur's premium multi-brand fashion and footwear showroom with Levi's, Jack & Jones, Nike, Adidas, Puma, Skechers, The Bear House, our own label MITTY and more. Men, women, footwear, accessories and perfumes at Spectrum Center, Old Bus Stand.",
  phone: '+91 73278 20235',
  phoneHref: 'tel:+917327820235',
  whatsapp: '917327820235',
  email: 'hello@brandmarkfashion.com',
  instagram: 'https://instagram.com/brandmarkindia',
  instagramHandle: '@brandmarkindia',
  mapsLink: 'https://share.google/sib9q5mYbjVPyr9la',
  mapsEmbed: 'https://www.google.com/maps?q=Brand+Mark+Berhampur&output=embed',
  reviewsLink: 'https://www.google.com/search?q=Brand+Mark+Berhampur+reviews',
  address: {
    line1: 'Spectrum Center, Old Bus Stand',
    city: 'Berhampur (Brahmapur)',
    region: 'Odisha',
    country: 'IN',
  },
  hours: { open: '10:00', close: '21:30', label: '10 AM to 9:30 PM', days: 'Open every day' },
  familySince: 1989,
  goPlanetSince: 2007,
};

export const goPlanet = {
  name: 'Go Planet',
  since: 2007,
  tagline: 'Fashion Unlimited',
  url: 'https://goplanet.in',
  urlLabel: 'goplanet.in',
  address: 'City Mall (V2), opposite Telephone Bhawan, Berhampur',
  phone: '+91 82802 03538',
  phoneHref: 'tel:+918280203538',
  email: 'hello@goplanet.in',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=Go+Planet+City+Mall+Berhampur',
  logo: '/logos/goplanet.png',
};

export const wa = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const nav = [
  { href: '/collections/men', label: 'Collections' },
  { href: '/brands', label: 'Brands' },
  { href: '/mitty', label: 'MITTY' },
  { href: '/new-arrivals', label: 'New In' },
  { href: '/about', label: 'Our Story' },
  { href: '/play', label: 'Play' },
  { href: '/visit', label: 'Visit' },
];
