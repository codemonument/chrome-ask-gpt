/**
 * Main Extension Service Worker!
 */

chrome.action.

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: () => {
            const query = new URLSearchParams(tab.url).get('q');
            const inputField = document.querySelector('[placeholder="Ask me anything..."]');
            if (inputField) {
                inputField.value = query;
                inputField.form.submit();
            }
        }
    });
 });

 chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        // Debug output for easier development
        alert('Ask GPT Extension installed!')
    }
 });