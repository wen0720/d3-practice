import * as d3 from 'https://cdn.skypack.dev/d3@7';

//========  TEST1 ========//

d3.selectAll('.test1 circle')
  .style('fill', 'orange')
  .attr('r', () => Math.random() * 40 + 10)

//========  TEST1 ========//


//========  TEST2 ========//

/**【說明】
  .style - update style - d3.selectAll('.selector').style('fill', 'red');
  .attr - update attribute - d3.selectAll('rect').attr('width', 10);
  .classed - add or remove class - d3.select('.selector').classed('active', true)
  .property - update an element's property - d3.selectAll('.checkbox).property('checked', false);
  .text - update text content - d3.select('div.title').text('My new Book');
  .html - change html content - d3.select('.legend').html('<div>11111</div>');
*/

d3.selectAll('.test2 circle')
  .attr('r', () => Math.random() * 10 + 3)
  .style('fill', 'green')
// checkbox
d3.select('input#test')
  .property('checked', true)
// text
d3.select('.word').text('測試文字')

//========  TEST2 ========//


//========  TEST3 ========//
/**【說明】
  如上的方法(.style...)，也可以使用 function 帶入
  ex: .style('r', (d, i) => { return i * 30 })
  d 代表 joined data
  i 代表 index
*/
d3.selectAll('.test3 > svg > g > circle')
  .attr('cx', (d, i) => i * 100)
  .attr('r', (d, i) => i * 10 + 10)
  .attr('fill', 'yellow')


//========  TEST3 ========//



//========  TEST4 ========//
/**【說明】
 Event Handling
 callback 會接到的參數是 e(event), d(joined data)
*/
d3.selectAll('.test4  circle')
  .attr('cx', (d, i) => i * 50)
  .attr('r', 40)
  .style('fill', 'blue')
  .on('click', function(event, d) {
    // 這邊的 this 要在用 d3.select(this)，轉為 d3 相關物件
    d3.select(this).style('fill', 'red');
  })

//========  TEST4 ========//



//========  TEST5 ========//
/**【說明】
  .append 直接插入最下面一個
  .insert 可指定插入某一個元素之前
  .remove 移除
*/
d3.selectAll('.test5 g.item')
  .append('text')
  .text('A')
  .style('font-size', '40px')
d3.selectAll('.test5 g.item')
  .insert('rect', 'circle')
  .attr('fill', 'grey')
  .attr('width', '100px')
  .attr('height', '10px')

//========  TEST5 ========//



//========  TEST6 ========//
/**
  .each((d, i) => {})
*/
d3.selectAll('.test6 circle')
  .each(function(d, i) {
    const isEven = i % 2 === 0;
    d3.select(this)
      .attr('cx', i * 50)
      .attr('r', 20)
      .style('fill', isEven ? 'grey' : 'blue')
  })

//========  TEST6 ========//


//========  TEST7 ========//
/**
  .call((selection) => {})
  作為參數帶入 .call(func) 中的 func，會接收一個參數，是 selection 本身
  這常被用來處理，如果有很多個 seleciton 都要做一樣的事情的話，可以用這這種方式共用邏輯
  如下範例：colorAll 就可以被很多 d3.select() 接下去 .call(colorAll) 使用
*/

const colorAll = (selection) => {
  selection.style('fill', 'orange')
}

d3.selectAll('.test7 circle')
  .attr('cx', (d, i) => i * 50)
  .attr('r', 20)
  .call(colorAll)
//========  TEST7 ========//