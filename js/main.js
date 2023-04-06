//Selectors
const form = document.getElementById('item-form');
const addItemsInput = document.querySelector('.form-input');
const addItemBtn = document.querySelector('.btn');
const itemList = document.getElementById('item-list');
const formBtn = form.querySelector('button');
const removeBtn = document.querySelector("ul");
const clearAllBtn = document.querySelector('.btn-clear');
const filterElement = document.querySelector('.filter');
const filterInput = document.querySelector('.form-input-filter');
let itemContent;
let isEditMode = false;

//Global Functions

const displayItems = () => {
    const itemsFromStorage = getItemsFromLocalStorge();
    itemsFromStorage.forEach(item => createItemBtn(item));
    checkUI();
}

const createEleFunc = (element) => {
    return document.createElement(element);
}

const checkUI = () => {
    const items = document.querySelectorAll('li');
    if (items.length === 0) {
        clearAllBtn.style.display = "none";
        filterElement.style.display = "none";
    }else {
        clearAllBtn.style.display = "block";
        filterElement.style.display = "block";
    }

    // formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    // formBtn.style.backgroundColor = "black";

    isEditMode = false;
}

const createItemBtn = (item) => {
    //Creates "li" element attaches item name
    const listItemElement = createEleFunc('li');
    listItemElement.textContent = item;
  
    const buttonElement = createEleFunc('button');
    buttonElement.classList.add('remove-item', 'btn-link', 'text-red');
  
    const removeIconElement = createEleFunc('i');
    removeIconElement.classList.add('fa-solid', 'fa-xmark');
    buttonElement.appendChild(removeIconElement);
  
    listItemElement.appendChild(buttonElement);
    itemList.appendChild(listItemElement);
}

// Add Items to the Local Storage
const addItemToStorage = (item) => {
    const itemsFromStorage = getItemsFromLocalStorge();
    
    //Add new item to Array
    itemsFromStorage.push(item);

    //Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

// Get Items to the Local Storage
const getItemsFromLocalStorge = () => {
    let itemsFromStorage;
    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    }else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

const removeItemFromStorage =(item) => {
    //Array of items from Storage is being mapped to variable
    let itemsFromStorge = getItemsFromLocalStorge();

    //Filter items that aren't item that was passed in
    itemsFromStorge = itemsFromStorge.filter((i) => i !== item);

    //Reset to localStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorge));
}

const setItemToEdit = (item) => {
    isEditMode = true;
    itemList
        .querySelectorAll("li")
        .forEach((i) => i.classList.remove('edit-mode'));

    item.className = "edit-mode";
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = "#228822";
    addItemsInput.value = item.textContent;
}

//Event Listeners

addItemsInput.addEventListener("change", (e) => {
    itemContent = e.target.value
})

addItemBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if(addItemsInput.value === "") {
        alert("Please enter an item")
    }else{
        //check for edit mode
        if(isEditMode) {
            const itemtoEdit = itemList.querySelector('.edit-mode');
            removeItemFromStorage(itemtoEdit.textContent);
            itemtoEdit.classList.remove('edit-mode');
            itemtoEdit.remove();
        }
        // Adds item to list
        createItemBtn(itemContent);
    }

    //clears input after item is  added to list
    addItemsInput.value = ''
   
    //add item to local Storage
    addItemToStorage(itemContent)

    checkUI();
    
})

removeBtn.addEventListener('click', (e) => {

    const text = e.target.parentElement.parentElement.innerText;

    if(e.target.tagName === 'I'){
        if(confirm("Are you sure you want to delete this item")) {
            e.target.parentElement.parentElement.remove()
        }
    }else{
        setItemToEdit(e.target);
    }
    removeItemFromStorage(text);

    checkUI();
});

clearAllBtn.addEventListener('click', (e) => {
    const clearItems = document.querySelectorAll('.items li');
    document.querySelector('.filter').style.display = "none";
    clearItems.forEach(item => item.remove());
    clearAllBtn.style.display = "none";
    localStorage.clear();
})

filterElement.addEventListener('input', (e) => {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if(itemName.indexOf(text) != -1) {
            item.style.display = "flex";
        }else {
            item.style.display = "none";
        }
    })
})

document.addEventListener("DOMContentLoaded", displayItems);

checkUI();