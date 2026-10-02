import type { ImageMetadata } from 'astro';
import shirts from '../assets/photos/new-shirts.jpg';
import jackets from '../assets/photos/new-jackets.jpg';
import sneakers from '../assets/photos/new-sneakers.jpg';
import kurti from '../assets/photos/new-kurti.jpg';
import belt from '../assets/photos/new-belt.jpg';
import perfume from '../assets/photos/new-perfume.jpg';
import handbag from '../assets/photos/new-handbag.jpg';
import suit from '../assets/photos/new-suit.jpg';
import lehenga from '../assets/photos/hero-woman.jpg';
import kurta from '../assets/photos/occ-festive.jpg';
import mittyCopper from '../assets/mitty/mitty-shirt-024.jpg';
import mittyOlive from '../assets/mitty/mitty-shirt-029.jpg';

export interface Arrival {
  title: string;
  tag: string;
  dept: 'men' | 'women' | 'footwear' | 'accessories' | 'perfumes';
  image: ImageMetadata;
  note: string;
}

/**
 * New-in feed. To update: replace the photo in src/assets and edit the entries below.
 * Newest first. The home page shows the first 8.
 */
export const arrivals: Arrival[] = [
  { title: 'Copper Brown Full Sleeve Shirt', tag: 'MITTY', dept: 'men', image: mittyCopper, note: 'Our own label · Full sleeve' },
  { title: 'Festive Ethnic Sets', tag: 'Festive', dept: 'women', image: lehenga, note: 'For puja & wedding season' },
  { title: 'Everyday Sneakers', tag: 'Footwear', dept: 'footwear', image: sneakers, note: 'Nike · Adidas · Puma & more' },
  { title: 'Crisp Cotton Shirts', tag: 'Office', dept: 'men', image: shirts, note: 'Whites, blues & stripes' },
  { title: 'Chikankari Kurta Sets', tag: 'Ethnic', dept: 'women', image: kurti, note: 'Light, breathable, festive' },
  { title: 'Olive Green Full Sleeve Shirt', tag: 'MITTY', dept: 'men', image: mittyOlive, note: 'Our own label · Slim fit' },
  { title: 'Signature Fragrances', tag: 'Perfumes', dept: 'perfumes', image: perfume, note: 'For him & her' },
  { title: 'Leather Belts & Wallets', tag: 'Accessories', dept: 'accessories', image: belt, note: 'Gift-ready' },
  { title: 'Double-Breasted Suits', tag: 'Occasion', dept: 'men', image: suit, note: 'Receptions & ceremonies' },
  { title: 'Structured Handbags', tag: 'Bags', dept: 'accessories', image: handbag, note: 'Vanity & everyday bags' },
  { title: 'Layering Jackets', tag: 'Winter', dept: 'men', image: jackets, note: 'Denim, bombers & overshirts' },
  { title: 'Black Festive Kurtas', tag: 'Ethnic', dept: 'men', image: kurta, note: 'Sharp, minimal, festive' },
];
