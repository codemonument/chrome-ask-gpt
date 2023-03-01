import { userLoggedIn } from './lib/state.js';
import './manifest.json';

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
chrome.omnibox.onInputStarted.addListener(async () => {
	console.log(`Omnibox input started`);

	// check is user is logged in and give it the suggestion to goto login page!
	const res = await fetch('https://chat.openai.com/chat', {
		redirect: 'manual',
		// This is only for testing what would happen if a user is not logged in!
		// FIXME: When running this extention in icognito mode, this fetch seems to still have access to the login cookie of chat.openai.com,
		// probably since this fetch still runs in this background service worker in non-icognito mode!
		// TODO: Output some kind of warning about this when this extention is used in icognito mode!
		credentials: 'omit',
	});
	console.debug(`Fetch result!`, res);
	// Note: chat.openai.com returns a 403 when fetched without login cretendials, instead of redirecting to the login page.
	if (res.status === 403) {
		console.debug(`User is not logged in! => Suggesting login at https://chat.openai.com`);
		chrome.omnibox.setDefaultSuggestion({
			description:
				'<dim>You seem to not be logged in! Please log in at <url>https://chat.openai.com</url></dim>!',
			// content: 'https://chat.openai.com/auth/login',
			// deletable: false,
		});
		userLoggedIn.value = false;
	}

	if (res.status === 200) {
		userLoggedIn.value = true;
	}
});

/**
 * User has changed what is typed into the omnibox.
 */
chrome.omnibox.onInputChanged.addListener((text, suggestCallback) => {
	console.log(`Omnibox input changed`, text);
});

chrome.omnibox.onInputEntered.addListener(async (text, dispositionCallback) => {
	console.log(`Omnibox input entered`, text);
	// navigateToChatGPT();
	const tab = await chrome.tabs.create({
		url: 'https://chat.openai.com/chat',
	});

	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: () => {
			const promptTextArea = document.querySelector('textarea[data-id=root]');

			// const confirmButton = document.querySelector('textarea[data-id=root] + button')
			const element = document.getElementById('my-element');
			if (element) {
				console.log(element.textContent);
			}
		},
	});

	// askChatGPT(text);
});

/**
 * User has ended the keyword input session without accepting the input.
 */
chrome.omnibox.onInputCancelled.addListener(() => {
	console.log(`Omnibox input cancelled`);
});
