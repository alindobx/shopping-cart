//Selectors
const form = document.getElementById('item-form');
const addItemsInput = document.querySelector('.form-input');
const addItemBtn = document.querySelector('.btn');
const itemList = document.getElementById('item-list');
const removeBtn = document.querySelector("ul");
const clearAllBtn = document.querySelector('.btn-clear');
const filterElement = document.querySelector('.filter');
const filterInput = document.querySelector('.form-input-filter');
let itemContent;

//Global Functions
const createEleFunc = (element) => {
    return document.createElement(element);
}

const checkUI = () => {
    const items = document.querySelectorAll('li');
    console.log(items)
    if (items.length === 0) {
        clearAllBtn.style.display = "none";
        filterElement.style.display = "none";
    }else {
        clearAllBtn.style.display = "block";
        filterElement.style.display = "block";
    }
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

const addItemToStorage = (item) => {
    let itemsFromStorage;
    if(localStorage.getItem('items') === null ){
        itemsFromStorage = [];
    }else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    itemsFromStorage.push(item);

    //Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}


//Event Listeners

addItemsInput.addEventListener("change", (e) => {
    itemContent = e.target.value
})

addItemBtn.addEventListener('click', (e) => {
    e.preventDefault();

    console.log("imput",itemContent);

    if(itemContent === undefined) {
        alert("Please enter an item")
    }else{
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
    if(e.target.tagName === 'I'){
        if(confirm("Are you sure you want to delete this item")) {
            e.target.parentElement.parentElement.remove()
        }    
    }
    checkUI();
});

clearAllBtn.addEventListener('click', (e) => {
    const clearItems = document.querySelectorAll('.items li');
    document.querySelector('.filter').style.display = "none";
    clearItems.forEach(item => item.remove());
    clearAllBtn.style.display = "none";
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

    console.log(text);
})

checkUI();