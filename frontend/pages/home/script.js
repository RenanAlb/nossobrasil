import { header } from "../../components/header/header.js";
import { getDadosUser } from "../../utils/user.js";
import { getBlogs } from "../../utils/blogs.js";
import { useMenu } from "../../components/menu/script.js";
import { footer } from "../../components/footer/footer.js";

document.body.innerHTML += header;
document.body.innerHTML += footer;

useMenu();

const destaquesSection = document.querySelector("#destaques");

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("cod");

console.log("Token by params =>", token);

// Verificar user
const verficarUser = async (token) => {
  console.log("Aguardando reposta do servidor...");
  if (token !== null) {
    console.log("Buscando dados do usuário...");
    const response = await getDadosUser(token);
    if (response.ok) {
      console.log(response);
    } else {
      return null;
    }
  } else {
    console.log("Usuário não tem login");
    return null;
  }
};

verficarUser(token);

const converterTime = (data) => {
  const dateObj = new Date(data);

  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  const time = `${hours}:${minutes}`;

  return time;
};

// Buscar blogs
const fetchgGetBlogs = async () => {
  const response = await getBlogs();

  console.log(response);

  if (response.ok) {
    response.response.map((blog) => {
      destaquesSection.innerHTML += `<article>
          <div class="details">
            <img src="${blog.imageUrl}" alt="Imagem do blog" />
            <small>Publicado por ${blog.nomeAuthor} às ${converterTime(
        blog.data
      )}</small>
          </div>
          <div class="block-image">
          <img src="${blog.imageUrl}" alt="Imagem do blog" />
            <small>Publicado por ${blog.nomeAuthor} às ${converterTime(
        blog.data
      )}</small></div>
          <div class="text">
            <h1>${blog.title}</h1>
            <h2>
              ${blog.subTitle}
            </h2>
            <p>
             ${blog.content}
            </p>
          </div>
        </article>`;
    });
  }
};

fetchgGetBlogs();
