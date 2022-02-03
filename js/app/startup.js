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
        fun: async function () {
            var res = await fetch('examples/getting started.txt');
            let text = await res.text();
            window.editor.setValue(text);

        }
    }, 
    {
        name: 'Change Part Color',
        fun: async function () {
            var res = await fetch('examples/change part color.txt');
            let text = await res.text();
            window.editor.setValue(text);        
        }
    },
    {
        name: 'Add Custom UI Button',
        fun: async function () {
            var res = await fetch('examples/add custom ui button.txt');
            let text = await res.text();
            window.editor.setValue(text);        
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