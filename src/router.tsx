import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // This is a single-page portfolio. Restoring a previously saved position
    // fights the custom scroll controller and makes a refresh start mid-page.
    scrollRestoration: false,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
