import frappe

def execute():
	frappe.conn.sql("""update `tabWebsite Route` set static_file_timestamp=1 
		where ref_doctype='Web Page' 
		and (name like 'apps/erpnext/user-guide%' or 
			name like 'apps/frappe-framework/developer-guide%')""")
			