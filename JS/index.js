let signUpBtn = document.getElementById("signUpBtn");
let signInBtn = document.getElementById("signInBtn");
signUpBtn.addEventListener("click", function () {
  window.location.href = "./page/Register.html";
});

signInBtn.addEventListener("click", () => {
  if (signInBtn.innerHTML == "Sign in") {
    window.location.href = "./page/Login.html";
  }
});
function checkLogin() {
  let loginAcount = JSON.parse(localStorage.getItem("loginAcount"));
  let flag = false;
  if (loginAcount == null) {
    flag = false;
  } else {
    for (i = 0; i < loginAcount.length; i++) {
      if (loginAcount[i].status == true) {
        flag = true;
      }
    }
  }
  return flag;
}

function keepLogin() {
  if (checkLogin() == true) {
    signInBtn.innerHTML = "Log out";
    signUpBtn.style.display = "none"
  }
}
let menuBtn = document.getElementById("menuBtn");
let menuList = document.getElementById("menuList");
function showMenuList() {
  if (menuList.style.display == "none") {
    menuList.style.display = "block";
  } else {
    menuList.style.display = "none";
  }
}
menuBtn.addEventListener("click", showMenuList);

function logIn() {
  let loginAcount = JSON.parse(localStorage.getItem("loginAcount"));
  if (loginAcount != null) {
    for (let i = 0; i < loginAcount.length; i++) {
      if (loginAcount[i].status == true) {
        signInBtn.innerHTML = "Log out";
        // loginAcount[i].status = false;
        localStorage.setItem("loginAcount", JSON.stringify(loginAcount));
      } else {
        signInBtn.innerHTML = "Sign in";
      }
    }
  } else {
    signInBtn.innerHTML = "Sign in";
  }
}
logIn();

signInBtn.addEventListener("click", () => {
  if (signInBtn.innerHTML == "Log out") {
    let loginAcount = JSON.parse(localStorage.getItem("loginAcount"));
    if (loginAcount != null) {
      for (let i = 0; i < loginAcount.length; i++) {
        if (loginAcount[i].status == true) {
          signInBtn.innerHTML = "Sign in";
          loginAcount[i].status = false;
          localStorage.setItem("loginAcount", JSON.stringify(loginAcount));
        }
      }
    }
    window.location.href = "index.html";
  }
});

window.addEventListener("load", keepLogin);
let listOfProduct = JSON.parse(localStorage.getItem("listProduct"));
let containerDiv = document.getElementById("content__top");
function renderListProduct(list) {
  let data = "";
  for (i = 0; i < list.length; i++) {
    data += `
        <div class="content__top--1">
            <img src="${list[i].image}" alt="">
            <div class="content-btn">
              <button class="favBtn" onclick="addFavourite(${i})">
                <i class="fa-solid fa-heart"></i>
              </button>
              <button class="cartBtn" onclick="addCart(${i})">
                <i class="fa-solid fa-cart-shopping"></i>
              </button>
              <button class="detailBtn" onclick="showPopup(${i})">
                <i class="fa-solid fa-circle-info"></i>
              </button>
            </div>
            <a href="">
                <p class="content-product">${list[i].name}</p>
            </a>
            <p>Price: ${list[i].price} $</p>
        </div>
        `;
  }
  containerDiv.innerHTML = data;
}
renderListProduct(listOfProduct);

let popupWrap = document.getElementById("popup__wrap");
let popup = document.getElementById("content__popup");
function showPopup(i) {
  let data = "";
  data += `
  <div class="content__popup--img">
      <img src="${listOfProduct[i].image}" alt=""/>
  </div>
  <div class="content__popup--text">
    <p>Name: ${listOfProduct[i].name}</p>
    <p>Price: ${listOfProduct[i].price}$</p>
    <p> Details: <br>
      So if I have two pieces of cake, do I have twice as   an
      experience as the first piece of cake? One of the th  I've
      found in life is that the first piece of cake is the best.
    </p>
  </div>
  <div class="popup__closeBtn">
    <button onclick="closePopup()"><i class="fa-solid fa-x"></i></button>
  </div>
  `;
  popup.innerHTML = data;
  if (popupWrap.style.display === "none") {
    popupWrap.style.display = "block";
  } else {
    popupWrap.style.display = "none";
  }
}

function closePopup() {
  if (popupWrap.style.display === "block") {
    popupWrap.style.display = "none";
  } else {
    popupWrap.style.display = "block";
  }
}

// let mainPhoto = document.getElementById("mainPhoto");
// function slideImage() {
//   let arrayImage = [
//     "/img/top-img1.webp",
//     "/img/top-img2.webp",
//     "/img/top-ing.jpg",
//   ];
//   mainPhoto.src = arrayImage[Math.floor(Math.random() * 3)];
// }
// setInterval(slideImage, 5000);

let account = document.getElementById("account");
function showAccount() {
  let loginAcount = JSON.parse(localStorage.getItem("loginAcount"));
  let data = "";
  if (checkLogin() == true && signInBtn.innerHTML == "Log out") {
    for (i = 0; i < loginAcount.length; i++) {
      data += `
      <p id="accountText">${loginAcount[i].email}</p>
      `;
    }
    account.innerHTML = data;
  } else {
    account.innerHTML = "";
  }
}
showAccount();
window.addEventListener("load", showAccount);

let accountText = document.getElementById("accountText");
let accountMenu = document.getElementById("accountMenu");
function showAccountMenu() {
  console.log(accountText);
  if (accountMenu.style.display == "none") {
    accountMenu.style.display = "block";
  } else {
    accountMenu.style.display = "none";
  }
}
account.addEventListener("click", showAccountMenu);

var favBtn = document.getElementsByClassName("favBtn");
function addFavourite(i) {
  let loginAcount = JSON.parse(localStorage.getItem("loginAcount"));

  if (checkLogin() == true && signInBtn.innerHTML == "Log out") {
    let listFav = JSON.parse(
      localStorage.getItem(`listFav${loginAcount[0].email}`)
    );
    if (listFav == null) {
      listAddFav = [];
      listAddFav.push(listOfProduct[i]);
      localStorage.setItem(
        `listFav${loginAcount[0].email}`,
        JSON.stringify(listAddFav)
      );
      favBtn[i].style.backgroundColor = "rgb(170,135,142)";
    } else {
      let listFav = JSON.parse(
        localStorage.getItem(`listFav${loginAcount[0].email}`)
      );
      let flag = true;
      for (j = 0; j < listFav.length; j++) {
        if (listFav[j].id == listOfProduct[i].id) {
          flag = false;
          listFav.splice(j, 1);
          console.log(listOfProduct[i]);
          break;
        }
      }
      if (flag == false) {
        localStorage.setItem(
          `listFav${loginAcount[0].email}`,
          JSON.stringify(listFav)
        );
        favBtn[i].style.backgroundColor = "rgb(213, 169, 179)";
      } else {
        listFav.push(listOfProduct[i]);
        localStorage.setItem(
          `listFav${loginAcount[0].email}`,
          JSON.stringify(listFav)
        );
        favBtn[i].style.backgroundColor = "rgb(170,135,142)";
      }
    }
    let lastFavList = JSON.parse(
      localStorage.getItem(`listFav${loginAcount[0].email}`)
    );
    if (lastFavList.length == 0) {
      localStorage.removeItem(`listFav${loginAcount[0].email}`);
    }
  } else {
    alert("You haven't login yet!");
  }
}

//TODO ShowFavourite on loading page
function showFavourite() {
  if (checkLogin() == true) {
    let loginAcount = JSON.parse(localStorage.getItem("loginAcount"));
    let favList = JSON.parse(
      localStorage.getItem(`listFav${loginAcount[0].email}`)
    );
    for (i = 0; i < favList.length; i++) {
      favBtn[favList[i].id].style.backgroundColor = "rgb(170,135,142)";
    }
  }
}
window.addEventListener("load", showFavourite);

//TODO Cart
let total = 0;
function addCart(i) {
  let loginAcount = JSON.parse(localStorage.getItem("loginAcount"));
  let ownerCart;
  let orderedList;
  if(loginAcount!=null) {
  for (j = 0; j < localStorage.length; j++) {
    ownerCart = localStorage.key(j);
    if (ownerCart == loginAcount[0].email) {
      orderedList = JSON.parse(localStorage.getItem(`${ownerCart}`));
      break;
    }
  }}
  if (checkLogin() == true && signInBtn.innerHTML == "Log out") {
    let listCart = JSON.parse(
      localStorage.getItem(`listCart${loginAcount[0].id}`)
    );
    if (orderedList == null) {
      if (listCart == null) {
        listCart = [];
        listCart.push(listOfProduct[i]);
        localStorage.setItem(
          `listCart${loginAcount[0].id}`,
          JSON.stringify(listCart)
        );
        alert("You have add " + ++total + " product(s) to cart");
      } else {
        let flag = true;
        for (j = 0; j < listCart.length; j++) {
          if (listCart[j].id == listOfProduct[i].id) {
            flag = false;
            // count++;
            listCart[j].count++;
            break;
          }
        }
        if (flag == false) {
          localStorage.setItem(
            `listCart${loginAcount[0].id}`,
            JSON.stringify(listCart)
          );
          alert("You have add " + ++total + " product(s) to cart");
        } else {
          listCart.push(listOfProduct[i]);
          localStorage.setItem(
            `listCart${loginAcount[0].id}`,
            JSON.stringify(listCart)
          );
          alert("You have add " + ++total + " product(s) to cart");
        }
      }
    } else {
      alert(
        "You have already order just now." +
          " Please wait at least 1 day to take more order. "
      );
    }
  } else {
    alert("You haven't login yet!");
  }
}
