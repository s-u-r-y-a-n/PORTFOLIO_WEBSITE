import { createFileRoute } from "@tanstack/react-router";
import { TaskManager } from "@/components/task-manager";

const title = "Tasks — a calm task manager";
const description =
  "Organize your day with simple lists, starred priorities, due dates and notes. A clean, fast task manager in your browser.";

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
  return <TaskManager />;
}
