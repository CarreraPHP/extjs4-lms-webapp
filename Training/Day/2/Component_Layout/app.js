Ext.onReady(function () {
	 Ext.create('Ext.form.Panel', {
        title: 'Absolute Layout',
        width: 300,
        height: 275,
        layout: {
            type: 'absolute'
        },
       // url: 'save-form.php',
        defaultType: 'textfield',
        items: [{
            x: 10,
            y: 10,
            xtype: 'label',
            text: 'Send To:'
        }, {
            x: 80,
            y: 10,
            name: 'to',
            anchor: '90%'
        }, {
            x: 10,
            y: 40,
            xtype: 'label',
            text: 'Subject:'
        }, {
            x: 80,
            y: 40,
            name: 'subject',
            anchor: '90%'
        }, {
            x: 0,
            y: 80,
            xtype: 'textareafield',
            name: 'msg',
            anchor: '100% 100%'
        }],
        renderTo: 'Absolute'
    });
	 Ext.create('Ext.panel.Panel', {
        title: 'Accordion Layout',
        width: 300,
        height: 300,
        defaults: {
            // applied to each contained panel
            bodyStyle: 'padding:15px'
        },
        layout: {
            // layout-specific configs go here
            type: 'accordion',
            titleCollapse: false,
            animate: true,
            activeOnTop: true
        },
        items: [{
            title: 'Panel 1',
            html: 'Panel content!'
        }, {
            title: 'Panel 2',
            html: 'Panel content!'
        }, {
            title: 'Panel 3',
            html: 'Panel content!'
        }],
        renderTo: 'Accordian'
    });
	Ext.create('Ext.Panel', {
        width: 500,
        height: 400,
        title: "AnchorLayout Panel",
        layout: 'anchor',
        renderTo: 'Anchor',
        items: [{
            xtype: 'panel',
            title: '75% Width and 20% Height',
            anchor: '75% 20%'
        }, {
            xtype: 'panel',
            title: 'Offset -300 Width & -200 Height',
            anchor: '-300 -200'
        }, {
            xtype: 'panel',
            title: 'Mixed Offset and Percent',
            anchor: '-250 20%'
        }]
    });
	Ext.create('Ext.Panel', {
        width: 500,
        height: 280,
        title: "AutoLayout Panel",
        layout: 'auto',
        renderTo: 'Auto',
        items: [{
            xtype: 'panel',
            title: 'Top Inner Panel',
            width: '75%',
            height: 90
        }, {
            xtype: 'panel',
            title: 'Bottom Inner Panel',
            width: '75%',
            height: 90
        }]
    });
	Ext.create('Ext.panel.Panel', {
        width: 500,
        height: 300,
        title: 'Border Layout',
        layout: 'border',
        items: [{
            title: 'South Region is resizable',
            region: 'south',
            // position for region
            xtype: 'panel',
            height: 100,
            split: true,
            // enable resizing
            margins: '0 5 5 5'
        }, {
            // xtype: 'panel' implied by default
            title: 'West Region is collapsible',
            region: 'west',
            xtype: 'panel',
            margins: '5 0 0 5',
            width: 200,
            collapsible: true,
            // make collapsible
            id: 'west-region-container',
            layout: 'fit'
        }, {
            title: 'Center Region',
            region: 'center',
            // center region is required, no width/height specified
            xtype: 'panel',
            layout: 'fit',
            margins: '5 5 0 0'
        }],
        renderTo: 'Border'
    });
	 
	  var p = Ext.create('Ext.panel.Panel', {
        layout: 'card',
		title : "Card Layout",
        items: [{
            html: 'Card 1'
        }, {
            html: 'Card 2'
        }],
        renderTo: 'Card'
    });

    p.getLayout().setActiveItem(1);
	 Ext.create('Ext.form.Panel', {
        title: 'Checkbox Group',
        width: 300,
        height: 125,
        bodyPadding: 10,
        renderTo: 'CheckBoxGroup',
        items: [{
            xtype: 'checkboxgroup',
            fieldLabel: 'Two Columns',
            // Arrange checkboxes into two columns, distributed vertically
            columns: 2,
            vertical: true,
            items: [{
                boxLabel: 'Item 1',
                name: 'rb',
                inputValue: '1'
            }, {
                boxLabel: 'Item 2',
                name: 'rb',
                inputValue: '2',
                checked: true
            }, {
                boxLabel: 'Item 3',
                name: 'rb',
                inputValue: '3'
            }, {
                boxLabel: 'Item 4',
                name: 'rb',
                inputValue: '4'
            }, {
                boxLabel: 'Item 5',
                name: 'rb',
                inputValue: '5'
            }, {
                boxLabel: 'Item 6',
                name: 'rb',
                inputValue: '6'
            }]
        }]
    });
	 Ext.create('Ext.data.Store', {
        storeId: 'employeeStore',
        fields: ['firstname', 'lastname', 'seniority', 'dep', 'hired'],
        data: [{
            firstname: "Michael",
            lastname: "Scott",
            seniority: 7,
            dep: "Management",
            hired: "01/10/2004"
        }, {
            firstname: "Dwight",
            lastname: "Schrute",
            seniority: 2,
            dep: "Sales",
            hired: "04/01/2004"
        }, {
            firstname: "Jim",
            lastname: "Halpert",
            seniority: 3,
            dep: "Sales",
            hired: "02/22/2006"
        }, {
            firstname: "Kevin",
            lastname: "Malone",
            seniority: 4,
            dep: "Accounting",
            hired: "06/10/2007"
        }, {
            firstname: "Angela",
            lastname: "Martin",
            seniority: 5,
            dep: "Accounting",
            hired: "10/21/2008"
        }]
    });

    Ext.create('Ext.grid.Panel', {
        title: 'Column Demo',
        store: Ext.data.StoreManager.lookup('employeeStore'),
        columns: [{
            text: 'First Name',
            dataIndex: 'firstname'
        }, {
            text: 'Last Name',
            dataIndex: 'lastname'
        }, {
            text: 'Hired Month',
            dataIndex: 'hired',
            xtype: 'datecolumn',
            format: 'M'
        }, {
            text: 'Department (Yrs)',
            xtype: 'templatecolumn',
            tpl: '{dep} ({seniority})'
        }],
        width: 400,
        forceFit: true,
        renderTo: 'Column'
    });
	Ext.create('Ext.panel.Panel', {
        renderTo: 'Container',
        width: 400,
        height: 300,
        title: 'Container Panel',
        items: [{
            xtype: 'panel',
            title: 'Child Panel 1',
            height: 100,
            width: '75%'
        }, {
            xtype: 'panel',
            title: 'Child Panel 2',
            height: 100,
            width: '75%'
        }]
    });
	Ext.create('Ext.panel.Panel', {
		title: 'Fit Layout',
		width: 300,
		height: 150,
		layout:'fit',
		items: {
		    title: 'Inner Panel',
		    html: 'This is the inner panel content',
		    bodyPadding: 20,
		    border: false
		},
		renderTo: 'Fit'
	});
	Ext.create('Ext.Panel', {
		width: 500,
		height: 300,
		title: "FormLayout Panel",
		layout: 'form',
		renderTo: 'Form',
		bodyPadding: 5,
		defaultType: 'textfield',
		items: [{
		   fieldLabel: 'First Name',
		    name: 'first',
		    allowBlank:false
		},{
		    fieldLabel: 'Last Name',
		    name: 'last'
		},{
		    fieldLabel: 'Company',
		    name: 'company'
		}, {
		    fieldLabel: 'Email',
		    name: 'email',
		    vtype:'email'
		}, {
		    fieldLabel: 'DOB',
		    name: 'dob',
		    xtype: 'datefield'
		}, {
		    fieldLabel: 'Age',
		    name: 'age',
		    xtype: 'numberfield',
		    minValue: 0,
		    maxValue: 100
		}, {
		    xtype: 'timefield',
		    fieldLabel: 'Time',
		    name: 'time',
		    minValue: '8:00am',
		    maxValue: '6:00pm'
		}]
	});
	Ext.create('Ext.Panel', {
		width: 500,
		height: 300,
		title: "HBoxLayout Panel",
		layout: {
		    type: 'hbox',
		    align: 'stretch'
		},
		renderTo: "Hbox",
		items: [{
		    xtype: 'panel',
		    title: 'Inner Panel One',
		    flex: 2
		},{
		    xtype: 'panel',
		    title: 'Inner Panel Two',
		    flex: 1
		},{
		    xtype: 'panel',
		    title: 'Inner Panel Three',
		    flex: 1
		}]
	});
	Ext.create('Ext.panel.Panel', {
		title: 'Table Layout',
		width: 300,
		height: 150,
		layout: {
		    type: 'table',
		    // The total column count must be specified here
		    columns: 3
		},
		defaults: {
		    // applied to each contained panel
		    bodyStyle: 'padding:20px'
		},
		items: [{
		    html: 'Cell A content',
		    rowspan: 2
		},{
		    html: 'Cell B content',
		    colspan: 2
		},{
		    html: 'Cell C content',
		    cellCls: 'highlight'
		},{
		    html: 'Cell D content'
		}],
		renderTo: "Table"
	});
	Ext.create('Ext.Panel', {
		width: 500,
		height: 400,
		title: "VBoxLayout Panel",
		layout: {
		    type: 'vbox',
		    align: 'center'
		},
		renderTo: "Vbox",
		items: [{
		    xtype: 'panel',
		    title: 'Inner Panel One',
		    width: 250,
		    flex: 2
		},
		{
		    xtype: 'panel',
		    title: 'Inner Panel Two',
		    width: 250,
		    flex: 4
		},
		{
		    xtype: 'panel',
		    title: 'Inner Panel Three',
		    width: '50%',
		    flex: 4
		}]
	});
});
