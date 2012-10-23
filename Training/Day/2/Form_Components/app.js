Ext.onReady(function () {
    Ext.create('Ext.form.Panel', {
        width: 800,
        height: 600,
        title: 'Form Layout',
        layout: 'anchor',
		bodyPadding: 5,
		 defaults: {
            anchor: '100%'
        },
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
		}],
		 buttons: [{
            text: 'Reset',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }, {
            text: 'Submit',
            
            handler: function () {
                 Ext.MessageBox.alert('success', 'Form submit successfully');
            }
        }],
        renderTo: Ext.getBody()
    });
});
