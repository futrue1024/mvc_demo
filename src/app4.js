import "./app4.css";
import $ from "jquery";

const html = ` <section id="app4"><div id="change"></div></section>
`;
const $element = $(html).appendTo($("body>.page"));

const $change = $("#change");

$change
  .on("mouseenter", () => {
    $change.addClass("active");
  })
  .on("mouseleave", () => {
    $change.removeClass("active");
  });
