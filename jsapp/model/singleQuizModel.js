/*
 * File: jsapp/model/categoryModel.js
 *
 * This file was generated by Sencha Designer version 2.0.0.
 * http://www.sencha.com/products/designer/
 *
 * This file requires use of the Ext JS 4.0.x library, under independent license.
 * License of Sencha Designer does not include license for Ext JS 4.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.model.singleQuizModel', {
	extend : 'Ext.data.Model',
	fields : [{
		name : 'question',
		type : 'string',
		mapping : 'ques'
	}, {
		name : 'answer',
		type : 'string',
		mapping : 'Ans'
	}, {
		name : 'ans_id',
		type : 'string'
	}, {
		name : 'que_id',
		type : 'string'
	}]
});