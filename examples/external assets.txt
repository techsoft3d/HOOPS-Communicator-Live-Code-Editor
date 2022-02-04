//It is possible to load external assets including scs files and JS libraries
//from a public server using the approaches below. 
//Make sure the server you are loading the asset from has CORS enabled.

var url = "https://shattereddemo.s3.us-west-2.amazonaws.com/PartialExplode.js";
var s = document.createElement("script");
s.type = "text/javascript";
s.src = url;
document.head.appendChild(s);

s.onload = async function () {

   await hwv.model.loadSubtreeFromScsFile(hwv.model.getRootNode(),
   "https://shattereddemo.s3.us-west-2.amazonaws.com/livecode/88f92308-bda9-4035-bdf2-7e57f4df7944/rac_advanced_sample_project.scs");


    var myPartialExplode = new PartialExplode(hwv);

    await myPartialExplode.initialize([2]);
    setTimeout(function () {
        myPartialExplode.explode(2);      
    }, 50);

}

