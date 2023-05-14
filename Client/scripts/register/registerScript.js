const registerBTN = document.querySelector("#registerBTN");
const statusText = document.querySelector(".status-text");

registerBTN.addEventListener("click", () => {
  sendRegisterData();
});

const sendRegisterData = async function () {
  const firstName = document.querySelector("#firstname").value;
  const lastName = document.querySelector("#lastname").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const pin = document.querySelector("#pin").value;
  const DateOfBirth = document.querySelector("#DateofBirth").value;

  // console.log(firstName, lastName, email, password, typeof pin, DateOfBirth);
  console.log(typeof pin);

  try {
    const req = await axios({
      method: "post",
      url: "test",
      data: {},
    });

    statusText.innerText = "Inregistrat cu succes";
  } catch (error) {
    console.log(error);
  }
};
