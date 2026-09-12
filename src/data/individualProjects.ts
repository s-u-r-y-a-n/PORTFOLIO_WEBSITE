import taskhubImage from "@/assets/project-taskhub.jpg";

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
      "A full-stack productivity tool designed and developed independently to organize daily task workflows, priorities, category lists, and completion tracking.",
    highlights: [
      "Task and category CRUD operations with dynamic status flows",
      "Real-time search, priority filtering, and starred items",
      "RESTful API endpoints with stateless authentication and responsive layout",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Material UI", "REST APIs"],
    liveUrl: "#contact",
    githubUrl: "https://github.com/",
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
