import "./app2.css";
import $ from "jquery";
const html = ` <section id="app2">
<ol id="tab-bar">
  <li>1111</li>
  <li>2222</li>
</ol>
<ol id="content">
  <li>选择1111</li>
  <li>选择2222</li>
</ol>
</section>`;
const $element = $(html).appendTo($("body>.page"));
const $tabBar = $("#tab-bar");
const $content = $("#content");
const index = localStorage.getItem("index");

$tabBar.on("click", "li", (e) => {
  const $li = $(e.currentTarget);
  $li.addClass("active").siblings().removeClass("active");
  const index = $li.index();
  localStorage.setItem("index", index);
  $content
    .children()
    .eq(index)
    .addClass("active")
    .siblings()
    .removeClass("active");
});
$tabBar.children().eq(index).trigger("click");
