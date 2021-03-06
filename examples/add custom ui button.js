//It is possible to add custom ui elements like buttons and CSS styles
//to the viewer by specifying them in the HTML and CSS tab.
//All custom UI elements will be cleared out when the viewer is reloaded.
//Make sure to add any custom functions (see below) to the window object
//to make them accessible to the UI elements.

function testFunction()
{
    hwv.view.fitWorld();
}
window.testFunction = testFunction;

let rootNode = hwv.model.getAbsoluteRootNode();
let modelPath = 'models/microengine.scs';
await hwv.model.loadSubtreeFromScsFile(rootNode, modelPath);
let cam = Communicator.Camera.fromJson(JSON.parse('{"position":{"x":25.823183293297983,"y":26.601984224374732,"z":-48.057858634387344},"target":{"x":39.223676087671805,"y":32.016134482213715,"z":-51.12991658418487},"up":{"x":0.19277235636755796,"y":0.07788508370153643,"z":0.9781476025413056},"width":14.775782872386777,"height":14.775782872386777,"projection":0,"nearLimit":0.01,"className":"Communicator.Camera"}'));
hwv.view.setCamera(cam);

var view = hwv.view;
const selectionManager = hwv.selectionManager;
var config = new Communicator.PickConfig();
config.allowFaces = true;
config.allowLines = true;
config.allowPoints = true;
let selectionItem = await view.pickFromPoint(new Communicator.Point2(800, 500), config);

let node = selectionItem.getNodeId();
selectionManager.add(selectionItem);
