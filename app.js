/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createItem, getItems } from './fetch-utils.js';
// completeItems
import { renderItem } from './render-utils.js';

/* Get DOM Elements */
const addItemForm = document.getElementById('item-form');
const errorDisplay = document.getElementById('error-display');
const itemsList = document.getElementById('item-list');
/* State */
let items = [];
let error = null;
/* Events */
window.addEventListener('load', async () => {
    const response = await getItems();
    error = response.error;
    items = response.data;

    if (error) {
        displayError();
    }
    if (items) {
        displayItems();
    }
});

addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addItemForm);
    const newItem = {
        item: formData.get('item'),
        quantity: formData.get('quantity'),
    };

    const response = await createItem(newItem);
    error = response.error;
    const item = response.data;

    if (error) {
        displayError();
    } else {
        items.push(item);
        displayItems();
        addItemForm.reset();
    }
});

/* Display Functions */
function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayItems() {
    itemsList.innerHTML = '';

    for (const item of items) {
        const itemEl = renderItem(item);
        itemsList.append(itemEl);
    }
    //         itemEl.addEventListener('click', async () => {
    //             const response = await completeItems(item.id);
    //             error = response.error;
    //             const updateItem = response.data;

    //             if (error) {
    //                 displayError();
    //             } else {
    //                 const index = items.indexOf(item);
    //                 items[index] = updateItem;
    //                 displayItems();
    //             }
    //         });
    //     }
}
