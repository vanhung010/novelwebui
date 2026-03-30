// Nút đăng nhập ở trang chủ (index.html) - chuyển sang login.html
const btnLoginHeader = document.querySelector(".btn-login");
if (btnLoginHeader) {
  btnLoginHeader.addEventListener("click", function () {
    window.location.href = "login.html";
  });
}

// Nút đăng nhập ở trang login (login.html) - chuyển sang index-logged.html
const btnLoginSubmit = document.querySelector(".btn-block");
if (btnLoginSubmit) {
  btnLoginSubmit.addEventListener("click", function () {
    window.location.href = "index-logged.html";
  });
}
