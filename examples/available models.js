//All the models listed below can be accessed in code snippets. 
//If you want to access additional models and are running your own instance 
//of the Code Editor you have to place those models into the "models" folder.


function loadModel(modelname)
{
    hwv.model.clear();
    hwv.model.loadSubtreeFromScsFile(hwv.model.getAbsoluteRootNode(), "models/" + modelname + ".scs");

}
window.loadModel = loadModel;
