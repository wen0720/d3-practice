import * as d3 from 'https://cdn.skypack.dev/d3@7';

//========  TEST1 ========//
{
  let data = [];
  const width = 600;
  const height = 400;
  const numPoints = 100;

  function handleZoom(e) {
    d3.select('.test1 svg g').attr('transform', e.transform)
  }

  const zoom = d3.zoom()
    .scaleExtent([1, 5]) // 設定可以 scale 的極限
    .translateExtent([[0, 0], [width, height]]) // 設定可以 translate 的極限
    .on('zoom', handleZoom)

  function initZoom() {
    d3.select('.test1 svg')
      .call(zoom)
  }

  function updateData() {
    data = []
    for (let i = 0; i < numPoints; i++) {
      data.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
      })
    }
  }

  function update() {
    d3.select('.test1 svg g')
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('fill', 'rgba(0,0,0.5)')
      .attr('r', 3)
  }

  initZoom();
  updateData();
  update()

  function scaleByOnButton() {
    d3.select('.test1 svg')
      .transition()
      .duration(800)
      .call(zoom.scaleBy, 2)
  }

  function translateByOnButton() {
    d3.select('.test1 svg')
      .transition()
      .duration(800)
      .call(zoom.translateBy, 20, 20) // 整張圖往左上移動
  }

  window.scaleByOnButton = scaleByOnButton;
  window.translateByOnButton = translateByOnButton;

  // .translateBy:	adds a given x, y offset to the current transform
  // .translateTo:	sets the transform such that a given x, y coordinate is centered (or positioned on a given point [px, py])
  // .scaleBy:	multiplies the current scale factor by a given value
  // .scaleTo:	sets the scale factor to a given value
  // .transform:	sets the transform to a given transform. (Use d3.zoomIdentity to create a zoom transform.)
}
//========  TEST1 ========//