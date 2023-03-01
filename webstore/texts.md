# Webstore Texts

## Data privacy Text

## EN

This app does not collect any personal data.
All inserted search queries will be directly forwarded to chat.openai.com
and are not available for the app afterwards anymore.

### DE

Diese App sammelt keinerlei persönliche Daten. Alle eingegebenen Suchanfragen werden direkt an chat.openai.com weitergeleitet und sind danach für die Anwendung nicht mehr verfügbar.

## Reason for scripting

This extension inserts a query of a user directly into the input text area of chat.openai.com to form a shortcut to this service.
It uses scripting to query the text area element as well as the submit button, insert the queryText into the text area and click the submit button.

## Reason for Host Permission

```
The extension should also be able to check whether the user is logged in to chat.openai.com or not, to avoid that they type a query which will be lost completely because they are not authenticated yet.
```
