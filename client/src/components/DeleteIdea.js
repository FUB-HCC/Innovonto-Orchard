import React from "react";
import { apiEndpoint } from "../utils";
import { EditButton } from "../styledComponents";
import { navigate } from "@reach/router";
const sendDeleteIdea = id => {
  apiEndpoint.delete("/ideas/" + id).then((response, err) => {
    if (!err && response.status === 204) {
      console.log(response);
      navigate("../ideas");
    }
  });
};
const DeleteIdea = ({ id }) => (
  <EditButton type={"delete"} onClick={() => sendDeleteIdea(id)}>
    delete
  </EditButton>
);

export default DeleteIdea;
