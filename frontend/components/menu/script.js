import { menu } from "./menu.js";

export const useMenu = () => {
  document.body.innerHTML += menu;

  const blurElement = document.querySelector("#blur");
  const menuElementSpan = document.querySelector("#menu");
  const closeElementSpan = document.querySelector("#close");
  const navElementMenu = document.querySelector("#nav");
  navElementMenu.style.display = "none";

  const controlMenu = () => {
    if (navElementMenu.style.display === "none") {
      navElementMenu.style.display = "block";
      blurElement.style.display = "block";
      document.body.style.overflowY = "hidden";
    } else {
      navElementMenu.style.display = "none";
      blurElement.style.display = "none";
      document.body.style.overflowY = "scroll";
    }
  };

  menuElementSpan.addEventListener("click", controlMenu);
  blurElement.addEventListener("click", controlMenu);
  closeElementSpan.addEventListener("click", controlMenu);
};
