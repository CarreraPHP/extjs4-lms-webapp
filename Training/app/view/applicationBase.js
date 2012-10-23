Ext.define('App.view.applicationBase', {
    extend : 'Ext.container.Viewport',
    alias : 'widget.abviewport',
    requires : ['App.view.workspaceView', 'App.store.CatalogTreeStore'],		
    padding : 5,
    layout : {
        type : 'border'
    },
    initComponent : function() {
        var me = this;

        Ext.applyIf(me, {
            items : [{
                xtype : 'container',
                itemId : 'application-base',
                layout : {
                    type : 'fit'
                },
                margin : '0 0 0 5',
                region : 'center',
                split : true,
                items : [{
                    xtype : 'workspaceview',
                    itemId : 'ws-view-card',
                    width : 150
                }]
            }, {
                xtype : 'toolbar',
                frame : true,
                height : 30,
                collapseMode : 'mini',
                region : 'north',
                border : true,
                split : true,
                items : [{
                    xtype : 'container',
                    html : '<h1>Day 1 Training</h1>'
                }]
            },{
                xtype : 'treepanel',
                region : 'west',
                title: 'Tree Layout',
                itemId : 'tree-Panel',
                width: 250,
                height: 300,
                rootVisible: false,
                displayField : 'name',
                store : Ext.create('App.store.CatalogTreeStore')
            }]
        });

        me.callParent(arguments);
    }
});
/*
 Ext.create('Ext.data.TreeStore', {
                    root: {
                        expanded: true,
                        children: [{
                            text: "Training", 
                            expanded: true, 
                            children: [{
                                text: "Day 1", 
                                expanded: true,
                                children : [{
                                    text : 'Border layout',
                                    leaf : true,
                                    itemId : 'bor-layout'
                                }]
                            },
                            {
                                text: "Day 2", 
                                expanded: true,
                                children : [{
                                    text : 'Component Layout',
                                    expanded : true,
                                    children : [{
                                            text : 'hbox layout',
                                            leaf : true,
                                            itemId : 'hbox-layout'
                                    },{
                                            text : 'vbox layout',
                                            leaf : true,
                                            itemId : 'hbox-layout'
                                    },{
                                            text : 'card layout',
                                            leaf : true,
                                            itemId : 'card-layout'
                                    }]
                                },{
                                    text : 'Slider',
                                    leaf : true
                                },{
                                    text : 'Progress Bar',
                                    leaf : true
                                },{
                                    text : 'Form Components',
                                    leaf : true
                                },{
                                    text : 'Tree Components',
                                    leaf : true
                                },{
                                    text : 'Drag & Drop components',
                                    leaf : true
                                }]
                            },
                            {
                                text: "Day 3", 
                                expanded: true,
                                children : [{
                                    text : 'PHP Mysql DataSource',
                                    leaf : true
                                },{
                                    text : 'Api config',
                                    leaf : true
                                },{
                                    text : 'Working with Data(Store & Model)',
                                    leaf : true
                                },{
                                    text : 'Visualizing Data into graphs',
                                    leaf : true
                                },{
                                    text : 'Grid Component',
                                    leaf : true
                                }]
                            },
                            {
                                text: "Day 4", 
                                expanded : true,
                                children : [{
                                    text : 'Grid Filtering/ Search',
                                    leaf: true
                                },{
                                    text : 'Grid Live Search'
                                },{
                                    text : 'Grid Buffering Scrolling',
                                },{
                                    text : 'Charts'
                                }]
                                
                            },
                            {
                                text: "Day 5", 
                                leaf: true
                            }]
                        }]
                    }
                })
	 */