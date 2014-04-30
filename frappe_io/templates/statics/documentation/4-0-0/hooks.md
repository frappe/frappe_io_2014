# Hooks

Hooks are the duct tape of the Frappe system. Hooks allow you to "hook" in to
functionality and events of other parts of the Frappe system. Following are the
official hooks from Frappe. 

### Application Name and Details

1. `app_name` - slugified name with underscores e.g. "shopping\_cart"
2. `app_title` - full title name e.g. "Web Notes"
3. `app_publisher`
4. `app_description`
5. `app_version`
6. `app_icon` - font-awesome icon or image url
7. `app_color` - hex colour background of the app icon

### Install Events

1. `before_install`
2. `after_install`

The above hooks are called before and after installation of the app they are in.
For example, [ERPNext](/apps/erpnext)'s hooks contains a line,

	after_install = erpnext.setup.install.after_install

So, the function after\_install is imported and called after ERPNext is installed.

Note, the `before_install` and `after_install` hooks are called with no arguments.

### Boot Session

After a successful login, the Frappe JS Client requests for a resource called
`bootinfo`. The `bootinfo` is available as a global in Javascript via
`frappe.boot`. By default, the `bootinfo` contains

* System defaults
* Notification status
* Permissions
* List of icons on desktop
* User settings
* Language and timezone info

If your app wants to modify bootinfo, it can declare a hook `boot_session`. The
value is assumed to be a dotted path to a function and is called with one
argument, bootinfo which it can modify and return.

Eg,

	boot_session = erpnext.startup.boot.boot_session

### Notification configurations

The notification configuration hook is expected to return a Python dictionary.

	{ "for_doctype": 
		{
			"Support Ticket": {"status":"Open"},
			"Customer Issue": {"status":"Open"},
		},
		"for_module_doctypes": {
			"ToDo": "To Do",
			"Event": "Calendar",
			"Comment": "Messages"
		},
		"for_module": {
			"To Do": "frappe.core.notifications.get_things_todo",
			"Calendar": "frappe.core.notifications.get_todays_events",
			"Messages": "frappe.core.notifications.get_unread_messages"
		}
	}


The above configuration has three parts,

1. `for_doctype` part of the above configuration marks any "Support Ticket"
	or "Customer Issue" as unread if its status is Open
2. `for_module_doctypes` maps doctypes to module's unread count.
3. `for_module` maps modules to functions to obtain its unread count. The
   functions are called without any argument.

#### Javascript / CSS Assets

The following hooks allow you to bundle built assets to your app for serving.
There are two types of assets, app and web. The app assets are loaded in the
[Desk](/documentation/4-0-0/desk) and web assets are loaded in the website.

1. `app_include_js`
2. `app_include_css`
3. `web_include_js`
4. `web_include_css`

Eg,

	app_include_js = assets/js/erpnext.min.js
	web_include_js = assets/js/erpnext-web.min.js

Note: to create an asset bundle (eg, assets/js/erpnext.min.js) the target file
should be in build.json of your app.
