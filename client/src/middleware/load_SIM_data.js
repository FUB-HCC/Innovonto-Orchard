import SIM_AC1 from "../data/SIM_ac1.json";
import SIM_Gold from "../data/SIM_gold.json";

export const loadSimilarityData = contestID => {
  var SIM_DATA = null;
  if (contestID === "TCO_AC1") {
    SIM_DATA = SIM_AC1;
  } else if (contestID === "TCO_Gold") {
    SIM_DATA = SIM_Gold;
  }
  return SIM_DATA;
};
