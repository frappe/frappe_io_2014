## Creating a New App

All applications in Frappe all called `apps`. Apps countain models (DocTypes), controllers, UI elements, CMS templates etc. Multiple apps can be installed in a bench and out of these and multiple apps can be installed in a database.

To start a new app, start using the template. To generate a new template,

	$ frappe --new_app

### Hooks

Hooks are events that are called from `frappe` or any application. Hooks.txt is a simple key value pair, with multiple values possible per key. Hooks could be values or routes to a function name depending on what the caller will do. There is no standard for a caller.

#### Application Name and Description

- `app_name`
- `app_description`
- `app_publisher`
- `app_color`
- `app_icons`

#### Installation

- `before_install` (method)
- `after_install` (method)

#### Build Includes

There are two javascript / css builds, one for the website and one for the application interface.

#### Scheduler

To run scheduled events, add scheduler hooks

#### Bean Events

These replace custom server scripts

Examples:

###### To execute a function after on_update of Quotation

Write a function in `app-repository-name.app_name.some_folder_hierarchy.some_py_file` module

    def do_this_stuff(controller, method_name):
        pass

Entry in hooks.txt

`bean_event = Quotation:on_update:app_name.some_folder_hierarchy.some_py_file.do_this_stuff`

### `config/desktop.py`

To create desktop icons for your app, add to `config/desktop.py`

Sample:

```
from frappe import _

data = {
	"Frappe.io Portal": {
		"color": "#888", 
		"icon": "assets/frappe/images/frappe.svg", 
		"label": _("Frappe.io Portal"),
		"link": "frappe-home"
	}
}
```

## Create a Module

An app is broken up into modules. Module name must be unique across applications.

1. Add list of modules in `[app]/modules.txt`
1. Create a Module Def record (from the UI)

## Making / Editing DocTypes

To create or edit the **DocType** "schema" you will have to fire the front-end
via a web-browser and login as Administrator. To open a **DocType**, go to
Document > Search > DocType and select the **DocType** to edit.

The **DocType** form should be self explanatory. It has a list of fields that
are used for both the database table and form. Special fields like `Column
Break` and `Section Break` are present to make the form layout that is
processed sequentially.

DocType is discovered by the user via permissions (`DocPerm`) and by URL routes.

Once you save a **DocType**, the database schema is automatically update,
while developing, you should fire up a mysql command-line or viewer to see the
impact of your database changes.

### Adding code to DocTypes

You can add business logic by writing event code on both client and server
side. The server side events are written in Python and client side events are
written in Javascript.

The files from where these events are picked up are in the module folders in
the repositories. Each DocType has its own folder in the module in a
folder called `doctype`. If you browse the files of **frappe/erpnext**, you should be
able to locate these files easily.

#### Server-side modules

For example, the server-side script for DocType **Account** (in app frappe/erpnext) in module **Accounts** will be present in the folder
`erpnext/accounts/doctype/account/account.py`

The events are declared as a part of class called `DocType`. In the `DocType`
class there are two main useful properties:

  * `doc`: Represents the main record.
  * `doclist`: Represents list of records (including child records) that are associated with this DocType. For example the `doclist` of **Sales Order** will have the main record and all **Sales Order Item** records.

The main serverside events are:

  * `validate`: Called before the `INSERT` or `UPDATE` method is called.
  * `on_update`: Called after saving.
  * `on_submit`: Called after submission
  * `on_cancel`: Called after cancellation.

See a sample server side file for more info!

* * *

## Custom UI: Pages

Custom UI like **Chart of Accounts** etc, is made by Pages. Pages are free
form virtual pages in that are rendered on the client side. A page can have an
`.html` (layout), `.py` (server calls), `.js` (user interface) and `.css`
(style) components.

Understand how pages work, it is best to open an existing page and see how it
works.

* * *

## Patching & Deployment

Data / schema changes are done to wnframwork via patches released in the
`app/patches` module (see erpnext folder for more details). To run all latest
patches that have not been executed, run `lib/wnf.py -l`

wnframework deployment is done by the `lib/wnf.py` utility.

See `lib/wnf.py --help` for more help.

_Good luck!_
