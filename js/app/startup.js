var myLayout;
var hwvReady = false;



async function startup()
{

    let config;
    if (!getUrlParameter("fullscreen") || getUrlParameter("fullscreen") == "false")
    {

        config = {
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
                                    type: 'stack',
                                    content: [{
                                        type: 'component',
                                        componentName: 'JS',
                                        isClosable: false,
                                        componentState: { label: 'C' }
                                    }, {
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
                                    ]
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
                                title: "HOOPS Communicator 2022 Viewer",
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
    
        myLayout.registerComponent('JS', function (container, componentState) {
            $("#editorwindow").css({ "display": "block" });
            $(container.getElement()).append($("#editorwindow"));
        });
    
        myLayout.registerComponent('HTML', function (container, componentState) {
            $("#htmleditorwindow").css({ "display": "block" });
            $(container.getElement()).append($("#htmleditorwindow"));
        });
    
        myLayout.registerComponent('CSS', function (container, componentState) {
            $("#csseditorwindow").css({ "display": "block" });
            $(container.getElement()).append($("#csseditorwindow"));
        });
    
    
        myLayout.registerComponent('Console', function (container, componentState) {
            $("#consolewindow").css({ "display": "block" });
            $(container.getElement()).append($("#consolewindow"));
        });
    
    }
    else
    {
        config = {
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
                            type: 'row',
                            content: [{
                                title: "HOOPS Communicator 2022 Viewer",
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


    }



  
    myLayout.on('stateChanged', function () {
        if (hwvReady) {
            hwv.resizeCanvas();
        }
        updateEditorLayout();
    });
    await myLayout.init();

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



function clearEditor()
{
    editor.setValue("");
    htmleditor.setValue("");
    csseditor.setValue("");
}




function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
}


function handleAutorun()
{
    if (getUrlParameter("autorun") && getUrlParameter("autorun") == "true")
    {
        runCode();
    }
}
