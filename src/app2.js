import "./app2.css";
import $ from "jquery";

const eventBus = $(window); //设定事件，监听触发事件。
//数据相关放到m
const m = {
  data: {
    index: parseInt(localStorage.getItem("index")) || 0,
  },
  update(index) {
    Object.assign(m.data, index);
    eventBus.trigger("m:updated"); //只要m更新了就触发指定事件
  },
};

const v = {
  container: null,
  html: (index) => {
    return `
  <div>
  <ol id="tab-bar">
  <li class="${index === 0 ? "active" : null}" data-index='0'>1111</li>
  <li class="${index === 1 ? "active" : null}" data-index='1'>2222</li>
  </ol>
  <ol id="content">
    <li class="${index === 0 ? "active" : null}" >选择1111</li>
    <li class="${index === 1 ? "active" : null}">选择2222</li>
  </ol>
  </div>
`;
  },
  init(container) {
    v.container = $(container);
  },
  render(index) {
    if (v.container.children.length === 0) {
      $(v.html(index)).prependTo($(v.container));
    } else {
      v.container.empty();
      $(v.html(index)).prependTo($(v.container));
    }
  },
};

const c = {
  init(container) {
    v.init(container);
    v.render(m.data.index); //初识值
    c.autoEvent();
    eventBus.on("m:updated", () => {
      v.render(m.data.index); //一旦m.data更新，就将n重新渲染进页面
      localStorage.setItem("n", m.data.index);
    });
  },
  event: {
    "click #tab-bar li": "x",
  },
  x(e) {
    console.log(e.currentTarget);
    let liIndex = parseInt(e.currentTarget.dataset.index);
    console.log(liIndex);
    m.update({ index: liIndex });
  },

  autoEvent() {
    for (let key in c.event) {
      console.log(key);
      let value = c[c.event[key]];
      let spaceIndex = key.indexOf(" ");
      let part1 = key.slice(0, spaceIndex);
      console.log(part1);
      let part2 = key.slice(spaceIndex + 1);
      console.log(part2);
      v.container.on(part1, part2, value);
      console.log(1);
    }
  },
};

export default c;
