import frappe

def get_context(context):
	context.apps = frappe.db.sql("""select * from `tabFrappe App` where
			ifnull(published,0)=1 order by name""", as_dict=True)
