import * as d3 from 'https://cdn.skypack.dev/d3@7';

//========  TEST1 ========//
(function test1() {
  const data = [40, 10, 20, 60, 30];

  d3.select('.test1 .chart')
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', (d, i) => i * 50)
    .attr('r', (d, i) => d / 2)
    .attr('fill', 'orange')
})();
//========  TEST1 ========//

//========  TEST2 ========//
/**
 * 球的大小被用來以 d.population 表示
 */
(function test2() {
  const data = [
    { name: 'London', population: 8674000},
    { name: 'New York', population: 8406000},
    { name: 'Sydney', population: 4293000},
    { name: 'Paris', population: 2244000},
    { name: 'Beijing', population: 11510000}
  ];

  d3.select('.test2 .chart')
    .selectAll('cricle')
    .data(data)
    .join('circle')
    .attr('cx', (d, i) => i * 80)
    .attr('r', (d) => d.population * 0.000004)
    .attr('fill', 'blue')
})();
//========  TEST2 ========//

//========  TEST3 ========//
(function test3() {
  const data = [
    { name: 'London', population: 8674000},
    { name: 'New York', population: 8406000},
    { name: 'Sydney', population: 4293000},
    { name: 'Paris', population: 2244000},
    { name: 'Beijing', population: 11510000}
  ];

  d3.select('.test3 .bars')
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('y', (d, i) => i * 20)
    .attr('width', (d) => d.population * 0.00004)
    .attr('height', 19)
    .attr('fill', 'blue')

  d3.select('.test3 .labels')
    .selectAll('text')
    .data(data)
    .join('text')
    .attr('dy', (d, i) => i * 20 + 14)
    .attr('text-anchor', 'end')
    .attr('x', 70)
    .text((d) => d.name)
})();
//========  TEST3 ========//

//========  TEST4 ========//
/**
 * .data(資料, key function)
 * key function 是識別的唯一值
 */
(function test4() {
  const aUtf16 = 'a'.charCodeAt();
  const aToZ = Array.from({ length: 26 }).map((v, i) => String.fromCharCode(aUtf16 + i));
  let insertIndex = 0;
  const getAbcData = (insertIndex) => aToZ.slice(0, insertIndex).reverse()
  const updateAbc = () => {
    insertIndex = insertIndex + 1;
    const newData = getAbcData(insertIndex);
    d3.select('.nums')
      .selectAll('div')
      .data(newData, function(d) {
        return d;
      })
      .join('div')
      .transition()
      .style('left', (d, i) => `${i * 50}px`)
      .text((d, i) => newData[newData.length - 1 - i])
  }
  updateAbc();
  window.updateAbc = updateAbc;
})();
//========  TEST4 ========//