import * as d3 from 'https://cdn.skypack.dev/d3@7';

//======== pick ========//
/*
  quadtree（四叉樹） 是一種資料結構，可以用來做更有效率的碰撞探測
*/
{
  let data = [];
  const width = 600;
  const height = 400;
  const numPoints = 100;

  const quadtree = d3.quadtree()
    .x((d) => d.x)
    .y((d) => d.y)

  let hoverId = null;

  function updateData() {
    data = [];
    for (let i = 0; i < numPoints; i++) {
      data.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        r: 1 + Math.random() * 20,
      })
    }
  }

  function updateQuadTree() {
    quadtree.addAll(data)
  }

  function update() {
    d3.select('.test1 svg')
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', (d) => d.r)
      .attr('fill', (d) => d.id === hoverId ? 'red' : null)
  }

  function handleMousemove(event) {
    const [x, y] = d3.pointer(event, document.querySelector('.test1 svg'));
    const d = quadtree.find(x, y, 20) // 這邊 20 是指定 20 px 內的 points 會被探測到，然後找離最近的那個點
    hoverId = d ? d.id : undefined;
    update();
  }

  function initEvent() {
    d3.select('.test1 svg')
      .on('mousemove', handleMousemove)
  }

  updateData();
  updateQuadTree();
  update();
  initEvent();
}
//========  pick ========//