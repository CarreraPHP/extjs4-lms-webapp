/*
 * File: jsapp/store/base/categoryTreeStore.js
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
 url: 'js/lib/ext-4.0/examples/tree/treegrid.json',
            root: {
                text: 'TOP',
                id: 'src',
                expanded: true
            }
 *                 
 */

Ext.define('MyApp.store.categoryTreeStore', {
    extend: 'Ext.data.TreeStore',
    requires: [
        'MyApp.model.categoryModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
        	autoLoad: false,
        	autoSync: false,
            storeId: 'CategoryTreeStore',
            model: 'MyApp.model.categoryModel',           
            proxy: {
                type: 'ajax',
                url: 'data/DataList.php?module=category&display=tree&type=json'                
            },
            folderSort: true,
            clearOnload: false,
            sorters: [{
                property: 'text',
                direction: 'ASC'
            }]
        }, cfg)]);
    }
});