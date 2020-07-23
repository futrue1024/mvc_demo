import "./app1.css";
import $ from "jquery";

const eventBus = $(window); //设定事件，监听触发事件。
//数据相关放到m
const m = {
  data: {
    n: parseInt(localStorage.getItem("n")),
  },
  update(data) {
    Object.assign(m.data, data);
    eventBus.trigger("m:updated"); //只要m更新了就触发指定事件
  },
};
//视图相关放到v
const v = {
  container: null,
  html: `
<div>
<div id="appContent1">
  <div class="output">
    <span id="number">{{n}}</span>
  </div>
  <div class="actions">
    <button id="add">+1</button>
    <button id="minus">-1</button>
    <button id="multiply">*2</button>
    <button id="divide">÷2</button>
  </div>
</div>
</div>
`,
  init(container) {
    v.container = $(container);
  },
  render(n) {
    if (v.container.children.length === 0) {
      $(v.html.replace("{{n}}", n)).prependTo($(v.container));
    } else {
      v.container.empty();
      $(v.html.replace("{{n}}", n)).prependTo($(v.container));
    }
  },
};
//其他放到c
const c = {
  init(container) {
    v.init(container);
    v.render(m.data.n);
    c.autoEvent();
    eventBus.on("m:updated", () => {
      v.render(m.data.n); //一旦m.data更新，就将n重新渲染进页面
      localStorage.setItem("n", m.data.n);
    });
  },
  event: {
    "click #add": "add",
    "click #minus": "minus",
    "click #divide": "divide",
    "click #multiply": "multiply",
  },
  add() {
    m.update({ n: m.data.n + 1 });
  },
  minus() {
    m.update({ n: m.data.n - 1 });
  },
  multiply() {
    m.update({ n: m.data.n * 2 });
  },
  divide() {
    m.update({ n: m.data.n / 2 });
  },
  autoEvent() {
    for (let key in c.event) {
      console.log(key);
      let value = c[c.event[key]];
      let spaceIndex = key.indexOf(" ");
      let part1 = key.slice(0, spaceIndex);
      let part2 = key.slice(spaceIndex + 1);
      v.container.on(part1, part2, value);
    }
  },
};

//初始化html

export default c;
