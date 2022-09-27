import * as d3 from 'https://cdn.skypack.dev/d3@7';

//========  TEST1 ========//
/**
 * transition
 *
 * .transition() 會回傳 ‘transition selection’，基本上與一般 d3.selection 一樣
 * 只是 transition selection 多了 .tween() 這個 function... 等其他相關方法
 * 一但 transition 執行了，後續的 .attr(), .style 就會以動畫的方式執行
 */
(function test1() {
  let data = [];
  const updateData = () => {
    data = Array.from({ length: 5 }).map((v, i) => Math.random() * 800);
  }
  const update = () => {
    updateData();
    d3.select('.test1 svg g')
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('r', 50)
      .attr('fill', 'orange')
      .transition()
      .attr('cx', (d) => d)
  }
  update();
  window.updatetest1 = update;
})();
//========  TEST1 ========//



//========  TEST2 ========//
(function test2() {
  let data = [];
  const updateData = () => {
    data = Array.from({ length: 5 }).map((v, i) => Math.random() * 800);
  }
  const update = () => {
    updateData();
    d3.select('.test2 svg g')
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('r', 50)
      .attr('fill', 'orange')
      .transition()
      .duration(2000) // transition 後可以加 duration()
      .attr('cx', (d) => d)
  }
  update();
  window.updatetest2 = update;
})();
//========  TEST2 ========//


//========  TEST3 ========//
(function test3() {
  let data = [];
  const updateData = () => {
    data = Array.from({ length: 5 }).map((v, i) => Math.random() * 800);
  }
  const update = () => {
    updateData();
    d3.select('.test3 svg g')
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('r', 20)
      .attr('fill', 'pruple')
      .transition()
      .duration(500)
      .delay((d, i) => i * 500)
      .attr('cx', (d) => d)
  }
  update();
  window.updatetest3 = update;
})();
//========  TEST3 ========//


//========  TEST4 ========//
/**
 * easing function
 * d3 有許多的 builtIn ease function
 * 預設是使用 easeCubic 這個，easeCubic 相當於 easeCubicInOut
 */
 (function test4() {
  let data = [];
  const updateData = () => {
    data = Array.from({ length: 5 }).map((v, i) => Math.random() * 800);
  }
  const update = () => {
    updateData();
    d3.select('.test4 svg g')
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('r', 20)
      .attr('fill', 'pruple')
      .transition()
      .duration(1000)
      .ease(d3.easeBounceOut)
      .attr('cx', (d) => d)
  }
  update();
  window.updatetest4 = update;
})();
//========  TEST4 ========//


//========  TEST5 ========//
/**
 * chained transitions
 *  如果有接續的 transition，會等第一個 transition 做完後，在執行第 2 個
 *  簡單來說直接 transition 接下續寫，就有順序的概念
 */
 (function test5() {
  let data = [];
  const updateData = () => {
    data = Array.from({ length: 5 }).map((v, i) => Math.random() * 800);
  }
  const update = () => {
    updateData();
    d3.select('.test5 svg g')
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('fill', 'pruple')
      .transition() // 第一個 transition
      .duration(1000)
      .attr('cx', (d) => d)
      .transition() // 第二個 transition
      .duration(500)
      .ease(d3.easeBounceOut)
      .attr('r', (d, i) => d * 0.1)

  }
  update();
  window.updatetest5 = update;
})();
//========  TEST5 ========//


//========  TEST6 ========//
/**
 * Custom Tweens
 *  .transition 可以接續一個 .tween 的 function，用來自定義漸變動畫的過程
 *  .tween 必須要回傳一個 function(t) {}，其中 t 指的是漸變的過程，t 從 0 -> 1
 *
 *  另外這邊還有用到 interpolate(起始值, 目的值)，這是 d3 提供的方法，帶入起始值和目的值之後，
 *  會產生一個 function(t) {}，這個 function(t) 同樣接受一個 t，t 從 0 -> 1
 *
 *  因此我們把 tween 的回傳的 func(t) 在帶入 interpolate() 所產生的 func(t)，算出漸變時每個 frame 的角度
 *  再透過 d3.select(this) 抓到 circle，去改變 cx, cy，讓小圈圈照著圓弧跑
 */
(function test6() {
  const bigCirRadius = 100;
  const PI2 = Math.PI * 2;
  let circles = [];
  const updateData = () => {
    circles = Array.from({ length: 3 }).map((v, i) => ({
      angle: Math.random() * PI2,
      r: 20,
    }))
  }
  const getCurrentAngle = (element) => {
    const x = d3.select(element).attr('cx')
    const y = d3.select(element).attr('cy')
    return Math.atan2(y, x);
  }
  const update = () => {
    updateData();
    d3.select('.test6 .c-group')
      .selectAll('.s-cir')
      .data(circles)
      .join('circle')
      .classed('s-cir', true)
      .attr('r', (d) => d.r)
      .attr('fill', 'grey')
      .transition()
      .duration(1000)
      .tween('circumference', function(d) {
        const { angle, r } = d;
        const currentAngle = getCurrentAngle(this);
        const i = d3.interpolate(currentAngle, angle);
        return (t) => {
          const angle = i(t);
          d3.select(this)
            .attr('cx', () => Math.cos(angle) * bigCirRadius)
            .attr('cy', () => Math.sin(angle) * bigCirRadius)
        }
      })
  }
  update();
  window.updatetest6 = update;
})();
//========  TEST6 ========//


//========  TEST7 ========//
/**
 * .join(function(enter) {}, function(update) {}, function(exit) {})
 */
(function test7() {
  let data = []
  const updateData = () => {
    const num = Math.floor(Math.random() * 10 + 1);
    data = Array.from({ length: num }).map((v, i) => Math.random() * 800);
  }

  const update = () => {
    updateData();
    d3.select('.test7 svg g')
      .selectAll('circle')
      .data(data)
      .join(
        function (enter) {
          return enter.append('circle')
            .attr('cx', (d) => d)
            .attr('r', 50)
            .style('opacity', 0)
        },
        function (update) {
          return update
        },
        function (exit) {
          return exit.transition()
            .duration(1000)
            .attr('cy', 200)
            .remove()
        }
      )
      .transition()
      .duration(1000)
      .style('opacity', 0.75)
      .attr('cx', (d) => d)
  }
  update();
  window.updatetest7 = update;
})();
//========  TEST7 ========//