const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTw0 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loding...";
  messageTw0.textContent = "";

  fetch("http://localhost:3000/weather?address=" + search.value).then(
    (response) => {
      response.json().then((weather) => {
        if (weather.error) {
          messageOne.textContent = weather.error;
        } else {
          messageOne.textContent = weather.location;
          messageTw0.textContent = weather.forecast;
        }
      });
    }
  );
});
