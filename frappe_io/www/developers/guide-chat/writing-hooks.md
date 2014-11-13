# Writing Hooks

Hooks are a system by which the Framework or Apps interact with each other. It is like the Observer Pattern where each app must register on events it want to listen in on.

This hooks are stored in a simple text file `hooks.py` in the main folder of the app.

#### Example:

[https://github.com/frappe/website-chat/blob/master/website_chat/hooks.py](https://github.com/frappe/website-chat/blob/master/website_chat/hooks.py)

For example in our chat app, we want to set the status of agents to **Active** everytime they log in.

We can listen in on the `on_session_creation` hook and set the status as active:

	def on_login(login_manager):
		agent = frappe.db.get_value("Website Chat Agent",
			{"user": frappe.session.user }, ["name", "status"], as_dict=True)
		if agent and agent.status=="Offline":
			agent = frappe.get_doc("Website Chat Agent", agent.name)
			agent.status = "Active"
			agent.save(ignore_permissions=True)


> For more complex hooks, look at how ERPNext is hooked into the Frappe Framework https://github.com/frappe/erpnext/blob/develop/erpnext/hooks.py

