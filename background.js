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
