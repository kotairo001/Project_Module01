var menuList = document.getElementById("menuList");
var menuButton = document.getElementById("menuBtn");
var signInBtn = document.getElementById("signInBtn");
var signUpBtn = document.getElementById("signUpBtn");
var favBtn = document.getElementsByClassName("favBtn");
var cartBtn = document.getElementsByClassName("cartBtn");
var productContain = document.getElementsByClassName("content-product");
var contentImg = document.getElementsByClassName("content-img");
var arrPrice = [20, 30, 10, 5, 50, 10, 15, 5, 15, 10]
var arrProduct = []
var arrToCart = []
let loginAcount = localStorage.getItem("login");
let arrloginAccount = JSON.parse(loginAcount);
console.log(arrloginAccount);
menuButton.addEventListener("click", function () {
    if (menuList.style.display === "none") {
        menuList.style.display = "block"
    } else {
        menuList.style.display = "none"

    }
})
signUpBtn.addEventListener("click", function () {
    window.location.href = "/page/Register.html"
});
signInBtn.addEventListener("click", function () {
    if (arrloginAccount != null) {
        for (let i = 0; i < arrloginAccount.length; i++) {
            if (arrloginAccount[i].status == true) {
                signInBtn.innerHTML = "Log out";
                arrloginAccount[i].status = false
                localStorage.setItem("login", JSON.stringify(arrloginAccount))

            } else {
                signInBtn.innerHTML = "Sign in";
                window.location.href = "/page/Login.html"
            }
        }

    } else {
        window.location.href = "/page/Login.html"
    }
})

function logOut() {
    if (arrloginAccount != null) {
        for (i = 0; i < arrloginAccount.length; i++) {
            if (arrloginAccount[i].status == true) {
                signInBtn.innerHTML = "Log out";
            }
        }
    }
}
logOut();

let Favorite = function (img, name, status) {
    this.img = img;
    this.name = name;
    this.status = status;
}
let Cart = function (img, name, price) {
    this.img = img;
    this.name = name;
    this.price = price;

}
let count = 0
for (i = 0; i < arrloginAccount.length; i++) {
    if (arrloginAccount != null && arrloginAccount[i].status == true) {
        for (let i = 0; i < favBtn.length; i++) {
            favBtn[i].addEventListener("click", function () {
                let favourite = new Favorite(contentImg[i].src, productContain[i].innerHTML, false);
                arrProduct.push(favourite);
                localStorage.setItem("favourite", JSON.stringify(arrProduct));
                alert("You have added " + (count += 1) + " product(s) to favourite")
                // favBtn[i].innerHTML = "Favourite " + "&#10004"
                favBtn[i].style.backgroundColor = "rgb(170,135,142)"
            })
        }
    } else {
        alert("You have to login!")
    }
}


let count1 = 0
for (i = 0; i < arrloginAccount.length; i++) {
    if (arrloginAccount != null && arrloginAccount[i].status == true) {
        for (let i = 0; i < cartBtn.length; i++) {
            cartBtn[i].addEventListener("click", function () {
                let cartProduct = new Cart(contentImg[i].src, productContain[i].innerHTML, arrPrice[i]);
                arrToCart.push(cartProduct);
                localStorage.setItem("cart", JSON.stringify(arrToCart));
                alert("You have added " + (count1 += 1) + " product(s) to cart");
                cartBtn[i].style.backgroundColor = "rgb(170,135,142)"
            })
        }
    } else {
        alert("You have to login!")
    }
}


console.log(signInBtn.innerHTML)