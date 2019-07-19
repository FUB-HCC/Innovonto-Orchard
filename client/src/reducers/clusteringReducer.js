import Cluster from "../models/cluster";
import { getShape } from "../components";
import { isEqual } from "lodash";

const initialState = {
  stackSparks: [],
  boardSparks: [],
  clusters: [],
  nextIndex: 0,
  sparksLoaded: false
};

export default (state = initialState, action) => {
  const { type } = action;
  var spark, newState, clusters, stackSparks, c;
  switch (type) {
    case "MOVE_SPARK":
      const { source, sink, id, position } = action;
      [spark, newState] = removeSparkFromSource(state, source, id);
      if (!newState) return state;
      newState = addSparkToSink(
        newState,
        sink,
        { ...spark, position },
        isEqual(source, sink)
      );
      if (!newState) return state;
      return newState;
    case "LOAD_SPARKS":
      const { sparks } = action;

      //TODO merge the sparks (this doesn't work right now
      return {
        ...state,
        stackSparks: sparks,
        nextIndex: sparks.length + state.nextIndex,
        sparksLoaded: true
      };
    case "MOVE_CLUSTER":
      const { id: c_id, position: p } = action;
      [c, clusters] = removeElement(c_id, state.clusters);
      return { ...state, clusters: [...clusters, { ...c, position: p }] };
    case "RENAME_CLUSTER":
      const { id: rnid, name: rnname } = action;
      [c, clusters] = removeElement(rnid, state.clusters);
      return { ...state, clusters: [...clusters, { ...c, name: rnname }] };
    case "TURN_OVER_STACK":
      stackSparks = state.stackSparks;
      return {
        ...state,
        stackSparks: [
          ...stackSparks.slice(1, stackSparks.length),
          stackSparks[0]
        ]
      };
    case "TURN_BACK_STACK":
      stackSparks = state.stackSparks;
      return {
        ...state,
        stackSparks: [
          stackSparks[stackSparks.length - 1],
          ...stackSparks.slice(0, stackSparks.length - 1)
        ]
      };
    case "RESET_STATE":
      return { ...initialState };
    case "UPDATE_SPARK":
      const { updateObj } = action;
      [spark, newState] = removeSparkFromSource(
        state,
        action.container,
        action.id,
        true
      );
      if (!newState) return state;
      newState = addSparkToSink(newState, action.container, {
        ...spark,
        ...updateObj
      });
      if (!newState) return state;
      return newState;
    default:
      return state;
  }
};

/**
 * input @array - a list mit object holding an id
 * return the object holding the id and the array without the object
 **/
function removeElement(id, array) {
  let index = array.findIndex(a => a.id === id);
  let resultArray = [...array.slice(0, index), ...array.slice(index + 1)];
  return [array[index], resultArray];
}

function removeSparkFromSource(state, source, id, keepSource = false) {
  let boardSparks, stackSparks, clusters, spark, cluster, sparkList;
  switch (source.type) {
    case "BOARD":
      [spark, boardSparks] = removeElement(id, state.boardSparks);
      return [spark, { ...state, boardSparks: boardSparks }];
    case "STACK":
      [spark, stackSparks] = removeElement(id, state.stackSparks);
      return [spark, { ...state, stackSparks: stackSparks }];
    case "CLUSTER":
      [cluster, clusters] = removeElement(source.id, state.clusters);
      [spark, sparkList] = removeElement(id, cluster.sparks);
      if (sparkList.length < 1 && !keepSource) {
        return [spark, { ...state, clusters: clusters }];
      }
      return [
        spark,
        { ...state, clusters: [...clusters, { ...cluster, sparks: sparkList }] }
      ];
    default:
      return [null, null];
  }
}

function addSparkToSink(state, sink, spark, plusOneLength) {
  let boardSparks, clusters, cluster, spark2;
  switch (sink.type) {
    case "BOARD":
      return {
        ...state,
        boardSparks: [...state.boardSparks, spark]
      };
    case "STACK":
      return { ...state, stackSparks: [...state.stackSparks, spark] };
    case "CLUSTER":
      [cluster, clusters] = removeElement(sink.id, state.clusters);
      let place = getPlaceInCluster(spark, cluster, plusOneLength ? 1 : 0);
      console.log(place);
      cluster = {
        ...cluster,
        sparks: [
          ...cluster.sparks.slice(0, place),
          { ...spark, position: cluster.position },
          ...cluster.sparks.slice(place)
        ]
      };
      return { ...state, clusters: [...clusters, cluster] };
    case "SPARK":
      [spark2, boardSparks] = removeElement(sink.id, state.boardSparks);
      clusters = [
        ...state.clusters,
        new Cluster(spark.position, [spark, spark2])
      ];
      return { ...state, clusters: clusters, boardSparks: boardSparks };
    case "TRASH":
      return state;
    default:
      return null;
  }
}

const getPlaceInCluster = (spark, cluster, plus) => {
  if (!spark.position) return cluster.sparks.length;
  const [w] = getShape(cluster.sparks.length + plus);
  console.log(w, cluster.position, spark.position);
  let wp = Math.round((spark.position.left - cluster.position.left) / 120);
  let hp = Math.round((spark.position.top - cluster.position.top) / 120);
  console.log(wp, hp);
  return hp * w + wp;
};
