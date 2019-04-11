import DATA from "./ac1-export-complete.json";

const getDATA = () => {
  var sparks = DATA["@graph"].map((spark, i) => {
    return {
      content: spark.content,
      "@id": spark["@id"],
      id: spark["@id"]
        .split("/")
        .filter(v => v !== "")
        .pop(),
      title: `Spark ${i}`,
      position: { left: 0, top: 0 }
    };
  });
  return sparks;
};

export { getDATA, DATA };
