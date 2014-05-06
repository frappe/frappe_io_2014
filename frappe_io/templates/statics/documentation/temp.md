## Install

## Make App

$ frappe --make_app .
App Name: library_management
App Title: Library Management
App Description: App for managing Articles, Members, Memberships and Transactions for Libraries
App Publisher: Web Notes
App Icon: icon-book
App Color: #589494
App Email: info@frappe.io
App URL: https://frappe.io/apps/library_management
App License: GNU General Public License

### App Structure


	.
	├── MANIFEST.in
	├── README.md
	├── library_management
	│   ├── __init__.py
	│   ├── config
	│   │   ├── __init__.py
	│   │   └── desktop.py
	│   ├── hooks.py
	│   ├── library_management
	│   │   └── __init__.py
	│   ├── modules.txt
	│   ├── patches.txt
	│   └── templates
	│       ├── __init__.py
	│       ├── generators
	│       │   └── __init__.py
	│       ├── pages
	│       │   └── __init__.py
	│       └── statics
	├── license.txt
	├── requirements.txt
	└── setup.py

### Setup

	$ cd library_managment/
	$ python setup.py develop


# Make Site

	$ cd sites
	$ frappe --install library library
	MySQL root password:
	Created user library
	Created database library
	Granted privileges to user library and database library
	Starting database import...
	Imported from database /private/var/www/rmehta/bench/frappe/frappe/data/Framework.sql
	core | doctype | bulk_email
	core | doctype | comment
	core | doctype | communication
	core | doctype | custom_field
	core | doctype | custom_script
	core | doctype | customize_form
	core | doctype | customize_form_field
	core | doctype | defaultvalue
	core | doctype | docfield
	core | doctype | docperm
	core | doctype | doctype
	core | doctype | event
	..
	..
	website | doctype | web_page
	website | doctype | website_group
	website | doctype | website_route
	website | doctype | website_route_permission
	website | doctype | website_script
	website | doctype | website_settings
	website | doctype | website_slideshow
	website | doctype | website_slideshow_item
	website | doctype | website_template
	website | page | sitemap_browser

### Site Structure

	.
	├── locks
	├── private
	│   └── backups
	├── public
	│   └── files
	└── site_config.json

### Add to apps.txt


### Install App

	$ frappe library --install_app library_management

### Test

	$ frappe --use library
	$ frappe --serve
	 * Running on http://0.0.0.0:8000/
	 * Restarting with reloader


## Making Models

### Developer Mode

	{
	 "db_name": "library",
	 "db_password": "v3qHDeVKvWVi7s97",
	 "developer_mode": 1
	}

### Models

#### Roles

1. Librarian
1. Library Member

1. Article
	- fields
	- permissions

### Directory Structure

	.
	├── MANIFEST.in
	├── README.md
	├── library_management
	..
	│   ├── library_management
	│   │   ├── __init__.py
	│   │   └── doctype
	│   │       ├── __init__.py
	│   │       ├── article
	│   │       │   ├── __init__.py
	│   │       │   ├── article.json
	│   │       │   └── article.py
	│   │       ├── library_member
	│   │       │   ├── __init__.py
	│   │       │   ├── library_member.json
	│   │       │   └── library_member.py
	│   │       ├── library_membership
	│   │       │   ├── __init__.py
	│   │       │   ├── library_membership.json
	│   │       │   └── library_membership.py
	│   │       └── library_transaction
	│   │           ├── __init__.py
	│   │           ├── library_transaction.json
	│   │           └── library_transaction.py


### Create Test User

1. Login As User
1. Module
1. New Article
1. New Member
1. New Membership

### Triggers for Controllers

library_membership.js

	cur_frm.add_fetch("library_member", "first_name", "member_first_name");
	cur_frm.add_fetch("library_member", "last_name", "member_last_name");

### System Settings

Date / Time Format / Time Zone

### Scripting Forms and API

library_transaction.js

	cur_frm.add_fetch("article", "article_name", "article_name");

	frappe.ui.form.on("Library Transaction", "library_member", function(frm) {
		$.ajax({
			url:"/api/resource/Library Member/" + frm.doc.library_member,
			statusCode: {
				200: function(data) {
					frappe.model.set_value(frm.doctype, frm.docname, "member_name",
						data.data.first_name
						+ (data.data.last_name ? (" " + data.data.last_name) : ""))
				}
			}
		})
	})

### Server Side Validations

	from __future__ import unicode_literals
	import frappe
	from frappe import _
	from frappe.model.document import Document

	class LibraryTransaction(Document):
		def validate(self):
			last_transaction = frappe.get_list("Library Transaction",
				fields=["transaction_type", "transaction_date"],
				filters = {
					"article": self.article,
					"transaction_date": ("<=", self.transaction_date),
					"name": ("!=", self.name)
				})
			if self.transaction_type=="Issue":
				if last_transaction and last_transaction[0].transaction_type=="Issue":
					frappe.throw(_("Article {0} {1} has not been recorded as returned since {1}".format(
						self.article, self.article_name, last_transaction[0].transaction_date
					)))
			else:
				if not last_transaction or last_transaction[0].transaction_type!="Issue":
					frappe.throw(_("Cannot return article not issued"))

### Queries

1. Query to select member by name (not id)
1. Query to select article by name (not id)
