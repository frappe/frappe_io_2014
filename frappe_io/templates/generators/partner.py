#
from __future__ import unicode_literals
import frappe
from frappe.utils import filter_strip_join

doctype = "Frappe Partner"
condition_field = "show_in_website"

def get_context(context):
	context.update(context.bean.fields)
	
	return context