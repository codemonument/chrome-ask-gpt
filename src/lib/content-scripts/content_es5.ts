/**
 * This file can be run inside the webpage as a whole.
 *
 * BUT:
 * - It cannot use esm imports! (at least not without bundling before)
 * - It can only use dynamic imports via import()
 *
 * 2023-05-10 Not in use right now, kept here in case of future needs
 *
 * Can be injected with function injectPredefinedContentScript(tab)
 */

console.debug(`ES5 Content Script Loaded`);

// import { createTRPCProxyClient } from "@trpc/client";
// import { chromeLink } from "trpc-chrome/link";

// import type { AppRouter } from "../trpc_server";

// // A content script calling the trpc hello endpoint

// const port = chrome.runtime.connect();
// const trpc = createTRPCProxyClient<AppRouter>({
//   links: [chromeLink({ port })],
// });

// (async () => {
//   console.log(await trpc.hello.query());
// })();
