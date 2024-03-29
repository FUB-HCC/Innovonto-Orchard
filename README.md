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

![Example](/client/public/Orchard_RF_SPARK8.png)

## Activity Diagram

![Diagram](/client/public/ActivityDiagramClustering.png)

idea:

```
id: uuid,
title: string,
content: string,
created: UTC-time,
creator: User,
currentVersion: boolean,
iconPath: string,
applicationAreas: Array [],
ideaContest: uuid,
ideaDetails: string,
ideaProblem: string,
ideaUsers: Array [],
ideaUsersOther: string,
inspiredBy: Array [],
status: string
```
