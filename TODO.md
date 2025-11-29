# Greek Translation TODO

## Current Status
✅ **Technical Implementation Complete**
- i18n infrastructure fully implemented with next-intl
- Language switcher working (🇺🇸 EN | 🇬🇷 ΕΛ flags in navigation)
- URL routing configured (`/en/*` and `/el/*`)
- All components updated to use translations
- SEO optimized with hreflang tags

⚠️ **Greek Translations Pending**
- All Greek content marked with `[EL]` prefix as placeholders
- Infrastructure ready - just needs actual translations

---

## Files Requiring Translation

### 1. UI Strings: `/messages/el.json`
Replace all `[EL]` placeholders with Greek translations.

**Sections to translate:**
- Navigation (Biography, Media, Concerts, Contact, Back)
- Section headers (About, Videos, Concerts, Affiliations, Press, Media)
- Concert categories (Upcoming, Past Performances)
- Contact form (heading, description, form labels, buttons)
- Biography page (download section text)
- Media page (tabs, empty states)
- Common UI (View All, All rights reserved, Scroll)

**Example:**
```json
{
  "navigation": {
    "biography": "Βιογραφία",  // Replace "[EL] Biography"
    "media": "Μέσα",           // Replace "[EL] Media"
    ...
  }
}
```

### 2. Content Data: `/src/data/conductor.el.ts`
Replace all `[EL]` placeholders with Greek content.

**Sections to translate:**
- Conductor name and tagline
- Biography (short and full versions)
- Biography sections (titles and content paragraphs)
- Press quotes
- Video titles, subtitles, and ensemble names
- Gallery captions and categories
- Concert titles, descriptions, and venue information
- Affiliation names and roles

**Example:**
```typescript
export const conductorDataEl: ConductorData = {
  name: "Ευάγγελος Σταυρόπουλος",  // Replace "[EL] Evangelos Stavropoulos"
  tagline: "Μαέστρος",              // Replace "[EL] Conductor"
  biographyShort: `Your Greek biography here...`,
  ...
};
```

---

## How to Add Translations

### Step 1: Edit `/messages/el.json`
1. Open the file in your editor
2. Find all strings starting with `"[EL] "`
3. Replace with appropriate Greek translations
4. Keep the JSON structure intact
5. Ensure special characters are properly escaped

### Step 2: Edit `/src/data/conductor.el.ts`
1. Open the file in your editor
2. Find all strings starting with `"[EL] "`
3. Replace with Greek translations
4. Maintain the same structure as `conductor.en.ts`
5. Update image alt text for better accessibility

### Step 3: Test
```bash
npm run dev
```
Visit `http://localhost:3000` and:
- Click the Greek flag (🇬🇷 ΕΛ) in navigation
- Navigate through all pages (`/el`, `/el/biography`, `/el/media`)
- Verify all text appears in Greek
- Check that no `[EL]` prefixes remain visible

### Step 4: Commit
```bash
git add messages/el.json src/data/conductor.el.ts
git commit -m "Add Greek translations"
git push
```

---

## Testing Checklist

Once translations are added, verify:

- [ ] Homepage (`/el`) displays all Greek text
- [ ] Navigation labels in Greek
- [ ] Biography page (`/el/biography`) fully translated
- [ ] Media page (`/el/media`) fully translated
- [ ] Concert section shows Greek text
- [ ] Contact form labels in Greek
- [ ] Footer copyright in Greek
- [ ] Language switcher works (EN ↔ ΕΛ)
- [ ] URLs preserve language when navigating
- [ ] No `[EL]` placeholders visible anywhere

---

## Notes

- Greek text may be longer/shorter than English - check layouts
- Test on both desktop and mobile
- Verify special Greek characters display correctly
- Consider having a native Greek speaker review translations
- SEO: Both languages will be indexed separately by Google

---

## Support

For help with next-intl or i18n:
- Documentation: https://next-intl-docs.vercel.app/
- Issue tracker: https://github.com/amannn/next-intl/issues
