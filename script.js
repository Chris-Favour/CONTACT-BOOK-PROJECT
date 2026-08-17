/* ==========================================
   CONTACT BOOK JAVASCRIPT
========================================== */


/* ==========================================
   GET HTML ELEMENTS
========================================== */

/*
    We use document.getElementById() to get
    elements from our HTML page.
*/

const contactForm = document.getElementById("contactForm");

const fullNameInput = document.getElementById("fullName");

const phoneInput = document.getElementById("phone");

const emailInput = document.getElementById("email");

const addressInput = document.getElementById("address");

const contactList = document.getElementById("contactList");

const searchInput = document.getElementById("searchInput");

const contactCount = document.getElementById("contactCount");

const emptyMessage = document.getElementById("emptyMessage");

const submitButton = document.getElementById("submitButton");

const cancelButton = document.getElementById("cancelButton");

const formTitle = document.getElementById("formTitle");


/* ==========================================
   CONTACT ARRAY
========================================== */

/*
    This array will hold all our contacts.

    First we try to get saved contacts from
    Local Storage.

    If there are no saved contacts,
    we use an empty array [].
*/

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];


/*
    This variable keeps track of which contact
    we are currently editing.

    -1 means that we are not editing anything.
*/

let editingIndex = -1;


/* ==========================================
   DISPLAY CONTACTS WHEN PAGE LOADS
========================================== */

/*
    When the page opens, display all contacts.
*/

displayContacts();


/* ==========================================
   ADD CONTACT
========================================== */

/*
    Listen for the form submit event.

    This happens when the user clicks
    the "Add Contact" button.
*/

contactForm.addEventListener("submit", function(event) {

    /*
        Prevent the page from refreshing.
    */
    event.preventDefault();


    /* Get values entered by the user */
    const fullName = fullNameInput.value.trim();

    const phone = phoneInput.value.trim();

    const email = emailInput.value.trim();

    const address = addressInput.value.trim();


    /* ==========================================
       VALIDATION
    ========================================== */


    /*
        Check that the name is not empty.
    */

    if (fullName === "") {
        alert("Please enter the full name.");
        return;
    }


    /*
        Phone number validation.

        This allows numbers with:
        - 08012345678
        - +2348012345678

        Spaces and hyphens are also allowed.
    */

    const phonePattern = /^[0-9+\-\s]{10,15}$/;

    if (!phonePattern.test(phone)) {
        alert("Please enter a valid phone number.");
        return;
    }


    /*
        Email validation.

        This checks that the email looks like:
        example@gmail.com
    */

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }


    /*
        Check address.
    */

    if (address === "") {
        alert("Please enter the address.");
        return;
    }


    /* ==========================================
       CREATE CONTACT OBJECT
    ========================================== */

    /*
        We create an object containing
        information about the contact.
    */

    const contact = {
        name: fullName,
        phone: phone,
        email: email,
        address: address
    };


    /* ==========================================
       CHECK IF WE ARE EDITING
    ========================================== */

    if (editingIndex === -1) {

        /*
            If editingIndex is -1,
            we are adding a NEW contact.
        */

        contacts.push(contact);

        alert("Contact added successfully!");

    } else {

        /*
            Otherwise, replace the old contact
            with the updated contact.
        */

        contacts[editingIndex] = contact;

        alert("Contact updated successfully!");

        /*
            Return editing mode back to normal.
        */

        editingIndex = -1;

        submitButton.textContent = "Add Contact";

        cancelButton.style.display = "none";

        formTitle.textContent = "Add New Contact";
    }


    /* ==========================================
       SAVE TO LOCAL STORAGE
    ========================================== */

    saveContacts();


    /* Display the contacts again */
    displayContacts();


    /* Clear the form */
    contactForm.reset();

});


/* ==========================================
   SAVE CONTACTS
========================================== */

/*
    Local Storage allows us to save information
    in the user's browser.

    JSON.stringify() changes the array into
    text so Local Storage can store it.
*/

function saveContacts() {

    localStorage.setItem("contacts", JSON.stringify(contacts));

}


/* ==========================================
   DISPLAY CONTACTS
========================================== */

function displayContacts() {

    /*
        First clear the current contact list.
    */

    contactList.innerHTML = "";


    /*
        Get the search text.

        toLowerCase() makes the search
        not care about capital letters.
    */

    const searchText = searchInput.value.toLowerCase().trim();


    /*
        Filter contacts based on the search.
    */

    const filteredContacts = contacts.filter(function(contact) {

        return contact.name.toLowerCase().includes(searchText);

    });


    /* ==========================================
       UPDATE CONTACT COUNT
    ========================================== */

    if (filteredContacts.length === 1) {

        contactCount.textContent = "1 contact";

    } else {

        contactCount.textContent = filteredContacts.length + " contacts";

    }


    /* ==========================================
       SHOW EMPTY MESSAGE
    ========================================== */

    if (filteredContacts.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }


    /* ==========================================
       CREATE CONTACT CARDS
    ========================================== */

    filteredContacts.forEach(function(contact) {

        /*
            Create a new div for the contact.
        */

        const contactCard = document.createElement("div");

        contactCard.classList.add("contact-card");


        /*
            We need to know the original index
            of this contact.

            This is useful for Edit and Delete.
        */

        const originalIndex = contacts.indexOf(contact);


        /*
            Create the HTML for the contact card.

            We use textContent later where possible
            to avoid putting user input directly
            into the page as HTML.
        */

        const nameHeading = document.createElement("h3");

        nameHeading.textContent = contact.name;


        /* Phone information */
        const phoneInfo = document.createElement("p");

        phoneInfo.classList.add("contact-info");

        phoneInfo.innerHTML = "<strong>Phone:</strong> " + escapeHTML(contact.phone);


        /* Email information */
        const emailInfo = document.createElement("p");

        emailInfo.classList.add("contact-info");

        emailInfo.innerHTML = "<strong>Email:</strong> " + escapeHTML(contact.email);


        /* Address information */
        const addressInfo = document.createElement("p");

        addressInfo.classList.add("contact-info");

        addressInfo.innerHTML = "<strong>Address:</strong> " + escapeHTML(contact.address);


        /* ==========================================
           CREATE BUTTONS
        ========================================== */

        const buttonContainer = document.createElement("div");

        buttonContainer.classList.add("contact-buttons");


        /* Edit button */
        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.classList.add("edit-button");


        /*
            When Edit is clicked,
            call editContact().
        */

        editButton.addEventListener("click", function() {

            editContact(originalIndex);

        });


        /* Delete button */
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.classList.add("delete-button");


        /*
            When Delete is clicked,
            call deleteContact().
        */

        deleteButton.addEventListener("click", function() {

            deleteContact(originalIndex);

        });


        /* Put buttons inside button container */
        buttonContainer.appendChild(editButton);

        buttonContainer.appendChild(deleteButton);


        /* ==========================================
           PUT EVERYTHING INSIDE CONTACT CARD
        ========================================== */

        contactCard.appendChild(nameHeading);

        contactCard.appendChild(phoneInfo);

        contactCard.appendChild(emailInfo);

        contactCard.appendChild(addressInfo);

        contactCard.appendChild(buttonContainer);


        /* Add the contact card to the page */
        contactList.appendChild(contactCard);

    });

}


/* ==========================================
   EDIT CONTACT
========================================== */

function editContact(index) {

    /*
        Get the selected contact.
    */

    const contact = contacts[index];


    /*
        Put the contact's information
        back into the form.
    */

    fullNameInput.value = contact.name;

    phoneInput.value = contact.phone;

    emailInput.value = contact.email;

    addressInput.value = contact.address;


    /*
        Remember which contact we are editing.
    */

    editingIndex = index;


    /*
        Change the button text.
    */

    submitButton.textContent = "Update Contact";


    /*
        Show the Cancel button.
    */

    cancelButton.style.display = "inline-block";


    /*
        Change the form heading.
    */

    formTitle.textContent = "Edit Contact";


    /*
        Scroll to the form.

        This is useful when there are many contacts.
    */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ==========================================
   DELETE CONTACT
========================================== */

function deleteContact(index) {

    /*
        Ask the user for confirmation
        before deleting.
    */

    const confirmDelete = confirm(
        "Are you sure you want to delete this contact?"
    );


    /*
        If the user clicks Cancel,
        stop the function.
    */

    if (!confirmDelete) {
        return;
    }


    /*
        Remove one contact from the array.

        splice() removes an item from an array.
    */

    contacts.splice(index, 1);


    /*
        Save the updated contacts.
    */

    saveContacts();


    /*
        Display the updated list.
    */

    displayContacts();


    /*
        Show success message.
    */

    alert("Contact deleted successfully.");

}


/* ==========================================
   SEARCH CONTACTS
========================================== */

/*
    Whenever the user types in the search box,
    displayContacts() runs again.
*/

searchInput.addEventListener("input", function() {

    displayContacts();

});


/* ==========================================
   CANCEL EDITING
========================================== */

cancelButton.addEventListener("click", function() {

    /*
        Reset the form.
    */

    contactForm.reset();


    /*
        Stop editing mode.
    */

    editingIndex = -1;


    /*
        Change button back to Add Contact.
    */

    submitButton.textContent = "Add Contact";


    /*
        Hide Cancel button.
    */

    cancelButton.style.display = "none";


    /*
        Change heading back.
    */

    formTitle.textContent = "Add New Contact";

});


/* ==========================================
   ESCAPE HTML
========================================== */

/*
    This function helps protect the page
    if a user enters special HTML characters
    into a contact field.
*/

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}