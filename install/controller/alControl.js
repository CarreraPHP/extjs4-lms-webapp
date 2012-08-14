Ext.define('AL.controller.alControl', {
	extend : 'Ext.app.Controller',

	models : [],
	stores : [],
	views : ['appLogin', 'appLoginView'],
	init : function() {

		this.control({
			"apploginview button[itemId='config-db']" : {
				click : this.onConfigDb,
			},
		});
	},
	onConfigDb : function(me, e, opts) {
		var form = me.up('form').getForm();
		var values = me.up('form').getValues();
		if(form.isValid()) {
			Ext.Ajax.request({
				url : 'data/Setup.php',
				method : 'POST',
				type : 'json',
				params : values,
				scope : this,
				failure : function(response) {
					
				},
				success : function(response) {
					
				}
			});

		}
	}
});
