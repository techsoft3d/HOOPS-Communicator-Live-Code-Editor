var myLayout;
var hwvReady = false;



function startup()
{
    createUILayout();
}

async function createUILayout() {

    var config = {
        settings: {
            showPopoutIcon: false,
            showMaximiseIcon: true,
            showCloseIcon: false
        },
        content: [
            {
                type: 'row',
                content: [
                   
                    {
                        type: 'column',
                        width: 40,
                        content: [
                            {
                                type: 'component',
                                componentName: 'Editor',
                                isClosable: false,
                                componentState: { label: 'C' }
                            },
                            {
                                type: 'component',
                                componentName: 'Console',
                                isClosable: true,
                                height: 20,
                                componentState: { label: 'C' }
                            }                          
                        ]
                    },
                    {
                        type: 'row',
                        content: [{
                            type: 'component',
                            componentName: 'Viewer',
                            isClosable: false,
                            width: 60,
                            componentState: { label: 'A' }
                        }],
                    },
                ],
            }]
    };



    myLayout = new GoldenLayout(config);
    myLayout.registerComponent('Viewer', function (container, componentState) {
        $(container.getElement()).append($("#content"));
    });

    myLayout.registerComponent('Editor', function (container, componentState) {
        $(container.getElement()).append($("#editorwindow"));
    });

    myLayout.registerComponent('Console', function (container, componentState) {
        $(container.getElement()).append($("#consolewindow"));
    });

    myLayout.on('stateChanged', function () {
        if (hwvReady) {
            hwv.resizeCanvas();
        }
        updateEditorLayout();
    });
    myLayout.init();

    var viewermenu = [{
        name: 'Getting Started Example',
        fun: function () {
            window.editor.setValue(`console.log("Hello world!");\n    /* Uncomment the code below and click the 'Run' button above */\n    // let rootNode = hwv.model.getAbsoluteRootNode();\n    // let modelPath = 'models/microengine.scs';\n    // hwv.model.loadSubtreeFromScsFile(rootNode, modelPath);`)

        }
    }, 
    {
        name: 'Change Model Color',
        fun: function () {
            window.editor.setValue('await hwv.model.loadSubtreeFromScsFile(hwv.model.getAbsoluteRootNode(), "models/microengine.scs")\r\nfor (var i=0;i<10;i++)\r\n{\r\n    hwv.model.setNodesFaceColor([hwv.model.getRootNode()], new Communicator.Color(225,0,0))\r\n}')
        }
    },
    {
        name: 'Add Custom UI Button',
        fun: function () {
            window.editor.setValue(`function testFunction()\n{\n    hwv.view.fitWorld();\n}\nwindow.testFunction = testFunction;\nlet rootNode = hwv.model.getAbsoluteRootNode();\nlet modelPath = 'models/microengine.scs';\nawait hwv.model.loadSubtreeFromScsFile(rootNode, modelPath);\nlet cam = Communicator.Camera.fromJson(JSON.parse('{"position":{"x":25.823183293297983,"y":26.601984224374732,"z":-48.057858634387344},"target":{"x":39.223676087671805,"y":32.016134482213715,"z":-51.12991658418487},"up":{"x":0.19277235636755796,"y":0.07788508370153643,"z":0.9781476025413056},"width":14.775782872386777,"height":14.775782872386777,"projection":0,"nearLimit":0.01,"className":"Communicator.Camera"}'));\nhwv.view.setCamera(cam);\nvar view = hwv.view;\nconst selectionManager = hwv.selectionManager;\nvar config = new Communicator.PickConfig();\nconfig.allowFaces = true;\nconfig.allowLines = true;\nconfig.allowPoints = true;\nlet selectionItem = await view.pickFromPoint(new Communicator.Point2(800, 500), config);\nlet node = selectionItem.getNodeId();\nselectionManager.add(selectionItem);\nlet button='<input type="button" onclick="testFunction()" "id="viewermenu1button" value="Fit World" style="left:50px; position:absolute;z-index:1">';\n$("#userdiv").append(button);`)
        }
    }


    ];

    $('#viewermenu1button').contextMenu(viewermenu, undefined, {
        'displayAround': 'trigger',
        'containment': '#viewerContainer'
    });

    await startMonaco();   

}


function updateEditorLayout()
{
    var newheight = $("#editorwindow").height() - $("#runbuttondiv").height()-2;
    $("#editor").css({ "height": newheight + "px" });
    if (editor.layout)
        editor.layout();
}