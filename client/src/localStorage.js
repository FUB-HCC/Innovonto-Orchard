var Ajv = require("ajv");
var ajv = new Ajv();
const stateSchema = require("./models/state.json");

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(err);
    // Ignore write errors.
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    const data = JSON.parse(serializedState);
    if (ajv.validate(stateSchema, data)) {
      console.log("valitated true", data);
      return data;
    }
    return undefined;
  } catch (err) {
    return undefined;
  }
};
