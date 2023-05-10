import { logger } from "./logging";

/**
 * Note: The content.js script in here must be ES5, bc. ESM will create import errors!
 * @param tab 
 * @returns 
 */
export async function injectPredefinedContentScript(tab: chrome.tabs.Tab) {
  const { id, url } = tab;

  if (!id) {
    logger.error(
      `Can't inject something into current tab, no tab.id available!`,
      tab,
    );
    return;
  }

  console.log(`Loading: ${url}`);
  await chrome.scripting.executeScript(
    {
      target: { tabId: id, allFrames: true },
      // this file will be directly in the /dist folder after vite compilation :)
      files: ["content.js"],
    },
  );
  console.log("script injected in all frames");
}
