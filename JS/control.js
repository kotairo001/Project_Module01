let userList = JSON.parse(localStorage.getItem("listUser"));
// let data = "";

//TODO Show User
let menuUser = document.getElementById("menuUser");
let menuProduct = document.getElementById("menuProduct");
let userDiv = document.getElementById("userDiv");
function showUserList() {
  if (menuUser.style.display == "none") {
    menuUser.style.display = "block";
    menuProduct.style.display = "none";
    renderUser(userList);
  } else {
    menuUser.style.display = "none";
  }
}
userDiv.addEventListener("click", showUserList);

//TODO Show Product
let productDiv = document.getElementById("productDiv");
// let creatContainer = document.getElementById("creatContainer");
function showProductList() {
  if (menuProduct.style.display == "none") {
    menuProduct.style.display = "block";
    menuUser.style.display = "none";
    renderProduct(listProduct);
    localStorage.removeItem("searchData");
  } else {
    menuProduct.style.display = "none";
  }
}
productDiv.addEventListener("click", showProductList);

//TODO Render User List
function renderUser(list) {
  let data = `
    <table>
    <tr>
        <th>No.</th>
        <th colspan="2">Email</th>
        <th>Password</th>
        <th>Security</th>
        <th>Permission</th>
        <th>Action</th>

    </tr>
`;
  for (i = 0; i < list.length; i++) {
    data += `
    <tr>
        <td>${i + 1}</td>
        <td colspan="2">${list[i].email}</td>
        <td>${list[i].password}</td>
        <td>${list[i].security}</td>
        <td>${list[i].permission}</td>
        <td>
        <button id="banBtn" onclick="activeAccount(${i})">Active</button>
        <button id="banBtn" onclick="inactiveAccount(${i})">Inactive</button>
        </td>
    </tr>
    `;
  }
  data += "</table>";

  menuUser.innerHTML = data;
}
renderUser(userList);

//TODO Active Button
function activeAccount(i) {
  console.log("!11");
  let userList = JSON.parse(localStorage.getItem("listUser"));
  userList[i].permission = "Active";
  localStorage.setItem("listUser", JSON.stringify(userList));
  renderUser(userList);
}

//TODO Inactive Button
function inactiveAccount(i) {
  console.log("!11");
  let userList = JSON.parse(localStorage.getItem("listUser"));
  userList[i].permission = "Inactive";
  localStorage.setItem("listUser", JSON.stringify(userList));
  renderUser(userList);
}

//TODO Render Product List
let nameCreate = document.getElementById("nameCreate");
let imgCreate = document.getElementById("imgCreate");
let priceCreate = document.getElementById("priceCreate");
let catagory = document.getElementById("catagory");
let listProduct = JSON.parse(localStorage.getItem("listProduct"));
function renderProduct(list) {
  let data = `
    <table>
    <tr>
        <th>No.</th>
        <th>Name</th>
        <th>Image</th>
        <th>Price</th>
        <th>Catagory</th>
        <th>Action</th>
    </tr>
  `;
  for (i = 0; i < list.length; i++) {
    data += `
      <tr>
        <td>${i + 1}</td>
        <td>${list[i].name}</td>
        <td >
            <img src="${list[i].image}" alt="">
        </td>
        <td>${list[i].price}$</td>
        <td>${list[i].cata}</td>
        
        <td>
        <button onclick="editProduct(${i})">Edit</button>
        <button onclick="deleteProduct(${list[i].id})">Delete</button>
        </td>
        </tr>
      `;
  }
  data += "</table>";
  menuProduct.innerHTML = data;
}

//TODO Add product to Local
function addProduct() {
  let listProduct = JSON.parse(localStorage.getItem("listProduct"));
  let product;
  if (listProduct == null) {
    listProduct = [];
    product = {
      name: nameCreate.value,
      image: imgCreate.value,
      price: parseInt(priceCreate.value),
      cata: catagory.value,
      id: listProduct.length,
      count: 1
    };
    listProduct.push(product);
    localStorage.setItem("listProduct", JSON.stringify(listProduct));
    nameCreate.value = "";
    imgCreate.value = "";
    priceCreate.value = "";
    catagory.value = "";
    renderProduct(listProduct);
  } else {
    product = {
      name: nameCreate.value,
      image: imgCreate.value,
      price: parseInt(priceCreate.value),
      cata: catagory.value,
      id: listProduct.length,
      count: 1
    };
    listProduct.push(product);
    localStorage.setItem("listProduct", JSON.stringify(listProduct));
    nameCreate.value = "";
    imgCreate.value = "";
    priceCreate.value = "";
    catagory.value = "";
    renderProduct(listProduct);
  }
}
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addProduct);

//TODO Edit Button in table
function editProduct(id) {
  let listProduct = JSON.parse(localStorage.getItem("listProduct"));
  let searchData = JSON.parse(localStorage.getItem("searchData"));
  if (searchData == null) {
    nameCreate.value = listProduct[id].name;
    imgCreate.value = listProduct[id].image;
    priceCreate.value = listProduct[id].price;
    catagory.value = listProduct[id].cata;
    localStorage.setItem("key", JSON.stringify(id));
  } else {
    nameCreate.value = searchData[0].name;
    imgCreate.value = searchData[0].image;
    priceCreate.value = searchData[0].price;
    catagory.value = searchData[0].cata;
  }
}

//TODO update Product
let updateBtn = document.getElementById("updateBtn");
function updateProduct() {
  let searchData = JSON.parse(localStorage.getItem("searchData"));
  let key = JSON.parse(localStorage.getItem("key"));
  let listProduct = JSON.parse(localStorage.getItem("listProduct"));
  if (searchData == null) {
    listProduct[key].name = nameCreate.value;
    listProduct[key].image = imgCreate.value;
    listProduct[key].price = priceCreate.value;
    listProduct[key].cata = catagory.value;
    localStorage.setItem("listProduct", JSON.stringify(listProduct));
    renderProduct(listProduct);
  } else {
    for (i = 0; i < listProduct.length; i++) {
      if (searchData[0].id == listProduct[i].id) {
        listProduct[i].name = nameCreate.value;
        listProduct[i].image = imgCreate.value;
        listProduct[i].price = priceCreate.value;
        listProduct[i].cata = catagory.value;
      }
    }
    localStorage.setItem("listProduct", JSON.stringify(listProduct));
    renderProduct(listProduct);
  }
  localStorage.removeItem("searchData");
  nameCreate.value = "";
  imgCreate.value = "";
  priceCreate.value = "";
  catagory.value = "";
}
updateBtn.addEventListener("click", updateProduct);

//TODO Delete Product
function deleteProduct(i) {
  let listProduct = JSON.parse(localStorage.getItem("listProduct"));
  listProduct.splice(i, 1);
  renderProduct(listProduct);
  for (j = 0; j < listProduct.length; j++) {
    listProduct[j].id = j;
  }
  localStorage.setItem("listProduct", JSON.stringify(listProduct));
}

//TODO Search product
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
function searchProduct() {
  let listProduct = JSON.parse(localStorage.getItem("listProduct"));
  if (menuProduct.style.display == "block") {
    let searchValue = searchInput.value.toLowerCase();
    let data = [];
    for (i = 0; i < listProduct.length; i++) {
      if (listProduct[i].name.toLowerCase().indexOf(searchValue) != -1) {
        data.push(listProduct[i]);
        searchInput.value = "";
      }
    }
    localStorage.setItem("searchData", JSON.stringify(data));
    renderProduct(data);
  }
}
// searchInput.addEventListener("keyup", searchProduct);
searchBtn.addEventListener("click", searchProduct);

//TODO Search User
function searchUser() {
  let listUser = JSON.parse(localStorage.getItem("listUser"));
  if (menuUser.style.display == "block") {
    let searchValue = searchInput.value.toLowerCase();
    let dataUser = [];
    for (i = 0; i < listUser.length; i++) {
      if (listUser[i].email.toLowerCase().indexOf(searchValue) != -1) {
        dataUser.push(listUser[i]);
        searchInput.value = "";
      }
    }
    renderUser(dataUser);
  }
}
// searchInput.addEventListener("keyup", searchUser);
searchBtn.addEventListener("click", searchUser);

let logOutBtn = document.getElementById("logOutBtn");
logOutBtn.addEventListener("click",()=>{
  window.location = "./login_control.html";
})

//TODO Show cart

