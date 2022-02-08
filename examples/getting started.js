/* Click the 'Run' button to execute the code below */

console.log("Hello world!");

let rootNode = hwv.model.getAbsoluteRootNode();
let modelPath = 'models/microengine.scs';
await hwv.model.loadSubtreeFromScsFile(rootNode, modelPath);