//It is possible to load external assets including scs files and JS libraries
//from a public server using the approaches below. 
//Make sure the server you are loading the asset from has CORS enabled.

await loadScript("https://shattereddemo.s3.us-west-2.amazonaws.com/livecode/ac891270-26fa-4bb4-86d6-968be5853da8/PartialExplode.js");

await hwv.model.loadSubtreeFromScsFile(hwv.model.getRootNode(),
   "https://shattereddemo.s3.us-west-2.amazonaws.com/livecode/88f92308-bda9-4035-bdf2-7e57f4df7944/rac_advanced_sample_project.scs");

let cam = Communicator.Camera.fromJson(JSON.parse('{"position":{"x":-46421.46800583407,"y":-23221.420185062096,"z":21079.797871289335},"target":{"x":37647.07071480154,"y":10744.472530582918,"z":1807.1168835407734},"up":{"x":0.19277235636755818,"y":0.07788508370153653,"z":0.9781476025413056},"width":92696.47718153163,"height":92696.47718153163,"projection":0,"nearLimit":0.01,"className":"Communicator.Camera"}'));
hwv.view.setCamera(cam);

let myPartialExplode = new PartialExplode(hwv);

await myPartialExplode.initialize([2]);
myPartialExplode.explode(4,false,false,true);      
