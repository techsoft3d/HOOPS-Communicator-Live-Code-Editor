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

async function startMonaco() {

  require(['vs/editor/editor.main'], async function () {
    let response = await fetch('typescript/hoops_web_viewer.d.ts');
    let data = await response.text();
    var libUri = 'ts:filename/hoops_web_viewer.d.ts';
    await monaco.languages.typescript.javascriptDefaults.addExtraLib(data, libUri);
    await monaco.editor.createModel(data, 'typescript');

    var starterCode = `console.log("Hello world!");
    /* Uncomment the code below and click the 'Run' button above */
    // let rootNode = hwv.model.getAbsoluteRootNode();
    // let modelPath = 'models/microengine.scs';
    // hwv.model.loadSubtreeFromScsFile(rootNode, modelPath);`

    if (localStorage.getItem("userCode") != null) {
      starterCode = await localStorage.getItem("userCode");
    }

    window.editor = await monaco.editor.create(document.getElementById('editor'), {
      value: starterCode,
      language: 'javascript',
      automaticLayout: true
    });


    editor.addAction({
      // An unique identifier of the contributed action.
      id: 'addSelectionArrayMonacoAction',

      // A label of the action that will be presented to the user.
      label: 'Insert Selection Array',


      contextMenuGroupId: 'customGroup',

      contextMenuOrder: 0,

      // Method that will be executed when the action is triggered.
      // @param editor The editor instance is passed in as a convenience
      run: function (ed) {
        var arraytext = "let selectionarray = [";
        var sels = hwv.selectionManager.getResults();

        for (var i = 0; i < sels.length; i++) {
          arraytext += sels[i].getNodeId();
          if (i < sels.length - 1) {
            arraytext += ", ";
          }
        }
        arraytext += "];";
        insertTextIntoEditor(arraytext);

      }
    });

    editor.addAction({
      // An unique identifier of the contributed action.
      id: 'setCameraMonacoAction',

      // A label of the action that will be presented to the user.
      label: 'Set Camera',


      contextMenuGroupId: 'customGroup',

      contextMenuOrder: 0,

      // Method that will be executed when the action is triggered.
      // @param editor The editor instance is passed in as a convenience
      run: function (ed) {
        var cam = hwv.view.getCamera();

        let text = 'let cam = Communicator.Camera.fromJson(JSON.parse(\'' + JSON.stringify(cam.toJson()) + '\'));\n';      
        text += "hwv.view.setCamera(cam);";
        insertTextIntoEditor(text);

      }
    });



  });
}


window.startMonaco = startMonaco;

document.querySelector("#run-btn").addEventListener("click", async function () {
    let stingOpening = "async function runCode(){\r\n";
    var editorValue = editor.getValue(); 
    // editorValue = DOMPurify.sanitize(editorValue);
    let stingClosing = "\r\n} runCode()"
    let javascript = stingOpening.concat(editorValue, stingClosing);
    
    let previewWindow = document.querySelector("#preview-window").contentWindow.document;

    if (document.getElementById("reload_environment").checked == true){
        await hwv.model.clear();
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


function insertTextIntoEditor(text) {
  var selection = editor.getSelection();
  var id = { major: 1, minor: 1 };
  var op = { identifier: id, range: selection, text: text, forceMoveMarkers: true };
  editor.executeEdits("my-source", [op]);
}