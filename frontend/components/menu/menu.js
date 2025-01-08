const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("cod");

export const menu = `
  <div id="blur"></div>
  <nav id="nav">
    <div id="container-img">
      <img src="../../assets/logo2.png"/>
      <span id="close" class="material-symbols-outlined">
        close
      </span>
    </div>
    <ul>
      <li><a href="../../pages/navegar/index.html?cod=${
        token || "?"
      }&category=politica">Política</a></li>
      <li><a href="../../pages/navegar/index.html?cod=${
        token || "?"
      }&category=economia">Economia</a></li>
      <li><a href="../../pages/navegar/index.html?cod=${
        token || "?"
      }&category=saude">Sáude</a></li>
      <li><a href="../../pages/navegar/index.html?cod=${
        token || "?"
      }&category=culinaria">Culinária</a></li>
      <li><a href="../../pages/navegar/index.html?cod=${
        token || "?"
      }&category=tecnologia">Tecnologia</a></li>
      <li><a href="../../pages/navegar/index.html?cod=${
        token || "?"
      }&category=esporte">Esporte</a></li>
      <li><a href="../../pages/navegar/index.html?cod=${
        token || "?"
      }&category=cultura">Cultura</a></li>
      <li><a href="../../pages/navegar/index.html?cod=${
        token || "?"
      }&category=ciencia">Ciência</a></li>
      <li><a href="../../pages/navegar/index.html?cod=${
        token || "?"
      }&category=educacao">Educação</a></li>
    </ul>
  </nav>
`;
