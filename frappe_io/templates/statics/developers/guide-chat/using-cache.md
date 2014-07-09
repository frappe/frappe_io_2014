# Using Cache

To cache queries or data that is used frequently you can use the the built-in support for memcached in Frappe. The cache keys are managed separtely for each database.

To write to cache, use `frappe.cache().set_value(key, value)`

#### Example

In this example, we need to refresh the sessions every time there is a query from the agent, so its best to cache it.

Remember that memcache is not guaranteed to supply you the object, so be prepared for a fallback query.

	@frappe.whitelist()
	def get_active_sessions():
		active_sessions = frappe.cache().get_value("website-chat-active-sessions")
		if active_sessions==None:
			active_sessions = frappe.get_list("Website Chat Session",
				fields=["name", "client_name", "status"],
				filters={"status":("in", ("Active", "New", "Waiting"))},
				order_by="creation desc")
			frappe.cache().set_value("website-chat-active-sessions", active_sessions)

		return active_sessions


#### Clearing the cache

It is also important to clear the cache whenever the data is updated.

So in the controller of **Website Chat Session**, we clear the cache whenever the object is updated.

	class DocType(Document):
		def on_update(self):
			frappe.cache().delete_value("website-chat-active-sessions")
