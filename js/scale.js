import * as d3 from 'https://cdn.skypack.dev/d3@7';

/*

d3 的 scale function 大多時候接受一個 input(數列、日期、類別...)
然後會回傳一個 output(座標、顏色、長度、半徑...)

d3 有 12 種 scale function，大致上可以分成 3 種類型
1. input 連續的值，output 連續的值
  scaleLinear / scaleSqrt / scalePow / scaleLog / scaleTime / scaleSequential
2. input 連續的值，output 離散的值

2. input 離散的值，output 離散的值

連續數據通常是數字數據，但也包括時間和日期。
離散數據具有一定數量的值（例如一年中的十二個月）。）

*/


//========  scaleLinear ========//
/**
 * 適合用來把值轉換成位置或長度
 */
{
  let linearScale = d3.scaleLinear().domain([0, 10]).range([0, 600])
  console.log(linearScale(0))
  console.log(linearScale(2))
  console.log(linearScale(10))
}
//========  scaleLinear ========//


//========  scaleSqrt ========//
/**
 * 平方根，適合用來處理以面積為視覺主軸的圖表
 */
{
  let sqrtScale = d3.scaleSqrt().domain([0, 100]).range([0, 30])
  console.log(sqrtScale(2))
  console.log(sqrtScale(50))
  console.log(sqrtScale(100))
  const data = Array.from({ length: 10 }).map((v, i) => (i + 1) * 10)
  d3.select('.test1 svg g')
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', (d, i) => i * 70)
    .attr('cy', 0)
    .attr('r', (d, i) => sqrtScale(d))
    .attr('fill', 'grey')
    .attr('stroke', 'none')
}
//========  scaleSqrt ========//


//========  scaleLog ========//
/**
 * scaleLog interpolates using a log function y=m*log(x)+b and can be useful when the data has an exponential nature to it.
 * 如果資料是指數型成長的話，用此 scale 會是合適的
 */
{
  const logScale = d3.scaleLog().domain([10, 100000]).range([0, 700]);
  const data = [10, 100, 1000, 10000, 100000];
  d3.select('.test2 svg g')
    .selectAll('text')
    .data(data)
    .join('text')
    .attr('x', (d) => logScale(d))
    .text((d) => d)
}
//========  scaleLog ========//


//========  scaleTime ========//
{
  const timeScale = d3.scaleTime()
    .domain([new Date(2016, 0, 1), new Date(2017, 0, 1)])
    .range([0, 700])
  const data = [new Date(2016, 0, 1), new Date(2016, 6, 1), new Date(2017, 0, 1)];
  d3.select('.test3 svg g')
    .selectAll('text')
    .data(data)
    .join('text')
    .attr('x', (d) => timeScale(d))
    .text((d) => d.toLocaleString())
}
//========  scaleTime ========//

//========  scaleSequential ========//
{
  const sequentialScale = d3.scaleSequential()
    .domain([0, 100])
    .interpolator(d3.interpolateRainbow) // 也可以使用 interpolator 取代 range，這邊使用 d3 預設提供的

  console.log(sequentialScale(0))
  console.log(sequentialScale(50))
  console.log(sequentialScale(100))
}
{
  ////////
  const linearScale = d3.scaleLinear().domain([0, 100]).range([0, 600])
  const sequentialScale = d3.scaleSequential().domain([0, 100])
  const interpolators = [
    'interpolateViridis',
    'interpolateInferno',
    'interpolateMagma',
    'interpolatePlasma',
    'interpolateWarm',
    'interpolateCool',
    'interpolateRainbow',
    'interpolateCubehelixDefault'
  ];

  const myData = d3.range(0, 100, 2);

  d3.select('#wrapper')
    .selectAll('g.interpolator')
    .data(interpolators)
    .join('g')
    .classed('interpolator', true)
    .attr('transform', (d, i) => {
      return `translate(0, ${i * 70})`
    })
    .each(function (d, i) {
      sequentialScale.interpolator(d3[d]); // 這邊決定要用哪一個 interpolators

      d3.select(this)
        .append('text')
        .attr('y', -10)
        .text(d)

      d3.select(this)
        .selectAll('rect')
        .data(myData)
        .join('rect')
        .attr('x', (d) => linearScale(d))
        .attr('width', 10)
        .attr('height', 40)
        .attr('fill', sequentialScale)
    })

}
//========  scaleSequential ========//

//========  clamping ========//
/**
簡單來說就是有超過比例尺範圍的資料，要計算出來，還是就規範在比例尺所定義的範圍內
*/
{
  const linearScale = d3.scaleLinear().domain([0, 10]).range([0, 100]);
  console.log(linearScale(4))
  console.log(linearScale(11)) // 超過原本設定的值了，但是還是會算出來
  console.log(linearScale(-1)) // 超過原本設定的值了，但是還是會算出來

  linearScale.clamp(true)
  console.log(linearScale(11)) // 有 clamp 就會規範在原本定義的最大範圍內
  console.log(linearScale(-1)) // 有 clamp 就會規範在原本定義的最小範圍內
}
//========  clamping ========//

//======== multiple segments ========//
/**
通常 scaleLinear, scalePow, scaleSqrt, scaleLog.... 的 domain 和 range 都只會給 2 個值，
不過如果你給 3 個值，或者是多段，也次可以被分成多個區段
*/
{
  const colorScale = d3.scaleLinear()
    .domain([-10, 0, 10])
    .range(['red', '#ddd', 'blue'])
  const colorData = d3.range(-10, 12, 2);
  const xScale = d3.scaleLinear()
    .domain([0, colorData.length - 1])
    .range([0, 600])

  d3.select('.test5 svg g')
    .selectAll('circle')
    .data(colorData)
    .join('circle')
    .attr('cx', (d, i) => xScale(i))
    .attr('r', 15)
    .attr('fill', colorScale)
  console.log(colorData);
}
//======== multiple segments ========//

//======== inversion ========//
{
  const linearScale = d3.scaleLinear().domain([0, 10]).range([0, 100]);
  console.log(linearScale.invert(50));
  console.log(linearScale.invert(100)); // 用 invert 可以從 range 反查回 domain
}
//======== inversion ========//


/*
*
*
*
第 2 種
【input 連續的值，output 離散的值】
*
*
*
*/

//======== scaleQuantize ========//
/**
因為輸出的是離散的值，所以在下面例子當中，
0 <= x < 25 都會是 lightblue
25 <= x < 50 都會是 orange
50 <= x < 75 都會是 lightgreen
75 <= x < 100 都會是 pink
*/
{
  const quantizeScale = d3.scaleQuantize().domain([0, 100]).range(['lightblue', 'orange', 'lightgreen', 'pink'])
  const xScale = d3.scaleLinear().domain([0, 100]).range([0, 600])
  const data = d3.range(0, 102, 2);
  d3.select('.test6 svg g')
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', xScale)
    .attr('width', 6)
    .attr('height', 20)
    .attr('fill', quantizeScale)
}
//======== scaleQuantize ========//


//======== scaleQuantile ========//
/**
scaleQuantile 的 .domain 要帶入一個數組，然後會以數組的數量做分組
如下案例：
0, 5, 7, 10, 20（前5個）是 lightblue
30, 35, 40, 60, 62（中間5個）是 orange
65, 70, 80, 90, 100（後5個）是 lightgreen
*/
{
  const myData = [0, 5, 7, 10, 20, 30, 35, 40, 60, 62, 65, 70, 80, 90, 100];
  const quantileScale = d3.scaleQuantile()
    .domain(myData)
    .range(['lightblue', 'orange', 'lightgreen'])
  const xScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 600])
  d3.select('.test7 svg g')
    .selectAll('circle')
    .data(myData)
    .join('circle')
    .attr('r', 4)
    .attr('cx', xScale)
    .attr('fill', quantileScale)

  console.log(quantileScale.quantiles()) // 這個會帶出分割點
}
//======== scaleQuantile ========//


//======== scaleThreshold ========//
{
  const xScale = d3.scaleLinear()
    .domain([-10, 110])
    .range([0, 600])
  const thresholdScale = d3.scaleThreshold()
    .domain([0, 50, 100])  // 可以透過 domain 給的值去控制分割的比例，現在這樣是指 lightblue 一半，orange 一半
    .range(['#ccc', 'lightblue', 'orange', '#ccc'])
  const myData = d3.range(-10, 110, 2);

  d3.select('.test8 svg g')
    .selectAll('rect')
    .data(myData)
    .join('rect')
    .attr('x', xScale)
    .attr('width', 9)
    .attr('height', 20)
    .attr('fill', thresholdScale)
}
//======== scaleThreshold ========//



/*
*
*
*
第 3 種
【input 離散的值，output 離散的值】
*
*
*
*/

//======== scaleBand ========//
/**
 * 用來繪製 bar chart 很方便，可以用 bandwidth 拿到每個數組的間距
 */
{
  const data = [
    { day: 'Mon', value: 10 },
    { day: 'Tue', value: 40 },
    { day: 'Wed', value: 30 },
    { day: 'Thu', value: 60 },
    { day: 'Fri', value: 30 }
  ]

  const bandScale = d3.scaleBand()
    .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
    .range([0, 200])
    .paddingInner(0.05)

  d3.select('.test9 svg g')
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('y', (d) => bandScale(d.day))
    .attr('width', (d) => d.value)
    .attr('height', bandScale.bandwidth())
    .attr('fill', 'orange')
}
//======== scaleBand ========//



//======== scalePoint ========//
{
  const data = [
    { day: 'Mon', value: 10 },
    { day: 'Tue', value: 40 },
    { day: 'Wed', value: 30 },
    { day: 'Thu', value: 60 },
    { day: 'Fri', value: 30 }
  ]

  const pointScale = d3.scalePoint()
    .domain(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
    .range([0, 500])

  console.log(pointScale.step()) // 可以透過 step 拿到間距
  pointScale.padding(1); // 這裡 1 的概念是指 1份 step

  d3.select('.test10 svg g')
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', (d) => pointScale(d.day))
    .attr('fill', 'orange')
    .attr('r', 4)
}
//======== scalePoint ========//