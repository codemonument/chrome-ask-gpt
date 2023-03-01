/**
 * All functions in this file are intended to be run via chrome.scripting.executeScript() in the context of chat.openai.com. 
 * Please see the usages of these functions before making changes!
 */

export function insertTextIntoChatGPT(queryText: string) {
    const promptTextArea = document.querySelector('textarea[data-id=root]');
    const confirmButton = document.querySelector('textarea[data-id=root] + button');

    if (promptTextArea) {
        (promptTextArea as HTMLTextAreaElement).value = queryText;
    }

    if (confirmButton) {
        (confirmButton as HTMLButtonElement).click();
    }
}