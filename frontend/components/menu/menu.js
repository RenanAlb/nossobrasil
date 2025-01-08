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
      <li><a href="https://nosso-brasil.onrender.com/pages/navegar/index.html?cod=${
        token || null
      }&category=politica">Política</a></li>
      <li><a href="https://nosso-brasil.onrender.com/pages/navegar/index.html?cod=${
        token || null
      }&category=economia">Economia</a></li>
      <li><a href="https://nosso-brasil.onrender.com/pages/navegar/index.html?cod=${
        token || null
      }&category=saude">Sáude</a></li>
      <li><a href="https://nosso-brasil.onrender.com/pages/navegar/index.html?cod=${
        token || null
      }&category=culinaria">Culinária</a></li>
      <li><a href="https://nosso-brasil.onrender.com/pages/navegar/index.html?cod=${
        token || null
      }&category=tecnologia">Tecnologia</a></li>
      <li><a href="https://nosso-brasil.onrender.com/pages/navegar/index.html?cod=${
        token || null
      }&category=esporte">Esporte</a></li>
      <li><a href="https://nosso-brasil.onrender.com/pages/navegar/index.html?cod=${
        token || null
      }&category=cultura">Cultura</a></li>
      <li><a href="https://nosso-brasil.onrender.com/pages/navegar/index.html?cod=${
        token || null
      }&category=ciencia">Ciência</a></li>
      <li><a href="https://nosso-brasil.onrender.com/pages/navegar/index.html?cod=${
        token || null
      }&category=educacao">Educação</a></li>
    </ul>
  </nav>
`;
