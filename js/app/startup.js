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
    var newheight = $("#editorwindow").height() - $("#runbuttondiv").height();
    $("#editor").css({ "height": newheight + "px" });
    if (editor.layout)
        editor.layout();
}