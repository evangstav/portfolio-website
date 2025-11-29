import { conductorDataEn } from './conductor.en';
import { conductorDataEl } from './conductor.el';

export const conductorDataByLocale = {
  en: conductorDataEn,
  el: conductorDataEl,
};

// Default export for backward compatibility
export const conductorData = conductorDataEn;
export default conductorData;
