# Copyright (c) 2013, Web Notes Technologies Pvt Ltd and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.website.website_generator import WebsiteGenerator
from frappe.utils.user import get_fullname_and_avatar

class FrappeJob(WebsiteGenerator):
	condition_field = "show_in_website"
	template = "templates/generators/job.html"
	page_title_field = "job_title"

	def validate(self):
		if self.status == "Open":
			self.show_in_website = 1
		else:
			self.show_in_website = 0

	def get_context(self, context):
		context.update(get_fullname_and_avatar(self.owner))
		if frappe.session.user == self.owner:
			context.bids = frappe.get_all("Frappe Job Bid",
				fields=["name", "frappe_partner", "creation"],
				filters={"frappe_job": self.name}, order_by="creation asc")
		elif frappe.session.user != "Guest":
			context.bid = frappe.db.get_value("Frappe Job Bid",
				{"owner": frappe.session.user})


	def get_parents(self):
		return [{"title":"Community", "name": "community"},
			{"title":"Jobs", "name": "community/jobs"}]
