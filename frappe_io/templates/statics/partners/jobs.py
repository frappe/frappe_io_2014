
from __future__ import unicode_literals
import frappe
import frappe.website.render

def get_context(context):
	frappe_partner = frappe.get_meta("Frappe Job")
	condition, values = "", []
	if frappe.form_dict.country:
		condition += " and country=%s"
		values.append(frappe.form_dict.country)

	if frappe.form_dict.service:
		condition += " and service=%s"
		values.append(frappe.form_dict.service)

	context.update({
		"jobs": frappe.db.sql("""select * from `tabFrappe Job`
			where show_in_website=1 {0} order by modified desc""".format(condition),
			values, as_dict=True),
		"title": "Partners",
		"country_list": frappe_partner.get_field("country").options.split("\n")
	})
