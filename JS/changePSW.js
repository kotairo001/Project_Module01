let containerDiv = document.getElementById("container");
function renderPage() {
  let data = "";
  data += `
    <h2>Change Password</h2>
    <label for="email">Email:</label><br>
    <input type="email" name="email" id="email" required><br>
    <div id="alert"></div>
    <label for="oldpsw">Old Password:</label><br>
    <div class="container_password">
        <input type="password" name="oldpsw" id="oldPassword" required>
    </div>
    <input type="checkbox" name="" class="showedPassword" onclick="showOldPassword()">
    <span>Show password </span><br>
    <label for="password">New Password:</label><br>
    <div class="container_password">
        <input type="password" name="password" id="password" required>
    </div>
    <input type="checkbox" name="" class="showedPassword" onclick="showPassword()">
    <span>Show password </span><br>
    <div id="warnMessage"></div>
    <div id="compareMessage"></div>
    <label for="cfpassword">Confirm New Password:</label><br>
    <div class="container_password">
        <input type="password" name="cfpassword" id="confirmPassword" required>
    </div>
    <input type="checkbox" name="" class="showedPassword" onclick="showCfPassword()">
    <span>Show password </span><br>
    <div id="alertCfMessage"></div>
    <div class="btn">
        <button id="saveChange">Save Change</button>
    </div>
    `;
  containerDiv.innerHTML = data;
}
renderPage();

let oldPassword = document.getElementById("oldPassword");
function showOldPassword() {
  if (oldPassword.type === "password") {
    oldPassword.type = "text";
  } else {
    oldPassword.type = "password";
  }
}

let password = document.getElementById("password");
function showPassword() {
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

let confirmPw = document.getElementById("confirmPassword");
function showCfPassword() {
  if (confirmPw.type === "password") {
    confirmPw.type = "text";
  } else {
    confirmPw.type = "password";
  }
}

let email = document.getElementById("email");
let message = document.getElementById("alert");
function checkEmail() {
  let keyid = false;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.value.match(mailformat)) {
    message.innerHTML = "";
    keyid = true;
  } else {
    email.focus();
    message.innerHTML = "Your email is not right!";
    message.style.color = "red";
    message.style.fontSize = 13 + "px";
  }
  return keyid;
}
email.addEventListener("keyup", checkEmail);

var warnMessage = document.getElementById("warnMessage");
function validatePassword() {
  let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  let keypsw = false;
  if (password.value.match(passw) && password.value != "") {
    warnMessage.innerHTML = "";
    keypsw = true;
  } else {
    password.focus();
    warnMessage.innerHTML =
      "Your password has to have an Uppercase and a Number";
    warnMessage.style.color = "red";
    warnMessage.style.fontSize = 12 + "px";
  }
  return keypsw;
}
password.addEventListener("keyup", validatePassword);

let compareMessage = document.getElementById("compareMessage")
function comparePassword() {
  let flag = false;
  if(password.value != oldPassword.value) {
    flag = true;
    compareMessage.innerHTML = "";
  } else {
    flag = false;
    password.focus();
    compareMessage.innerHTML =
      "Your old password has to be different from the new one";
      compareMessage.style.color = "red";
      compareMessage.style.fontSize = 12 + "px";
  }
  return flag
}
password.addEventListener("change", comparePassword);

let alertCfMessage = document.getElementById("alertCfMessage");
function confirmPassword() {
  let keycf = false;
  if (password.value === confirmPw.value) {
    alertCfMessage.innerHTML = "";
    keycf = true;
  } else {
    confirmPw.focus();
    alertCfMessage.innerHTML = "Your password is not right!";
    alertCfMessage.style.color = "red";
    alertCfMessage.style.fontSize = 12 + "px";
  }
  return keycf;
}
confirmPw.addEventListener("keyup", confirmPassword);

let saveChange = document.getElementById("saveChange");
function checkUser() {
  let listUser = JSON.parse(localStorage.getItem("listUser"));
  if (listUser != null) {
    for (i = 0; i < listUser.length; i++) {
      if (
        email.value == listUser[i].email &&
        oldPassword.value == listUser[i].password &&
        checkEmail() == true &&
        validatePassword() == true &&
        confirmPassword() == true &&
        comparePassword() == true
      ) {
        listUser[i].password = password.value;
        localStorage.setItem("listUser",JSON.stringify(listUser))
        window.location = "/index_new.html"
      } else {
        alertCfMessage.innerHTML = "Your email or password is wrong";
        alertCfMessage.style.color = "red";
        alertCfMessage.style.fontSize = 15 + "px";
      }
    }
  } else {
    alert("You don't have account yet. Please sign up");
    window.location = "./register.html";
  }
}
saveChange.addEventListener("click", checkUser);

// let registerBtn = document.getElementById("registerBtn");
// registerBtn.addEventListener("click", () => {
//   window.location = "./register.html";
// });
