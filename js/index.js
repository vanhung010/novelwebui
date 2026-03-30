const btnloggin = document.querySelector(".btn-login");
const btnregister = document.querySelector(".btn-signup");
const btnnovel = document.querySelector(".novel-card");
btnloggin.addEventListener("click", function () {
  window.location.href = "login.html";
});
btnregister.addEventListener("click", function () {
  window.location.href = "register.html";
});
btnnovel.addEventListener("click", function () {
  window.location.href = "detail.html";
});
