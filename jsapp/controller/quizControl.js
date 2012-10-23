/*
 * File: jsapp/controller/abControl.js
 * 'userAccessModel',
 * 'userAccessStore',
 */

Ext.define('MyApp.controller.quizControl', {
    extend : 'Ext.app.Controller',

    models : [],
    stores : [],
    views : ['SingleChoiceQuizView'],
    refs : [{
        ref : 'squiz',
        selector : 'singlechoicequizview'
    }],
    /*views : ['UserAccessView'],*/
    init : function() {
        this.control({
            'singlechoiceview' : {
                render : this.onLoadQuizView
            },
            'singlechoiceview button[itemId="Leave-Quiz"]' : {
                click : this.onLeaveQuiz
            },
            'contentquizview button[iconCls="back-button"]' : {
                click : this.onLeaveQuiz
            },
            'singlechoiceview button[itemId="next-button"]' : {
                click : this.onNextView
            },
            'singlechoiceview button[itemId="prev-button"]' : {
                click : this.onPrevView
            },
            'editsinglechoicequizview #editQuizGrid' :{
                select : this.onQuizGridSelect
            },
            'editsinglechoicequizview #addAnswerField' :{
                click : this.onAddAnswerField
            },
            'editsinglechoicequizview #save-singleQuiz-but' :{
                click : this.onAddSingleQuiz
            },
            'editsinglechoicequizview #save-multiQuiz-but' :{
                click : this.onAddMultipleQuiz
            },
            'editsinglechoicequizview #quizType' : {
                change : this.onChangeQuizType
            }

        });
    },
    onLoadQuizView : function(me, opts){
        //console.log(me);
        var b = Ext.ComponentQuery.query('contentquizview #prev-button'), button = b[0];
        button.hide();
    },
    onChangeQuizType : function(me, newValue, oldValue, eOpts){
        var o = Ext.ComponentQuery.query('contentquizview'), parent = o[0];
        var quiz = parent.down('#edit-quiz').down('#formPanel');
        var quizContent = Ext.ComponentQuery.query('contentquizview');
        var childComponent = quizContent[0];
        var rec = childComponent.SelectedRecord;
        var record =rec.data;
        if(newValue == 3){
            var hiddenField = quiz.down('#addmultipleQuiz').down('hidden[name="course_id"]');
            hiddenField.setValue(record.course_id);
            hiddenField = quiz.down('#addmultipleQuiz').down('hidden[name="topic_id"]');
            hiddenField.setValue(record.topic_id);
            hiddenField = quiz.down('#addmultipleQuiz').down('hidden[name="content_id"]');
            hiddenField.setValue(record.id);
            quiz.down('#addmultipleQuiz').down('combobox[name="quiz_type"]').setValue(newValue);
            quiz.getLayout().setActiveItem(1);  
        }else if(newValue == 4){
            var hiddenField = quiz.down('#addSingleQuiz').down('hidden[name="course_id"]');
            hiddenField.setValue(record.course_id);
            hiddenField = quiz.down('#addSingleQuiz').down('hidden[name="topic_id"]');
            hiddenField.setValue(record.topic_id);
            hiddenField = quiz.down('#addSingleQuiz').down('hidden[name="content_id"]');
            hiddenField.setValue(record.id);
            quiz.down('#addSingleQuiz').down('combobox[name="quiz_type"]').setValue(newValue);
            quiz.getLayout().setActiveItem(0);  
        }
    },
    onQuizGridSelect : function(me, record, index, opts){
        var data = record.raw;
        console.log(data);
        var o = Ext.ComponentQuery.query('contentquizview #addSingleQuiz'), form = o[0];
        form.setTitle('Edit Quiz');
        form.down('combo[name="quiz_type"]').setValue(data.quiz_type);
        form.down('textfield[name="question"]').setValue(data.ques);
        form.down('textfield[name="answer1"]').setValue(data.ans[0].Ans);
        form.down('textfield[name="answer2"]').setValue(data.ans[1].Ans);
        form.down('textfield[name="answer3"]').setValue(data.ans[2].Ans);
        form.down('textfield[name="answer4"]').setValue(data.ans[3].Ans);
        
//        if(data.ans[0].Ans == data.correctAns[0]){
//            form.down('radiofield[itemId="ans1"]').setValue(true);
//        }else if(data.ans[1].Ans == data.correctAns[0]){
//            form.down('radiofield[itemId="ans2"]').setValue(true);
//        }else if(data.ans[2].Ans == data.correctAns[0]){
//            form.down('radiofield[itemId="ans3"]').setValue(true);
//        }else if(data.ans[3].Ans == data.correctAns[0]){
//            form.down('radiofield[itemId="ans4"]').setValue(true);
//        }
//        form.down('hiddenfield[name="id"]').setValue(data.que_id);
//        form.down('hiddenfield[name="course_id"]').setValue(data.course_id[0]);
//        form.down('hiddenfield[name="topic_id"]').setValue(data.topic_id[0]);
//        form.down('hiddenfield[name="content_id"]').setValue(data.content_id[0]);
    },
    onAddAnswerField : function(me, e, opts){
        var form = me.up('form');
        var count = form.items.length;
        count = count-1;
        var textField = Ext.create('Ext.form.field.Text', {
            fieldLabel : 'Answer '+count ,
            labelWidth : 70,
            anchor : '100%',
            name : 'answer'+count,
            allowBlank : false
        });
        form.add(textField);
    },
    onAddSingleQuiz : function(me, e, opts){
        var form = me.up('form').getForm();
        var values = me.up('form').getValues();
        if(form.isValid()){
            Ext.Ajax.request({
                url : 'data/QuizData.php',
                method : 'post',
                type : 'json',
                params : values,
                scope : this,
                failure : function(response) {
                    this.createNotification(lang.logout, lang.failure.logout, 'error', 't');
                },
                success : function(response) {
                    var res = Ext.decode(response.responseText);
                    var o = Ext.ComponentQuery.query('contentquizview #editQuizGrid'), grid = o[0];
                    grid.store.proxy.extraParams.course_id = values.course_id;
                    grid.store.proxy.extraParams.topic_id = values.topic_id;
                    grid.store.proxy.extraParams.content_id = values.content_id;
                    grid.store.load();
                    me.up('form').getForm().reset();
                    var form = me.up('form');
                    form.setTitle('Add Quiz');
                    form.down('hiddenfield[name="id"]').setValue('new');
                    form.down('hiddenfield[name="course_id"]').setValue(values.course_id);
                    form.down('hiddenfield[name="topic_id"]').setValue(values.topic_id);
                    form.down('hiddenfield[name="content_id"]').setValue(values.content_id);
                    
                }
            });
        }
    },
    onAddMultipleQuiz : function(me, e, opts){
        var form = me.up('form').getForm();
        var values = me.up('form').getValues();
        if(values.CorrectAns.length > 1 && values.CorrectAns.length < 3){
            values.CorrectAns1 = values.CorrectAns[0];
            values.CorrectAns2 = values.CorrectAns[1];
        }else if(values.CorrectAns.length > 2 &&  values.CorrectAns.length < 4){
            values.CorrectAns1 = values.CorrectAns[0];
            values.CorrectAns2 = values.CorrectAns[1];
            values.CorrectAns3 = values.CorrectAns[2];
        }else if(values.CorrectAns.length > 3){
            values.CorrectAns1 = values.CorrectAns[0];
            values.CorrectAns2 = values.CorrectAns[1];
            values.CorrectAns3 = values.CorrectAns[2];
            values.CorrectAns4 = values.CorrectAns[3];
        }
        if(form.isValid()){
            Ext.Ajax.request({
                url : 'data/QuizData.php',
                method : 'post',
                type : 'json',
                params : values,
                scope : this,
                failure : function(response) {
                    this.createNotification(lang.logout, lang.failure.logout, 'error', 't');
                },
                success : function(response) {
                    var res = Ext.decode(response.responseText);
                    var o = Ext.ComponentQuery.query('contentquizview #editQuizGrid'), grid = o[0];
                    grid.store.proxy.extraParams.course_id = values.course_id;
                    grid.store.proxy.extraParams.topic_id = values.topic_id;
                    grid.store.proxy.extraParams.content_id = values.content_id;
                    grid.store.load();
                    me.up('form').getForm().reset();
                    var form = me.up('form');
                    form.setTitle('Add Quiz');
                    form.down('hiddenfield[name="id"]').setValue('new');
                    form.down('hiddenfield[name="course_id"]').setValue(values.course_id);
                    form.down('hiddenfield[name="topic_id"]').setValue(values.topic_id);
                    form.down('hiddenfield[name="content_id"]').setValue(values.content_id);
                    
                }
            });
        }
    },
    onNextView : function(me, e, opts){
        var values = me.up('form').getValues();
        var form = me.up('form').getForm();
        if(form.isValid()){
            Ext.Ajax.request({
                url : 'data/QuizData.php',
                method : 'post',
                type : 'json',
                params : values,
                scope : this,
                failure : function(response) {
                    this.createNotification(lang.logout, lang.failure.logout, 'error', 't');
                },
                success : function(response) {
                    var o = Ext.ComponentQuery.query('contentquizview'), parent = o[0];
                    quiz = parent.getLayout().getActiveItem();
                    var count = quiz.data.length;
                    var id = quiz.SelectedData.id;
                    var setItemId = id + 1;
                    var o = Ext.ComponentQuery.query('contentquizview'), parent = o[0];
                    if(count >= setItemId){
                        parent.getLayout().setActiveItem('quiz-'+setItemId);
                    }else{
                        me.hide();
                        var quizContent = Ext.ComponentQuery.query('contentquizview'), childComponent = quizContent[0];
                        var data = childComponent.SelectedRecord.data;
                        
                        var o = Ext.ComponentQuery.query('contentquizview'), parent = o[0];
                        var ResultComponent;
                        ResultComponent = parent.down('#singleQuizResult');
                        if(!ResultComponent) {
                            ResultComponent = Ext.create('MyApp.view.SingleChoiceResultView', {
                                itemId : 'singleQuizResult'
                            });
                            parent.add(ResultComponent);
                        }
                        ResultComponent.doLayout();
                        Ext.Ajax.request({
                            url : 'data/QuizData.php',
                            method : 'post',
                            type : 'json',
                            params : {
                                "module" : 'resultQuiz',
                                "type" : 'result',
                                "content_id" : data.id,
                                "topic_id" : data.topic_id,
                                "course_id" : data.course_id
                            },
                            scope : this,
                            failure : function(response) {
                                this.createNotification(lang.logout, lang.failure.logout, 'error', 't');
                            },
                            success : function(response) {
                                var res = Ext.decode(response.responseText);
                                var record = res.data;
                                var menuTpl = [];
                                Ext.Array.each(record, function(rec) {
                                    menuTpl +=['<div class="databox"><ul>', '<li><div>('+rec.id+') &nbsp;Question : </div><div>'+rec.ques+'</div></li>', '<li><div>Selected Ans : </div><div>'+rec.selectedAns+'</div></li>','<li><div>Correct Ans : </div><div>'+rec.ans+'</div></li>','<li><div>Result : </div><div><img src="'+rec.icon+'" /></div></li>','</ul></div><br /><br />'].join('');
                                });
                                var o = Ext.ComponentQuery.query("singlechoiceresultview #result-panel"), pane = o[0];
                                pane.tpl = new Ext.XTemplate(menuTpl);
                                pane.tpl.overwrite(pane.body, record);
                            }
                        });
                        var o = Ext.ComponentQuery.query("singlechoiceresultview #resultChart"), pane = o[0];
                        pane.store.proxy.extraParams.content_id = data.id;
                        pane.store.proxy.extraParams.topic_id = data.topic_id;
                        pane.store.proxy.extraParams.course_id = data.course_id;
                        pane.store.load();
                        parent.getLayout().setActiveItem('singleQuizResult');
                    }
                }
            });
        }
    },
    onPrevView : function(me, e, opts){
        var o = Ext.ComponentQuery.query('contentquizview'), parent = o[0];
        quiz = parent.getLayout().getActiveItem();
        var id = quiz.SelectedData.id;
        var setItemId = id - 1;
        if(setItemId >= 1){
            var o = Ext.ComponentQuery.query('contentquizview'), parent = o[0];
            parent.getLayout().setActiveItem('quiz-'+setItemId);
        }else{
            me.hide();
        }
    },
    onLeaveQuiz : function(me, e, opts) {
        var appArr = Ext.ComponentQuery.query('workspaceview container[region="west"]');
        var appViewInstance = appArr[0];
        appViewInstance.show();
        var currCon = Ext.ComponentQuery.query('workspaceview container[region=center]');
        currCon[0].getLayout().setActiveItem('content-panel');
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
