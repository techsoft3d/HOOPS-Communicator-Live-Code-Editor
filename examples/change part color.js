await hwv.model.loadSubtreeFromScsFile(hwv.model.getAbsoluteRootNode(), "models/microengine.scs")

//The nodeids of the current selection as well as the current camera
//can be inserted via the right-click menu.
let selectionarray = [20, 95, 28];
for (var i=0;i<selectionarray.length;i++)
{
    hwv.model.setNodesFaceColor(selectionarray, new Communicator.Color(225,0,0))
}

let cam = Communicator.Camera.fromJson(JSON.parse('{"position":{"x":17.837671232995483,"y":11.142469717204962,"z":-42.40044185672814},"target":{"x":44.01050872200685,"y":21.71698193954671,"z":-48.40055503992643},"up":{"x":0.19277235636755796,"y":0.07788508370153643,"z":0.9781476025413056},"width":28.85895092263042,"height":28.85895092263042,"projection":0,"nearLimit":0.01,"className":"Communicator.Camera"}'));
hwv.view.setCamera(cam);