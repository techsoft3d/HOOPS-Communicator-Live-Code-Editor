//All the models listed below can be accessed in code snippets. 
//If you want to access additional models and are running your own instance 
//of the Code Editor you have to place those models into the "models" folder.


function loadModel(modelname)
{
    hwv.model.clear();
    hwv.model.loadSubtreeFromScsFile(hwv.model.getAbsoluteRootNode(), "models/" + modelname + ".scs");

}
window.loadModel = loadModel;

let button='<input type="button" value="microengine" onclick=\'loadModel("microengine")\'>';
$("#userdiv").append(button);

button='<input type="button" value="arboleda" onclick=\'loadModel("arboleda")\' >';
$("#userdiv").append(button);

button='<input type="button" value="bnc" onclick=\'loadModel("bnc")\' >';
$("#userdiv").append(button);

button='<input type="button" value="landinggear" onclick=\'loadModel("landinggear")\' >';
$("#userdiv").append(button);

button='<input type="button" value="MountainHome" onclick=\'loadModel("MountainHome")\' >';
$("#userdiv").append(button);

button='<input type="button" value="HotelFloorPlan" onclick=\'loadModel("HotelFloorPlan")\' >';
$("#userdiv").append(button);

button='<input type="button" value="EnginePoints" onclick=\'loadModel("EnginePoints")\' >';
$("#userdiv").append(button);
