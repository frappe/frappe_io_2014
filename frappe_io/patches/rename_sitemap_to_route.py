import frappe
import frappe.model

def execute():
	frappe.reload_doc("frappe_apps", "doctype", "frappe_app")
	frappe.model.rename_field("Frappe App", "parent_website_sitemap", "parent_website_route")
