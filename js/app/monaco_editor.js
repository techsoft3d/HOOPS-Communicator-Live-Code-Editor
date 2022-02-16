console.oldLog = console.log;
console.log = function(value)
{
    console.oldLog(value);
    window.$log = value;
};

window.addEventListener("unhandledrejection", function(promiseRejectionEvent) {
    console.log(promiseRejectionEvent.reason.message);
});

//extracting typescript from HOOPS API Files
require.config({ paths: { vs: 'js/monaco-editor/min/vs' } });

async function startMonaco() {
  return new Promise((resolve, reject) => {
  require(['vs/editor/editor.main'], async function () {
    let response = await fetch('typescript/hoops_web_viewer.d.ts');
    let data = await response.text();
    var libUri = 'ts:filename/hoops_web_viewer.d.ts';
    await monaco.languages.typescript.javascriptDefaults.addExtraLib(data, libUri);
    await monaco.editor.createModel(data, 'typescript');

    let starterCode = {js:"",html:"",css:""};
    starterCode.js = `console.log("Hello world!");
    /* Uncomment the code below and click the 'Run' button above */
    // let rootNode = hwv.model.getAbsoluteRootNode();
    // let modelPath = 'models/microengine.scs';
    // hwv.model.loadSubtreeFromScsFile(rootNode, modelPath);`

    if (localStorage.getItem("userCode") != null) {
      try {
        starterCode = JSON.parse(localStorage.getItem("userCode"));
      } catch (e) {
      }
    }

    window.editor = await monaco.editor.create(document.getElementById('editor'), {
      value: starterCode.js,
      language: 'javascript',
      automaticLayout: true
    });

    window.htmleditor = await monaco.editor.create(document.getElementById('htmleditor'), {
      value: starterCode.html,
      language: 'html',
      automaticLayout: true
    });

    window.csseditor = await monaco.editor.create(document.getElementById('csseditor'), {
      value: starterCode.css,
      language: 'css',
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


    editor.addAction({
      // An unique identifier of the contributed action.
      id: 'setMatrixMonacoAction',
      // A label of the action that will be presented to the user.
      label: 'Set Matrix from Selection',
      contextMenuGroupId: 'customGroup',
      contextMenuOrder: 0,
      // Method that will be executed when the action is triggered.
      // @param editor The editor instance is passed in as a convenience
      run: function (ed) {
        var nodeid = hwv.selectionManager.getLast().getNodeId();
        let mat = hwv.model.getNodeMatrix(nodeid);

        let text = 'let mat = Communicator.Matrix.fromJson(JSON.parse(\'' + JSON.stringify(mat.toJson()) + '\'));\n';      
        text += 'hwv.model.setNodeMatrix(' + nodeid + ',mat);';
        insertTextIntoEditor(text);

      }
    });
    
    resolve();
  });
  });
}

window.startMonaco = startMonaco;



async function runCode() {

  $("#preview-window").empty();
  let stingOpening = "async function runCode(){\r\n";
  var editorValue = editor.getValue();
  let stingClosing = "\r\n} runCode()"
  let javascript = stingOpening.concat(editorValue, stingClosing);


  if (document.getElementById("reload_environment").checked == true) {
    await hwv.model.clear();
    $("#userdiv").empty();
  }

  $("#userdiv").append(htmleditor.getValue());

  $("<style type='text/css'>" + csseditor.getValue() + "</style>").appendTo("#userdiv");

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
  let editorValues = { js: editor.getValue(), html: htmleditor.getValue(), css: csseditor.getValue() };

  localStorage.setItem("userCode", JSON.stringify(editorValues));
}

window.runCode = runCode;


(function () {
  var oldLog = console.log;
  console.log = function (message) {
    if (message != "") {
      $("#preview-window").append(message + "<br>");
    }
    oldLog.apply(console, arguments);
  };
})();

function insertTextIntoEditor(text) {
  var selection = editor.getSelection();
  var id = { major: 1, minor: 1 };
  var op = { identifier: id, range: selection, text: text, forceMoveMarkers: true };
  editor.executeEdits("my-source", [op]);
}