let signInBtn = document.getElementById("signInBtn");
let signUpBtn = document.getElementById("signUpBtn");

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
    window.location.href = "/index.html";
  }
});

signUpBtn.addEventListener("click", function () {
  window.location.href = "../page/Register.html";
});

let menuButton = document.getElementById("menuBtn");
let menuList = document.getElementById("menuList");
menuButton.addEventListener("click", function () {
  if (menuList.style.display === "none") {
    menuList.style.display = "block";
  } else {
    menuList.style.display = "none";
  }
});

//TODO Caculate total
let loginAcount = JSON.parse(localStorage.getItem("loginAcount"));
function caculateTotal() {
  let sum = 0;
  let listCart = JSON.parse(
    localStorage.getItem(`listCart${loginAcount[0].id}`)
  );
  for (i = 0; i < listCart.length; i++) {
    sum += listCart[i].price * listCart[i].count;
  }
  return sum;
}
console.log(caculateTotal());

//TODO Render Cart
let listCart = JSON.parse(localStorage.getItem(`listCart${loginAcount[0].id}`));
// console.log(listCart)
let cartDetail = document.getElementById("cartDetail");
function renderCart(list) {
  let data = `
    <p id="header">Your Order</p>
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
renderCart(listCart);

//TODO Add Product
function addProduct(i) {
  console.log(i);
  let listCart = JSON.parse(
    localStorage.getItem(`listCart${loginAcount[0].id}`)
  );
  listCart[i].count++;
  localStorage.setItem(
    `listCart${loginAcount[0].id}`,
    JSON.stringify(listCart)
  );
  renderCart(listCart);
}

//TODO Reduce Product
function reduceProduct(i) {
  let listCart = JSON.parse(
    localStorage.getItem(`listCart${loginAcount[0].id}`)
  );
  listCart[i].count--;
  localStorage.setItem(
    `listCart${loginAcount[0].id}`,
    JSON.stringify(listCart)
  );
  renderCart(listCart);
  if (listCart[i].count == 0) {
    listCart.splice(i, 1);
    localStorage.setItem(
      `listCart${loginAcount[0].id}`,
      JSON.stringify(listCart)
    );
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
function orderAll() {
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
  let listCart = JSON.parse(
    localStorage.getItem(`listCart${loginAcount[0].id}`)
  );
  let controlCart = JSON.parse(localStorage.getItem("controlCart"));
  if (controlCart == null) {
    controlCart = [];
    controlCart.push(listCart);
    localStorage.setItem(`controlCart`, JSON.stringify(controlCart));
  } else {
    let controlCart = JSON.parse(localStorage.getItem("controlCart"));
    let flag = false;
    for (i = 0; i < controlCart.length; i++) {
      if (JSON.stringify(controlCart[0]) !=JSON.stringify(listCart)) {
        flag = true;
        console.log(flag);
        break
      }
    }
    if (flag == true) {
      controlCart.push(listCart);
      localStorage.setItem(`controlCart`, JSON.stringify(controlCart));
    }
  }
}

let controlCart = JSON.parse(localStorage.getItem("controlCart"));
console.log(JSON.stringify(controlCart[0])==JSON.stringify(listCart))
//TODO Show order after press the button
function showAfterOrder() {
  let controlCart = JSON.parse(localStorage.getItem("controlCart"));
  let listCart = JSON.parse(
    localStorage.getItem(`listCart${loginAcount[0].id}`)
  );
  if (JSON.stringify(controlCart[0]) == JSON.stringify(listCart)) {
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
