const addIdea = (id, data) => ({
  type: "ADD_IDEA",
  id,
  data
});

const updateIdea = (id, data) => ({
  type: "UPDATE_IDEA",
  id,
  data
});

const setIdeas = ideas => ({
  type: "SET_IDEAS",
  ideas
});

export { addIdea, updateIdea, setIdeas };
