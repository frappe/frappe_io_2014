import frappe, requests, os, json
import wnclient

def import_data():
	frappe.conn.sql("""delete from `tabBlog Post`""")
	frappe.conn.sql("""delete from `tabBlog Category`""")
	frappe.conn.sql("""delete from `tabBlogger`""")
	frappe.conn.sql("""delete from `tabWeb Page` where parent_website_sitemap like 'erpnext%'""")
	frappe.conn.sql("""delete from `tabComment` where comment_doctype in ('Blog Post', 'Web Page')""")
	frappe.import_doclist(frappe.get_app_path("frappe_io", "data", "Blogger.csv"))
	frappe.import_doclist(frappe.get_app_path("frappe_io", "data", "Blog_Category.csv"))	
	frappe.import_doclist(frappe.get_app_path("frappe_io", "data", "Blog_Post.csv"))
	frappe.import_doclist(frappe.get_app_path("frappe_io", "data", "comments.json"))
	
	frappe.import_doclist(frappe.get_app_path("frappe_io", "data", "erpnext_org_pages.json"))
	frappe.import_doclist(frappe.get_app_path("frappe_io", "data", "erpnext_org_comments.json"))
	
def get_files():
	remote = wnclient.WNClient("https://frappe.erpnext.com", "rushabh@erpnext.com", "xxxx")
	for f in remote.get_request({
		"cmd":"webnotes.widgets.reportview.get", 
		"doctype":"File Data", 
		"fields": '["file_name"]',
		"limit_page_length": 1000,
		"filters": '[["File Data", "attached_to_doctype", "=", "Blog Post"]]'}).get('values'):
		fname = f[0]
		print fname
		if not fname.startswith("files/"):
			fname = "files/" + fname
			
		data = requests.get("http://frappe.erpnext.com/" + fname)
		with open(frappe.get_site_path("public", "files", fname.split("/")[-1]), "wb") as f:
			f.write(data.content)

def get_comments():
	remote = wnclient.WNClient("https://frappe.erpnext.com", "rushabh@erpnext.com", "xxxx")
	keys = ["comment", "comment_by", "comment_By_fullname", "comment_doctype", "comment_docname", "creation", "owner"]
	
	doclist = []
	data = remote.get_request({
		"cmd":"webnotes.widgets.reportview.get", 
		"doctype":"Comment", 
		"fields": json.dumps(keys),
		"limit_page_length": 1000,
		"filters": '[["Comment", "comment_doctype", "=", "Blog Post"]]'})
	for f in data.get('values'):
		d = frappe._dict(zip(data.get('keys'), f))
		d.doctype = "Comment"
		doclist.append(d)
		
	with open(frappe.get_app_path("frappe_io", "data", "comments.json"), "w") as f:
		f.write(json.dumps(doclist, indent=1))

def get_erpnext_org_pages():
	remote = wnclient.WNClient("http://erpnext.org", "rushabh@erpnext.com", "gopsulions")
	keys = ["name"]
	
	doclist = []
	data = remote.get_request({
		"cmd":"webnotes.widgets.reportview.get", 
		"doctype":"Web Page", 
		"fields": json.dumps(keys),
		"limit_page_length": 1000,
	})
	for f in data.get('values'):
		print f[0]
		doclist.append(remote.get_doc("Web Page", f[0]))
		
	with open(frappe.get_app_path("frappe_io", "data", "erpnext_org_pages.json"), "w") as f:
		f.write(json.dumps(doclist, indent=1))

def get_erpnext_org_comments():
	remote = wnclient.WNClient("http://erpnext.org", "rushabh@erpnext.com", "xxxx")
	keys = ["name"]
	
	doclist = []
	data = remote.get_request({
		"cmd":"webnotes.widgets.reportview.get", 
		"doctype":"Comment", 
		"fields": json.dumps(keys),
		"limit_page_length": 1000,
		"filters": '[["Comment", "comment_doctype", "=", "Web Page"]]'
	})
	for f in data.get('values'):
		print f[0]
		doclist.append(remote.get_doc("Comment", f[0]))
		
	with open(frappe.get_app_path("frappe_io", "data", "erpnext_org_comments.json"), "w") as f:
		f.write(json.dumps(doclist, indent=1))
		
def get_erpnext_org_files():
	remote = wnclient.WNClient("http://erpnext.org", "rushabh@erpnext.com", "gopsulions")
	for f in remote.get_request({
		"cmd":"webnotes.widgets.reportview.get", 
		"doctype":"File Data", 
		"fields": '["file_name"]',
		"limit_page_length": 1000,
		"filters": '[["File Data", "attached_to_doctype", "=", "Web Page"]]'}).get('values'):
		fname = f[0]
		print fname
		if not fname.startswith("files/"):
			fname = "files/" + fname
			
		data = requests.get("http://frappe.erpnext.com/" + fname)
		with open(frappe.get_app_path("frappe_io", "data", "files", "erpnext_org", fname.split("/")[-1]), "wb") as f:
			f.write(data.content)
		

