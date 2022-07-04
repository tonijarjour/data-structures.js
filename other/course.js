const depthFirstSearch = (graph, vertex, path, order, visited) => {
  path.push(vertex);

  for (let neighbor of graph[vertex]) {
    if (path.includes(neighbor)) return false;
    if (!visited.has(neighbor)) {
      visited.add(neighbor);
      if (!depthFirstSearch(graph, neighbor, path, order, visited))
        return false;
    }
  }

  order.push(path.pop());
  return true;
};

const solve = (n, prereqs) => {
  let graph = [];
  for (let i = 0; i < n; ++i) {
    graph.push([]);
  }
  for (let preq of prereqs) {
    graph[preq[1]].push(preq[0]);
  }
  let visited = new Set();
  let path = [];
  let order = [];

  for (let c = 0; c < n; ++c) {
    if (!visited.has(c)) {
      visited.add(c);
      if (!depthFirstSearch(graph, c, path, order, visited)) return false;
    }
  }

  console.log(order);
  return true;
};

console.log(
  solve(6, [
    [0, 1],
    [3, 0],
    [1, 3],
    [2, 1],
    [4, 1],
    [4, 2],
    [5, 3],
    [5, 4],
  ])
);
console.log();
console.log(
  solve(6, [
    [3, 0],
    [1, 3],
    [2, 1],
    [4, 1],
    [4, 2],
    [5, 3],
    [5, 4],
  ])
);
