
from __future__ import unicode_literals
import frappe
import frappe.website.render

def get_context(context):
	return {
		"partners": frappe.db.sql("""select * from `tabFrappe Partner`
			where show_in_website=1 order by name asc""", as_dict=True),
		"title": "Partners"
	}
