import { createBlog } from "../../utils/blogs.js";

const titleInput = document.querySelector("#title");
const subtitleInput = document.querySelector("#subtitle");
const contentTextarea = document.querySelector("#content");
const categorySelect = document.querySelector("#category");
const fileInput = document.querySelector("#file");
const form = document.querySelector("#form");

document.querySelector(".flex-back").addEventListener("click", () => {
  history.back();
});

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const nome = urlParams.get("nome");
console.log(id, nome);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (
    !titleInput.value ||
    !subtitleInput.value ||
    !contentTextarea.value ||
    !categorySelect.value ||
    !fileInput.files[0]
  ) {
    console.error("Erro ao criar o blog");
    return null;
  }

  const formData = new FormData();

  // Adicionando os dados ao FormData
  formData.append("title", titleInput.value);
  formData.append("subtitle", subtitleInput.value);
  formData.append("content", contentTextarea.value);
  formData.append("category", categorySelect.value);
  formData.append("file", fileInput.files[0]);

  try {
    const response = await createBlog(id, nome, formData);
    console.log(response);

    if (response.ok) {
      console.log("Blog criado com sucesso!");
      window.history.back();
    }
  } catch (error) {
    console.error(error);
  }
});
