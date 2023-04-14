console.log("Greeting from popup.js script!");

async function getCurrentTab() {
  let queryOptions = { active: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

async function enterPrompt(tab: chrome.tabs.Tab, prompt: string) {
}

const button = document.querySelector(`button`);
button?.addEventListener(`click`, async () => {
  const tab = await getCurrentTab();
  enterPrompt(tab, "Demo Prompt from Extension Popup");
});
