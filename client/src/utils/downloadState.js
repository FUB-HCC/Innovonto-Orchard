var FileSaver = require("file-saver");

export const downloadState = state => {
  let date = new Date();
  var blob = new Blob([JSON.stringify(convert(state), null, 2)], {
    type: "application/json;charset=utf-8"
  });
  FileSaver.saveAs(
    blob,
    "Clustering-State-" +
      date
        .toGMTString()
        .split(" ")
        .join("-") +
      ".json"
  );
};

function convert(state) {
  var { boardSparks, clusters } = state;
  var sparks = boardSparks.map(({ title, ...spark }) => ({
    ...spark,
    cluster: null
  }));
  clusters.forEach(c => {
    sparks = [...sparks, ...c.sparks.map(i => ({ ...i, cluster: c.id }))];
  });
  clusters = clusters.map(({ id, name, position }) => ({ id, name, position }));
  return { sparks, clusters };
}

export default downloadState;
