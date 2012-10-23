Ext.define('MyApp.model.resultChartModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'name',
		type : 'string'
	}, {
		name : 'result',
		type : 'int'
	},{
            name : 'count',
            type : 'int'
        },{
            name : 'correct',
            type : 'int'
        }]
});


