import $ from "jquery";
const $add = $("#add");
const $minus = $("#minus");
const $multiply = $("#multiply");
const $divide = $("#divide");
const $number = $("#number");
let n = localStorage.getItem("n");
$number.text(n || 100);

$add.on("click", () => {
  let n = parseInt($number.text());
  n += 1;
  localStorage.setItem("n", n);
  //将每次操作存入本地，使得刷新页面数值不丢失。
  //将每次操作的键值名都设为n，使得localStorage每次都是最新的n值。
  $number.text(n);
});
$minus.on("click", () => {
  let n = parseInt($number.text());
  n -= 1;
  localStorage.setItem("n", n);
  $number.text(n);
});
$multiply.on("click", () => {
  let n = parseInt($number.text());
  n *= 2;
  localStorage.setItem("n", n);
  $number.text(n);
});
$divide.on("click", () => {
  let n = parseInt($number.text());
  n /= 2;
  localStorage.setItem("n", n);
  $number.text(n);
});
