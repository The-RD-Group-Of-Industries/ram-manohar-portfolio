/**
 * Exports the GET and POST route handlers for the `ourFileRouter` file upload router.
 * The `createRouteHandler` function from the `uploadthing/next` module is used to create the route handlers.
 * The `ourFileRouter` is imported from the `./core` module and passed to `createRouteHandler`.
 */
import { createRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "./core";
 
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
 
});