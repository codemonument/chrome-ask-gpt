/**
 * All functions in this file are intended to be run via chrome.scripting.executeScript() in the context of chat.openai.com. 
 * Please see the usages of these functions before making changes!
 */

export function insertTextIntoChatGPT(queryText: string) {

    alert('Jumped into custom insert function!');

    const promptTextArea = document.querySelector('textarea[data-id=root]');
    const confirmButton = document.querySelector('textarea[data-id=root] + button');

    console.debug(`Maybe found Elements: `, { promptTextArea, confirmButton });

    return { promptTextArea, confirmButton };
}