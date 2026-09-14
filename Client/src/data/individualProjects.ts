import taskhubImage from "@/assets/Task_Management.png";
import portfolioImage from "@/assets/project-admissions.jpg";

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
    title: "Personal Developer Portfolio",
    category: "FULL STACK · PERSONAL PROJECT",
    image: portfolioImage,

    description:
      "A responsive full-stack developer portfolio engineered with modern React architecture to showcase technical skills, production applications, professional experience, and an integrated contact pipeline.",


    highlights: [
      "Built a responsive full-stack portfolio using React, TypeScript, TanStack Router, and structured data-driven components",
      "Designed a glassmorphism UI with dark/light themes, smooth scrolling, section tracking, animations, and interactive dialogs",
      "Developed an integrated contact workflow connecting the React client with an Express and Nodemailer backend",
      "Used AI-assisted development and vibe coding for rapid prototyping, ideation, refactoring, debugging, and optimization",
      "Applied manual coding and review to customize, refine, debug, and validate every section of the application",
      "Maintained the project with clean version control and publicly available source code on GitHub",
    ],

    stack: [
      "React",
      "TypeScript",
      "Vite",
      "TanStack Router",
      "Tailwind CSS",
      "SCSS",
      "Radix UI",
      "Node.js",
      "Express",
      "REST APIs",
      "Nodemailer",
      "Render",
    ],

    liveUrl: "#top",
    githubUrl: "https://github.com/s-u-r-y-a-n/check-it-off-sweetly",
  },
];

export default individualProjects;