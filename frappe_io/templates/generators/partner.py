#
from __future__ import unicode_literals
import frappe
from frappe.utils import filter_strip_join

doctype = "Frappe Partner"
condition_field = "show_in_website"

def get_context(context):
	context.update(context.doc.as_dict())
	
	return context