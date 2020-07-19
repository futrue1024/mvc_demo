import "./app3.css";
import $ from "jquery";
const html = `<section id="app3">
<div class="front">一直点它！</div>
</section>`;
const $element = $(html).appendTo($("body>.page"));
const $front = $(".front");
const active = localStorage.getItem("app3-active") === "yes";
$front.toggleClass("active", active);
$front.on("click", () => {
  if ($front.hasClass("active")) {
    $front.removeClass("active");
    localStorage.setItem("app3-active", "no");
  } else {
    $front.addClass("active");
    localStorage.setItem("app3-active", "yes");
  }
});
