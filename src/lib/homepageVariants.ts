export const homepageVariants = {
  'piano-color': {
    image: '/images/piano-color.jpg',
    imagePosition: '50% 42%',
  },
  'piano-black-white': {
    image: '/images/piano-bw.jpg',
    imagePosition: '50% 32%',
  },
  'conducting-profile': {
    image: '/images/conducting-profile-black-white.jpg',
    imagePosition: '58% 32%',
  },
  'choir-orchestra': {
    image: '/images/conducting-choir-orchestra.jpg',
    imagePosition: '50% 48%',
  },
} as const;

export type HomepageVariant = keyof typeof homepageVariants;

export function isHomepageVariant(value: string): value is HomepageVariant {
  return value in homepageVariants;
}
