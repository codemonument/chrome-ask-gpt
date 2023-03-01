/**
 * Main Extension Service Worker as ESModule
 */

// chrome.action.onClicked.addListener((tab) => {
//     chrome.scripting.executeScript({
//         target: {tabId: tab.id},
//         function: () => {
//             const query = new URLSearchParams(tab.url).get('q');
//             const inputField = document.querySelector('[placeholder="Ask me anything..."]');
//             if (inputField) {
//                 inputField.value = query;
//                 inputField.form.submit();
//             }
//         }
//     });
//  });

chrome.runtime.onInstalled.addListener(details => {
	// Debug output for easier development
	console.log(`Ask GPT Extension changed because of: ${details.reason}!`);
});

/**
 * Called once per input session and before any onInputChanged Events
 */
chrome.omnibox.onInputStarted.addListener(() => {
	console.log(`Omnibox input started`);
});

/**
 * User has changed what is typed into the omnibox.
 */
chrome.omnibox.onInputChanged.addListener((text, suggestCallback) => {
	console.log(`Omnibox input changed`, text);
});

chrome.omnibox.onInputEntered.addListener((text, dispositionCallback) => {
	console.log(`Omnibox input entered`, text);
});

/**
 * User has ended the keyword input session without accepting the input.
 */
chrome.omnibox.onInputCancelled.addListener(() => {
	console.log(`Omnibox input cancelled`);
});
