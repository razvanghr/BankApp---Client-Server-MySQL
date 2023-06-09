"use strict";

import accountInfo from "./accountScript.js";

const loginBTN = document.querySelector("#loginBTN");
const loginContainer = document.querySelector(".container");
const loginHTML = document.querySelector(".loginHTML");
const statusText = document.querySelector(".status-text");
const accountContainer = document.querySelector(".accountPage");
const body = document.querySelector("body");
let accountData;
// Import

loginBTN.addEventListener("click", async () => {
  if (await sendLoginData()) {
    [accountData] = await sendLoginData();
    console.log(accountData);
    trueLogin();
    accountInfo(await accountData);
  } else {
    statusText.innerText = "Email , Password or PIN is incorrect";
    falseLogin();
  }
});

const sendLoginData = async function () {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const PIN = document.querySelector("#pin").value;

  if ((email, password, PIN)) {
    try {
      const req = await axios({
        method: "post",
        url: "http://localhost:3000/user/login",
        data: {
          email: email,
          password: password,
          pin: PIN,
        },
      });
      return req.data;
    } catch (error) {
      console.log(error);
    }
  }
};

//  TrueLogin ------------
const trueLogin = () => {
  const html = `
  <div class="container">
    <h1 style="margin-bottom:10rem"> Logged in successfully </h1>
    </div>`;

  loginContainer.classList.add("fadeOut");
  loginContainer.innerHTML = html;
  loginContainer.classList.add("fadeIN");
  const registerTimeout = setTimeout(() => {
    loginHTML.innerHTML = "";
    body.style.backgroundColor = "white";
    accountContainer.classList.remove("hide");
  }, 3000);
};

//FalseLogin -----------------

const falseLogin = () => {
  statusText.innerText = "Email , Password or PIN is incorrect";
  document.querySelectorAll("input").forEach((input) => (input.value = ""));
};
