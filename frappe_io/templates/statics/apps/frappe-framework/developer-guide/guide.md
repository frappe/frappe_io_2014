# Guide Book

In this guide we will show you how to create an application from scratch using **Frappe**. Using the example of a Library Management System, we will cover:

1. Installation
1. Making a New App
1. Making Models
1. Creating Controllers
1. Creating Web Views
1. Setting Hooks and Tasks

## Who is This For?

This guide is intended for software developers who are familiar with how the web applications are built and served. Frappe Framework is built on Python and uses MariaDB database and for creating web views, HTML/CSS/Javascript is used. So it would be great if you are familiar with all these techonlogies. At minimum if you have never used Python before, you should take a quick tutorial before your use this Guide.

Frappe uses the git version control system on GitHub. It is also important that you are familiar with basic git and have an account on GitHub to manage your applications.

## Example

For this guide book, we will build a simple **Library Management** application. In this application we will have models:

1. Article (Book or any other item that can be loaned)
1. Library Member
1. Library Transaction (Issue or Return of an article)
1. Library Membership (A period in which a member is allowed to transact)
1. Library Management Setting (Global settings like period of loan)

The user interface (UI) for the librarian will be the **Frappe Desk**, a built-in browser based UI enviornment where forms are automatically generated from the models and roles and permissions are also applied.

We will also create web views for library where users can browser articles from a website.

---

## Introduction

An Application in Frappe in just a standard Python application. You can structure a Frappe Application the same way you structure a standard Python Application. For deployment, Frappe uses the standard Python Setuptools, so you can easily port and install the application on any machine.

Frappe Framework provides a WSGI interface and for development you can use the built-in Werkzeug server. For implementing in production, we recommend using nginx and gunicorn.

Frappe also has a multi-tenant architecture, grounds up. This means that you can run multiple "sites" in your setup, each could be serving a different set of applications and users. The database for each site is separate.

---

## Install

Easiest way to setup setup on a Unix Like system is to use frappe-bench. Read the detailed instructions on how to install using Frappe Bench.

> [https://github.com/frappe/frappe-bench](https://github.com/frappe/frappe-bench)

With Frappe Bench you will be able to setup and host multiple applications and sites and it will also setup a Python Virtualenv so that you can have an isolated environment to run your applications (and will not have version conflict with other development environments).

The `frappe` command line tool will also be installed that will help you in development and management of the installation.

---

## Make a New App Boilerplate

After the bench is installed, there are two main folders, `apps` and `sites`. All the applications will be installed in apps. `frappe`, `erpnext` and `shopping_card` come pre-installed.

To make a new application go to you bench folder and run, `frappe --make_app apps` and fill in details about the application. This will create a boilerplate application for your.

	$ frappe --make_app apps
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

The application will be created in a folder called `library_management` and will have the following structure:

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

1. `config` folder contains application configuration info
1. `desktop.py` is where desktop icons can be added to the Desk
1. `hooks.py` is where integrations with the environment and other applications is mentioned.
1. `library_management` (inner) is a **module** that is bootstrapped. In Frappe, a **module** is where model and controller files reside.
1. `modules.txt` contains list of **modules** in the app. When you create a new module, it is required that you update it in this file.
1. `patches.txt` is where migration patches are written. They are python module references using the dot notation.
1. `templates` is the folder where web view templates are maintained. Templates for **Login** and other standard pages are bootstrapped in frappe.
1. `generators` are where templates for models are maintained, where each model instance has a separte web route, for example a **Blog Post** where each post has its unique web url. In Frappe, the templating engine used is Jinja2
1. `pages` is where single route templates are maintained. For example for a "/blog" type of page.

Now Setup this application for using and development

	$ cd apps/library_managment/
	$ python setup.py develop


### Make Site

The next step is to make a site where we can run this application. So make a new site, go back to the `bench/sites` folder.

Let us create a new site and call it `library` and name its corresponding database also as `library`

You can install a new site, by the command `frappe --install [sitename] [dbname]`

This will create a new database and site folder and install `frappe` (which is also an application!) in the new site. The `frappe` application has two built-in modules **Core** and **Website**. The Core module contains the basic models for the application. Frappe is a batteries included framework and comes with a lot of built-in models. These models are called **DocTypes**. More on that later.

	bench $ cd sites
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

A new folder called `library` will be created in the `sites` folder. Here is the standard folder structure for a site.

	.
	├── locks
	├── private
	│   └── backups
	├── public
	│   └── files
	└── site_config.json

1. `public/files` is where user uploaded files are stored.
1. `private/backups` is where backups are dumped
1. `site_config.json` is where site level configurations are maintained.

### Install App

Now let us install our app `library_management` in our site `library`

1. Add `library_management` in a new line in `sites/apps.txt` to let frappe know that library_management is an installable application.
1. Install library_management in library with: `frappe [site] --install_app [app]`

Example:

	$ frappe library --install_app library_management

### Start the App

Now we can login and check if everything works. Before we start the server, we can set our default site as `library` so that we do not have to enter it after every command. To set default site, use `frappe --use [site]`

Then to start the development server, run `frappe --serve`

	$ frappe --use library
	$ frappe --serve
	 * Running on http://0.0.0.0:8000/
	 * Restarting with reloader

You can now open your browser and go to `http://localhost:8000`. You should see this login page if all goes well:

![Login Page](/assets/frappe_io/images/guide/01-login.png)

Now login as the default user "Administrator"

Login ID: **Administrator**
Password: **admin**

When you login, you should see the "Desk" home page

![Desk](/assets/frappe_io/images/guide/02-desktop.png)

As you can see, the Frappe basic system comes with a bunch of pre-loaded applications and screens like To Do, Calendar etc. These apps can integrated in your app workflow as we progress.

---

## Making Models

The next step is to create the models as we discussed in the introduction. In Frappe, models are called **DocType**. You can create new DocTypes from the Desk UI. **DocTypes** are made of fields called **DocField** and role based permissions are integrated into the models, these are called **DocPerms**.

When you create a **DocType** a new folder is created in the **Module** and a model JSON file and a controller template in Python are automatically created. When you update the DocType, the JSON model file is updated and whenever `frappe --latest` is executed, it is synced with the database. This makes it easy to propagate schema changes and migrate.

To create models, you must set `developer_mode` as 1 in the `site_config.json` file.

	{
	 "db_name": "library",
	 "db_password": "v3qHDeVKvWVi7s97",
	 "developer_mode": 1
	}

### Roles

Before creating Models, we must create Roles so that we can set permissions on the Model. There are two Roles we will create:

1. Librarian
1. Library Member

To create a new Role, go to:

> File > New... > Role

![New Role](/assets/frappe_io/images/guide/03-new-role.png)

Enter the new Role and Save it:

![Role Saved](/assets/frappe_io/images/guide/04-new-role-saved.png)

### Models: DocType

After creating the Roles, let us create the **DocTypes**

To create a new **DocType**, go to:

> File > New... > DocType

![New DocType](/assets/frappe_io/images/guide/05-new-doctype.png)

In the DocType, first the Module, which in our case is **Library Managment**

#### Adding Fields

In the Fields Table, you can add the fields (properties) of the DocType (Article).

Fields are much more than database columns, they can be:

1. Columns in the database
1. For Layout (section / column breaks)
1. Child tables (Table type field)
1. HTML
1. Actions (button)
1. Attachments or Images

Let us add the fields of the Article.

![Add Fields](/assets/frappe_io/images/guide/06-add-fields.png)

When you add fields, you need to enter the **Type**. **Label** is optional for Section Break and Column Break. **Name** (`fieldname`) is the name of the database table column and also the property of the controller. This has to be *code friendly*, i.e. it has to have small cases are _ instead of " ". If you leave the Fieldname blank, it will be automatically set when you save it.

You can also set other properties of the field like whether it is mandatory, read only etc.

We can add the following fields:

1. Article Name (Data)
1. Author (Data)
1. Status (Select): For Select fields, you will enter the Options. Enter **Issued** and **Available** each on a new line in the Options box. See diagram below
1. Publisher (Data)
1. Language (Data)
1. Image (Attach)
1. Image View (Image)

#### Add Permissions

After adding the fields, add Permissions. For now, let us give Read, Write, Create, Delete and Report access to **Librarian**. Frappe has a finely grained Role based permission model. You can also change permissions later using the **Permission Manager** from **Setup**.

![Add Permissions](/assets/frappe_io/images/guide/07-add-permissions.png)

#### Saving

Click on the **Save** button. When the button is clicked, a popup will ask you for the name. Enter it and save the DocType.

Then let us create the other DocType and save it too:

1. Library Member (First Name, Last Name, Email ID)

![DocType Saved](/assets/frappe_io/images/guide/08-doctype-saved.png)


#### Naming of DocTypes

DocTypes can be named in different ways:

1. Based on a field
1. Based on a series
1. By controller (code)
1. Prompt

This can be set by entering the **Autoname** field. For controller, leave blank.

> **Search Fields**: A DocType may be named on a series but it still needs to be searched by name. In our case, the Article will be searched by the title or the author name. So this can be entered in search field.

![Add Fields](/assets/frappe_io/images/guide/09-autoname-search-fields.png)

#### Link and Select Fields

Foreign keys are specified in Frappe as **Link** type fields. The target DocType must be mentioned in the Options table.

In our example, in the Library Transaction DocType, we have to link both the Library Member and the Article.

**Note:** Remeber that Link fields are not automatically set as Foreign Keys in the MariaDB database, because that will implicitly index the column. This may not be optimum hence the Foreign Key validation is done by the Framework.

![Link Field](/assets/frappe_io/images/guide/10-link-field.png)

For select fields, as we mentioned earlier, add the various options in the **Options** input box, each option on a new row.

![Select Field](/assets/frappe_io/images/guide/11-select-field.png)

Similary complete making the other models.

#### Linked Values

A standard pattern is when you select an ID, say **Library Member** in **Library Membership**, then the Member's first and last names should be copied into relevant fields in the Library Membership Transaction.

To do this, we can use Read Only fields and in options, we can set the the name of the link and the fieldname of the property we want to fetch. For this example in **Member First Name** we can set `library_member.first_name`

![Fetch Values](/assets/frappe_io/images/guide/11-fetch.png)

### Complete the Models

In the same way, you can complete all the models so that the final fields look like this:

#### Article

![Article](/assets/frappe_io/images/guide/11-article.png)

#### Library Member

![Library Member](/assets/frappe_io/images/guide/11-library-member.png)

#### Library Membership

![Library Membership](/assets/frappe_io/images/guide/11-library-membership.png)

#### Library Transaction

![Library Transaction](/assets/frappe_io/images/guide/11-library-transaction.png)

> Make sure to give permissions to **Librarian** on each DocType

### Directory Structure

Now check that the model `.json` and `.py` files are created in the `library_management/library_management` module. The directory structure after creating the models should look like this:

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

---

## Making Users and Records

Now that we have created the models, we can directly start making records using Frappe Desk UI. You do not have to create views! Views in Frappe are automatically made based on the DocType properties.

### Creating User

To make records, we will first create a User. To create a user, go to:

> Setup > Users and Permission > User

Create a new User and set the name and first name and new password.

Also give the Librarian and Library Member Roles to this user

![Add User Roles](/assets/frappe_io/images/guide/13-add-user-roles.png)

Now logout and login using the new user id and password.

### Creating Records

You will now see an icon for the Library Management module. Click on that icon and you will see the Module page:

![Module](/assets/frappe_io/images/guide/14-module.png)

Here you can see the DocTypes that we have created for the application. List us start creating a few records.

First let us create a new Article:

![New Article](/assets/frappe_io/images/guide/15-new-article.png)

![Add Attachment](/assets/frappe_io/images/guide/16-add-attachment.png)

![Image Field](/assets/frappe_io/images/guide/17-image-field.png)

![New Member](/assets/frappe_io/images/guide/18-new-member.png)

![New Membership](/assets/frappe_io/images/guide/19-new-membership.png)

![After Fetch](/assets/frappe_io/images/guide/20-after-fetch.png)

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

### Views

#### Routing


#### Home Page

	role_home_page = {
		"Library Member": "article"
	}

#### Customize List View

list_item.html

	<div class="row">
		<div class="col-sm-4">
			<a href="/Article/{{ doc.name }}">
				<img src="{{ doc.image }}" class="img-responsive" style="max-height: 200px">
			</a>
		</div>
		<div class="col-sm-4">
			<a href="/Article/{{ doc.name }}"><h4>{{ doc.article_name }}</h4></a>
			<p>{{ doc.author }}</p>
			<p>{{ (doc.description[:200] + "...") if doc.description|length > 200 else doc.description }}</p>
			<p class="text-muted">Publisher: {{ doc.publisher }}</p>
		</div>
	</div>


### Tasks

	# Scheduled Tasks
	# ---------------

	scheduler_events = {
		"daily": [
			"library_management.tasks.daily"
		],
	}

