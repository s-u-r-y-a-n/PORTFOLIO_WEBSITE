export type ArchitectureItem = readonly [title: string, description: string];

const architecture = [
  [
    "Client Request & State",
    "Predictable state handling, form validation, and typed API communication.",
  ],
  [
    "API Layer & Routing",
    "REST and GraphQL endpoints handling request dispatching and payload parsing.",
  ],
  [
    "Auth & Security Guardrails",
    "Stateless JWT validation, role-based access control (RBAC), and route middleware.",
  ],
  [
    "Core Business Logic",
    "Asynchronous service execution, event-driven workflows, and real-time WebSockets & Webhooks.",
  ],
  [
    "Data & Cloud Infrastructure",
    "Structured storage via MySQL, MongoDB, or DynamoDB, backed by AWS serverless services and CloudWatch monitoring.",
  ],
] as const;

export default architecture;
