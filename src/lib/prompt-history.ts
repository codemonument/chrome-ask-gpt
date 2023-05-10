import { z } from "zod";
import { signal } from "@preact/signals-core";

const HISTORY_LS_KEY = `ask_gpt_prompt_history`;

// TODO: check why TS Inference does not work here with JSON.parse(json as string)!
const PromptHistory = z.string().nullable().optional()
  .transform((val) => val !== null ? val : undefined)
  .default("[]")
  .pipe(
    z.preprocess((json) => JSON.parse(json as string), z.array(z.string())),
  );

export let promptHistory = signal(getPromptHistory());

function getPromptHistory() {
  const localItem = localStorage.getItem(HISTORY_LS_KEY);

  // TODO: Use SafeParse and add axiom logging for remote error analysis!
  const parsedPromptHistory = PromptHistory.parse(localItem);

  return parsedPromptHistory;
}

export function addPromptToHistory(prompt: string) {
  promptHistory.value.push(prompt);
  localStorage.setItem(HISTORY_LS_KEY, JSON.stringify(promptHistory.value));
}

/**
 * Sets up a localstorage listener to get notified if another tap changes my history localstorage key
 */
window.addEventListener("storage", (storageEvent) => {
  if (storageEvent.key === HISTORY_LS_KEY) {
    console.log(
      `Got window.storage event for key ${HISTORY_LS_KEY} - refreshing prompt history inside AskGpt extension`,
    );
    promptHistory.value = getPromptHistory();
  }
}, false);
