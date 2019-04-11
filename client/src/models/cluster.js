import { v4 } from "uuid";

class Cluster {
  constructor(position, sparks = [], id = false, name) {
    this.id = id ? id : v4();
    this.name = name;
    this.position = position;
    this.sparks = sparks.map(spark => {
      return { ...spark, position: position };
    });
  }

  addSpark(spark) {
    this.sparks = [...this.sparks, { ...spark, position: this.position }];
    return this;
  }
}

export default Cluster;
