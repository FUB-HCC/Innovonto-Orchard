var FileSaver = require("file-saver");

const staticContext = {
  hasCreator: {
    "@id": "gi2mo:hasCreator",
    "@type": "@id"
  },
  concept: {
    "@id": "inov:concept",
    "@type": "@id"
  },
  icon: "inov:icon",
  description: "dcterms:description",
  inspiredBy: {
    "@id": "inov:inspiredBy",
    "@type": "@id"
  },
  title: "dcterms:title",
  content: "gi2mo:content",
  assignedTo: {
    "@id": "inov:assignedTo",
    "@type": "@id"
  },
  textualRefinement: {
    "@id": "inov:textualRefinement",
    "@type": "@id"
  },
  startIndex: "inov:startIndex",
  hasStatus: {
    "@id": "gi2mo:hasStatus",
    "@type": "@id"
  },
  endIndex: "inov:endIndex",
  textualReview: {
    "@id": "gi2mo:textualReview",
    "@type": "@id"
  },
  hasIdeaContest: {
    "@id": "gi2mo:hasIdeaContest",
    "@type": "@id"
  },
  MinMaxRating: {
    "@id": "gi2mo:MinMaxRating",
    "@type": "@id"
  },
  dcterms: "http://purl.org/dc/terms/",
  hasContributor: {
    "@id": "gi2mo:hasContributor",
    "@type": "@id"
  },
  created: "dcterms:created",
  modificationType: "gi2mo:modificationType",
  gi2mo: "http://purl.org/gi2mo/ns#",
  versionInfo: {
    "@id": "gi2mo:versionInfo",
    "@type": "@id"
  },
  minRatingValue: "gi2mo:minRatingValue",
  versionDate: "gi2mo:versionDate",
  versionNumber: "gi2mo:versionNumber",
  hasCategory: {
    "@id": "gi2mo:hasCategory",
    "@type": "@id"
  },
  isCurrentVersion: "gi2mo:isCurrentVersion",
  hasSubmissionMethod: {
    "@id": "gi2mo:hasSubmissionMethod",
    "@type": "@id"
  },
  conceptSurface: "concept:Surface",
  rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  maxRatingValue: "gi2mo:maxRatingValue",
  hasSubCategory: {
    "@id": "inov:hasSubCategory",
    "@type": "@id"
  },
  linkedConcept: {
    "@id": "inov:linkedConcept",
    "@type": "@id"
  },
  ratingValue: "gi2mo:ratingValue",
  inov: "http://purl.org/innovonto/types/"
};

export const exportIdeasAsJsonLd = state => {
  let date = new Date();
  var blob = new Blob([JSON.stringify(convert(state), null, 2)], {
    type: "application/json;charset=utf-8"
  });
  FileSaver.saveAs(
    blob,
    "I2M-AC2-Ideas-" +
      date
        .toGMTString()
        .split(" ")
        .join("-") +
      ".json"
  );
};

//Who is using the idea?
function getIdeaUsers(idea, nextLocalId) {
  const result = [];
  let localId = nextLocalId;
  idea.ideaUsers.forEach(function(subcategory) {
    result.push({
      "@id": "_:b" + ++localId,
      title: subcategory
    });
  });
  if (idea.ideaUsersOther) {
    result.push({
      "@id": "_:b" + ++localId,
      title: idea.ideaUsersOther
    });
  }
  return result;
}

//In which of the following areas can the idea be applied?
function getApplicationAreas(idea, nextLocalId) {
  const result = [];
  let localId = nextLocalId;
  idea.applicationAreas.forEach(function(subcategory) {
    result.push({
      "@id": "_:b" + ++localId,
      title: subcategory
    });
  });
  return result;
}

function convert(ideas) {
  let result = {
    "@context": staticContext
  };
  let graph = [];
  let nextLocalId = 0;
  ideas.forEach(function(idea) {
    const applicationAreas = getApplicationAreas(idea, nextLocalId);
    nextLocalId += applicationAreas.length;
    const ideaUsers = getIdeaUsers(idea, nextLocalId);
    nextLocalId += ideaUsers.length;
    const ideaExportObject = {
      "@id": "http://purl.org/innovonto/ideas/" + idea.id,
      "@type": "gi2mo:Idea",
      creator: "unknown",
      hasIdeaContest: "http://purl.org/innovonto/ideaContests/bionic-radar",
      hasStatus: "http://purl.org/innovonto/ideastatus/idea/icv-needed",
      hasSubmissionMethod:
        "http://purl.org/innovonto/submission-methods/orchard",
      isCurrentVersion: true,

      created: idea.created,
      title: idea.title,
      content: idea.content,
      icon: "https://ideas-to-market.imp.fu-berlin.de" + idea.iconPath,
      hasCategory: [
        {
          "@id": "_:b" + ++nextLocalId,
          title: "Usage Area",
          hasSubCategory: applicationAreas
        },
        {
          "@id": "_:b" + ++nextLocalId,
          title: "Target Group",
          hasSubCategory: ideaUsers
        }
      ],
      textualRefinement: [
        {
          "@id": "_:b" + ++nextLocalId,
          description:
            "Describe your idea in more detail (e.g., how is it used?)",
          content: idea.ideaDetails
        },
        {
          "@id": "_:b" + ++nextLocalId,
          description: "Which problem does the idea solve?",
          content: idea.ideaProblem
        }
      ],
      inspiredBy: idea.inspiredBy
    };
    graph.push(ideaExportObject);
  });
  result["@graph"] = graph;
  return result;
}

export default exportIdeasAsJsonLd;
