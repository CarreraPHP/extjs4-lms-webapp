Ext.Loader.setConfig({
	enabled : true
});
Ext.Loader.setPath('Ext.ux', 'ux');
Ext.require(['Ext.form.*', 'Ext.data.*', 'Ext.chart.*', 'Ext.grid.Panel', 'Ext.layout.container.Column', 'Ext.ux.grid.FiltersFeature']);

Ext.onReady(function() {

	//use a renderer for values in the data view.
	function perc(value, metaData, record, rowIndex, colIndex, store, view) {
		if (value > 50) {
			metaData.style = "";
			return '<span style="color:green;font-weight:bolder;">' + Ext.util.Format.number(value, '0.00 %') + '</span>';
		} else if (value < 25) {
			return '<span style="color:red;font-weight:bolder;">' + Ext.util.Format.number(value, '0.00 %') + '</span>';
		}
		return '<span style="color:blue;">' + Ext.util.Format.number(value, '0.00 %') + '</span>';
	}

	var bd = Ext.getBody(), form = false, rec = false, selectedStoreItem = false,
	//performs the highlight of an item in the bar series
	selectItem = function(storeItem) {
		var name = storeItem.get('company'), series = barChart.series.get(0), i, items, l;

		series.highlight = true;
		series.unHighlightItem();
		series.cleanHighlights();
		for ( i = 0, items = series.items, l = items.length; i < l; i++) {
			if (name == items[i].storeItem.get('company')) {
				selectedStoreItem = items[i].storeItem;
				series.highlightItem(items[i]);
				break;
			}
		}
		series.highlight = false;
	},
	//updates a record modified via the form
	updateRecord = function(rec) {
		var name, series, i, l, items, json = [{
			'Name' : 'Price',
			'Data' : rec.get('price')
		}, {
			'Name' : 'Revenue %',
			'Data' : rec.get('revenue %')
		}, {
			'Name' : 'Growth %',
			'Data' : rec.get('growth %')
		}, {
			'Name' : 'Product %',
			'Data' : rec.get('product %')
		}, {
			'Name' : 'Market %',
			'Data' : rec.get('market %')
		}];
		chs.loadData(json);
		selectItem(rec);
	}, createListeners = function() {
		return {
			// buffer so we don't refire while the user is still typing
			buffer : 200,
			change : function(field, newValue, oldValue, listener) {
				if (rec && form) {
					if (newValue > field.maxValue) {
						field.setValue(field.maxValue);
					} else {
						form.updateRecord(rec);
						updateRecord(rec);
					}
				}
			}
		};
	};

	// sample static data for the store
	var myData = [['3m Co'], ['Alcoa Inc'], ['Altria Group Inc'], ['American Express Company'], ['American International Group, Inc.'], ['AT&T Inc'], ['Boeing Co.'], ['Caterpillar Inc.'], ['Citigroup, Inc.'], ['E.I. du Pont de Nemours and Company'], ['Exxon Mobil Corp'], ['General Electric Company'], ['General Motors Corporation'], ['Hewlett-Packard Co'], ['Honeywell Intl Inc'], ['Intel Corporation'], ['International Business Machines'], ['Johnson & Johnson'], ['JP Morgan & Chase & Co'], ['McDonald\'s Corporation'], ['Merck & Co., Inc.'], ['Microsoft Corporation'], ['Pfizer Inc'], ['The Coca-Cola Company'], ['The Home Depot, Inc.'], ['The Procter & Gamble Company'], ['United Technologies Corporation'], ['Verizon Communications'], ['Wal-Mart Stores, Inc.']];

	for (var i = 0, l = myData.length, rand = Math.random; i < l; i++) {
		var data = myData[i];
		data[1] = ((rand() * 10000) >> 0) / 100;
		data[2] = ((rand() * 10000) >> 0) / 100;
		data[3] = ((rand() * 10000) >> 0) / 100;
		data[4] = ((rand() * 10000) >> 0) / 100;
		data[5] = ((rand() * 10000) >> 0) / 100;
	}

	//create data store to be shared among the grid and bar series.
	var ds = Ext.create('Ext.data.ArrayStore', {
		fields : [{
			name : 'company'
		}, {
			name : 'price',
			type : 'float'
		}, {
			name : 'revenue %',
			type : 'float'
		}, {
			name : 'growth %',
			type : 'float'
		}, {
			name : 'product %',
			type : 'float'
		}, {
			name : 'market %',
			type : 'float'
		}],
		data : myData
	});

	//create radar dataset model.
	var chs = Ext.create('Ext.data.JsonStore', {
		fields : ['Name', 'Data'],
		data : [{
			'Name' : 'Price',
			'Data' : 100
		}, {
			'Name' : 'Revenue %',
			'Data' : 100
		}, {
			'Name' : 'Growth %',
			'Data' : 100
		}, {
			'Name' : 'Product %',
			'Data' : 100
		}, {
			'Name' : 'Market %',
			'Data' : 100
		}]
	});

	//Radar chart will render information for a selected company in the
	//list. Selection can also be done via clicking on the bars in the series.
	var radarChart = Ext.create('Ext.chart.Chart', {
		margin : '0 0 0 0',
		insetPadding : 20,
		flex : 1.2,
		animate : true,
		store : chs,
		axes : [{
			steps : 5,
			type : 'Radial',
			position : 'radial',
			maximum : 100
		}],
		series : [{
			type : 'radar',
			xField : 'Name',
			yField : 'Data',
			showInLegend : false,
			showMarkers : true,
			markerConfig : {
				radius : 4,
				size : 4
			},
			style : {
				fill : 'rgb(194,214,240)',
				opacity : 0.5,
				'stroke-width' : 0.5
			}
		}]
	});

	//create a grid that will list the dataset items.
	var gridPanel = Ext.create('Ext.grid.Panel', {
		id : 'company-form',
		flex : 0.60,
		store : ds,
		title : 'Company Data',
		requires : ['Ext.ux.grid.filter.*'],
		features : [{
			ftype : 'filters',
			local : true
		}],
		dockedItems : [{
			xtype : 'toolbar',
			items : [{
				xtype : 'combo',
				queryMode : 'local',
				store : ds,
				displayField : 'company',
				listeners : {
					change : function(me, newVal, oldVal, eOpts) {
						console.log(me.getStore());
						me.getStore().filter("company", newVal);
					}
				}
			}, {
				xtype: 'button',
				text: 'reset',
				handler: function(me){
					console.log("click");
					me.up('toolbar').down('combo').getStore().clearFilter();
				}
			}]
		}],
		columns : [{
			id : 'company',
			text : 'Company',
			flex : 1,
			filterable : true,
			sortable : true,
			dataIndex : 'company',
			renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
				if (record.get("price") > 50) {
					metaData.style = "background-color:green;";
					return '<span style="font-weight:bolder;">' + value + '</span>';
				} else if (record.get("price") < 25) {
					metaData.style = "background-color:red;";
					return '<span style="font-weight:bolder;">' + value + '</span>';
				} else {
					metaData.style = "background-color:blue;";
				}
				return '<span style="font-weight:bolder;color:white;">' + value + '</span>';
			}
		}, {
			text : 'Price',
			width : 75,
			sortable : true,
			dataIndex : 'price',
			align : 'right',
			renderer : function(value, metaData, record, rowIndex, colIndex, store, view) {
				if (value > 50) {
					metaData.style = "";
					return '<span style="color:green;font-weight:bolder;">' + Ext.util.Format.currency(value, ' $', 2, true) + '</span>';
				} else if (value < 25) {
					return '<span style="color:red;font-weight:bolder;">' + Ext.util.Format.currency(value, ' $', 2, true) + '</span>';
				}
				return '<span style="color:blue;">' + Ext.util.Format.currency(value, ' $', 2, true) + '</span>';
			}
		}, {
			text : 'Revenue',
			width : 75,
			sortable : true,
			align : 'right',
			dataIndex : 'revenue %',
			renderer : perc
		}, {
			text : 'Growth',
			width : 75,
			sortable : true,
			align : 'right',
			dataIndex : 'growth %',
			renderer : perc
		}, {
			text : 'Product',
			width : 75,
			sortable : true,
			align : 'right',
			dataIndex : 'product %',
			renderer : perc
		}, {
			text : 'Market',
			width : 75,
			sortable : true,
			align : 'right',
			dataIndex : 'market %',
			renderer : perc
		}],

		listeners : {
			selectionchange : function(model, records) {
				var json, name, i, l, items, series, fields;
				if (records[0]) {
					rec = records[0];
					if (!form) {
						form = this.up('form').getForm();
						fields = form.getFields();
						fields.each(function(field) {
							if (field.name != 'company') {
								field.setDisabled(false);
							}
						});
					} else {
						fields = form.getFields();
					}

					// prevent change events from firing
					fields.each(function(field) {
						field.suspendEvents();
					});
					form.loadRecord(rec);
					updateRecord(rec);
					fields.each(function(field) {
						field.resumeEvents();
					});
				}
			}
		}
	});

	//create a bar series to be at the top of the panel.
	var barChart = Ext.create('Ext.chart.Chart', {
		flex : 1,
		shadow : true,
		animate : true,
		store : ds,
		legend : {
			position : 'right'
		},
		axes : [{
			type : 'Numeric',
			position : 'left',
			fields : ['price', 'revenue %', 'growth %'],
			minimum : 0,
			hidden : true
		}, {
			type : 'Category',
			position : 'bottom',
			fields : ['company'],
			label : {
				renderer : function(v) {
					return Ext.String.ellipsis(v, 15, false);
				},
				font : '9px Arial',
				rotate : {
					degrees : 330
				}
			}
		}],
		series : [{
			type : 'column',
			axis : 'left',
			highlight : true,
			// style : {
			// fill : '#456d9f'
			// },
			highlightCfg : {
				fill : '#a2b5ca'
			},
			label : {
				contrast : true,
				display : 'insideEnd',
				field : 'price',
				color : '#000',
				orientation : 'vertical',
				'text-anchor' : 'middle'
			},
			listeners : {
				'itemmouseup' : function(item) {
					var series = barChart.series.get(0), index = Ext.Array.indexOf(series.items, item), selectionModel = gridPanel.getSelectionModel();

					selectedStoreItem = item.storeItem;
					selectionModel.select(index);
				}
			},
			xField : 'name',
			yField : ['price', 'revenue %', 'growth %'],
		}, {
			type : 'line',
			axis : ['left', 'bottom'],
			xField : 'company',
			yField : 'product %',
			style : {
				stroke : '#0f22f0',
				'stroke-width' : 5,
				fill : '#0f22f0',
				opacity : 0.2
			},
			label : {
				display : 'none',
				field : 'company',
				renderer : function(v) {
					return v >> 0;
				},
				'text-anchor' : 'middle'
			},
			markerConfig : {
				radius : 3,
				size : 5
			}
		}, {
			type : 'line',
			axis : ['left', 'bottom'],
			xField : 'company',
			yField : 'market %',
			style : {
				stroke : '#000000',
				'stroke-width' : 5,
				fill : '#000000',
				opacity : 0.2
			},
			label : {
				display : 'none',
				field : 'company',
				renderer : function(v) {
					return v >> 0;
				},
				'text-anchor' : 'middle'
			},
			markerConfig : {
				radius : 3,
				size : 5
			}
		}]
	});

	//disable highlighting by default.
	barChart.series.get(0).highlight = false;

	//add listener to (re)select bar item after sorting or refreshing the dataset.
	barChart.addListener('beforerefresh', (function() {
		var timer = false;
		return function() {
			clearTimeout(timer);
			if (selectedStoreItem) {
				timer = setTimeout(function() {
					selectItem(selectedStoreItem);
				}, 900);
			}
		};
	})());

	var areaChart = Ext.create('Ext.chart.Chart', {
		animate : true,
		store : ds,
		shadow : true,
		theme : 'Category1',
		legend : {
			position : 'top'
		},
		axes : [{
			type : 'Numeric',
			position : 'left',
			fields : ['price', 'revenue %', 'growth %', 'product %', 'market %'],
			title : 'LINE CHART WIHT LEGEND',
			label : {
				font : '9px Verdana'
			},
			grid : {
				odd : {
					opacity : 1,
					fill : '#ddd',
					stroke : '#bbb',
					'stroke-width' : 1
				}
			},
			minimum : 0,
			adjustMinimumByMajorUnit : 0
		}, {
			type : 'Category',
			position : 'bottom',
			fields : ['company'],
			// title : 'COMPANY DETAILS',
			grid : true,
			label : {
				font : '9px Verdana',
				rotate : {
					degrees : 10
				}
			}
		}],
		series : [{
			type : 'area',
			highlight : false,
			axis : 'left',
			xField : 'company',
			yField : ['price', 'revenue %', 'growth %', 'product %', 'market %'],
			style : {
				opacity : 0.93
			}
		}]
	});

	var pieChart = Ext.create('Ext.chart.Chart', {
		animate : true,
		store : ds,
		shadow : false,
		theme : 'Base:gradients',
		series : [{
			type : 'pie',
			angleField : 'price',
			showInLegend : true,
			tips : {
				trackMouse : true,
				width : 140,
				height : 28,
				renderer : function(storeItem, item) {
					// calculate and display percentage on hover
					var total = 0;
					ds.each(function(rec) {
						total += rec.get('price');
					});
					this.setTitle(storeItem.get('company') + ': ' + Math.round(storeItem.get('price') / total * 100) + '%');
				}
			},
			highlight : {
				segment : {
					margin : 2
				}
			},
			label : {
				field : 'company',
				display : 'rotate',
				contrast : true,
				font : '8px Arial'
			}
		}]
	});

	/*
	 * Here is where we create the Form
	 */
	var gridForm = Ext.create('Ext.form.Panel', {
		title : 'Company data',
		frame : true,
		bodyPadding : 5,
		width : 870,
		height : 1120,

		fieldDefaults : {
			labelAlign : 'left',
			msgTarget : 'side'
		},

		layout : {
			type : 'vbox',
			align : 'stretch'
		},

		items : [{
			height : 200,
			layout : 'fit',
			margin : '0 0 5 0',
			items : [barChart]
		}, {
			/* MY CUSTOM PANEL*/
			xtype : 'container',
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			margin : '0 0 5 0',
			items : [{
				height : 300,
				layout : 'fit',
				border : true,
				flex : 1,
				items : [areaChart]
			}, {
				height : 300,
				width : 300,
				layout : 'fit',
				margin : '0 0 0 5',
				border : true,
				items : [pieChart]
			}]
		}, {

			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			flex : 3,
			border : false,
			bodyStyle : 'background-color: transparent',

			items : [gridPanel, {
				flex : 0.4,
				layout : {
					type : 'vbox',
					align : 'stretch'
				},
				margin : '0 0 0 5',
				title : 'Company Details',
				items : [{
					margin : '5',
					xtype : 'fieldset',
					flex : 1,
					title : 'Company details',
					defaults : {
						width : 240,
						labelWidth : 90,
						disabled : true
					},
					defaultType : 'numberfield',
					items : [{
						fieldLabel : 'Name',
						name : 'company',
						xtype : 'textfield'
					}, {
						fieldLabel : 'Price',
						name : 'price',
						maxValue : 100,
						minValue : 0,
						enforceMaxLength : true,
						maxLength : 5,
						listeners : createListeners('price')
					}, {
						fieldLabel : 'Revenue %',
						name : 'revenue %',
						maxValue : 100,
						minValue : 0,
						enforceMaxLength : true,
						maxLength : 5,
						listeners : createListeners('revenue %')
					}, {
						fieldLabel : 'Growth %',
						name : 'growth %',
						maxValue : 100,
						minValue : 0,
						enforceMaxLength : true,
						maxLength : 5,
						listeners : createListeners('growth %')
					}, {
						fieldLabel : 'Product %',
						name : 'product %',
						maxValue : 100,
						minValue : 0,
						enforceMaxLength : true,
						maxLength : 5,
						listeners : createListeners('product %')
					}, {
						fieldLabel : 'Market %',
						name : 'market %',
						maxValue : 100,
						minValue : 0,
						enforceMaxLength : true,
						maxLength : 5,
						listeners : createListeners('market %')
					}]
				}, radarChart]
			}]
		}],
		renderTo : bd
	});

	var gp = Ext.getCmp('company-form');
}); 