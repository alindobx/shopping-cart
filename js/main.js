//Selectors
const form = document.getElementById('item-form');
const formImput = document.querySelector('.form-input');
const formBtn = document.querySelector('.btn');
const itemList = document.getElementById('item-list');

//Create Button UI



//Global Functions
const createEleFunc = (element) => {
    return document.createElement(element);
}

const createDiv = createEleFunc('li');
const createBtnEle = createEleFunc('button');
const createIconEle = createEleFunc('i');

const itemBtn = (item) => {
    //add class to createBtnEle
    createBtnEle.classList.add("remove-item", "btn-link", "text-red");
    createIconEle.classList.add("fa-solid", "fa-xmark");
    createDiv.appendChild(document.createTextNode(item))
    createBtnEle.appendChild(createIconEle);
    createDiv.appendChild(createBtnEle);
    itemList.appendChild(createDiv);
}

itemBtn('beer');


//Event Listeners
formBtn.addEventListener('click', (e) => {
    e.preventDefault();



    
})
