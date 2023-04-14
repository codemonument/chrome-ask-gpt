// content.ts
import { createTRPCProxyClient } from "@trpc/client";
import { chromeLink } from "trpc-chrome/link";

import type { AppRouter } from "../trpc_server";

const port = chrome.runtime.connect();
const trpc = createTRPCProxyClient<AppRouter>({
  links: [chromeLink({ port })],
});

(async () => {
  console.log(await trpc.hello.query());
})();
