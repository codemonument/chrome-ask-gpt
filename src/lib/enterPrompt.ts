import { insertTextIntoChatGPT } from "./client-scripts";
import { logger } from "./logging";

export async function enterPrompt(tab: chrome.tabs.Tab, prompt: string) {
  if (!tab.id) {
    logger.error(
      `Can't inject something into current tab, no tab.id available!`,
      tab,
    );
    return;
  }

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: insertTextIntoChatGPT,
    args: [prompt] as any,
  });
}
