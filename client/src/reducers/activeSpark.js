const activeSpark = (state = null, { type, id, container }) => {
  switch (type) {
    case "SET_ACTIVE_SPARK":
      return { id, container };
    case "REMOVE_ACTIVE_SPARK":
      return null;
    case "RESET_STATE":
      return null;
    default:
      return state;
  }
};

export default activeSpark;
