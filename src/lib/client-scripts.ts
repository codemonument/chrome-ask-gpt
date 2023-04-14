/**
 * All functions in this file are intended to be run via chrome.scripting.executeScript() in the context of chat.openai.com.
 * Please see the usages of these functions before making changes!
 */

import { createLogger } from "./createLogger";
const logger = createLogger(`[Ask ChatGPT Chrome Extension]`);

export function insertTextIntoChatGPT(queryText: string) {
  const promptTextArea = document.querySelector("textarea[data-id=root]");
  const confirmButton = document.querySelector(
    "textarea[data-id=root] + button",
  );

  if (!promptTextArea) {
    logger.error(
      `promptTextArea is undefined, textarea[data-id=root] not found!`,
      promptTextArea,
    );
    return;
  }

  if (!confirmButton) {
    logger.error(
      `confirmButton is undefined, textarea[data-id=root] + button not found!`,
      confirmButton,
    );
    return;
  }

  logger.debug(`Found elements on openai page: `, {
    promptTextArea, confirmButton
  });

  (promptTextArea as HTMLTextAreaElement).value = queryText;
  (confirmButton as HTMLButtonElement).click();
}
