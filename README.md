## Visual idea Clustering

# Client

## Setup Client:

- `npm install`

### Run Client:

- `npm start`

### Tests:

- `npm test`

### Related Work

- [IdeaHound](http://www.eecs.harvard.edu/~kgajos/papers/2016/siangliulue16ideahound-uist.shtml)

### Requirements

- [x] Anzeige von Sparks
- [x] Drag and drop logik
- [x] Dynamische Anzahl von Ideen
- [x] Clustering Logik
- [x] Rename Clusters, onDoubleClick on header. save onEnter
- [ ] Zoomable Map of idea space, how to navigate on the map?
- [x] Export Button off idea Space.
- [x] List of Clusters as DropZone to easily move ideas
- [x] click on cluster list item to focus on that cluster on the map

## Application

- bring ideas in relation, build Clusters, summerize and filter them to generate quality ideas from that.

## View

![Example](/client/public/ScreenshotVisualIdeaClustering.png)

## Activity Diagram

![Diagram](/client/public/ActivityDiagramClustering.png)

idea:

```
title: "title",
applicationAreas: Array [],
content: "content",
created: "2019-06-03T13:17:33.818+0000",
creator: "unknown",
currentVersion: true,
iconPath: "/path",
id: "9e93b998-5bec-4c87-a707-9a8b1cb0fcdd",
ideaContest: "7bcbec93-5bf5-49e3-b7b3-31caa23003f6",
ideaDetails: "idea Details",
ideaProblem: "idea Problem",
ideaUsers: Array [],
ideaUsersOther: "",
inspiredBy: Array [],
status: "icv-needed"
```
