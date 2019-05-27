import deepFreeze from "deep-freeze";
import clusteringReducer from "../reducers/clusteringReducer";
import { moveSpark, loadSparks, renameCluster } from "../actions";
import Cluster from "../models/cluster";
import CHI19S1_ideas from "../data/CHI19S1-ideas.json";

const typeBoard = { type: "BOARD" };
const typeStack = { type: "STACK" };
const typeCluster = id => {
  return { type: "CLUSTER", id };
};

it("add sparks to stackSparks", () => {
  expect(
    clusteringReducer(
      { stackSparks: [], nextIndex: 0, sparksLoaded: true },
      loadSparks([1, 2, 3, 5, 6])
    )
  ).toEqual({ stackSparks: [1, 2, 3, 5, 6], nextIndex: 5, sparksLoaded: true });
});

it("move spark on board", () => {
  const stateBefor = { boardSparks: [{ id: 1, position: 1 }] };
  const stateAfter = { boardSparks: [{ id: 1, position: 2 }] };
  deepFreeze(stateBefor);
  deepFreeze(stateAfter);
  expect(
    clusteringReducer(stateBefor, moveSpark(typeBoard, typeBoard, 1, 2))
  ).toEqual(stateAfter);
});

it("move Spark from Stack to Board", () => {
  const stateBefor = {
    stackSparks: [{ id: 2, position: 0 }],
    boardSparks: [{ id: 1, position: 1 }]
  };
  const stateAfter = {
    stackSparks: [],
    boardSparks: [{ id: 1, position: 1 }, { id: 2, position: 2 }]
  };
  deepFreeze(stateBefor);
  deepFreeze(stateAfter);
  expect(
    clusteringReducer(stateBefor, moveSpark(typeStack, typeBoard, 2, 2))
  ).toEqual(stateAfter);
});

it("move Spark from Cluster1 to Cluster2", () => {
  const sparks = CHI19S1_ideas.slice(0, 10);
  let p1 = { left: 2, top: 1 };
  let p2 = { left: 1, top: 2 };
  let c1 = new Cluster(p1, sparks.slice(0, 5), 1, "eins");
  let c2 = new Cluster(p2, sparks.slice(5), 2, "zwei");
  let stateBefor = {
    clusters: [c1, c2]
  };
  let stateAfter = {
    clusters: [
      { ...c1, sparks: c1.sparks.slice(0, 4) },
      { ...c2, sparks: [{ ...c1.sparks[4], position: p2 }, ...c2.sparks] }
    ]
  };
  expect(
    clusteringReducer(
      stateBefor,
      moveSpark(typeCluster(1), typeCluster(2), sparks[4].id, p1)
    )
  ).toEqual(stateAfter);
});

it("rename Cluster eins", () => {
  let p1 = { left: 2, top: 1 };
  let p2 = { left: 1, top: 2 };
  let c1 = new Cluster(p1, undefined, 1, "eins");
  let c2 = new Cluster(p2, undefined, 2, "zwei");
  let stateBefor = {
    clusters: [c1, c2]
  };
  let stateAfter = {
    clusters: [c2, { ...c1, name: "drei" }]
  };
  expect(clusteringReducer(stateBefor, renameCluster(1, "drei"))).toEqual(
    stateAfter
  );
});
