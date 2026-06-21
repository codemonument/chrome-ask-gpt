import { initTRPC } from "@trpc/server";
import { createChromeHandler } from "trpc-chrome/adapter";

/**
 * This tRPC Server runs inside the background.ts service-worker and is therefore able to inject content scripts
 */

const t = initTRPC.create({
  isServer: false,
  allowOutsideOfServer: true,
});

const appRouter = t.router({
  // ...procedures
  hello: t.procedure.query(() => "Hello World!"),
});

export type AppRouter = typeof appRouter;

createChromeHandler({
  router: appRouter,
});
