import heroImg from "@assets/images/sunnyside-2.jpg";
import therapyImg from "@assets/images/sunnyside-3.jpg";
import classroomImg from "@assets/images/sunnyside-4.jpg";
import childrenImg from "@assets/images/sunnyside-5.jpg";
import childrenImg2 from "@assets/images/sunny-two.png";
import learningImg from "@assets/images/sunnyside-6.jpg";
import supportImg from "@assets/images/sunnyside-7.jpg";
import educationImg from "@assets/images/sunnyside-8.jpg";
import communityImg from "@assets/images/sunnyside-9.jpg";

export const APP_NAME =
  import.meta.env.VITE_APP_NAME || "Sunnyside Therapy Center";
export const APP_URL =
  import.meta.env.VITE_APP_URL || "https://sunnysidetherapy.zm";

export const CONTACT = {
  PHONE_1: import.meta.env.VITE_CONTACT_PHONE_1 || "0978501101",
  PHONE_2: import.meta.env.VITE_CONTACT_PHONE_2 || "0973902247",
  EMAIL: import.meta.env.VITE_CONTACT_EMAIL || "info@sunnyside.com",
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
  PRIVACY: "/privacy-policy",
  ENROLLMENT: "/enrollment",
};

// Unsplash Images - High quality placeholders
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
