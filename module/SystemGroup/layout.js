/*
	Copyright 2013 x10c-lab.com
	Authors:
		- mhd.sulhan (sulhan@x10c-lab.com)
*/
var SystemGroupGroup;
var SystemGroupUser;

function JxSystemGroup_User ()
{
	this.id		= "SystemGroup_User";
	this.dir	= _g_module_dir + this.id.replace (/_/g, "/");

	this.store			= Ext.create ("Jx.StorePaging", {
			storeId		:this.id
		,	url			:this.dir +"/data.jsp"
		,	extraParams	:
			{
				_group_id	:0
			}
		,	fields		:
			[
				"id"
			,	"_user_id"
			,	"_user_name"
			,	"_user_realname"
			,	"_group_id"
			]
		});

	this.storeNon		= Ext.create ("Jx.StorePaging", {
			storeId		:this.id +"Non"
		,	url			:this.dir +"/data_non.jsp"
		,	extraParams	:
			{
				_group_id	:0
			}
		,	fields		:
			[
				"_user_id"
			,	"_user_realname"
			]
		});

	this.panel			= Ext.create ("Jx.GridPaging", {
			id			:this.id
		,	region		:"east"
		,	split		:true
		,	title		:"Users of Group"
		,	width		:"50%"
		,	store		:this.store
		,	__class__	:this
		,	formDock	:"bottom"
		,	columns		:
			[{
				header		:"ID"
			,	dataIndex	:"id"
			,	hidden		:true
			,	editor		:
				{
					xtype		:"textfield"
				,	hidden		:true
				}
			},{
				header		:"User"
			,	dataIndex	:"_user_id"
			,	hidden		:true
			,	editor		:
				{
					xtype			:"combobox"
				,	store			:this.storeNon
				,	valueField		:"_user_id"
				,	displayField	:"_user_realname"
				,	pageSize		:_g_paging_size
				,	shrinkWrap		:3
				}
			},{
				header		:"Group"
			,	dataIndex	:"_group_id"
			,	hidden		:true
			,	editor		:
				{
					xtype		:"textfield"
				,	hidden		:true
				}
			},{
				header		:"User"
			,	dataIndex	:"_user_realname"
			,	flex		:1
			}]

		,	afterFormSave	:function ()
			{
				this.__class__.storeNon.load ();
			}
		});

	this.doRefresh	= function (perm, gid)
	{
		if (gid <= 0) {
			this.panel.clearData ();
			return;
		}

		this.store.proxy.extraParams._group_id		= gid;
		this.storeNon.proxy.extraParams._group_id	= gid;
		this.storeNon.load ();
		this.panel.doRefresh (perm);
	}
}

function JxSystemGroup_Group ()
{
	this.id		= "SystemGroup_Group";
	this.dir	= _g_module_dir + this.id.replace (/_/g, "/");

	this.store			= Ext.create ("Jx.StorePaging", {
			storeId		:this.id
		,	url			:this.dir +"/data.jsp"
		,	fieldId		:"id"
		,	fields		:
			[
				"id"
			,	"name"
			]
		});

	this.panel		= Ext.create ("Jx.GridPaging", {
			id			:this.id
		,	region		:"center"
		,	title		:"System Group"
		,	store		:this.store
		,	formDock	:"bottom"
		,	columns		:
			[{
				header		:"ID"
			,	dataIndex	:"id"
			,	hidden		:true
			,	editor		:
				{
					xtype			:"textfield"
				,	hidden			:true
				}
			},{
				header		:"Group name"
			,	dataIndex	:"name"
			,	flex		:1
			,	editor		:
				{
					xtype			:"textfield"
				,	allowBlank		:false
				}
			}]
		,	compDetails		:
			[
				SystemGroupUser
			]
		});

	this.doRefresh			= function (perm)
	{
		this.panel.doRefresh (perm);
	}
};

function JxSystemGroup ()
{
	this.id			="SystemGroup";
	this.dir		= _g_module_dir + this.id;

	SystemGroupUser		= new JxSystemGroup_User ();
	SystemGroupGroup	= new JxSystemGroup_Group ();

	this.panel		= Ext.create ("Ext.container.Container", {
			id		:this.id
		,	layout	:"border"
		,	items	:
			[
				SystemGroupGroup.panel
			,	SystemGroupUser.panel
			]
		});

	this.doRefresh	= function (perm)
	{
		SystemGroupGroup.doRefresh (perm);
		SystemGroupUser.doRefresh (perm, 0);
	}
}

var SystemGroup = new JxSystemGroup ();
