"use strict";

import { smothScrollFunction } from "./smothScroll.js";
console.log("test");

//  OpenAccountBTN  to Register.html
const openAccountBTN = document.querySelectorAll(".open-account");
openAccountBTN.forEach((btn) => {
  btn.addEventListener("click", () => {
    let url = "http://127.0.0.1:5500/Client/register.html";
    location.href = url;
  });
});

//Login Account
const loginAccountBTN = document.querySelector(".login-account");
loginAccountBTN.addEventListener("click", () => {
  let url = "http://127.0.0.1:5500/Client/login.html";
  location.href = url;
});
//Smoth Scroll
smothScrollFunction(".nav-link");
