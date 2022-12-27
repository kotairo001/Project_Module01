let containerDiv = document.getElementById("container");
function renderPage() {
  let data = "";
  data += `
    <h2>Login</h2>
    <label for="email">Email:</label><br>
        <input type="email" name="email" id="email" required><br>
        <div id="alert"></div>
        <label for="psw">Password:</label><br>
        <div class="container_password">
            <input type="password" name="password" id="password" required>
        </div>
        <input type="checkbox" name="" class="showedPassword" id="showedPassword">
        <span>Show password </span><br>
        <div class="forgotPsw"><a href="/page/fogotPsw.html">Fogot password</a></div>
        <div id="warnMessage"></div>
    <div class="btn">
        <button id="loginBtn">Login</button>
        <button id="registerBtn">Register</button>
        <button id="adminBtn">To Admin</button>
    </div>
    `;
  containerDiv.innerHTML = data;
}
renderPage();
let password = document.getElementById("password");
let passwordCheckbox = document.getElementById("showedPassword");
function showPassword() {
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}
passwordCheckbox.addEventListener("click", showPassword);

var email = document.getElementById("email");
var message = document.getElementById("alert");
var warnMessage = document.getElementById("warnMessage");
let keyid = false;

function checkEmail() {
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
}
email.addEventListener("keyup", checkEmail);

//new LoginAccount(email.value, password.value, true)
let loginBtn = document.getElementById("loginBtn");
function checkLogin() {
  let flag = false;
  let check = false;
  let storage = JSON.parse(localStorage.getItem("listUser"));
  if (storage != null) {
    for (i = 0; i < storage.length; i++) {
      if (
        email.value == storage[i].email &&
        password.value == storage[i].password
      ) {
        flag = true;
        if (
          storage[i].permission == "Active" ||
          storage[i].permission == "active"
        ) {
          check = true;
          arrLoginAccount = [];
          let loginaccount = {
            email: email.value,
            password: password.value,
            status: true,
            id: storage[i].id,
          };
          arrLoginAccount.push(loginaccount);
          localStorage.setItem("loginAcount", JSON.stringify(arrLoginAccount));
          warnMessage.innerHTML = "";
          window.location = "/index.html";
          break;
        }
      }
    }
    if (flag == false) {
      warnMessage.innerHTML = "Your email or password is wrong";
      warnMessage.style.color = "red";
      warnMessage.style.fontSize = 15 + "px";
    } else if (check == false) {
      alert("Your account has been banned. Please contact admin for detail");
      warnMessage.innerHTML = "";
    }
  } else {
    alert("You don't have account yet. Please sign up");
    window.location = "../page/Register.html";
  }
}
loginBtn.addEventListener("click", checkLogin);

let registerBtn = document.getElementById("registerBtn");
registerBtn.addEventListener("click", () => {
  window.location = "../page/Register.html";
});

let adminBtn = document.getElementById("adminBtn");
adminBtn.addEventListener("click", () => {
  window.location.href = "../page/login_control.html";
});
