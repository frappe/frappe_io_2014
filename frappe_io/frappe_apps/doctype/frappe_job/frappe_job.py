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
		if self.status in ("Open", "Assigned"):
			self.show_in_website = 1
		else:
			self.show_in_website = 0

		if self.status != "Open":
			self.docstatus = 1
			all_bids = self.get_all_bids()
			if self.status in ("Expired", "Closed", "Withdrawn"):
				for bid in all_bids:
					bid = frappe.get_doc("Frappe Job Bid", bid.name)
					bid.status = self.status
					bid.save()
			elif self.status in ("Assigned"):
				for bid in all_bids:
					bid = frappe.get_doc("Frappe Job Bid", bid.name)
					if bid.status != "Accepted":
						bid.status = "Lost"
						bid.save()

	def get_all_bids(self):
		return frappe.get_all("Frappe Job Bid", filters={"frappe_job": self.name})

	def get_context(self, context):
		context.update(get_fullname_and_avatar(self.owner))
		if frappe.session.user == self.owner:
			context.bids = frappe.get_all("Frappe Job Bid",
				fields=["status, ""name", "frappe_partner", "creation", "frappe_partner_title"],
				filters={"frappe_job": self.name}, order_by="creation asc")
		elif frappe.session.user != "Guest":
			context.bid = frappe.db.get_value("Frappe Job Bid",
				{"owner": frappe.session.user, "frappe_job": self.name})


	def get_parents(self, context):
		return [{"title":"Community", "name": "community"},
			{"title":"Jobs", "name": "community/jobs"}]

	def on_trash(self):
		for bid in get_all_bids():
			frappe.delete_doc("Frappe Job Bid", bid.name)
