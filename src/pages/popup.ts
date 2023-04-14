import { logger } from "../lib/logging";
import { enterPrompt } from "../lib/enterPrompt";
import { injectContentScript } from "../lib/helpers";

logger.log("Greeting from popup.js script!");

async function getCurrentTab() {
  let queryOptions = { active: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

const button = document.querySelector(`button`);
button?.addEventListener(`click`, async () => {
  logger.debug(`Button clicked!`);
  const tab = await getCurrentTab();
  injectContentScript(tab);
  // enterPrompt(tab, "Demo Prompt from Extension Popup");
});
