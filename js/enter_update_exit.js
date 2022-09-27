import * as d3 from 'https://cdn.skypack.dev/d3@7';

//========  TEST1 ========//
/**
 * .join(
 *    function(enter) {
 *       // enter selection(need create)
 *    },
 *    function(update) {
 *      // update selection(is exit)
 *    },
 *    function(exit) {
 *      // exit selection(need remove)
 *    }
 * )
 */
 (function test1() {
  const aUtf16 = 'a'.charCodeAt();
  const aToZ = Array.from({ length: 26 }).map((v, i) => String.fromCharCode(aUtf16 + i));
  let insertIndex = 0;
  const getAbcData = (insertIndex) => aToZ.slice(0, insertIndex)
  const updateAbc = () => {
    insertIndex = insertIndex + 1;
    const newData = getAbcData(insertIndex);
    d3.select('.nums')
      .selectAll('div')
      .data(newData, function(d) {
        return d;
      })
      .join(
        function(enter) {
          return enter.append('div')
            .style('left', (d, i) => `${(i - 1) * 50}px`);
        },
        function(update) {
          return update;
        },
        function(exit) {
          return exit.remove();
        }
      )
      .transition()
      .style('left', (d, i) => `${i * 50}px`)
      .text((d, i) => newData[i])
  }
  updateAbc();
  window.updateAbc = updateAbc;
})();
//========  TEST1 ========//