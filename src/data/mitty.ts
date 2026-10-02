import type { ImageMetadata } from 'astro';
import copper from '../assets/mitty/mitty-shirt-024.jpg';
import white from '../assets/mitty/mitty-shirt-026.jpg';
import olive from '../assets/mitty/mitty-shirt-029.jpg';
import seafoam from '../assets/mitty/mitty-shirt-030.jpg';
import grey13 from '../assets/mitty/mitty-trouser-013.jpg';
import grey15 from '../assets/mitty/mitty-trouser-015.jpg';
import grey17 from '../assets/mitty/mitty-trouser-017.jpg';

export const mittyUrl = 'https://mitty.co.in';

export const mittyProducts: { name: string; kind: string; image: ImageMetadata }[] = [
  { name: 'Copper Brown', kind: 'Full sleeve shirt', image: copper },
  { name: 'Seafoam Green', kind: 'Casual shirt', image: seafoam },
  { name: 'Olive Green', kind: 'Full sleeve shirt', image: olive },
  { name: 'Classic White', kind: 'Formal shirt', image: white },
  { name: 'Light Grey', kind: 'Slim fit trousers', image: grey13 },
  { name: 'Stone Grey', kind: 'Cotton stretch trousers', image: grey15 },
  { name: 'Pale Grey', kind: 'Slim fit cotton trousers', image: grey17 },
];
