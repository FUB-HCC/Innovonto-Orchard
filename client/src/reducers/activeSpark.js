const activeSpark = (state = null, action) => {
  const { type, id, container, index, conceptSIM, concept } = action;
  switch (type) {
    case "SET_ACTIVE_SPARK":
      return {
        id,
        container,
        index,
        conceptSIM,
        active: true,
        concept: undefined
      };
    case "SET_ACTIVE_CONCEPT":
      return { id, container, index, conceptSIM, active: true, concept };
    case "MOVE_SPARK":
      const { sink } = action;
      if (state && state.active && id === state.id) {
        return { ...state, container: sink };
      }
      return state;
    case "REMOVE_ACTIVE_SPARK":
      return state;
    case "RESET_STATE":
      return null;
    case "SET_CURRENT_CONTEST":
      return null;
    default:
      return state;
  }
};

export default activeSpark;
