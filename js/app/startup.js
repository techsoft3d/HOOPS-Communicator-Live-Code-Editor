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
                                type:'stack',
                            content: [{
                                type: 'component',
                                componentName: 'Editor',
                                isClosable: false,
                                componentState: { label: 'C' }
                            },{
                                type: 'component',
                                componentName: 'HTML',
                                isClosable: false,
                                componentState: { label: 'C' }
                            },
                            {
                                type: 'component',
                                componentName: 'CSS',
                                isClosable: false,
                                componentState: { label: 'C' }
                            }
                        ]},
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

    myLayout.registerComponent('HTML', function (container, componentState) {
        $(container.getElement()).append($("#htmleditorwindow"));
    });

    myLayout.registerComponent('CSS', function (container, componentState) {
        $(container.getElement()).append($("#csseditorwindow"));
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
            fetchExample('getting started');

        }
    }, 
    {
        name: 'Change Part Color',
        fun: async function () {
            fetchExample('change part color');
        }
    },
    {
        name: 'Add Custom UI Button',
        fun: async function () {
            fetchExample('add custom ui button');
        }
    },
    {
        name: 'Loading External Assets',
        fun: async function () {
            fetchExample('external assets');
        }
    },
    {
        name: 'Available Models',
        fun: async function () {
            fetchExample('available models');
        }
    }


    ];

    $('#viewermenu1button').contextMenu(viewermenu, undefined, {
        'displayAround': 'trigger',
        'containment': '#viewerContainer'
    });

    await startMonaco();   

}

async function fetchExample(name) {
    let res;
    let text;
    window.htmleditor.setValue("");
    window.csseditor.setValue("");
    
    res = await fetch('examples/' + name + '.js');
    if (res.ok) {
        text = await res.text();
        window.editor.setValue(text);    
    }

    res = await fetch('examples/' + name + '.html');
    if (res.ok) {
        text = await res.text();
        window.htmleditor.setValue(text);    
    }

    res = await fetch('examples/' + name + '.css');
    if (res.ok) {
        text = await res.text();
        window.csseditor.setValue(text);    
    }


}


function updateEditorLayout() {
    var newheight = $("#editorwindow").height() - $("#runbuttondiv").height() - 2;
    $("#editor").css({ "height": newheight + "px" });
    if (editor.layout)
        editor.layout();
    if (htmleditor.layout)
        htmleditor.layout();

    if (csseditor.layout)
        csseditor.layout();
}