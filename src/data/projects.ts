import financeImage from "@/assets/project-finance.jpg";
import admissionsImage from "@/assets/project-admissions.jpg";
import commerceImage from "@/assets/project-commerce.jpg";

export interface Project {
  number: string;
  title: string;
  type: string;
  image: string;
  description: string;
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    number: "01",
    title: "Finance & Expenses Tracker",
    type: "FINTECH · FULL STACK",
    image: financeImage,
    description:
      "A secure financial command center that turns daily transactions into useful, actionable insight.",
    highlights: [
      "Role-aware expense workflows",
      "Live analytics and category trends",
      "Optimized relational data model",
    ],
    stack: ["Node.js", "Express", "MySQL", "React", "Chart.js"],
    liveUrl: "#contact",
    githubUrl: "https://github.com/",
  },
  {
    number: "02",
    title: "Admission & Student Management",
    type: "EDTECH · SERVERLESS",
    image: admissionsImage,
    description:
      "A serverless operations platform for the complete student journey, from enquiry to enrollment.",
    highlights: [
      "Event-driven admissions pipeline",
      "Granular access and audit trails",
      "Scalable AWS infrastructure",
    ],
    stack: ["Node.js", "AWS SAM", "DynamoDB", "React"],
    liveUrl: "#contact",
    githubUrl: "https://github.com/",
  },
  {
    number: "03",
    title: "Scalable Commerce Platform",
    type: "COMMERCE · SAAS",
    image: commerceImage,
    description:
      "A modular storefront and operations suite built for conversion, dependable payments, and growth.",
    highlights: [
      "Stripe checkout and webhooks",
      "Inventory and order orchestration",
      "Reusable storefront system",
    ],
    stack: ["MERN Stack", "Stripe", "Tailwind"],
    liveUrl: "#contact",
    githubUrl: "https://github.com/",
  },
];

export default projects;
