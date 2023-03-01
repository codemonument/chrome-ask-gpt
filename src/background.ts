import { userLoggedIn } from './lib/state.js';
import { z } from "zod";
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
		// credentials: 'omit',
	});
	console.debug(`Fetch result!`, res);
	// Note: chat.openai.com returns a 403 when fetched without login cretendials, instead of redirecting to the login page.
	if (res.status === 403) {
		console.debug(`User is not logged in! => Suggesting login at https://chat.openai.com/auth/login`);
		chrome.omnibox.setDefaultSuggestion({
			description:
				'You seem to not be logged in! Please log in at <url>https://chat.openai.com/auth/login</url>!',
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

chrome.omnibox.onInputEntered.addListener(async (text, disposition) => {
	console.debug(`Omnibox input entered`, { text, disposition, userLoggedIn: userLoggedIn.value });

	// Short-Circuit to chatGPT login
	if (userLoggedIn.value === false) {
		console.debug(`Use shortcut redirect to chatGPT login!`);
		chrome.tabs.update({
			url: 'https://chat.openai.com/auth/login'
		})
		return;
	}

	const navigationObj: chrome.tabs.UpdateProperties = {
		url: 'https://chat.openai.com/chat',
	}

	let tabPromise;
	switch (disposition) {
		case 'currentTab':
			// tabId will default to current tab (which is enough for me bc. this extension is an omnibox one)
			tabPromise = chrome.tabs.update(navigationObj)
			break;
		case 'newForegroundTab':
			tabPromise = chrome.tabs.create(navigationObj);
			break;
		case 'newBackgroundTab':
			navigationObj.active = false;
			tabPromise = chrome.tabs.create(navigationObj);
			break;
	}

	// Navigate To ChatGPT
	const tab = await tabPromise;
	const tabId = z.number().parse(tab.id);

	chrome.scripting.executeScript({
		target: { tabId },
		func() {
			const promptTextArea = document.querySelector('textarea[data-id=root]');
			const confirmButton = document.querySelector('textarea[data-id=root] + button')

			console.debug(`Maybe found Elements: `, { promptTextArea, confirmButton })
		},
	});

});

/**
 * User has ended the keyword input session without accepting the input.
 */
chrome.omnibox.onInputCancelled.addListener(() => {
	console.log(`Omnibox input cancelled`);
});
