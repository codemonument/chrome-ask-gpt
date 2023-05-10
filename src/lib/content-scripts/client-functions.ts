/**
 * All functions in this file are intended to be run via chrome.scripting.executeScript() in the context of chat.openai.com.
 * Please see the usages of these functions before making changes!
 */

// IMPORTANT: content scripts CAN'T ACCESS global variables in this file!
// IMPORTANT 2: content scripts CAN'T EVEN ACCESS imports!!!
// They can only accept inputs via serializable params!
import { logger } from "../logging";
logger.debug(`client-scripts.ts file loaded!`);

export function insertTextIntoChatGPT(
  queryText: string,
) {
  // const logger = createLogger(`[Ask GPT Chrome Extension]`);

  const promptTextAreaElement = document.querySelector(
    "textarea[data-id=root]",
  );
  const confirmButtonElement = document.querySelector(
    "textarea[data-id=root] + button",
  );

  if (!promptTextAreaElement) {
    console.error(
      `[Ask GPT Chrome Extension] promptTextArea is undefined, textarea[data-id=root] not found!`,
      promptTextAreaElement,
    );
    return;
  }

  if (!confirmButtonElement) {
    console.error(
      `[Ask GPT Chrome Extension] confirmButton is undefined, textarea[data-id=root] + button not found!`,
      confirmButtonElement,
    );
    return;
  }

  const textArea = promptTextAreaElement as HTMLTextAreaElement;
  const confirmButton = confirmButtonElement as HTMLButtonElement;

  console.debug(`[Ask GPT Chrome Extension] Found elements on openai page: `, {
    textArea,
    confirmButton,
  });

  textArea.value = queryText;
  var event = new Event("input", {
    "bubbles": true,
    "cancelable": true,
  });

  textArea.dispatchEvent(event);
  confirmButton.click();
}

export function isLoginScreen() {
  // Check if login button or subscriber login is available
  // CAUTION: BRITTLE! If this should return the login button, but does not, check querySelector
  const loginButton = document.querySelector(
    "div.flex > div.flex-row > button.btn-primary",
  );

  const subscriberEmailInput = document.querySelector(
    "input#email",
  );

  if (loginButton !== null || subscriberEmailInput !== null) {
    console.log({ loginButton, subscriberEmailInput });
    return true;
  }

  // else
  return false;
}
