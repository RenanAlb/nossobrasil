import { header } from "../../components/header/header.js";
import { useMenu } from "../../components/menu/script.js";
import { footer } from "../../components/footer/footer.js";
import { getBlogsByCategory } from "../../utils/blogs.js";

document.body.innerHTML += header;
document.body.innerHTML += footer;

useMenu();

// Buscar blogs
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

const destaquesSection = document.querySelector("#destaques");
const legendaP = document.querySelector("#legenda");

const converterTime = (data) => {
  const dateObj = new Date(data);

  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  const time = `${hours}:${minutes}`;

  return time;
};

const fetchGetBlogsByCategory = async (category) => {
  const response = await getBlogsByCategory(category);

  console.log(response);

  if (response.ok) {
    legendaP.innerHTML = `${
      category === "saude"
        ? "Saúde"
        : category === "culinaria"
        ? "Culinária"
        : category === "politica"
        ? "Política"
        : category === "educacao"
        ? "Educação"
        : category === "ciencia"
        ? "Ciência"
        : category === "economia"
        ? "Economia"
        : category === "tecnologia"
        ? "Tecnologia"
        : category === "esporte"
        ? "Esporte"
        : category === "cultura"
        ? "Cultura"
        : category
    }`;
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

fetchGetBlogsByCategory(category);
