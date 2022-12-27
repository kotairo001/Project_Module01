let signInBtn = document.getElementById("signInBtn");
let signUpBtn = document.getElementById("signUpBtn");

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

signUpBtn.addEventListener("click", function () {
  window.location.href = "../page/Register.html";
});

signInBtn.addEventListener("click", () => {
  if (signInBtn.innerHTML == "Sign in") {
    window.location.href = "../page/Login.html";
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

let menuButton = document.getElementById("menuBtn");
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

//TODO Caculate total
let loginAcount = JSON.parse(localStorage.getItem("loginAcount"));
function caculateTotal() {
  let sum = 0;
  let listCart = JSON.parse(
    localStorage.getItem(`listCart${loginAcount[0].id}`)
  );
  if (listCart != null) {
    for (i = 0; i < listCart.length; i++) {
      sum += listCart[i].price * listCart[i].count;
    }
  }

  return sum;
}
console.log(caculateTotal());

//TODO Render Cart
let listCart = JSON.parse(localStorage.getItem(`listCart${loginAcount[0].id}`));
// console.log(listCart)
let cartDetail = document.getElementById("cartDetail");
function renderCart(list) {
  if (checkLogin() == true) {
    let data = `
    <h2 id="header">Your Order</h2>
    <table id="order_list">
    <tr>
        <th>NO.</th>
        <th>Name</th>
        <th>Picture</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Option</th>
    </tr>
    `;
    if (list != null) {
      for (i = 0; i < list.length; i++) {
        data += `
        <tr>
            <td>${i + 1}</td>
            <td>${list[i].name}</td>
            <td>
                <img src="${list[i].image}" alt="">
            </td>
            <td>${list[i].count}</td>
            <td>${list[i].price * list[i].count}$</td>
            <td>
                <button onclick="addProduct(${i})">+</button>
                <button onclick="reduceProduct(${i})">-</button>
                <button onclick="deleteProduct(${i})">X</button>
            </td>
        </tr> 
        `;
      }
    }
    data += `
    <tr>
        <td colspan=4>Total</td>
        <td>${caculateTotal()}$</td>
        <td id="orderBtn"><button onclick="orderAll(${i})">Order All</button></td>
    </tr>
  </table>
  `;
    cartDetail.innerHTML = data;
  }
}
renderCart(listCart);

//TODO Add Product
function addProduct(i) {
  console.log(i);
  let listCart = JSON.parse(
    localStorage.getItem(`listCart${loginAcount[0].id}`)
  );
  listCart[i].count++;
  localStorage.setItem(`listCart${loginAcount[0].id}`, JSON.stringify(listCart));
  renderCart(listCart);
}

//TODO Reduce Product
function reduceProduct(i) {
  let listCart = JSON.parse(
    localStorage.getItem(`listCart${loginAcount[0].id}`)
  );
  listCart[i].count--;
  localStorage.setItem(`listCart${loginAcount[0].id}`, JSON.stringify(listCart));
  renderCart(listCart);
  if (listCart[i].count == 0) {
    listCart.splice(i, 1);
    localStorage.setItem(`listCart${loginAcount[0].id}`, JSON.stringify(listCart));
    renderCart(listCart);
  }
}

//TODO Delete Product
function deleteProduct(i) {
  let listCart = JSON.parse(
    localStorage.getItem(`listCart${loginAcount[0].id}`)
  );
  listCart.splice(i, 1);
  localStorage.setItem(
    `listCart${loginAcount[0].id}`,
    JSON.stringify(listCart)
  );
  renderCart(listCart);
}

//TODO Order All
function getOrder() {
  let listUser = JSON.parse(localStorage.getItem("listUser"));
  let ownerCart;
  for (i = 0; i < localStorage.length; i++) {
    ownerCart = localStorage.key(i);
    for (j = 0; j < listUser.length; j++) {
      if (ownerCart == listUser[j].email) {
        listUser[j].status = "On Processing";
        localStorage.setItem(`listUser`, JSON.stringify(listUser));
      }
    }
  }
}

function orderAll() {
  let data = "";
  data += `
    <div class="invoice">
        <div class="invoice__text">
            <p>Thank you for your order!</p>
            <p>Your order has been sent to us.</p>
            <p>Your total is: <span> ${caculateTotal()}$</span></p>
            <p>You can use <span>Paypal</span> or <span>Bank's account</span> to finish the payment.</p>
        </div>
        <div class="invoice__img">
            <img src="/img/payment.png" alt="" />
            <img src="/img/bank.png" alt="" />
        </div>
    </div>
    `;
  cartDetail.innerHTML = data;
  let payment = JSON.parse(
    localStorage.getItem(`listCart${loginAcount[0].id}`)
  );
  if (payment != null) {
    localStorage.removeItem(`listCart${loginAcount[0].id}`);
    localStorage.setItem(`${loginAcount[0].email}`, JSON.stringify(payment));
    getOrder();
  }
  // if (controlCart == null) {
  //   controlCart = [];
  //   controlCart.push(listCart);
  //   localStorage.setItem(`controlCart`, JSON.stringify(controlCart));
  // } else {
  //   let controlCart = JSON.parse(localStorage.getItem("controlCart"));
  //   let flag = false;
  //   for (i = 0; i < controlCart.length; i++) {
  //     if (JSON.stringify(controlCart[0]) != JSON.stringify(listCart)) {
  //       flag = true;
  //       console.log(flag);
  //       break
  //     }
  //   }
  //   if (flag == true) {
  //     controlCart.push(listCart);
  //     localStorage.setItem(`controlCart`, JSON.stringify(controlCart));
  //   }
  // }
}

//TODO Show order after press the button

function showAfterOrder() {
  let payment = JSON.parse(localStorage.getItem(`${loginAcount[0].email}`));
  if (payment != null) {
    let data = "";
    data += `
      <div class="invoice">
          <div class="invoice__text">
              <p>Thank you for your order!</p>
              <p>Your order has been sent to us.</p>
              <p>Your total is: <span> ${caculateTotal()}$</span></p>
              <p>You can use <span>Paypal</span>  or <span>Bank's account</span> to finish the payment.</p>
          </div>
          <div class="invoice__img">
              <img src="/img/payment.png" alt="" />
              <img src="/img/bank.png" alt="" />
          </div>
      </div>
      `;
    cartDetail.innerHTML = data;
  }
}
window.addEventListener("load", showAfterOrder);
