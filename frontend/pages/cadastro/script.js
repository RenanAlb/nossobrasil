import { createUser } from "../../utils/user.js";

const formElement = document.querySelector("#form");
const emailInput = document.querySelector("#email");
const senhaInput = document.querySelector("#senha");
const nomeInput = document.querySelector("#nome");
const buttonElement = document.querySelector("#button-cadastrar");
const messageElement = document.querySelector("#message");

formElement.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!emailInput.value || !senhaInput.value || !nomeInput.value) {
    console.error("Não é possível sem os dados");
    messageElement.style.display = "block";
    return;
  }

  try {
    const response = await createUser(
      emailInput.value,
      senhaInput.value,
      nomeInput.value
    );

    if (!response.ok) {
      throw new Error("Erro no servidor ao criar o usuário!");
    }

    console.log(response);

    window.location.href = `https://nosso-brasil.onrender.com/pages/home/index.html?cod=${response.token}`;
  } catch (error) {
    console.error(error);
    return;
  }
});
