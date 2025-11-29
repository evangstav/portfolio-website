import { useLocale } from 'next-intl';
import { conductorDataByLocale } from '@/data/conductor';

export function useConductorData() {
  const locale = useLocale() as 'en' | 'el';
  return conductorDataByLocale[locale];
}
