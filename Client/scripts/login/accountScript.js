// "use strict";

const firstNameHTML = document.querySelector(".intro-text");
const logOutButton = document.querySelector(".logOut button");
const deleteBTN = document.querySelector("#deleteBTN");
const loanBTN = document.querySelector("#loanBTN");
const status = document.querySelector("#stats h1");
const movements = document.querySelector(".movements");
const transferBTN = document.querySelector("#transfer");
const balance = document.querySelector("#current-balance");

const accountInfo = async (account) => {
  try {
    const req = await axios({
      method: "get",
      url: `http://localhost:3000/api/info/${account.account_id}`,
    });
    let [accountINFO] = await req.data;
    console.log(accountINFO);

    renderHTML(accountINFO);
  } catch (error) {
    console.log(error);
  }
};

const renderHTML = function (account) {
  DisplayName(account);
  deleteAccount(account);
  DisplayMoney(account);
  transferMoney(account);
  requestLoan(account);
  displayMovements(account);
  LogOUT();
};

//Display Name
const DisplayName = (account) => {
  firstNameHTML.innerText = `Hello ${account.first_Name}...`;
};

// DisplayMoney
const DisplayMoney = function (account) {
  balance.innerText = "";
  balance.innerText = `${account.account_money}€`;
  console.log("banii");
};
// LogOut Function
const LogOUT = () => {
  logOutButton.addEventListener("click", () => {
    let url = "http://127.0.0.1:5500/Client/index.html";
    location.href = url;
  });
};

// DeleteAccount Function

const axiosDelete = async (account) => {
  try {
    const req = await axios({
      method: "delete",
      url: `http://localhost:3000/api/delete/${account.account_id}`,
    });
    return req.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteAccount = (account) => {
  deleteBTN.addEventListener("click", async () => {
    if (await axiosDelete(account)) {
      console.log(true);
      status.innerText = `The bank account has been successfully deleted`;
      const homeTimeOut = setTimeout(() => {
        location.href = `http://127.0.0.1:5500/Client/index.html`;
      }, 2000);
    } else {
      console.log(false);
    }
  });
};

//RequestLoan Function

const axiosLoan = async (account) => {
  const loanInput = Number(document.querySelector("#loan-input").value);
  try {
    if (loanInput) {
      status.innerText = "";
      const req = await axios({
        method: "put",
        url: `http://localhost:3000/api/loan/${account.account_id}`,
        data: {
          loan_value: loanInput,
        },
      });

      console.log(req.data);
    } else {
      status.innerText = `Please insert a value`;
    }
  } catch (error) {
    console.log(error);
  }
};

const requestLoan = async (account) => {
  loanBTN.addEventListener("click", () => {
    if (axiosLoan(account)) {
      accountInfo(account);
    }
  });
};

// Movements

const axiosMovements = async (account) => {
  try {
    const req = await axios({
      method: "get",
      url: `http://localhost:3000/api/transaction/${account.account_id}`,
    });

    return req.data;
  } catch (error) {
    console.log(error);
  }
};

const displayMovements = async (account) => {
  const movementsData = await axiosMovements(account);

  let movDisp = "";
  movementsData.forEach((mov) => {
    const html = `<div class="mov">
    <div class="mov-type-${mov.transaction_type}">
      <h1>${mov.transaction_type}</h1>
    </div>
    <div class="mov-date">
      <p>${mov.transaction_date}</p>
    </div>
    <div class="mov-value">
      <p>${mov.transaction_amount}€</p>
    </div>
  </div>`;

    movDisp += html;
  });
  movements.innerHTML = movDisp;
};

// Transfer

const axiosTransfer = async (account) => {
  const first_Name = document.querySelector("#first-name").value;
  const last_Name = document.querySelector("#last-name").value;
  const transfer_value = Number(
    document.querySelector("#transfer-value").value
  );
  try {
    if (first_Name && last_Name && transfer_value) {
      const req = await axios({
        method: "put",
        url: `http://localhost:3000/api/transfer/${account.account_id}`,
        data: {
          firstName: first_Name,
          lastName: last_Name,
          transfer_value: transfer_value,
          account_balance: 5000,
        },
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

const transferMoney = (account) => {
  const event = function () {
    axiosTransfer(account);
    accountInfo(account);
    transferBTN.removeEventListener("click", event);
  };

  transferBTN.addEventListener("click", event);
};

export default accountInfo;
