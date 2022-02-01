console.oldLog = console.log;
console.log = function(value)
{
    console.oldLog(value);
    window.$log = value;
};

window.addEventListener("unhandledrejection", function(promiseRejectionEvent) {
    console.log(promiseRejectionEvent.reason.message)
    let previewWindow = document.querySelector("#preview-window").contentWindow.document;
    previewWindow.open();
    previewWindow.write( window.$log);
    previewWindow.close();
});

//extracting typescript from HOOPS API Files
require.config({ paths: { vs: 'js/monaco-editor/min/vs' } });

require(['vs/editor/editor.main'], function () {
    fetch('typescript/hoops_web_viewer.d.ts')
      .then(response => response.text())
      .then(data => {
        var libUri = 'ts:filename/hoops_web_viewer.d.ts';
        monaco.languages.typescript.javascriptDefaults.addExtraLib(data, libUri);
        monaco.editor.createModel(data, 'typescript');          
      });

    var starterCode = `console.log("Hello world!");
    /* Uncomment the code below and click the 'Run' button above */
    // let rootNode = hwv.model.getAbsoluteRootNode();
    // let modelPath = 'models/microengine.scs';
    // hwv.model.loadSubtreeFromScsFile(rootNode, modelPath);`

    if(localStorage.getItem("userCode") != null){
      starterCode = localStorage.getItem("userCode");
    }

  window.editor = monaco.editor.create(document.getElementById('editor'), {
          value: starterCode, 
          language: 'javascript',
          automaticLayout: true 
        });

});

document.querySelector("#run-btn").addEventListener("click", function () {
    let stingOpening = "async function runCode(){\r\n"
    var editorValue = editor.getValue(); 
    editorValue = DOMPurify.sanitize(editorValue);
    let stingClosing = "\r\n} runCode()"
    let javascript = stingOpening.concat(editorValue, stingClosing);
    
    let previewWindow = document.querySelector("#preview-window").contentWindow.document;

    if (document.getElementById("reload_environment").checked == true){
        hwv.model.clear()
    };        

    var myFunc = new Function(`console.log("")`); //function called initially just to clear the window.
    myFunc();

    try {
        myFunc = new Function(javascript);
        myFunc();
      } catch (error) {
        var errorString = error.toString()  
        const myError = `console.log( "${errorString}" )`;
        myFunc = new Function(myError); 
        myFunc();
        
    }
    
    previewWindow.open();
    previewWindow.write( window.$log);
    previewWindow.close();

    localStorage.setItem("userCode", editorValue);
});