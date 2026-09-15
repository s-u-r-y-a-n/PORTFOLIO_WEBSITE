import financeImage from "@/assets/project-finance.jpg";
import admissionsImage from "@/assets/Noorul_Islam_University.png";
import commerceImage from "@/assets/project-commerce.jpg";
import bmtImage from "@/assets/BMT_img.jpg";

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
    title: "Noorul Islam University Website",
    type: "EDUCATION · FULL STACK",
    image: admissionsImage,
    description:
      "A full-stack university platform developed to support institutional workflows, administrative operations, and a responsive digital experience for students and administrators.",

    highlights: [
      "Built responsive React interfaces with PrimeReact, Context API, and reusable UI modules",
      "Engineered Node.js and Express REST APIs with MongoDB and MySQL for complex university workflows",
      "Implemented JWT authentication, role-based access control, real-time admin notifications, and automated email services",
    ],

    stack: [
      "React.js",
      "PrimeReact",
      "Node.js",
      "Express.js",
      "MongoDB",
      "MySQL",
      "JWT",
      "WebSockets",
      "NodeMailer",
      "Brevo SMTP",
    ],

    liveUrl: "https://nicollege.com/",
  },
  {
    number: "02",
    title: "Business Management Tool (BMT)",
    type: "ENTERPRISE · BUSINESS OPERATIONS",
    image: bmtImage,

    description:
      "An enterprise business management platform developed to streamline organizational operations across finance, procurement, inventory, project management, and HR workflows.",

    highlights: [
      "Developed modular React.js interfaces and reusable UI components for multiple business modules",
      "Integrated REST APIs to enable seamless data flow and improve operational workflows",
      "Built responsive, user-friendly screens using PrimeReact for enterprise-scale applications",
    ],

    stack: [
      "React.js",
      "PrimeReact",
      "REST APIs",
      "Axios"
    ],

    liveUrl: "https://app.primeelectriks.com/",
  },
  {
    number: "03",
    title: "Serverless Admission Management System",
    type: "EDTECH · SERVERLESS",
    image: financeImage,

    description:
      "A serverless admission platform designed to digitize end-to-end college admission and scholarship workflows with secure multi-role access and cloud-based document management.",

    highlights: [
      "Architected serverless backend services using Node.js, AWS Lambda, and AWS SAM with Infrastructure as Code",
      "Implemented multi-role JWT authentication and authorization for Student, Admin, and Super Admin workflows",
      "Designed DynamoDB access patterns and integrated Amazon S3 for secure document storage and Amazon SES for automated emails",
    ],

    stack: [
      "Node.js",
      "AWS Lambda",
      "AWS SAM",
      "DynamoDB",
      "Amazon S3",
      "Amazon SES",
      "JWT",
      "Infrastructure as Code",
    ],

    liveUrl: "#contact",
  }
];

export default projects;
