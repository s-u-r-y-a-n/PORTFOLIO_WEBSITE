import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio";

const title = "Surya N — Full Stack Developer";
const description =
  "Full Stack Developer building dependable React, Node.js, database, and cloud applications from interface to infrastructure.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}
