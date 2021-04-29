function group(items, key) {
    // get unique values for grouping key
    const unique = [
        ...new Set(items.map(item => item[key]))
    ];

    // will be ascending by default
    unique.sort();

    // sorting all of the results by title field
    const sortFn = (a, b) => a.title > b.title;

    const sortItems = (val) => {
        // filters the result set to items sharing the current group field value
        let sorted = items.filter(item => item[key] === val);
        // sort by title
        sorted.sort(sortFn);
        return sorted;
    }

    // reduce to a Map (which preserves insertion order and maintains the group key sorting)
    return unique.reduce((map, cur) => map.set(cur, sortItems(cur)), new Map());
}

// testing it out
data = [{
  title: 'foo',
    category: 'book',
    year: 2016,
}, {
    title: 'bar',
    category: 'book',
    year: 2016,
}, {
    title: 'blah',
    category: 'paper',
    year: 2010,
}, {
    title: 'idk',
    category: 'paper',
    year: 2015,
}]


let dropdown = document.querySelector('#group');

dropdown.addEventListener('change', function() {
  let html = [];
  let results = document.querySelector('#results');
  for (let [category, items] of group(data, this.value)) {
      html.push(`
         <div class="item">
            <h3>${category}</h3>
            <ol>${items.map(item => `<li>${item.title}</li>`).join('')}</ol>
         </div>
      `);
  }

  results.innerHTML = html.join('')
})