import frappe

from frappe.utils.email_lib.html2text import html2text

def execute():
	for page in frappe.conn.sql("""select * from `tabWeb Page`""", as_dict=1):
		# get parents
		
		route = frappe.conn.get_value("Website Route", {"ref_doctype":"Web Page", "docname": page.name},
			["name", "lft", "rgt"], as_dict=1)
			
		if route and page.parent_website_route:
			parents = frappe.conn.sql("""select name from `tabWebsite Route` where lft < %s and rgt > %s
				order by lft asc""", (route.lft, route.rgt))
			
		print parents