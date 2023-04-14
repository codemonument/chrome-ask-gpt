
/**
 * EXPERIMENTAL! 
 * 
 * Checks, whether a user is logged in on chat.openai.com or not. 
 * 
 * CAUTION - not relieable right now! (Stand: 1.0.1 - 2023-04-14, deactivated with 1.0.2)
 */
export async function checkOpenaiLogin() {

    // check is user is logged in and give it the suggestion to goto login page!
	const res = await fetch('https://chat.openai.com/chat', {
		// This is only for testing what would happen if a user is not logged in!
		// FIXME: When running this extention in icognito mode, this fetch seems to still have access to the login cookie of chat.openai.com,
		// probably since this fetch still runs in this background service worker in non-icognito mode!
		// TODO: Output some kind of warning about this when this extention is used in icognito mode!
		// credentials: 'omit',
	});

    console.debug(`Login check result redirect url!`, res.url);
	// Note: chat.openai.com returns a 403 when fetched without login cretendials, instead of redirecting to the login page.
	if (res.redirected && new URL(res.url).pathname.startsWith('/auth/login')) {
		console.debug(`User is not logged in! => Suggesting login at https://chat.openai.com/auth/login`);
		chrome.omnibox.setDefaultSuggestion({
			description:
				'You seem to not be logged in! Please log in at <url>https://chat.openai.com/auth/login</url>!',
			// content: 'https://chat.openai.com/auth/login',
			// deletable: false,
		});
		return false; 
	}

    if (res.status === 200) {
		return true;
	}
}