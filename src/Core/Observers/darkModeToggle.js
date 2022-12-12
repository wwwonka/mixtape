// https://www.section.io/engineering-education/watch-for-system-dark-mode-using-js-css/

let body = document.querySelector("body");
let content = document.getElementById("content");

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", function (e) {
    const colorScheme = e.matches ? "dark" : "light";
    console.log(colorScheme);

    if (colorScheme === "dark") {
      body.style.backgroundColor = "#1a1a1a";
      content.setAttribute("class", "dark");
    } else {
      body.style.backgroundColor = "#f5f5f5";
      content.setAttribute("class", "light");
    }
  });
