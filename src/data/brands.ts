export type BrandGroup = 'own' | 'clothing' | 'footwear';

export interface Brand {
  name: string;
  slug: string;
  logo: string;
  group: BrandGroup;
  carries: string;
  /** relative visual weight so logos look balanced in a row (1 = normal) */
  scale?: number;
}

export const brands: Brand[] = [
  { name: 'MITTY', slug: 'mitty', logo: '/logos/mitty.svg', group: 'own', carries: 'Our own label: shirts, trousers, jeans and essentials', scale: 1.1 },
  { name: "Levi's", slug: 'levis', logo: '/logos/levis.png', group: 'clothing', carries: 'Jeans, denim jackets, shirts and tees', scale: 0.9 },
  { name: 'Jack & Jones', slug: 'jack-jones', logo: '/logos/jack-jones.png', group: 'clothing', carries: 'Denim, casual shirts, jackets and tees' },
  { name: 'The Bear House', slug: 'bear-house', logo: '/logos/bear-house.png', group: 'clothing', carries: 'Shirts, overshirts and smart casuals' },
  { name: 'Rare Rabbit', slug: 'rare-rabbit', logo: '/logos/rare-rabbit.png', group: 'clothing', carries: 'Premium shirts, knitwear and trousers' },
  { name: 'United Colors of Benetton', slug: 'ucb', logo: '/logos/ucb.png', group: 'clothing', carries: 'Polos, knitwear and colourful casuals', scale: 0.85 },
  { name: 'Arrow', slug: 'arrow', logo: '/logos/arrow.png', group: 'clothing', carries: 'Formal shirts, trousers and suits' },
  { name: 'Mufti', slug: 'mufti', logo: '/logos/mufti.png', group: 'clothing', carries: 'Jeans, shirts and street casuals' },
  { name: 'Being Human', slug: 'being-human', logo: '/logos/being-human.png', group: 'clothing', carries: 'Tees, shirts and denim', scale: 1.15 },
  { name: 'Turtle', slug: 'turtle', logo: '/logos/turtle.png', group: 'clothing', carries: 'Shirts, trousers and occasion wear' },
  { name: 'Linen Club', slug: 'linen-club', logo: '/logos/linen-club.png', group: 'clothing', carries: 'Pure linen shirts and trousers' },
  { name: 'Nike', slug: 'nike', logo: '/logos/nike.png', group: 'footwear', carries: 'Sneakers, running and lifestyle shoes' },
  { name: 'Adidas', slug: 'adidas', logo: '/logos/adidas.png', group: 'footwear', carries: 'Sneakers, running and training shoes' },
  { name: 'Puma', slug: 'puma', logo: '/logos/puma.png', group: 'footwear', carries: 'Sneakers, sports and casual shoes' },
  { name: 'Skechers', slug: 'skechers', logo: '/logos/skechers.png', group: 'footwear', carries: 'Comfort walking and lifestyle shoes' },
  { name: 'Reebok', slug: 'reebok', logo: '/logos/reebok.png', group: 'footwear', carries: 'Training, running and classic sneakers' },
  { name: 'Lotto', slug: 'lotto', logo: '/logos/lotto.png', group: 'footwear', carries: 'Sports and casual shoes' },
];

export const groupLabel: Record<BrandGroup, string> = {
  own: 'Our own label',
  clothing: 'Clothing',
  footwear: 'Footwear',
};
