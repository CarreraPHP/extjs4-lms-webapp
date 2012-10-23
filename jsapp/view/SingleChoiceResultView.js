/*
 * File: jsapp/view/ui/CategoryTreeView.js
 * something
 */
Ext.define('MyApp.view.SingleChoiceResultView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.singlechoiceresultview',
    autoScroll : true,
    border : false,
    frame : false,
    layout : {
        type : 'hbox',
        align : 'stretch'
    },
    margin : '5 0 0 0',
    initComponent : function() {
        var me = this;

        Ext.applyIf(me, {
            items : [{
                xtype :'panel',
                title : 'Correct Answers',
                itemId : 'result-panel',
                flex :1,
                bodyPadding : 5,
                record: {},
                autoScroll : true,
                tpl : ['<div>Question : </div><div>{ques}</div><br />', '<div>Answer : </div><div>{ans}</div>']
            },{
                xtype : 'panel',
                margin : '0 0 0 3',
                flex : 1,
                title : 'Your Results Chart',
                bodyPadding : 10,
                autoScroll : true,
                itemId : 'resultChartPanel',
                items : [{
                    xtype : 'chart',
                    itemId : 'resultChart',
                    width: 600,
                    height: 650,
                    animate: true,
                    store : Ext.create('MyApp.store.resultChartStore'),
                    theme: 'Base:gradients',
                    series: [{
                        type: 'pie',
                        angleField: 'result',
                        showInLegend: true,
                        tips: {
                            trackMouse: true,
                            width: 80,
                            height: 28,
                            renderer: function(storeItem, item) {
                                this.setTitle(storeItem.get('correct') + ' / ' + storeItem.get('count'));
                            }
                        },
//                        highlight: {
//                            segment: {
//                                margin: 20
//                            }
//                        },
                        label: {
                            field: 'name',
                            display: 'rotate',
                            contrast: true,
                            font: '18px Arial',
                            color : '#000'
                        },
                        legend: {
                            position: 'top'
                        },
                        renderer : function(sprite, record, attr, index, store) {
                            if(record.data.correct == 0){
                                return Ext.apply(attr, {
                                    fill : ['#FE2E2E'][index]
                                });
                            }else{
                                return Ext.apply(attr, {
                                    fill : ['#58FA58','#FE2E2E'][index]
                                });
                            }
                            
                        }
                    }]
                }]
                
            }]
        });

        me.callParent(arguments);
    }
});
