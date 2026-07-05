import { ConductorData } from '@/lib/types';

// ============================================================
// CUSTOMIZE THIS FILE WITH YOUR COUSIN'S INFORMATION
// ============================================================

export const conductorDataEl: ConductorData = {
  name: "Ευάγγελος Σταυρόπουλος",
  tagline: "Μαέστρος",

  heroImage: "/images/hero.jpg",

  biographyShort: `Ένας παθιασμένος μαέστρος με εμπειρία σε συμφωνικό, λυρικό και σύγχρονο ρεπερτόριο. Διακρίνεται για τις δυναμικές του ερμηνείες και τη συνεργατική του προσέγγιση στη μουσική δημιουργία.`,

  biography: `Προσθέστε εδώ μια ολοκληρωμένη βιογραφία. Θα πρέπει να περιλαμβάνει το εκπαιδευτικό υπόβαθρο, τα σημαντικότερα επιτεύγματα, αξιοσημείωτες εμφανίσεις, βραβεία και καλλιτεχνική φιλοσοφία.

Συμπεριλάβετε πληροφορίες για την κατάρτιση και την εκπαίδευση, τις σημαντικές ορχήστρες και τα σύνολα που έχει διευθύνει, βραβεία και αποτελέσματα διαγωνισμών, καλλιτεχνικό όραμα και προσέγγιση και αξιοσημείωτες συνεργασίες.

Αυτό το κείμενο υποστηρίζει πολλαπλές παραγράφους.`,

  // Extended biography sections for the full biography page
  biographySections: [
    {
      title: "Πρώτα Χρόνια & Εκπαίδευση",
      content: `Περιγράψτε εδώ την πρώιμη μουσική κατάρτιση, τις διαμορφωτικές εμπειρίες και το εκπαιδευτικό υπόβαθρο. Συμπεριλάβετε σπουδές σε ωδείο, σημαντικούς δασκάλους και μέντορες και πρώιμες μουσικές επιρροές.

Αυτή η ενότητα μπορεί να εκτείνεται σε πολλές παραγράφους για να παρέχει πλούσιες λεπτομέρειες σχετικά με τα διαμορφωτικά χρόνια του μαέστρου και τη διαδρομή που τον οδήγησε στη διεύθυνση ορχήστρας.`,
      image: "/images/bio-education.jpg",
    },
    {
      title: "Σημαντικές Στιγμές Καριέρας",
      content: `Περιγράψτε αναλυτικά τα κύρια ορόσημα της καριέρας, τις σημαντικές εμφανίσεις και τους σημαντικούς διορισμούς. Συμπεριλάβετε πληροφορίες για πρώτες εμφανίσεις με μεγάλες ορχήστρες, διακρίσεις σε διαγωνισμούς και σημαντικές συνεργασίες.

Επισημάνετε τυχόν ηχογραφήσεις, πρώτες εκτελέσεις νέων έργων ή ιδιαίτερα αξιομνημόνευτες εμφανίσεις που έχουν διαμορφώσει την πορεία της καριέρας του μαέστρου.`,
      image: "/images/bio-career.jpg",
    },
    {
      title: "Καλλιτεχνικό Όραμα",
      content: `Μοιραστείτε την καλλιτεχνική φιλοσοφία του μαέστρου, την προσέγγιση στην ερμηνεία και τις μουσικές αξίες. Τι κινητοποιεί το έργο του; Πώς προσεγγίζει διαφορετικά ρεπερτόρια;

Αυτή η ενότητα προσφέρει μια εικόνα της καλλιτεχνικής προσωπικότητας και βοηθά το κοινό και τους διοργανωτές να κατανοήσουν τι κάνει αυτόν τον μαέστρο μοναδικό.`,
    },
    {
      title: "Παρόν & Μέλλον",
      content: `Περιγράψτε τις τρέχουσες θέσεις, τα εν εξελίξει έργα και τις μελλοντικές δεσμεύσεις. Τι είναι στον ορίζοντα; Συναρπαστικές επερχόμενες πρώτες εμφανίσεις ή συνεργασίες;

Διατηρήστε αυτήν την ενότητα ενημερωμένη με τα πιο πρόσφατα νέα και τα επερχόμενα κυριότερα γεγονότα.`,
      image: "/images/bio-current.jpg",
    },
  ],

  // Press quotes for biography page
  pressQuotes: [
    {
      quote: "Ένας μαέστρος αξιοσημείωτης ευαισθησίας και ακρίβειας...",
      source: "Περιοδικό Κλασικής Μουσικής",
      year: "2024",
    },
    {
      quote: "Ηλεκτρισμένες ερμηνείες που μαγεύουν το κοινό...",
      source: "Επιθεώρηση Τεχνών",
      year: "2024",
    },
    {
      quote: "Ένας από τους πιο πολλά υποσχόμενους μαέστρους της γενιάς του...",
      source: "Συμφωνική Εβδομαδιαία",
      year: "2023",
    },
  ],

  contactEmail: "contact@example.com",

  socialLinks: [
    { platform: 'instagram', url: 'https://instagram.com/' },
    { platform: 'youtube', url: 'https://youtube.com/' },
    { platform: 'facebook', url: 'https://facebook.com/' },
    { platform: 'linkedin', url: 'https://linkedin.com/' },
    { platform: 'email', url: 'mailto:contact@example.com' },
  ],

  // Videos - supports YouTube embeds and self-hosted
  videos: [
    {
      id: '1',
      title: 'Συμφωνία Αρ. 5',
      subtitle: 'Μπετόβεν',
      thumbnailUrl: '/images/video-thumb-1.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '32:15',
      ensemble: 'Εθνική Συμφωνική Ορχήστρα',
      category: 'Συμφωνία',
    },
    {
      id: '2',
      title: 'Κοντσέρτο για Πιάνο Αρ. 2',
      subtitle: 'Ραχμάνινοφ',
      thumbnailUrl: '/images/video-thumb-2.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '35:42',
      ensemble: 'Δημοτική Φιλαρμονική',
      category: 'Κοντσέρτο',
    },
    {
      id: '3',
      title: 'Η Ιεροτελεστία της Άνοιξης',
      subtitle: 'Στραβίνσκι',
      thumbnailUrl: '/images/video-thumb-3.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '33:10',
      ensemble: 'Σύνολο Σύγχρονης Μουσικής',
      category: 'Σύγχρονη',
    },
  ],

  // Photo gallery for media page
  gallery: [
    {
      id: '1',
      src: '/images/gallery/performance-1.jpg',
      alt: 'Διεύθυνση στην Εθνική Λυρική Σκηνή',
      caption: 'Εθνική Λυρική Σκηνή, Έναρξη Σεζόν 2024',
      category: 'Παράσταση',
    },
    {
      id: '2',
      src: '/images/gallery/performance-2.jpg',
      alt: 'Συμφωνική συναυλία',
      caption: 'Δημοτική Συμφωνική Ορχήστρα',
      category: 'Παράσταση',
    },
    {
      id: '3',
      src: '/images/gallery/rehearsal-1.jpg',
      alt: 'Πρόβα',
      caption: 'Πρόβα με τη Φιλαρμονική',
      category: 'Πρόβα',
    },
    {
      id: '4',
      src: '/images/gallery/portrait-1.jpg',
      alt: 'Πορτρέτο',
      caption: 'Φωτογραφία από Studio Name',
      category: 'Πορτρέτο',
    },
    {
      id: '5',
      src: '/images/gallery/performance-3.jpg',
      alt: 'Παράσταση όπερας',
      caption: 'La Bohème, Εθνική Λυρική Σκηνή',
      category: 'Παράσταση',
    },
    {
      id: '6',
      src: '/images/gallery/portrait-2.jpg',
      alt: 'Πορτρέτο μαέστρου',
      caption: 'Επίσημο πορτρέτο 2024',
      category: 'Πορτρέτο',
    },
  ],

  // Concerts & Events
  concerts: [
    {
      id: '1',
      title: 'Γκαλά Έναρξης Σεζόν',
      organization: 'Εθνική Λυρική Σκηνή',
      organizationLogo: '/images/logos/opera-logo.png',
      type: 'Όπερα',
      date: '2025-09-15',
      venue: 'Μεγάλο Θέατρο Όπερας',
      description: 'Έναρξη της νέας σεζόν με ένα εντυπωσιακό γκαλά με κορυφαίες στιγμές από αγαπημένες όπερες.',
      isUpcoming: true,
    },
    {
      id: '2',
      title: 'Συμφωνία Αρ. 2 του Μάλερ',
      organization: 'Δημοτική Συμφωνική Ορχήστρα',
      organizationLogo: '/images/logos/symphony-logo.png',
      type: 'Συμφωνία',
      date: '2025-10-20',
      venue: 'Αίθουσα Συναυλιών',
      description: 'Η Συμφωνία της Ανάστασης με πλήρη χορωδία και σολίστ.',
      programme: ['Μάλερ - Συμφωνία Αρ. 2 «Ανάσταση»'],
      isUpcoming: true,
    },
    {
      id: '3',
      title: 'Σύγχρονες Πρώτες Εκτελέσεις',
      organization: 'Σύνολο Νέας Μουσικής',
      organizationLogo: '/images/logos/ensemble-logo.png',
      type: 'Σύγχρονη',
      date: '2025-11-05',
      venue: 'Κέντρο Σύγχρονων Τεχνών',
      description: 'Παγκόσμιες πρώτες εκτελέσεις έργων από ανερχόμενους συνθέτες.',
      isUpcoming: true,
    },
    {
      id: '4',
      title: 'La Bohème',
      organization: 'Εθνική Λυρική Σκηνή',
      organizationLogo: '/images/logos/opera-logo.png',
      type: 'Όπερα',
      date: '2025-03-14',
      venue: 'Κεντρική Σκηνή Λυρικής Σκηνής',
      description: 'Το αγαπημένο αριστούργημα του Πουτσίνι σε μια νέα παραγωγή.',
      isUpcoming: false,
    },
    {
      id: '5',
      title: 'Κύκλος Μπετόβεν Μέρος Ι',
      organization: 'Φιλαρμονική Ορχήστρα',
      organizationLogo: '/images/logos/philharmonic-logo.png',
      type: 'Συμφωνία',
      date: '2025-01-20',
      venue: 'Αίθουσα Φιλαρμονικής',
      description: 'Συμφωνίες 1, 2 και 3 «Ηρωική»',
      programme: [
        'Μπετόβεν - Συμφωνία Αρ. 1',
        'Μπετόβεν - Συμφωνία Αρ. 2',
        'Μπετόβεν - Συμφωνία Αρ. 3 «Ηρωική»',
      ],
      isUpcoming: false,
    },
    {
      id: '6',
      title: 'Βραδιά Γκαλά Μπαλέτου',
      organization: 'Εθνικό Μπαλέτο',
      organizationLogo: '/images/logos/ballet-logo.png',
      type: 'Μπαλέτο',
      date: '2024-12-15',
      venue: 'Κρατικό Θέατρο',
      description: 'Μια βραδιά κλασικού και σύγχρονου μπαλέτου.',
      isUpcoming: false,
    },
  ],

  // Affiliations & Organizations
  affiliations: [
    {
      id: '1',
      name: 'Εθνική Λυρική Σκηνή',
      role: 'Πρώτος Φιλοξενούμενος Μαέστρος',
      logoUrl: '/images/logos/opera-logo.png',
      url: 'https://example.com',
    },
    {
      id: '2',
      name: 'Δημοτική Συμφωνική Ορχήστρα',
      role: 'Καλλιτεχνικός Διευθυντής',
      logoUrl: '/images/logos/symphony-logo.png',
      url: 'https://example.com',
    },
    {
      id: '3',
      name: 'Σύνολο Σύγχρονης Μουσικής',
      role: 'Καλλιτεχνικός Σύμβουλος',
      logoUrl: '/images/logos/ensemble-logo.png',
      url: 'https://example.com',
    },
  ],
};

export default conductorDataEl;
