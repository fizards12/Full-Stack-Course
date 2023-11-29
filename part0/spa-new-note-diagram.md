## Diagram of adding new note to notes page with _Single Page Application Style_
```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>browser: add the new note to the notes array
    Note right of browser: The browser starts executing the JavaScript code that redraw the notes array

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: {message : "note created"}
    deactivate server
```
