// Select element from html
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var addBtn = document.getElementById("addBtn");
var inputs = document.getElementsByClassName("form-control");
var searchInput = document.getElementById("searchInput")
var nameError = document.getElementById("nameError");


// Array to store products
var products = [];
var currentIndex=0;

// Get item from local storage with if condition
if (JSON.parse(localStorage.getItem("products")) != null) {
    products = JSON.parse(localStorage.getItem("products"));
    displayProducts();
}

// Function to add product
function addProduct() {
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        description: productDescription.value
    };
    products.push(product);

    //storing data in local storage
    localStorage.setItem("products", JSON.stringify(products));
}

// Function to display products
function displayProducts() {
    var cartona = ``;
    for(var i=0; i<products.length; i++) {
        cartona+=`
        <tr>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].description}</td>
            <td> <button onclick="getProduct(${i})" class="btn btn-success">Update</button></td>
            <td> <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td> 
        </tr>`
    }

    document.getElementById("tbody").innerHTML = cartona;

}

// add event listener to add product button
addBtn.onclick = function () {
    if (addBtn.innerHTML=="Add Product") {
            addProduct();
        }
    else{
        updateProduct();
    }
    displayProducts();
    clearInputs();
    addBtn.setAttribute("disabled", true);
    console.log(products);

};

// clear input fields function
function clearInputs() {
    for(var i=0; i<inputs.length; i++) {
        inputs[i].value = "";
    }
}

// delete product function
function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}

// Search product function
searchInput.onkeyup = function() {
    var cartona = ``;
    for(var i=0; i<products.length; i++)
        if(products[i].name.toLowerCase().includes(searchInput.value.toLowerCase()))
        {
        cartona+=`
        <tr>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].description}</td>
            <td> <button onclick="getProduct(${i})" class="btn btn-success">Update</button></td>
            <td> <button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td> 
        </tr>`
    }
    document.getElementById("tbody").innerHTML = cartona;
}

// Update product function (to be implemented)

function getProduct(index) {
    currentIndex=index;
    var currantProduct=products[index]

    productName.value=currantProduct.name;
    productPrice.value=currantProduct.price;
    productCategory.value=currantProduct.category;
    productDescription.value=currantProduct.description;
    addBtn.innerHTML="Update Product"
}

function updateProduct(){
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        description: productDescription.value
    };
    products[currentIndex]=product;
    localStorage.setItem("products", JSON.stringify(products));
    addBtn.innerHTML="Add Product";
}

// Apply regex on CRUD inputs

function valid(input, errorElem) {
    addBtn.removeAttribute("disabled");
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    errorElem.classList.remove("d-block");
    errorElem.classList.add("d-none");
}

function invalid(input, errorElem) {
    addBtn.setAttribute("disabled", true);
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    errorElem.classList.add("d-block");
    errorElem.classList.remove("d-none");
}

//    // Product Name Regex
productName.onkeyup = function () {
    var nameRegex = /^[A-Z][a-z]{2,8}$/;
    if (nameRegex.test(productName.value)) {
        valid(productName, nameError);
    } else {
    invalid(productName, nameError);
    }
}

// Product Price Regex
productPrice.onkeyup = function(){
    var numberRegex = /(^[1-9][0-9]*$)/;
    if (numberRegex.test(productPrice.value)) {
        valid(productPrice, numberError);
    } else {
    invalid(productPrice, numberError);
    }
}

// Product Category Regex
productCategory.onkeyup = function(){
    var categoryRegex = /(^[a-z]{5,}$)/;
    if (categoryRegex.test(productCategory.value)) {
        valid(productCategory, categoryError);
    } else {
        invalid(productCategory, categoryError);
    }
}

// Product Dec Regex
productDescription.onkeyup = function(){
    var descRegex = /^(.|\s)*[a-zA-Z]+(.|\s)*$/;
    if (descRegex.test(productDescription.value)) {
        valid(productDescription, descriptionError);
    } else {
        invalid(productDescription, descriptionError);
    }
}  




