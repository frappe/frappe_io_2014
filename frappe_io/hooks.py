app_name = "frappe_io"
app_title = "Frappe.io Portal"
app_publisher = "Web Notes Technologies Pvt Ltd"
app_description = "Community portal for Frappe"
app_icon = "assets/frappe/images/frappe.svg"
app_color = "#888"
app_email = "info@erpnext.com"
app_url = "http://frappe.io"
app_version = "0.0.1"
hide_in_installer = True

home_page = "home"
brand_html = '<img src="/assets/frappe_io/images/frappe-io-brand.png" style="width: 30px;" /> Frappe.io <span class="text-muted" style="font-size: 9px; margin-left: -20px; margin-top: 15px; display: inline-block;position: absolute; font-weight: normal;">Beta</span>'

web_include_css = ["assets/frappe_io/css/frappe-io-web.css", "assets/frappe/css/prism.css"]
web_include_js = "/assets/frappe/js/lib/prism.js"

website_generators = ["Frappe App", "Frappe Partner", "Frappe Job", "Frappe Job Bid"]

fixtures = [
	"Website Settings",
	"Website Script",
	"Contact Us Settings",
	"Web Form"
]

scheduler_events = {
	"daily": ["frappe_io.frappe_apps.doctype.frappe_job.frappe_job.expire_jobs"],
	"weekly": ["frappe_io.frappe_apps.doctype.frappe_job.frappe_job.weekly_digest"]
}
