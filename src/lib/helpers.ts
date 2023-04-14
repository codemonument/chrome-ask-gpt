import { logger } from "./logging";

export function injectContentScript(tab: chrome.tabs.Tab) {
  const { id, url } = tab;

  if (!id) {
    logger.error(
      `Can't inject something into current tab, no tab.id available!`,
      tab,
    );
    return;
  }

  chrome.scripting.executeScript(
    {
      target: { tabId: id, allFrames: true },
      // this file will be directly in the /dist folder after vite compilation :)
      files: ["content.js"],
    },
  );
  console.log(`Loading: ${url}`);
}
