# Copyright (c) 2013, Web Notes Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.website.website_generator import WebsiteGenerator

class FrappePartner(WebsiteGenerator):
	condition_field = "show_in_website"
	template = "templates/generators/service_provider.html"
	page_title_field = "partner_name"

	def before_insert(self):
		# show on default - good faith
		self.show_in_website = 1

	def validate(self):
		self.priority = {
			"Sponsor": 3,
			"Verified": 2
		}.get(self.partner_category) or 1

		if len(self.introduction or "") > 300:
			self.introduction = self.introduction[:297] + "..."

	def update_rating_and_feedback(self):
		self.completed_jobs, self.average_rating = frappe.db.sql("""select COUNT(*), AVG(rating)
			from `tabFrappe Job`
			where frappe_partner=%s and status='Completed'""", self.name)[0]
		self.save(ignore_permissions=True)

	def get_context(self, context):
		context.jobs = frappe.db.sql("""select job.page_name, job.job_title,
			job.creation from `tabFrappe Job` job, `tabFrappe Job Bid` bid
			where bid.owner = %s
				and bid.status = "Completed"
				and bid.frappe_job = job.name
			order by job.creation desc limit 20""", self.owner, as_dict=True)

	def get_parents(self, context):
		return [{"title":"Community", "name": "community"},
			{"title":"Service Providers", "name": "community/service-providers"}]

def get_list_item(doc):
	return frappe.get_template("frappe_apps/doctype/frappe_partner/list_item.html").render(doc)
