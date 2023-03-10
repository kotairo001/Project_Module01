var menuButton = document.getElementById("menuBtn");
var signInBtn = document.getElementById("signInBtn");
var signUpBtn = document.getElementById("signUpBtn");
let loginAcount = JSON.parse(localStorage.getItem("loginAcount"));

signUpBtn.addEventListener("click", function () {
  window.location.href = "../page/Register.html";
});

signInBtn.addEventListener("click", () => {
  if (signInBtn.innerHTML == "Sign in") {
    window.location.href = "../page/Login.html";
  }
});
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
    window.location.href = "/index.html";
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


let menuList = document.getElementById("menuList");
menuButton.addEventListener("click", function () {
  if (menuList.style.display === "none") {
    menuList.style.display = "block";
  } else {
    menuList.style.display = "none";
  }
});


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

let favContainer = document.getElementById("favouriteContainer");
let favList = JSON.parse(
  localStorage.getItem(`listFav${loginAcount[0].email}`)
);
function renderFavList(list) {
  if (checkLogin() == true) {
    let data = `
  <h2>Favourite List</h2>
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
}
renderFavList(favList);

function showFavList() {
  let favList = JSON.parse(
    localStorage.getItem(`listFav${loginAcount[0].email}`)
  );
  if (checkLogin() == true && signInBtn.innerHTML == "Log out") {
    renderFavList(favList);
  }
}
showFavList();
window.addEventListener("load", showFavList);

function deleteFav(i) {
  favList.splice(i, 1);
  localStorage.setItem(
    `listFav${loginAcount[0].email}`,
    JSON.stringify(favList)
  );
  let deleteFavList = JSON.parse(
    localStorage.getItem(`listFav${loginAcount[0].email}`)
  );
  renderFavList(deleteFavList);
  if (deleteFavList.length == 0) {
    localStorage.removeItem(`listFav${loginAcount[0].email}`);
  }
}
