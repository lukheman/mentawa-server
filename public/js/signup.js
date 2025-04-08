console.log("akmalllll");
const URL = "http://localhost:3000/api/userRegister";

const signupButton = document.getElementById("signupButton");

signupButton.addEventListener("click", async () => {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const passw = document.getElementById("password");

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, passw }),
  });

  const result = await response.json();
  console.log(result);
});
