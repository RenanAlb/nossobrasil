import { getDadosUser } from "../../utils/user.js";

var isLog = false;

const verficarUser = async () => {
  console.log("Aguardando reposta do servidor...");
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("cod");

  if (token !== null) {
    const response = await getDadosUser(token);
    if (response.ok !== null) {
      console.log(response);
      isLog = true;
      return { isLog, user: response.response };
    } else {
      isLog = false;
      console.error("Usuário não está logado;");
      return { isLog, user: response.response };
    }
  } else {
    console.log("Usuário não tem login");
    return { isLog, user: null };
  }
};

verficarUser();

const status = await verficarUser();

export const header = `
  <header>
    <div id="global-header">
      <img src="../../assets/logo2.png"/>
      <div id="left-header">
        ${
          status.isLog
            ? `<button id="button"><a href="../../pages/new-blog/index.html?id=${status.user.id}&nome=${status.user.nome}">Criar blog</a></button>`
            : '<button id="button"><a href="../../pages/login/index.html">Login</a></button>'
        }
        <span id="menu" class="material-symbols-outlined">
          menu
        </span>
      </div>
    </div>
  </header>
`;
