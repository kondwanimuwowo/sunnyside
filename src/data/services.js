import { IMAGES } from "@utils/constants";

const servicesData = {
  domains: [
    {
      id: "academic",
      title: "Academic Skills",
      icon: "Brain",
      color: "from-blue-500 to-blue-600",
      description:
        "Building strong cognitive and academic foundations for school success",
      fullDescription:
        "We focus on developing essential academic skills that help children succeed in mainstream education. Our approach is tailored to each child's learning pace and style, ensuring they build confidence alongside competence.",
      features: [
        "Cognitive development and critical thinking",
        "Math fundamentals and problem-solving",
        "Reading comprehension and literacy skills",
        "Writing development and creative expression",
        "Time concepts and calendar understanding",
        "Weather and environmental awareness",
      ],
      benefits: [
        "Improved academic performance",
        "Better school readiness",
        "Enhanced cognitive abilities",
        "Increased confidence in learning",
      ],
      image: IMAGES.learning,
    },
    {
      id: "communication",
      title: "Communication Skills",
      icon: "MessageCircle",
      color: "from-purple-500 to-purple-600",
      description: "Developing expressive and receptive language abilities",
      fullDescription:
        "Communication is fundamental to learning and social interaction. We use evidence-based methods including PECS and speech-language therapy to help children express their needs, understand others, and build meaningful connections.",
      features: [
        "Expressive language development",
        "Receptive language and comprehension",
        "PECS (Picture Exchange Communication System)",
        "Non-verbal communication strategies",
        "Social communication and conversation skills",
        "Vocabulary building and articulation",
      ],
      benefits: [
        "Better self-expression",
        "Reduced frustration and anxiety",
        "Improved social interactions",
        "Enhanced understanding of others",
      ],
      image: IMAGES.therapy,
    },
    {
      id: "social",
      title: "Social Skills",
      icon: "Users",
      color: "from-green-500 to-green-600",
      description: "Building meaningful relationships and social awareness",
      fullDescription:
        "Social skills are essential for success in school and life. We create structured opportunities for children to practice and develop positive social interactions, emotional regulation, and peer relationships in a supportive environment.",
      features: [
        "Turn-taking, sharing, and cooperation",
        "Small group activities and teamwork",
        "Peer relationship building",
        "Emotional recognition and regulation",
        "Social awareness and empathy",
        "Conflict resolution strategies",
      ],
      benefits: [
        "Better peer relationships",
        "Improved classroom behavior",
        "Enhanced social confidence",
        "Reduced social anxiety",
      ],
      image: IMAGES.sunnyTwo,
    },
    {
      id: "motor",
      title: "Motor Skills",
      icon: "Hand",
      color: "from-orange-500 to-orange-600",
      description: "Fine and gross motor development for daily activities",
      fullDescription:
        "Motor skills are crucial for daily activities and academic tasks. We provide targeted exercises and occupational therapy integration to develop both fine and gross motor capabilities, helping children gain independence and confidence.",
      features: [
        "Fine motor: lacing, beading, scissor skills",
        "Gross motor: catching, throwing, balancing",
        "Hand-eye coordination development",
        "Physical coordination and spatial awareness",
        "Strength and endurance building",
        "Occupational therapy integration",
      ],
      benefits: [
        "Improved handwriting and drawing",
        "Better physical coordination",
        "Enhanced independence in daily tasks",
        "Increased confidence in physical activities",
      ],
      image: IMAGES.playing,
    },
    {
      id: "adaptive",
      title: "Adaptive Skills",
      icon: "Star",
      color: "from-pink-500 to-pink-600",
      description: "Daily living and self-care independence",
      fullDescription:
        "Independence in daily activities builds confidence and prepares children for life. We focus on essential self-care skills that promote autonomy, dignity, and quality of life, tailored to each child's developmental level.",
      features: [
        "Toilet training and bathroom independence",
        "Independent feeding and meal preparation",
        "Self-care routines and personal hygiene",
        "Daily living skills and chore assistance",
        "Dressing and clothing management",
        "Safety awareness and self-protection",
      ],
      benefits: [
        "Greater independence and autonomy",
        "Improved self-confidence and self-esteem",
        "Better quality of life and dignity",
        "Reduced caregiver burden",
      ],
      image: IMAGES.unTwo,
    },
  ],

  additional: [
    {
      id: "behavior",
      title: "Behavior Management",
      description: "Positive behavior support and intervention strategies",
      fullDescription:
        "We use evidence-based behavioral strategies to help children develop appropriate behaviors and reduce challenging ones. Our approach focuses on understanding the function of behavior and teaching replacement skills.",
      points: [
        "Comprehensive behavior assessment and analysis",
        "Positive reinforcement and reward systems",
        "Teaching consequences and responsibility",
        "Replacement behavior training",
        "Progress monitoring and adjustment",
        "Family training and home support",
      ],
    },
    {
      id: "physical",
      title: "Physical Therapy",
      description: "Targeted motor development and physical rehabilitation",
      fullDescription:
        "Our physical therapy program focuses on helping children improve their physical function and mobility. We use individualized exercises and interventions to develop strength, balance, and coordination, empowering children to participate more fully in their daily activities.",
      points: [
        "Gross motor skill development",
        "Postural control and stability",
        "Balance and coordination training",
        "Strength and endurance building",
        "Mobility and gait training",
        "Individualized exercise programs",
      ],
    },
    {
      id: "sensory",
      title: "Sensory Support",
      description: "Individualized sensory integration therapy",
      fullDescription:
        "Every child has unique sensory needs. We provide personalized sensory support through detailed assessments and tailored activities to help children regulate, focus, and thrive in their environments.",
      points: [
        "Detailed sensory processing assessments",
        "Sensory integration therapy activities",
        "Environmental adaptations and accommodations",
        "Personalized sensory diet planning",
        "Sensory overload management strategies",
        "Sensory seeking support and regulation",
      ],
    },
  ],
};

export default servicesData;
