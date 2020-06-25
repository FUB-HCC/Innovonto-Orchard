import axios from "axios";
import { sparqlContestListParams, sparqlContestIdeas } from "./sparql-queries";
import { frameData } from "./data-framing";
import { parseSparksFrom } from "../components";
const backendServiceBaseUrl =
  "https://innovonto-core.imp.fu-berlin.de/management/orchard/query";

export const getContests = dispatch => {
  return axios
    .get(backendServiceBaseUrl, sparqlContestListParams())
    .then(result => {
      frameData(result.data, "gi2mo:IdeaContest").then(data => {
        dispatch(extractProjectList(data));
      });
    })
    .catch(error => {
      //TODO: make all components redirect to error page in a unified fashion <- input required
    });
};

export const getContestIdeas = (dispatch, contestURI) => {
  return axios
    .get(backendServiceBaseUrl, sparqlContestIdeas(contestURI))
    .then(result => {
      frameData(result.data, "gi2mo:Idea").then(data => {
        dispatch(parseSparksFrom(data));
      });
    })
    .catch(error => {
      console.log(error);
      //TODO: make all components redirect to error page in a unified fashion <- input required
    });
};

const extractProjectList = data =>
  data["@graph"].map(ideaContest => ({
    id: ideaContest["@id"],
    description: ideaContest.description,
    title: ideaContest.title
  }));
