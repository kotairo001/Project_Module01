let containerDiv = document.getElementById("container");
function renderPage() {
  let data = "";
  data +=`
    <h2>Login For Administrator</h2>
    <label for="email">Email:</label><br>
        <input type="email" name="email" id="email" required><br>
        <div id="alert"></div>
        <label for="psw">Password:</label><br>
        <div class="container_password">
            <input type="password" name="password" id="password" required>
        </div>
        <input type="checkbox" name="" class="showedPassword" id="showedPassword">
        <span>Show password</span><br>
        <div id="warnMessage"></div>
    <div class="btn">
        <button id="loginBtn">Login</button>
    </div>
    `;
    containerDiv.innerHTML=data;
}
renderPage()
let password = document.getElementById("password");
let passwordCheckbox = document.getElementById("showedPassword")
function showPassword() {
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}
passwordCheckbox.addEventListener("click",showPassword)

function addAdminAccount () {
  let adminAccount = {
    email: "admin@gmail.com",
    password: 1234567,
    status: true,
  };
  let listAdmin = [];
  listAdmin.push(adminAccount);
  localStorage.setItem("adminAccount",JSON.stringify(listAdmin));
}
window.addAdminAccount("load",addAdminAccount)

let email = document.getElementById("email");
let message = document.getElementById("alert");
let warnMessage = document.getElementById("warnMessage");
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
email.addEventListener("keyup",checkEmail)

let loginBtn = document.getElementById("loginBtn")
function checkLogin() {
  let adminAccount = JSON.parse(localStorage.getItem("adminAccount"));
  console.log(adminAccount[0].email)
      if (
        email.value == adminAccount[0].email &&
        password.value == adminAccount[0].password
      ) {
        window.location = "./control.html";
      } else {
        warnMessage.innerHTML = "Your email or password is wrong";
        warnMessage.style.color = "red";
        warnMessage.style.fontSize = 15 + "px";
      }
};
loginBtn.addEventListener("click",checkLogin);
