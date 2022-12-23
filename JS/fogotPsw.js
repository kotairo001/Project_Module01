let containerDiv = document.getElementById("container");
function renderPage() {
  let data = "";
  data += `
  <h2>Forgot Password</h2>
  <div class="checkContent" id="checkContent">
    <label for="email">Email:</label><br />
    <input type="email" name="email" id="email" required /><br />
    <div id="alert"></div>
    <label for="question">What your favourite pet?</label><br />
    <input type="text" name="question" id="question" required />
    <div class="btn">
      <button id="checkBtn">Check</button>
    </div>
  </div>
<div class="passwordContent" id="passwordContent">
  <label for="newPassword">New password:</label><br />
  <input type="password" name="newPassword" id="nPassword" required />
  <input
    type="checkbox"
    name=""
    class="showedPassword"
    id="showedPassword"
  />
  <span>Show password</span><br />
  <div id="invalidPsw"></div>
  <label for="cfNewPsw">Cofirm password:</label><br />
  <input type="password" name="cfNewPsw" id="cfNPassword" required />
<input
  type="checkbox"
  name=""
  class="showedPassword"
  id="cfNPsw"
/>
<span>Show password </span><br />
<div id="warnMessage"></div>
<div class="btn">
<button id="saveBtn">Save</button>
</div>
</div>
    `;
  containerDiv.innerHTML = data;
}
renderPage();

let nPassword = document.getElementById("nPassword");
let passwordCheckbox = document.getElementById("showedPassword");
function showPassword() {
  if (nPassword.type === "password") {
    nPassword.type = "text";
  } else {
    nPassword.type = "password";
  }
}
passwordCheckbox.addEventListener("click", showPassword);

let cfNPassword = document.getElementById("cfNPassword");
let cfNPsw = document.getElementById("cfNPsw");
function showCfPassword() {
  if (cfNPassword.type === "password") {
    cfNPassword.type = "text";
  } else {
    cfNPassword.type = "password";
  }
}
cfNPsw.addEventListener("click", showCfPassword);

var email = document.getElementById("email");
var message = document.getElementById("alert");
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

let invalidPsw = document.getElementById("invalidPsw");
function validatePassword() {
  let passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  let keypsw = false;
  if (nPassword.value.match(passw) && nPassword.value != "") {
    invalidPsw.innerHTML = "";
    keypsw = true;
  } else {
    nPassword.focus();
    invalidPsw.innerHTML =
      "Your password has to have an Uppercase and a Number";
    invalidPsw.style.color = "red";
    invalidPsw.style.fontSize = 12 + "px";
  }
  return keypsw;
}
nPassword.addEventListener("keyup", validatePassword);

let checkBtn = document.getElementById("checkBtn");
let question = document.getElementById("question");
let passwordContent = document.getElementById("passwordContent");
let checkContent = document.getElementById("checkContent");
function checkQuestion() {
  let listUser = JSON.parse(localStorage.getItem("listUser"));
  let flag = false;
  if (listUser != null) {
    for (i = 0; i < listUser.length; i++) {
      if (
        email.value == listUser[i].email &&
        question.value == listUser[i].security
      ) {
        flag = true;
      } else {
        flag = false;
      }
    }
  } else {
    alert("You don't have account yet. Please sign up");
    window.location = "./register.html";
  }
  if (flag == true) {
    let emailCheck = [];
    emailCheck.push(email.value);
    localStorage.setItem("emailCheck", JSON.stringify(emailCheck));
    passwordContent.style.display = "block";
    checkContent.style.display = "none";
  } else {
    message.innerHTML = "Your email or answer are wrong";
    message.style.color = "red";
    message.style.fontSize = 15 + "px";
  }
}
checkBtn.addEventListener("click", checkQuestion);

let warnMessage = document.getElementById("warnMessage");
function comparePsw() {
  // console.log("122")
  let flag = false;
  if (nPassword.value == cfNPassword.value) {
    flag = true;
    warnMessage = "";
  } else {
    cfNPassword.focus();
    flag = false;
    warnMessage.innerHTML = "Your password has to be the same";
    warnMessage.style.color = "red";
    warnMessage.style.fontSize = 15 + "px";
  }
  return flag;
}
cfNPassword.addEventListener("keyup", comparePsw);

let saveBtn = document.getElementById("saveBtn");
function addNewPsw() {
  let listUser = JSON.parse(localStorage.getItem("listUser"));
  let emailCheck = JSON.parse(localStorage.getItem("emailCheck"));
  let flag = false
  if (comparePsw() == true&&validatePassword()==true) {
    console.log("333");
    for (i = 0; i < listUser.length; i++) {
      if (listUser[i].email === emailCheck[0]) {
        flag = true;
        listUser[i].password = nPassword.value;
        break;
      }
    }
    if(flag) {
      localStorage.setItem("listUser", JSON.stringify(listUser));
      alert("Your password has been updated");
      window.location = "/Login.html"
    }
  }
}
saveBtn.addEventListener("click", addNewPsw);
// registerBtn.addEventListener("click",()=>{
//     window.location = "./register.html";
// })
