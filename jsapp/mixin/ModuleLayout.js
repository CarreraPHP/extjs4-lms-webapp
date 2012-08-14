Ext.define('MyApp.mixin.ModuleLayout', {
	makeInitialLayout : function(me, subItemId) {
		console.log(me.itemId);
		switch (me.itemId) {
			
			case 'wkview-container':
				this.makeHomeScreenLayout(me);
			default:
				break;
		}
	},

	makeHomeScreenLayout : function(me, subItemId) {
		this.makeStoreReload(me, '#content-grid-panel', true);
	},
	makeStoreReload : function(me, itemId, select) {
		var grid = me.down(itemId);
		var store = grid.getStore();
		store.load();
		if(select) {
			store.on({
				load : this.storeDataLoaded,
				scope : grid
			});
		}
	},
	storeDataLoaded : function(store, records, success, opts) {
		
		if(success) {
			this.getSelectionModel().select(0);
		}
	},
	createNotification : function(title, html, type, position) {
		var iconCls = (type == 'error') ? 'ux-notification-icon-error' : 'ux-notification-icon-information';
		Ext.create('Ext.ux.window.Notification', {
			hideDuration : 500,
			autoHideDelay : 7000,
			slideInAnimation : 'bounceOut',
			slideBackAnimation : 'easeIn',
			cls : 'ux-notification-light',
			stickOnClick : true,
			stickWhileHover : true,
			iconCls : iconCls,
			title : title,
			position : position,
			spacing : 20,
			html : html
		}).show();
	}
});
