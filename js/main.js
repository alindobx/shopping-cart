//Selectors
const form = document.getElementById('item-form');
const formInput = document.querySelector('.form-input');
const formBtn = document.querySelector('.btn');
const itemList = document.getElementById('item-list');
const removeBtn = document.querySelector("ul");


//Global Functions
const createEleFunc = (element) => {
    return document.createElement(element);
}

const addItemBtn = (item) => {
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


//Event Listeners
let itemContent;
formInput.addEventListener("change", (e) => {
    itemContent = e.target.value
})

formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addItemBtn(itemContent);
})

removeBtn.addEventListener('click', (e) => {
    if(e.target.tagName === 'I'){
    e.target.parentElement.parentElement.remove()
    }
});