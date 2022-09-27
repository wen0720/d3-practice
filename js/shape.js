import * as d3 from 'https://cdn.skypack.dev/d3@7';

// d3 line transition
// https://medium.com/@louisemoxy/create-a-d3-line-chart-animation-336f1cb7dd61
// https://codepen.io/louisemoxy/pen/qMvmBM?editors=0010
// https://stackoverflow.com/questions/65610362/animate-area-of-a-d3-line-graph?noredirect=1&lq=1

/**
svg 各種圖表，折線圖、圓餅圖...其實背後都是 <path> 這個 tag 組成的
d3 提供各種 function 去產生 path
*/

//========  TEST1 ========//
/**
 * 基本折線圖
 *
 */
(function test1() {
  const lineGenerator = d3.line();
  const points = [
    [0, 80], [100, 100], [200, 30],
    [300, 50], [400, 40], [500, 80]
  ];
  const pathdata = lineGenerator(points);
  d3.select('.test1 svg path')
    .attr('d', pathdata)
})();
//========  TEST1 ========//

//========  TEST2 ========//
(function test2() {
  const data = [
    { value: 10 },
    { value: 50 },
    { value: 30 },
    { value: 40 },
    { value: 20 },
    { value: 70 },
    { value: 50 },
  ];
  const dataValueArr = data.map(({ value }) => value);
  const xScale = d3.scaleLinear().domain([0, data.length]).range([0, 800]);
  const yScale = d3.scaleLinear().domain([0, d3.max(dataValueArr)]).range([150, 0]);
  const lineGenerator = d3.line()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d.value))
  d3.select('.test2 path')
    .attr('d', lineGenerator(data))
})();
//========  TEST2 ========//

//========  TEST3 ========//
/**
 * 當資料有中斷的時候，可以透過 .defined 排除錯誤
 * .defined 回傳 true 就會顯示，回傳 false 就會跳過
 */
(function test3() {
  const points = [
    [0, 80],
    [100, 100],
    null,
    [300, 50],
    [400, 40],
    [500, 80]
  ];
  const lineGenerator = d3.line().defined((d) => {
    return d !== null;
  })
  d3.select('.test3 svg path')
    .attr('d', lineGenerator(points))
})();
//========  TEST3 ========//


//========  TEST4 ========//
(function test4() {
  /**
   * d3 提供很多種曲線公式
   * 主要分成 2 種，會通過點的，跟，不會通過點的
   * 【會通過點】
   * curveLinear, curveCardinal, curveCatmullRom, curveMonotone, curveNatural, curveStep
   * 【不會通過點】
   * curveBasis, curveBundle
   */
  const data = [
    { value: 10 },
    { value: 50 },
    { value: 30 },
    { value: 40 },
    { value: 20 },
    { value: 70 },
    { value: 50 },
  ];
  const dataValueArr = data.map(({ value }) => value);
  const xScale = d3.scaleLinear().domain([0, data.length]).range([0, 800]);
  const yScale = d3.scaleLinear().domain([0, d3.max(dataValueArr)]).range([150, 0]);
  const lineGenerator = d3.line()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d.value))
    .curve(d3.curveCardinal) // 轉換成曲線
  d3.select('.test4 svg g path')
    .attr('d', lineGenerator(data))
})();
//========  TEST4 ========//


//========  TEST5 ========//
(function test5() {
  /**
   * 雷達圖
   * 雷達圖需帶入的值是角度(以 Math.PI 表示)、半徑長度
   */
  const radialLineGenerator = d3.radialLine();
  const points = [
    [0, 80],
    [Math.PI * 0.25, 80],
    [Math.PI * 0.5, 30],
    [Math.PI * 0.75, 80],
    [Math.PI, 80],
    [Math.PI * 1.25, 80],
    [Math.PI * 1.5, 80],
    [Math.PI * 1.75, 80],
    [Math.PI * 2, 80]
  ];
  d3.select('.test5 svg g path')
    .attr('d', radialLineGenerator(points))
})();
//========  TEST5 ========//

//========  TEST6 ========//
/**
 * 區域圖
 */
(function test6() {
  const areaGenerator = d3.area();
  // 預設 baseline 會在最上邊，可以透過 .y0 改變
  areaGenerator.y0(150) // 這邊的 150 是從最上面開始算起
  const points = [
    [0, 80],
    [100, 100],
    [200, 30],
    [300, 50],
    [400, 40],
    [500, 80]
  ]
  d3.select('.test6 svg path')
    .attr('d', areaGenerator(points))
})();
//========  TEST6 ========//


//========  TEST7 ========//
(function test7() {
  const points = [
    { x: 0, low: 30, high: 80 },
    { x: 100, low: 80, high: 100 },
    { x: 200, low: 20, high: 30 },
    { x: 300, low: 20, high: 50 },
    { x: 400, low: 10, high: 40 },
    { x: 500, low: 50, high: 80 }
  ];
  const lowNums = points.map(({ low }) => low);
  const highNums = points.map(({ high }) => high);
  const xScale = d3.scaleLinear().domain([0, d3.max(points.map(({ x }) => x))]).range([0, 800]);
  const yScale = d3.scaleLinear().domain([d3.min(lowNums), d3.max(highNums)]).range([150, 0]);
  const areaGenerator = d3.area()
    .y0((d) => yScale(d.low)) // y0 代表底下那條線
    .y1((d) => yScale(d.high)) // y1 代表上面那條線
    .x((d) => xScale(d.x))
  d3.select('.test7 svg path')
    .attr('d', areaGenerator(points))
})();
//========  TEST7 ========//


//========  TEST8 ========//
(function test8() {
  /**
   * 雷達區域圖
   */
   const points = [
    { angle: 0, r0: 20, r1: 80 },
    { angle: Math.PI * 0.25, r0: 20, r1: 40 },
    { angle: Math.PI * 0.5, r0: 20, r1: 80 },
    { angle: Math.PI * 0.75, r0: 20, r1: 40 },
    { angle: Math.PI, r0: 20, r1: 80 },
    { angle: Math.PI * 1.25, r0: 20, r1: 40 },
    { angle: Math.PI * 1.5, r0: 20, r1: 80 },
    { angle: Math.PI * 1.75, r0: 20, r1: 40 },
    { angle: Math.PI * 2, r0: 20, r1: 80 }
  ];

  const radialAreaGenerator = d3.radialArea()
    .angle((d) => d.angle)
    .innerRadius((d) => d.r0)
    .outerRadius((d) => d.r1)

  d3.select('.test8 svg path')
    .attr('d', radialAreaGenerator(points))
})();
//========  TEST8 ========//


//========  TEST9 ========//
(function test9() {
  const colors = ['#FBB65B', '#513551', '#de3163'];
  const data = [
    { day: 'Mon', apricots: 120, blueberries: 180, cherries: 100 },
    { day: 'Tue', apricots: 60, blueberries: 185, cherries: 105 },
    { day: 'Wed', apricots: 100, blueberries: 215, cherries: 110 },
    { day: 'Thu', apricots: 80, blueberries: 230, cherries: 105 },
    { day: 'Fri', apricots: 120, blueberries: 240, cherries: 105 },
  ];
  const dayIndexMap = data.reduce((accu, { day }, index) => ({ ...accu, [day]: index}), {});
  const stack = d3.stack().keys(['apricots', 'blueberries', 'cherries'])
  const stackedSeries = stack(data);

  d3.select('.test9 svg.bar')
    .selectAll('g.series')
    .data(stackedSeries)
    .join('g')
    .classed('series', true)
    .style('fill', (d, i) => colors[i])
    // rect
    .selectAll('rect')
    .data((d, i) => {
      // 把這邊的 index 帶入是為了下面的 delay
      return d.map((item) => {
        item['parentIndex'] = i
        return item;
      });
    })
    .join('rect')
    .attr('x', (d) => d[0])
    .attr('y', (d, i) => i * 30)
    .attr('height', 20)
    .transition()
    .duration(500)
    .delay((d, i) => {
      return d.parentIndex * 500;
    })
    .attr('width', (d, i) => d[1] - d[0])

  const yScale = d3.scaleLinear().domain([0, 600]).range([200, 0]);

  const areaGenerator = d3.area()
    .x((d, i) => i * 100)
    .y0((d) => yScale(d[0]))
    .y1((d) => yScale(d[1]))

  d3.select('.test9 svg.area')
    .selectAll('path')
    .data(stackedSeries)
    .join('path')
    .attr('d', (d) => {
      // const points = d.map((d) => [d[0], d[1]]);
      // console.log(points);
      return areaGenerator(d);
    })
    .style('fill', (d, i) => colors[i])
    .style('stroke', 'none')
})();
//========  TEST9 ========//


//========  TEST10 ========//
(function test10() {
  const PI = Math.PI;
  const arcData = [
    { startAngle: 0, endAngle: 0.25 * PI },
    { startAngle: 0.25 * PI, endAngle: 0.5 * PI },
    { startAngle: 0.5 * PI, endAngle: 0.75 * PI },
    { startAngle: 0.75 * PI, endAngle: 1 * PI },
    { startAngle: 1 * PI, endAngle: 1.25 * PI },
    { startAngle: 1.25 * PI, endAngle: 1.5 * PI },
    { startAngle: 1.5 * PI, endAngle: 1.75 * PI },
    { startAngle: 1.75 * PI, endAngle: 2 * PI },
  ]
  const arcGenerator = d3.arc()
    .innerRadius(20)     // 可以先定義好值，也可在下面才傳入 innerRadius
    .outerRadius(100)
    .padAngle(0.08)
    // .padRadius(100)
    .cornerRadius(4);
  d3.select('.test10 svg.arc g')
    .selectAll('path')
    .data(arcData)
    .join('path')
    // .attr('d', arcGenerator)
    .attr('d', (d) => arcGenerator(d)) // 我覺得這樣寫比較直觀
})();
//========  TEST10 ========//

//========  TEST11 ========//
(function test11() {
  const PI = Math.PI;
  const arcData = [
    { startAngle: 0, endAngle: 0.25 * PI, label: 'a' },
    { startAngle: 0.25 * PI, endAngle: 0.5 * PI, label: 'b' },
    { startAngle: 0.5 * PI, endAngle: 0.75 * PI, label: 'c' },
    { startAngle: 0.75 * PI, endAngle: 1 * PI, label: 'd' },
    { startAngle: 1 * PI, endAngle: 1.25 * PI, label: 'e' },
    { startAngle: 1.25 * PI, endAngle: 1.5 * PI, label: 'f' },
    { startAngle: 1.5 * PI, endAngle: 1.75 * PI, label: 'g' },
    { startAngle: 1.75 * PI, endAngle: 2 * PI, label: 'h' },
  ]
  const arcGenerator = d3.arc()
    .innerRadius(20)
    .outerRadius(100)
    .padAngle(0.08)
    // .padRadius(100)
    .cornerRadius(4);
  d3.select('.test11 svg.arc g')
    .selectAll('path')
    .data(arcData)
    .join('path')
    .attr('d', arcGenerator)

  d3.select('.test11 svg.arc g')
    .selectAll('text')
    .data(arcData)
    .join('text')
    .each(function(d) {
      const [x, y] = arcGenerator.centroid({
        startAngle: d.startAngle,
        endAngle: d.endAngle
      });
      d3.select(this).attr('x', x).attr('y', y).attr('dy', '0.33em').text(d.label)
    })
})();
//========  TEST11 ========//

//========  TEST12 ========//
/**
 * d3.pie() 要與 d3.arc() 一起使用，pie() 會產出 .arc() 需要用的資料
 */
(function test12() {
  const pieGenerator = d3.pie();
  const data = [10, 40, 30, 20, 60, 80];
  const arcData = pieGenerator(data);
  // arcData 的長相會是
  // {
  //   data: 10,
  //   endAngle: 6.28,
  //   index: 5,
  //   padAngle: 0,
  //   startAngle: 6.02
  //   value: 10
  // }

  const arcGenerator = d3.arc().innerRadius(20).outerRadius(100)
  d3.select('.pie g')
    .selectAll('path')
    .data(arcData)
    .join('path')
    .attr('d', arcGenerator)
    .style('fill', 'orange')
    .style('stroke', '#fff')

  // --------------- //
  const fruits = [
    { name: 'Apples', quantity: 20 },
    { name: 'Bananas', quantity: 40 },
    { name: 'Cherries', quantity: 50 },
    { name: 'Damsons', quantity: 10 },
    { name: 'Elderberries', quantity: 30 },
  ]

  const pieGenerator2 = d3.pie()
    // 如果只想要半圓也可以在這邊控制，然後把 data 傳入就能算出角度
    .startAngle(-0.5 * Math.PI) // 設定開始角度
    .endAngle(0.5 * Math.PI) // 設定結束角度
    // 如果是物件，這樣控制圓餅圖要計算比例的值是哪一個
    .value((d) => d.quantity)
    // default sort 是依據值的降冪 order
    .sort((a, b) => {
      return a.quantity - b.quantity
    })

  const arcData2 = pieGenerator2(fruits);
  const arcGenerator2 = d3.arc().innerRadius(20).outerRadius(100)
  d3.select('.pie2 g')
    .selectAll('path')
    .data(arcData2)
    .join('path')
    .attr('d', arcGenerator2)
    .style('fill', 'orange')
    .style('stroke', '#fff')

  d3.select('.pie2 g')
    .selectAll('text')
    .data(arcData2)
    .join('text')
    .text((d) => d.data.name)
    .each(function(d) {
      const [x, y] = arcGenerator2.centroid({
        startAngle: d.startAngle,
        endAngle: d.endAngle
      })
      d3.select(this).attr('x', x).attr('y', y);
    })
    .attr('text-anchor', 'middle')
    .style('font-size', '12px')
})();
//========  TEST12 ========//