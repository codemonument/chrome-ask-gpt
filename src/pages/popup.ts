import { logger } from "../lib/logging";
import { enterPrompt } from "../lib/enterPrompt";
import { injectPredefinedContentScript } from "../lib/helpers";
import { effect } from '@preact/signals-core';

logger.log("Greeting from popup.js script!");

(async () => {
  // const tab = await getCurrentTab();
  // await injectContentScript(tab);
})();

async function getCurrentTab() {
  let queryOptions = { active: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

const promptHistoryUl = document.querySelector(`#prompt-history-ul`); 

effect(() => {
  
})

const testButton = document.querySelector(`button.test`);
testButton?.addEventListener(`click`, async () => {
  logger.debug(`Button clicked!`);
  // enterPrompt(tab, "Demo Prompt from Extension Popup");
});

const injectButton = document.querySelector(`button.inject`);
injectButton?.addEventListener(`click`, async () => {
  logger.debug(`Inject Button clicked!`);
});
