const renameCluster = (id, name) => ({
  type: "RENAME_CLUSTER",
  id,
  name
});

const loadSparks = sparks => ({
  type: "LOAD_SPARKS",
  sparks
});

const moveCluster = (id, position) => ({
  type: "MOVE_CLUSTER",
  id,
  position
});

const moveSpark = (source, sink, id, position) => ({
  type: "MOVE_SPARK",
  source,
  sink,
  id,
  position
});

const turnOverStack = () => ({
  type: "TURN_OVER_STACK"
});

const turnBackStack = () => ({
  type: "TURN_BACK_STACK"
});

const resetState = () => ({
  type: "RESET_STATE"
});

const setActiveSpark = (id, container, index, conceptSIM) => ({
  type: "SET_ACTIVE_SPARK",
  id,
  index,
  container,
  conceptSIM
});

const setActiveConcept = (id, container, index, concept, conceptSIM) => ({
  type: "SET_ACTIVE_CONCEPT",
  id,
  container,
  index,
  concept,
  conceptSIM
});

const removeAvtiveSpark = () => ({
  type: "REMOVE_ACTIVE_SPARK"
});

const updateSpark = (id, container, updateObj) => ({
  type: "UPDATE_SPARK",
  id,
  container,
  updateObj
});

export * from "./ideaActions";
export * from "./contestAction";
export {
  moveSpark,
  moveCluster,
  loadSparks,
  renameCluster,
  turnOverStack,
  turnBackStack,
  resetState,
  setActiveSpark,
  setActiveConcept,
  updateSpark,
  removeAvtiveSpark
};
