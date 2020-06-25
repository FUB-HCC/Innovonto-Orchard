export const similaritySorting = (similarityData, activeSpark, sparkStack) => {
  if (!activeSpark) {
    return [];
  }
  var SIM2active = undefined;
  if (activeSpark.concept && activeSpark.concept.id) {
    const cid = activeSpark.concept.id;
    const index = similarityData.concepts.indexOf(cid.slice(3));
    SIM2active = similarityData.concept2ideaSIM[index];
  } else if (!SIM2active) {
    const index = activeSpark.index;
    SIM2active = similarityData.ideaSIM[index];
  }
  return sparkStack
    .sort((s1, s2) => SIM2active[s2.index] - SIM2active[s1.index])
    .splice(0, 9);
};
