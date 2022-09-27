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