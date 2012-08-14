/*
 * File: jsapp/view/CKEditor.js
 *
 */

Ext.define('MyApp.view.CKEditor', {
	extend : 'Ext.form.field.TextArea',
	alias : 'widget.ckeditor',
	zIndex: 100,
	initComponent : function() {
		this.callParent(arguments);
		this.on('afterrender', function() {
			Ext.apply(this.CKConfig, {
				height : this.getHeight()
			});
			this.editor = CKEDITOR.replace(this.inputEl.id, this.CKConfig);
			this.editorId = this.editor.id;
		}, this);
	},
	onRender : function(ct, position) {
		if(!this.el) {
			this.defaultAutoCreate = {
				tag : 'textarea',
				autocomplete : 'off'
			};
		}
		this.callParent(arguments)
	},
	setValue : function(value) {
		this.callParent(arguments);
		if(this.editor) {
			this.editor.setData(value);
		}
	},
	getRawValue : function() {
		if(this.editor) {
			return this.editor.getData();
		} else {
			return '';
		}
	},
	CKConfig: {
		/*skin : 'karma',*/
		font_names : 'Arial;Times New Roman;Verdana',
		fontSize_sizes : '12/12px;18/18px;24/24px;36/36px;',						
		toolbar:[
			['Source','-','NewPage','Preview','-','Templates'],
			['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print', 'SpellChecker', 'Scayt'],
			['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
			['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'],
			'/',
			['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
			['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
			['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
			['Link','Unlink','Anchor'],
			['Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak'],
			'/',
			['Styles','Format','Font','FontSize'],
			['TextColor','BGColor']/*,
			['Maximize', 'ShowBlocks','-','About']*/
		],
		filebrowserBrowseUrl : 'js/lib/kcfinder/browse.php',
		filebrowserUploadUrl : 'js/lib/kcfinder/browse.php',
		filebrowser:true,
		imagebrowser:true,
		/*
		filebrowser_image_browse_url : '/a/ckfinder/ckfinder.html?action=js&func=SetUrl&thumbFunc=SetUrl&Type=Images',
		filebrowser_flash_browse_url : '/a/ckfinder/ckfinder.html?action=js&func=SetUrl&thumbFunc=SetUrl&Type=Flash',
		filebrowser_upload_url : '/a/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
		filebrowser_image_upload_url : '/a/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images',
		filebrowser_flash_upload_url : '/a/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash'
		*/
	}
});
