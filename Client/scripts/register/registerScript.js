const registerBTN = document.querySelector("#registerBTN");
const statusText = document.querySelector(".status-text");
const registerContainer = document.querySelector(".container");

registerBTN.addEventListener("click", async () => {
  if (await sendRegisterData()) {
    trueRegister();
  } else {
    console.log("false");
    statusText.innerText = "An error occurred! Please try again later!";
  }
});

// ============= SendRegisterData
const sendRegisterData = async function () {
  const firstName = document.querySelector("#firstname").value;
  const lastName = document.querySelector("#lastname").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const pin = document.querySelector("#pin").value;
  const DateOfBirth = document.querySelector("#DateofBirth").value;

  // console.log(firstName, lastName, email, password, pin, DateOfBirth);

  try {
    const req = await axios({
      method: "post",
      url: "http://localhost:3000/user/register",
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        pin: pin,
        dateOfBirth: DateOfBirth,
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//================== renderRegister -> TRUE

const trueRegister = () => {
  const html = `
  <div class="container">
    <h1 style="margin-bottom:10rem"> Inregistrat cu succes </h1>
    </div>`;

  statusText.innerText = "Inregistrat cu succes";
  registerContainer.classList.add("fadeOut");
  registerContainer.innerHTML = html;
  registerContainer.classList.add("fadeIN");
  const registerTimeout = setTimeout(() => {
    const url = `http://127.0.0.1:5500/Client/login.html`;
    location.href = url;
  }, 3000);
};
