var myLayout;



function startup()
{
    createUILayout();
}

function createUILayout() {

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
        if (hwv != null) {
            hwv.resizeCanvas();
            editor.layout();
        }
    });
    myLayout.init();



    var viewermenu = [{
        name: 'Dummy Menu Item',
        fun: function () {
         
        }
    }, 
    {
        name: 'Dummy Submenu',
        subMenu: [
            {
                name: 'Dummy Item',
                fun: function () {
                }
            }
        ]
    }

    ];

    $('#viewermenu1button').contextMenu(viewermenu, undefined, {
        'displayAround': 'trigger',
        'containment': '#viewerContainer'
    });



}