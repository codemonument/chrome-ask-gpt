import { loadingTabs, userLoggedIn } from "./lib/state.js";
import { z } from "zod";
import "./manifest.json";
import { insertTextIntoChatGPT } from "./lib/client-scripts";

/**
 * Main Extension Service Worker as ESModule
 */

chrome.runtime.onInstalled.addListener((details) => {
  // Debug output for easier development
  const log = `Ask GPT Extension changed because of: ${details.reason}!`;
  console.log(log);
});

// Listen for tab updates to determin loading finished state for chat.openai.com
chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  // Check if the updated tab is the one we created
  const loadingTab = loadingTabs.get(tabId);
  if (loadingTab && loadingTab.isLoading && changeInfo.status === "complete") {
    loadingTab.isLoading = false;
    console.log("Tab has finished loading:", { url: tab.url, tabId });

    // Inject queryText into chat.openai.com
    await chrome.scripting.executeScript({
      target: { tabId },
      func: insertTextIntoChatGPT,
      args: [loadingTab.queryText] as any,
    });

    loadingTabs.delete(tabId);
    return;
  }

  // console.debug(`Received some other tab update`, { tabId, changeInfo, tab })
});

/**
 * Called once per input session and before any onInputChanged Events
 */
chrome.omnibox.onInputStarted.addListener(async () => {
  console.log(`Omnibox input started`);

  chrome.omnibox.setDefaultSuggestion({
    description: "Send query to ChatGPT ",
    // content: 'https://chat.openai.com/auth/login',
    // deletable: false,
  });
});

/**
 * User has changed what is typed into the omnibox.
 */
chrome.omnibox.onInputChanged.addListener((text, suggestCallback) => {
  // console.log(`Omnibox input changed`, text);
  // suggestCallback([{
  // 	description: 'Ask ChatGPT: ',
  // 	content: text,
  // 	deletable: true,
  // }])
});

chrome.omnibox.onInputEntered.addListener(async (queryText, disposition) => {
  console.debug(`Omnibox input entered`, {
    text: queryText,
    disposition,
    userLoggedIn: userLoggedIn.value,
  });

  // Short-Circuit to chatGPT login
  // bje 2023-04-14: disabled for now bc. the detection of login state was very unrelieable!
  //   if (userLoggedIn.value === false) {
  //     console.debug(`Use shortcut redirect to chatGPT login!`);
  //     chrome.tabs.update({
  //       url: "https://chat.openai.com/auth/login",
  //     });
  //     return;
  //   }

  const navigationObj: chrome.tabs.UpdateProperties = {
    url: "https://chat.openai.com/chat",
  };

  let tabPromise: Promise<chrome.tabs.Tab>;
  switch (disposition) {
    case "currentTab":
      // tabId will default to current tab (which is enough for me bc. this extension is an omnibox one)
      tabPromise = chrome.tabs.update(navigationObj);
      break;
    case "newForegroundTab":
      tabPromise = chrome.tabs.create(navigationObj);
      break;
    case "newBackgroundTab":
      navigationObj.active = false;
      tabPromise = chrome.tabs.create(navigationObj);
      break;
  }

  // Navigate To ChatGPT
  const tab = await tabPromise;
  const tabId = z.number().parse(tab.id);

  loadingTabs.set(tabId, { isLoading: true, queryText });

  // Note: the content script will be injected in chrome.tabs.onUpdated.
  // This ensures that the tab finished loading
});

/**
 * User has ended the keyword input session without accepting the input.
 */
chrome.omnibox.onInputCancelled.addListener(() => {
  console.log(`Omnibox input cancelled`);
});
