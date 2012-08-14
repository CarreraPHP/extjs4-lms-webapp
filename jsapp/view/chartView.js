/*
 * File: jsapp/view/loginView.js
 *
 */

Ext.define('MyApp.view.chartView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.chartview',
	mixins : {
		moduleLayout : 'MyApp.mixin.ModuleLayout'
	},
	frame : true,
	itemId : '',
	layout : {
		type : 'fit',
		
	},
	initComponent : function() {
		var me = this;

		Ext.applyIf(me, {
			items : [{
				xtype : 'chart',
				title: 'chart',	
				store: 'chartStore',

			animate: true,
            shadow: true,
            legend: {
                position: 'right'
            },
            insetPadding: 10,
            series: [{
                type: 'pie',
                field: 'data1',
                showInLegend: true,

				highlight: {
                  segment: {
                    margin: 20
                  }
                },
				label: {
                    field: 'name',
                    display: 'rotate',
                    contrast: true,
                    font: '18px Arial'
                }

              
                
            }]


			}]
		});

		me.callParent(arguments);
	}
});
