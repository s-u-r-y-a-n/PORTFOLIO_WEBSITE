import taskhubImage from "@/assets/Task_Management.png";

export interface IndividualProject {
  number: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  stack: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
}

const individualProjects: IndividualProject[] = [
  {
    number: "01",
    title: "Task Management Application",
    category: "FULL STACK · PERSONAL PROJECT",
    image: taskhubImage,

    description:
      "A full-stack productivity application inspired by Google Tasks, built to manage task lists, priorities, completion workflows, and personal productivity from a responsive interface.",

    highlights: [
      "Built complete task and custom-list CRUD workflows with status, priority, starred items, due dates, and attachments",
      "Implemented JWT access and refresh authentication with email OTP verification, password recovery, and protected application routes",
      "Developed dashboard analytics, search and multi-parameter filtering with Redux Toolkit for centralized application state",
      "Designed MongoDB relationships between users, task lists, and tasks using Mongoose schemas, validation, and indexed fields",
      "Built a modular Node.js and Express REST API with authentication middleware, controllers, routes, and secure password hashing",
      "Deployed the frontend and backend independently on Render with production CORS configuration and environment variables",
    ],

    stack: [
      "React",
      "Vite",
      "Material UI",
      "Redux Toolkit",
      "React Router",
      "Axios",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Nodemailer",
      "Render",
    ],

    liveUrl: "https://task-management-app-awqi.onrender.com/",
    githubUrl: "https://github.com/s-u-r-y-a-n/task_management",
  },

  {
    number: "02",
    title: "Modular Auth & Intake Architecture",
    category: "FRONTEND ARCHITECTURE · COMPONENT SYSTEM",
    description:
      "An isolated, modular authentication and client intake interface engineered with headless state hooks, customizable design tokens, and strict client-side validation.",
    highlights: [
      "Clean separation of presentational components from custom state hooks",
      "Sanitized input normalization and dynamic password reveal controls",
      "Engineered as a drop-in architectural package with token persistence",
    ],
    stack: ["React 19", "Material UI", "SCSS Modules", "Axios", "REST APIs"],
    githubUrl: "https://github.com/",
  },
];

export default individualProjects;