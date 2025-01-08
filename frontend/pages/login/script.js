import { loginUser } from "../../utils/user.js";

const formElement = document.querySelector("#form");
const emailInput = document.querySelector("#email");
const senhaInput = document.querySelector("#senha");
const messageElement = document.querySelector("#message");

formElement.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!emailInput.value || !senhaInput.value) {
    console.error("Não é possível sem os dados");
    messageElement.style.display = "block";
    return;
  }

  try {
    const response = await loginUser(emailInput.value, senhaInput.value);

    if (!response.ok) {
      throw new Error("Erro no servidor ao criar o usuário!");
    }

    console.log(response);

    window.location.href = `http://127.0.0.1:5500/frontend/pages/home/index.html?cod=${response.token}`;
  } catch (error) {
    console.error(error);
    return;
  }
});
