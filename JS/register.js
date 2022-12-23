let containerDiv = document.getElementById("container");
function renderPage() {
  let data = "";
  data += `
    `;
  containerDiv.innerHTML = data;
}

let showPasswordBtn = document.getElementById("showPassword");
function showPassword() {
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}
showPasswordBtn.addEventListener("click", showPassword);

let showCfPasswordBtn = document.getElementById("showCfPassword");
function showCfPassword() {
  if (cfpassword.type === "password") {
    cfpassword.type = "text";
  } else {
    cfpassword.type = "password";
  }
}
showCfPasswordBtn.addEventListener("click", showCfPassword);

let email = document.getElementById("email");
let message = document.getElementById("alert");
function validateEmail() {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let keyid = false;
  if (email.value.match(mailformat) && email.value != "") {
    message.innerHTML = "";
    keyid = true;
  } else {
    email.focus();
    message.innerHTML = "Your email is invalid";
    message.style.color = "red";
    message.style.fontSize = 12 + "px";
  }
  return keyid;
}
email.addEventListener("keyup", validateEmail);

let password = document.getElementById("password");
let invalidpsw = document.getElementById("invalidpsw");
function validatePassword() {
  let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  let keypsw = false;
  if (password.value.match(passw) && password.value != "") {
    invalidpsw.innerHTML = "";
    keypsw = true;
  } else {
    password.focus();
    invalidpsw.innerHTML =
      "Your password has to have an Uppercase and a Number";
    invalidpsw.style.color = "red";
    invalidpsw.style.fontSize = 12 + "px";
  }
  return keypsw;
}
password.addEventListener("keyup", validatePassword);

var cfpassword = document.getElementById("cfpassword");
var cfmessage = document.getElementById("cfmessage");

function confirmPassword() {
  let keycf = false;
  console.log("1111");
  if (password.value === cfpassword.value) {
    cfmessage.innerHTML = "";
    keycf = true;
  } else {
    cfpassword.focus();
    cfmessage.innerHTML = "Your password is not right!";
    cfmessage.style.color = "red";
    cfmessage.style.fontSize = 12 + "px";
  }
  return keycf;
}
cfpassword.addEventListener("keyup", confirmPassword);

let btn = document.getElementById("summit");
let security = document.getElementById("security");
function checkAll() {
  let flag = false;
  let listUser = localStorage.getItem("listUser");
  if (
    listUser == null &&
    confirmPassword() == true &&
    validatePassword() == true &&
    validateEmail() == true &&
    email.value != "" &&
    password.value != ""
  ) {
    listUser = [];
    let obj = {
      email: email.value,
      password: password.value,
      security: security.value,
      permission: "active",
      id: listUser.length,
    };
    listUser.push(obj);
    localStorage.setItem("listUser", JSON.stringify(listUser));
    window.location.href = "Login.html";
  } else if (
    listUser != null &&
    confirmPassword() == true &&
    validatePassword() == true &&
    validateEmail() == true &&
    email.value != "" &&
    password.value != ""
  ) {
    listUser = JSON.parse(listUser);
    let obj = {
      email: email.value,
      password: password.value,
      security: security.value,
      permission: "active",
      id: listUser.length,
    };
    for (let i = 0; i < listUser.length; i++) {
      if (listUser[i].email == obj.email) {
        flag = true;
        break;
      }
    }
    if (flag == false) {
      let obj = {
        email: email.value,
        password: password.value,
        security: security.value,
        permission: "active",
        id: listUser.length,
      };
      listUser.push(obj);
      localStorage.setItem("listUser", JSON.stringify(listUser));
      window.location.href = "Login.html";
    } else {
      message.innerHTML = "Your email has already been registed";
      message.style.color = "red";
      message.style.fontSize = 12 + "px";
    }
  }
}
btn.addEventListener("click", checkAll);
