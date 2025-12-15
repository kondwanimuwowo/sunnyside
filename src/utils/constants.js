// Import images from your assets folder
// Adjust paths based on where your images are stored
import heroImg from "@assets/images/hero.jpg";
import therapyImg from "@assets/images/therapy.png";
import classroomImg from "@assets/images/classroom.jpg";
import childrenImg from "@assets/images/children.jpg";
import learningImg from "@assets/images/learning.jpg";
import supportImg from "@assets/images/support.jpg";
import educationImg from "@assets/images/education.jpg";
import communityImg from "@assets/images/community.jpg";
import childrenImg2 from "@assets/images/children2.jpg";
import ben from "@assets/images/team/ben.jpg";
import izzy from "@assets/images/team/izzy.jpg";
import sunnysideAbout from "@assets/images/sunnyside-about.jpg";

export const APP_NAME =
  import.meta.env.VITE_APP_NAME || "Sunnyside Therapy Center";
export const APP_URL =
  import.meta.env.VITE_APP_URL || "https://sunnysidetherapy.zm";

export const CONTACT = {
  PHONE_1: import.meta.env.VITE_CONTACT_PHONE_1 || "0978501101",
  PHONE_2: import.meta.env.VITE_CONTACT_PHONE_2 || "0973902247",
  EMAIL: import.meta.env.VITE_CONTACT_EMAIL || "[email protected]",
  ADDRESS: "Lusaka, Zambia",
  FACEBOOK: "https://facebook.com/sunnysidetherapycenter",
};

// Brand Colors - Lime Green + Deep Blue system
export const COLORS = {
  primary: "#32cd32", // Lime Green
  primaryLight: "#5ee45e",
  primaryDark: "#22a722",
  accent: "#4318dd", // Deep Blue
  accentLight: "#6366f1",
  accentDark: "#3311bb",
  teal: "#1ba397",
  yellow: "#efe82a",
  danger: "#ce4c52",
  white: "#ffffff",
};

// Images - Using imported assets
export const IMAGES = {
  hero: heroImg, // Children learning
  therapy: therapyImg, // Therapy session
  classroom: classroomImg, // Classroom
  children: childrenImg, // Happy children
  learning: learningImg, // Child learning
  support: supportImg, // Support/care
  education: educationImg, // Education
  community: communityImg, // Community
  sunnyTwo: childrenImg2, // Alternative happy children
  ben: ben, // Ben photo
  izzy: izzy, // Izzy photo
  sunnysideAbout: sunnysideAbout, // About section image
};

// Fallback: If you don't have local images yet, use Unsplash
// Comment out the imports above and uncomment this:
/*
export const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80',
  therapy: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
  classroom: 'https://images.unsplash.com/photo-1544717684-2be6e3e4f8c0?w=800&q=80',
  children: 'https://images.unsplash.com/photo-1587616211892-e2e3c8455a4f?w=800&q=80',
  learning: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
  support: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80',
  education: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80',
  community: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=600&q=80',
  sunnyTwo: 'https://images.unsplash.com/photo-1587616211892-e2e3c8455a4f?w=800&q=80',
  ben: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  izzy: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  sunnysideAbout: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200&q=80',
};
*/

export const DONATION_AMOUNTS = [50, 100, 250, 500, 1000];
export const MIN_DONATION = 10;

export const MOBILE_MONEY_OPERATORS = [
  { value: "airtel", label: "Airtel Money" },
  { value: "mtn", label: "MTN Mobile Money" },
  { value: "zamtel", label: "Zamtel Kwacha" },
];

export const ROUTES = {
  HOME: "/",
  SERVICES: "/services",
  ABOUT: "/about",
  DONATE: "/donate",
  CONTACT: "/contact",
  GALLERY: "/gallery",
  RESOURCES: "/resources",
  BLOG: "/blog",
  ENROLLMENT: "/enrollment",
  PRIVACY: "/privacy-policy",
};

export const LEARNING_DOMAINS = [
  {
    id: "academic",
    title: "Academic Skills",
    icon: "Brain",
    description:
      "Cognition, math skills, writing development, literacy, time concepts, and weather understanding.",
    details: [
      "Math fundamentals",
      "Reading & writing",
      "Time concepts",
      "Weather understanding",
      "Critical thinking",
    ],
    image: IMAGES.education,
  },
  {
    id: "communication",
    title: "Communication Skills",
    icon: "MessageCircle",
    description:
      "Expressive and receptive language development, Picture Exchange Communication System (PECS).",
    details: [
      "Expressive language",
      "Receptive language",
      "PECS implementation",
      "Non-verbal communication",
      "Social communication",
    ],
    image: IMAGES.learning,
  },
  {
    id: "social",
    title: "Social Skills",
    icon: "Users",
    description:
      "Turn-taking, small group work times, and building meaningful peer relationships.",
    details: [
      "Turn-taking",
      "Group interaction",
      "Peer relationships",
      "Cooperative play",
      "Social awareness",
    ],
    image: IMAGES.children,
  },
  {
    id: "motor",
    title: "Motor Skills",
    icon: "Hand",
    description:
      "Gross and fine motor development: lacing, beading, safe scissors use, catching, throwing, and balancing.",
    details: [
      "Lacing & beading",
      "Scissor skills",
      "Ball skills",
      "Balance training",
      "Hand-eye coordination",
    ],
    image: IMAGES.therapy,
  },
  {
    id: "adaptive",
    title: "Adaptive Skills",
    icon: "Star",
    description:
      "Toilet training, bathroom independence, and teaching independent feeding skills.",
    details: [
      "Toilet training",
      "Bathroom independence",
      "Independent feeding",
      "Self-care routines",
      "Daily living skills",
    ],
    image: IMAGES.support,
  },
];

export const ADDITIONAL_SERVICES = [
  {
    id: "behavior",
    title: "Behavior Management",
    description: "Positive behavior support and intervention",
    points: [
      "Comprehensive behavior assessment",
      "Positive reinforcement strategies",
      "Teaching consequences and rewards",
      "Replacement behavior training",
      "Progress monitoring and adjustment",
      "Family training and support",
    ],
  },
  {
    id: "sensory",
    title: "Sensory Support",
    description: "Individualized sensory integration therapy",
    points: [
      "Detailed sensory assessments",
      "Sensory integration activities",
      "Environmental adaptations",
      "Personalized sensory diet planning",
      "Sensory overload management",
      "Sensory seeking support",
    ],
  },
];
