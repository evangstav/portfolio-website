import { ConductorData } from '@/lib/types';

export const conductorDataEl: ConductorData = {
  name: "Βαγγέλης Σταυρόπουλος",
  tagline: "Μαέστρος",

  heroImage: "/images/hero-conducting.jpg",

  biographyShort: `Έλληνας μαέστρος, πιανίστας, συνθέτης και μουσικοπαιδαγωγός με έδρα την Αθήνα, με εμπειρία σε συμφωνικό, λυρικό και σύγχρονο ρεπερτόριο.`,

  biography: `Ο Βαγγέλης Σταυρόπουλος είναι Έλληνας μαέστρος, πιανίστας, συνθέτης και μουσικοπαιδαγωγός με έδρα την Αθήνα. Η εμπειρία του στη διεύθυνση ορχήστρας, μέσα από συναυλίες και masterclasses, περιλαμβάνει συνεργασίες με την Prague Philharmonia Orchestra, τη Berlin Sinfonietta, τη Συμφωνική Ορχήστρα του Βουκουρεστίου, τη Φιλαρμόνια Ορχήστρα Αθηνών, τη Συμφωνική Ορχήστρα Ιονίων Νήσων μαζί με τη Δημοτική Χορωδία Κερκύρας «Σαν Τζιάκομο», την Ionian Camerata και τη Συμφωνική Ορχήστρα του Ιονίου Πανεπιστημίου, ερμηνεύοντας έργα σημαντικών συνθετών όπως οι L.V. Beethoven, F. Schubert, J. Brahms, W.A. Mozart, I. Stravinsky, Ν. Σκαλκώτας και άλλων.

Έχει επίσης διευθύνει παραγωγές όπερας και σύγχρονης μουσικής, μεταξύ των οποίων την ελληνική πρεμιέρα της μονόπρακτης όπερας του Dan Shore «The Beautiful Bridegroom». Τον Σεπτέμβριο του 2023 ανέλαβε τον συντονισμό και τη μουσική διεύθυνση του Συνόλου Εγχόρδων του Ιονίου Ωδείου, δίνοντας πολυάριθμες συναυλίες σε όλη την Κέρκυρα.

Παράλληλα με το έργο του ως μαέστρος, ο Βαγγέλης είναι έμπειρος πιανίστας και συνοδός. Ενεργός ως καθηγητής πιάνου από το 2016, έχει διδάξει στο Ιόνιο Ωδείο, στο Μουσικό Σχολείο Κέρκυρας και μέσω ιδιαίτερων μαθημάτων. Έχει συμμετάσχει σε πολυάριθμες εμφανίσεις και συνεργασίες, από συναυλίες μουσικής δωματίου και σύγχρονες ελληνικές συνθέσεις έως εκπαιδευτικές και πολιτιστικές παραγωγές με την Εθνική Λυρική Σκηνή.

Είναι κάτοχος Πτυχίου Διεύθυνσης Ορχήστρας από το Τμήμα Μουσικών Σπουδών του Ιονίου Πανεπιστημίου και Διπλώματος Πιάνου από το International Art Center & Conservatory Athenaeum.`,

  contactEmail: "vagstav97@hotmail.com",

  socialLinks: [
    { platform: 'youtube', url: 'https://www.youtube.com/@vaggelisstavropoulos' },
  ],

  // Βίντεο - YouTube embed URLs (https://www.youtube-nocookie.com/embed/VIDEO_ID)
  videos: [
    {
      id: 'concert-rehearsal-compilation',
      title: 'Στιγμιότυπα από Συναυλίες και Πρόβες',
      thumbnailUrl: 'https://i.ytimg.com/vi/HBpDGP7ak2M/hqdefault.jpg',
      videoUrl: 'https://www.youtube-nocookie.com/embed/HBpDGP7ak2M',
    },
  ],

  gallery: [
    {
      id: 'conducting-live',
      src: '/images/hero-conducting.jpg',
      alt: 'Ο Βαγγέλης Σταυρόπουλος διευθύνει σε συναυλία',
      caption: 'Σε συναυλία',
    },
    {
      id: 'piano-color',
      src: '/images/piano-color.jpg',
      alt: 'Ο Βαγγέλης Σταυρόπουλος στο πιάνο',
      caption: 'Στο πιάνο',
    },
    {
      id: 'piano-bw',
      src: '/images/piano-bw.jpg',
      alt: 'Ο Βαγγέλης Σταυρόπουλος στο πιάνο, ασπρόμαυρο πορτρέτο',
      caption: 'Στο πιάνο',
    },
    {
      id: 'portrait-studio',
      src: '/images/portrait-studio.jpg',
      alt: 'Πορτρέτο στούντιο του Βαγγέλη Σταυρόπουλου',
      caption: 'Πορτρέτο στούντιο',
    },
  ],
};
