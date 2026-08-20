# ESUT ICT Contact Book Project

The **ESUT ICT Contact Book Project** is a simple, responsive web application for saving and managing personal contact information. Users can add contacts, view their saved contacts, search for a contact by name, edit existing details, and delete contacts when they are no longer needed.

This project was developed as an ESUT ICT group project using the core web technologies HTML, CSS, and JavaScript.

## Project Objectives

- Create a simple digital contact book that is easy to use.
- Allow users to store important contact details in one place.
- Provide an option to search contacts quickly by name.
- Support updating and deleting saved contact records.
- Practice web development concepts including forms, DOM manipulation, validation, events, and browser storage.

## Features

- Add a contact with the following information:
	- Full name
	- Phone number
	- Email address
	- Address
- Display saved contacts in organized contact cards.
- Search contacts by name as the user types.
- Edit contact information using the existing contact form.
- Delete contacts after confirmation.
- Display the total number of contacts currently shown.
- Show a helpful empty-state message when no contacts are available or when a search has no results.
- Validate names, phone numbers, email addresses, and addresses before saving.
- Save contacts in the browser using `localStorage`, allowing them to remain available after the page is refreshed.
- Use a responsive layout that works on desktop and smaller screens.

## Technologies Used

- **HTML5** - Provides the structure of the contact book and form.
- **CSS3** - Provides the layout, colors, spacing, cards, buttons, and responsive styling.
- **JavaScript** - Handles form submission, validation, searching, editing, deleting, rendering, and local storage.
- **Browser Local Storage** - Stores contact data locally in the user’s browser.

## Project Structure

```text
CONTACT-BOOK-PROJECT/
|-- index.html   # Main webpage and contact form
|-- style.css    # Page layout and visual styling
|-- script.js    # Contact book functionality
|-- README.md    # Project documentation
```

## How to Use the Contact Book

### Add a Contact

1. Enter the contact’s full name.
2. Enter a valid phone number.
3. Enter a valid email address.
4. Enter the contact’s address.
5. Click **Add Contact**.

The new contact will appear in the contact list and will be saved in the browser.

### Search for a Contact

Enter a name in the search box. The contact list will update automatically and display matching names.

### Edit a Contact

Click **Edit** on a contact card. The contact information will be returned to the form, where it can be changed and saved with **Update Contact**. Click **Cancel** to leave editing mode without making an update.

### Delete a Contact

Click **Delete** on a contact card and confirm the action. The selected contact will be removed from the list and from local storage.

## Validation and Data Storage

The application checks that all fields are completed before a contact is saved. Phone numbers may contain numbers, spaces, plus signs, and hyphens, while email addresses must follow a standard email format.

Contact records are stored using the browser’s local storage. This means the data is saved only on the current browser and device. Clearing the browser’s site data or using a different browser may remove or hide the saved contacts.

## Group Members

1. Obieze Divine Favour Mmesoma
2. Ogochukwu Gabriella Obianuju
3. Onyebueke Roseline Mmesoma
4. Obi Mary Amarachi
5. Oha Peace Chisom
6. Ikenga Favour Chineye

## Project Status

The project is a functional front-end contact book demonstrating the basic operations required to create, read, update, search, and delete contact records in a browser.
