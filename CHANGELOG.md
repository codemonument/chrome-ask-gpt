# Changelog

## 1.0.2 - 2023-04-14 (WIP)

- Fix: Remove login detection because it was still janky
- Fix: Entering & sending prompt with openai textarea failed bc.
  the send-button is only enabled when detecing an 'input' event on the textarea. Fixed now.

## 1.0.1

- Fix janky login detection because of redirect mode 'manual'

## 1.0.0 Initial Release

- Provide the search shortcut "gpt" in Chrome OmniBox
- Detect when user is not logged into chat.openai.com and provide a redirect to chat.openai.com/auth/login
- When logged in, the query inserted after the "gpt" shortcut will be inserted into chat.openapi.com and submitted
