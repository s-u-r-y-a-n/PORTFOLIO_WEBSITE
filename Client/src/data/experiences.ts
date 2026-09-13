export interface Experience {
  role: string;
  company: string;
  period: string;
  employmentType: string;
  location?: string;
  description: string;
  highlights: string[];
  stack: string[];
}

const experiences: Experience[] = [
  {
    role: "Junior Full Stack Engineer",
    company: "Troniqs Rationale Technologies",
    period: "FEB 2026 — MAY 2026",
    employmentType: "Full-time · On-site",
    location: "Chennai, India",
    description:
      "Contributed to an enterprise-scale Pharmacy Logistics platform built on microservices, focusing on QA bug resolution, typed state flows, and cloud monitoring.",
    highlights: [
      "Resolved high-priority QA bugs and implemented feature improvements across multiple backend microservices within an enterprise-scale Pharmacy Logistics system. ",
      "Worked with Redux for centralized client-side state management and integrated GraphQL APIs for efficient, targeted data fetching across complex logistical workflows. ",
      "Leveraged AWS CloudWatch on a daily basis to monitor distributed service logs, trace runtime errors, and streamline debugging across serverless environments.",
    ],
    stack: [
      "React",
      "Redux",
      "TypeScript",
      "Material UI",
      "Node.js",
      "REST APIs",
      "GraphQL",
      "Webhooks",
      "AWS CloudWatch",
      "AWS Lambda",
      "DynamoDB",
      "PostgreSQL",
    ],
  },
  {
    role: "Full Stack Engineer",
    company: "Althi Solutions",
    location: undefined,
    period: "FEB 2025 — JAN 2026",
    employmentType: "Full-time · On-site",
    description:
      "Delivered production applications spanning an institutional portal, internal management modules, and a serverless admission engine.",
    highlights: [
      "Built responsive, accessible UI modules and integrated REST endpoints across platforms using React, PrimeReact, and Context API.",
      "Engineered backend REST APIs with Node.js and Express, backed by dual persistence layers (MongoDB via Mongoose and MySQL via Sequelize).",
      "Implemented JWT authentication with Role-Based Access Control (RBAC), WebSocket notifications, and automated emails via Brevo and Amazon SES.",
      "Architected and deployed a serverless admissions backend using AWS Lambda, DynamoDB query modeling, S3, and AWS SAM for Infrastructure as Code (IaC).",
    ],
    stack: [
      "React",
      "PrimeReact",
      "Node.js",
      "Express",
      "REST APIs",
      "WebSockets",
      "AWS SES",
      "AWS S3",
      "AWS Lambda",
      "AWS SAM",
      "DynamoDB",
      "MySQL",
      "MongoDB",
    ],
  },
  {
    role: "MERN Stack Developer Intern",
    company: "Spangles InfoTech",
    location: "Nagercoil, India",
    period: "OCT 2024 — DEC 2024",
    employmentType: "Internship · On-site",
    description:
      "Completed a hands-on web development internship, assisting in the implementation of full-stack features, reusable UI components, and API integrations.",
    highlights: [
      "Built responsive user interfaces and modular frontend components using React and modern CSS styling.",
      "Assisted in developing RESTful API endpoints and handling backend CRUD logic with Node.js and Express.",
      "Configured MongoDB database schemas and tested API integration paths using Postman.",
    ],
    stack: [
      "React",
      "JavaScript",
      "Node.js",
      "Express",
      "MongoDB",
      "REST APIs",
      "Postman",
      "Git",
    ],
  },
];

export default experiences;
