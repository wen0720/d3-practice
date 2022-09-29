import * as d3 from 'https://cdn.skypack.dev/d3@7';

//========  TEST1 ========//
{
const scale = d3.scaleLinear().domain([0, 100]).range([0, 600])
const axis = d3.axisBottom(scale)

d3.select('.test1 svg g')
  .call(axis)
}
//========  TEST1 ========//


//========  TEST2 ========//
{
const scaleLinear = d3.scaleLinear().domain([0, 100]).range([0, 600])
const scaleSqrt = d3.scaleSqrt().domain([0, 100]).range([0, 600])
const scaleTime = d3.scaleTime().domain([new Date(2022, 0, 1), new Date(2022, 11, 1)]).range([0, 600])
const scaleBand = d3.scaleBand().domain(['Mon', 'Tue', 'Wed', 'Thr', 'Fri']).range([0, 600])

const appendText = function(selection, text) {
  selection
    .append('text')
    .text(text)
    .attr('fill', '#000')
    .attr('text-anchor', 'start')
    .attr('font-size', '16')
    .attr('dy', -10)
}

const axisLinear = d3.axisBottom(scaleLinear)
const axisSqrt = d3.axisBottom(scaleSqrt)
const axisTime = d3.axisBottom(scaleTime)
const axisBand = d3.axisBottom(scaleBand)

d3.select('.test2 svg g')
  .append('g')
  .classed('linear', true)
  .call(axisLinear)
  .call(appendText, 'axisLinear')


d3.select('.test2 svg g')
  .append('g')
  .attr('transform', 'translate(0, 50)')
  .classed('sqrt', true)
  .call(axisSqrt)
  .call(appendText, 'axisSqrt')

d3.select('.test2 svg g')
  .append('g')
  .attr('transform', 'translate(0, 100)')
  .classed('time', true)
  .call(axisTime)
  .call(appendText, 'axisTime')

  d3.select('.test2 svg g')
    .append('g')
    .attr('transform', 'translate(0, 150)')
    .classed('band', true)
    .call(axisBand)
    .call(appendText, 'axisBand')
}
//========  TEST2 ========//



//========  TEST3 ========//
{
// 可以用 ticks 去設定 axes 要分成幾分
const scaleLinear = d3.scaleLinear().domain([0, 100]).range([0, 600]);
const axis = d3.axisBottom(scaleLinear).ticks(20)

d3.select('.test3 svg g.g1').call(axis)
}
{

const scaleLinear = d3.scaleLinear().domain([0, 100]).range([0, 600]);
const axis = d3.axisBottom(scaleLinear)
  .tickValues([3, 25, 50, 60, 100])
d3.select('.test3 svg g.g2').call(axis)
}
//========  TEST3 ========//


//========  TEST4 ========//
/**
 * Tick Transition
 */
{
  const scaleLinear = d3.scaleLinear().domain([0, 100]).range([0, 600])
  let axis = d3.axisBottom(scaleLinear)
    .tickPadding(15)
    .tickSize(100)

  const update = () => {
    d3.select('.test4 svg g')
      .transition()
      .call(axis)
  }

  const updateScaleDomain = () => {
    const min = Math.random() * 100;
    const max = min + Math.random() * 100;
    scaleLinear.domain([min, max]).nice();
    update()
  }
  update();
  window.updateScaleDomain = updateScaleDomain;
}
//========  TEST4 ========//
