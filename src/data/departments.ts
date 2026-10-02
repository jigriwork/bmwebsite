import type { ImageMetadata } from 'astro';
import men from '../assets/photos/dept-men.jpg';
import women from '../assets/photos/dept-women.jpg';
import footwear from '../assets/photos/dept-footwear.jpg';
import accessories from '../assets/photos/dept-accessories.jpg';
import perfumes from '../assets/photos/dept-perfumes.jpg';
import menAlt from '../assets/photos/men-polo.jpg';
import menAlt2 from '../assets/photos/occ-office.jpg';
import womenAlt from '../assets/photos/women-saree.jpg';
import womenAlt2 from '../assets/photos/new-kurti.jpg';
import footAlt from '../assets/photos/hero-sneaker.jpg';
import footAlt2 from '../assets/photos/new-sneakers.jpg';
import accAlt from '../assets/photos/new-belt.jpg';
import accAlt2 from '../assets/photos/new-handbag.jpg';
import perfAlt from '../assets/photos/new-perfume.jpg';
import perfAlt2 from '../assets/photos/story-hanger.jpg';

export interface Department {
  slug: string;
  name: string;
  short: string;
  line: string;
  intro: string;
  items: string[];
  brands: string[]; // brand slugs
  image: ImageMetadata;
  gallery: ImageMetadata[];
  ask: string;
}

export const departments: Department[] = [
  {
    slug: 'men',
    name: "Men's Wear",
    short: 'Men',
    line: 'Shirts, denim, trousers, blazers, ethnic',
    intro:
      'From crisp office shirts to weekend denim and wedding-ready ethnic wear. The biggest floor at Brand Mark, stocked with the labels Berhampur asks for by name.',
    items: ['Formal & casual shirts', 'Jeans & chinos', 'Trousers', 'T-shirts & polos', 'Jackets & blazers', 'Kurtas & ethnic sets'],
    brands: ['mitty', 'levis', 'jack-jones', 'bear-house', 'rare-rabbit', 'arrow', 'mufti', 'being-human', 'turtle', 'linen-club', 'ucb'],
    image: men,
    gallery: [menAlt, menAlt2],
    ask: "Hi Brand Mark, I'd like to see men's wear options.",
  },
  {
    slug: 'women',
    name: "Women's Wear",
    short: 'Women',
    line: 'Ethnic sets, kurtis, dresses, party wear',
    intro:
      'Festive ethnic sets, everyday kurtis, dresses and party wear, chosen for the occasions that matter in Odisha, from puja season to wedding season.',
    items: ['Ethnic & festive sets', 'Kurtis & kurta sets', 'Dresses', 'Party wear', 'Western tops', 'Dupattas & stoles'],
    brands: [],
    image: women,
    gallery: [womenAlt, womenAlt2],
    ask: "Hi Brand Mark, I'd like to see women's wear options.",
  },
  {
    slug: 'footwear',
    name: 'Footwear',
    short: 'Footwear',
    line: 'Sneakers, sports, formal, heels, flats',
    intro:
      "Berhampur's sneaker wall. Nike, Adidas, Puma, Skechers, Reebok and Lotto, plus formal shoes, sandals, heels and flats for every day of the week.",
    items: ['Sneakers', 'Running & sports', 'Formal shoes', 'Loafers & casuals', 'Sandals & sliders', 'Heels & flats'],
    brands: ['nike', 'adidas', 'puma', 'skechers', 'reebok', 'lotto'],
    image: footwear,
    gallery: [footAlt, footAlt2],
    ask: "Hi Brand Mark, I'd like to check footwear and sizes.",
  },
  {
    slug: 'accessories',
    name: 'Bags & Accessories',
    short: 'Accessories',
    line: 'Handbags, belts, wallets, finishing pieces',
    intro:
      'The finishing touches: leather belts and wallets, handbags and vanity bags, and the small pieces that complete a look.',
    items: ['Handbags & vanity bags', 'Leather belts', 'Wallets', 'Fashion accessories'],
    brands: [],
    image: accessories,
    gallery: [accAlt, accAlt2],
    ask: "Hi Brand Mark, I'd like to see bags and accessories.",
  },
  {
    slug: 'perfumes',
    name: 'Perfumes',
    short: 'Perfumes',
    line: "Men's and women's fragrances",
    intro:
      "Signature scents for him and her, from fresh everyday sprays to deep evening fragrances. Ask the team to help you find yours, or a gift that's sure to land.",
    items: ["Men's perfumes", "Women's perfumes", 'Deodorants & body mists', 'Gift sets'],
    brands: ['mitty'],
    image: perfumes,
    gallery: [perfAlt, perfAlt2],
    ask: "Hi Brand Mark, I'd like to know which perfumes you have.",
  },
];
