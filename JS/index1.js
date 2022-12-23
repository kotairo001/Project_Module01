var menuButton = document.getElementById("menuBtn");
var signInBtn = document.getElementById("signInBtn");
var signUpBtn = document.getElementById("signUpBtn");

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
  }
}
window.addEventListener("load", keepLogin);

let account = document.getElementById("account");
function showAccount() {
  let loginAcount = JSON.parse(localStorage.getItem("loginAcount"));
  if (checkLogin() == true && signInBtn.innerHTML == "Log out") {
    for (i = 0; i < loginAcount.length; i++) {
      account.innerHTML = `
      <a><p id="accountText">${loginAcount[i].email}</p></a>
      `;
    }
  } else {
    account.innerHTML = "";
  }
}
showAccount();
window.addEventListener("load", showAccount);

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
    window.location.href = "./index_new.html";
  }
});

signUpBtn.addEventListener("click", function () {
  window.location.href = "Register.html";
});
menuButton.addEventListener("click", function () {
  if (menuList.style.display === "none") {
    menuList.style.display = "block";
  } else {
    menuList.style.display = "none";
  }
});

let favContainer = document.getElementById("favouriteContainer");
let favList = JSON.parse(localStorage.getItem("listFavourite"));
function renderFavList(list) {
  let data = `
    <table id="favourite_list">
        <tr>
            <th>NO.</th>
            <th>Picture</th>
            <th>Name</th>
            <th>Option</th>
        </tr>
`;
  for (i = 0; i < list.length; i++) {
    data += `
    <tr>
        <td>${i + 1}</td>
        <td><img src="${list[i].image}" alt=""></td>
        <td>${list[i].name}</td>
        <td><button onclick="deleteFav(${i})">Delete</button></td>
    </tr>
    `;
  }
  data += "</table>";
  favContainer.innerHTML = data;
}
// renderFavList(favList);

function showFavList() {
  let favList = JSON.parse(localStorage.getItem("listFavourite"));
  if (checkLogin() == true && signInBtn.innerHTML == "Log out") {
    renderFavList(favList);
  }
}
showFavList();
window.addEventListener("load", showFavList);

function deleteFav(i) {
  favList.splice(i, 1);
  localStorage.setItem("listFavourite", JSON.stringify(favList));
  let deleteFavList = JSON.parse(localStorage.getItem("listFavourite"));
  renderFavList(deleteFavList);
  if (deleteFavList.length == 0) {
    localStorage.removeItem("listFavourite");
  }
}
