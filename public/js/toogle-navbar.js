const $navbarBurger = document.querySelector('.navbar-burger');
$navbarBurger.onclick = () => {
  const $navbarMenu = document.querySelector('.navbar-menu');
  $navbarBurger.classList.toggle('is-active');
  $navbarMenu.classList.toggle('is-active');
};
