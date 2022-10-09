import * as d3 from 'https://cdn.skypack.dev/d3@7';

//========  TEST1 ========//
{
  const data = [
    { 'Title': 'Adaptation', 'Distributor': 'Sony Pictures', 'Genre': 'Comedy', 'Worldwide_Gross': 22498520, 'Rating': 91 },
    { 'Title': 'Air Bud', 'Distributor': 'Walt Disney Pictures', 'Genre': 'Comedy', 'Worldwide_Gross': 27555061, 'Rating': 45 },
    { 'Title': 'Air Force One', 'Distributor': 'Sony Pictures', 'Genre': 'Action', 'Worldwide_Gross': 315268353, 'Rating': 78 },
    { 'Title': 'Alex & Emma', 'Distributor': 'Warner Bros.', 'Genre': 'Drama', 'Worldwide_Gross': 15358583, 'Rating': 11 },
    { 'Title': 'Alexander', 'Distributor': 'Warner Bros.', 'Genre': 'Adventure', 'Worldwide_Gross': 167297191, 'Rating': 16 },
    { 'Title': 'Ali', 'Distributor': 'Sony Pictures', 'Genre': 'Drconstdama', 'Worldwide_Gross': 84383966, 'Rating': 67 },
    { 'Title': 'Alice in Wonderland', 'Distributor': 'Walt Disney Pictures', 'Genre': 'Adventure', 'Worldwide_Gross': 1023291110, 'Rating': 51 },
    { 'Title': 'Alive', 'Distributor': 'Walt Disney Pictures', 'Genre': 'Adventure', 'Worldwide_Gross': 36299670, 'Rating': 71 },
    { 'Title': 'All the King\'s Men', 'Distributor': 'Sony Pictures', 'Genre': 'Drama', 'Worldwide_Gross': 9521458, 'Rating': 11 },
    { 'Title': 'Amadeus', 'Distributor': 'Warner Bros.', 'Genre': 'Drama', 'Worldwide_Gross': 51973029, 'Rating': 96 }
  ]

  function sumWorldwideGross(group) {
    return d3.sum(group, (d) => {
      return d['Worldwide_Gross'];
    })
  }

  function doRollup(data) {
    const groups = d3.rollup(
      data,
      sumWorldwideGross,
      (d) => d.Distributor,
      (d) => d.Genre
    );
    console.log(groups); // rollup 回傳的是 Map()
    // 如果 Distributor 和 Genre 都相同的話，就會被整合起來，所以 groups 加起來只剩 8 個項目

    const root = d3.hierarchy(groups);
    console.log(root); // 一開始的 root 是沒有 value 的

    root.sum((d) => {
      console.log(d);
      return d[1];
    })

    console.log(root) // .sum() 後就有 value了
  }

  doRollup(data);

}
//========  TEST1 ========//



//========  tree ========//
{

}
//========  tree ========//