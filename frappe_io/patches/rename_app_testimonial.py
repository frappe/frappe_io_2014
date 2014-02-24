import frappe
import frappe.model

def execute():
	if "tabApp Testimonial" in frappe.conn.sql_list("show tables"):
		frappe.rename_doc("DocType", "App Testimonial", "Frappe App Testimonial", force=True)
	
	frappe.reload_doc("frappe_apps", "doctype", "frappe_app")
	frappe.reload_doc("frappe_apps", "doctype", "frappe_app_testimonial")
	
