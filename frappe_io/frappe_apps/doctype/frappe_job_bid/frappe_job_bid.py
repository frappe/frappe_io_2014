# Copyright (c) 2013, Web Notes Technologies Pvt Ltd and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.website.website_generator import WebsiteGenerator

class FrappeJobBid(WebsiteGenerator):
	template = "templates/generators/bid.html"
	def onload(self):
		self.frappe_job_title = frappe.db.get_value("Frappe Job", self.frappe_job, "job_title")

	def before_insert(self):
		if frappe.db.get_value("Frappe Job Bid",
			{"frappe_partner": self.frappe_partner, "frappe_job": self.frappe_job}):
			frappe.msgprint("You have already bid for this job")
			raise frappe.ValidationError

		if frappe.db.get_value("Frappe Job", self.frappe_job, "owner")==frappe.session.user:
			frappe.msgprint("You can't bid for your own job!")
			raise frappe.ValidationError


@frappe.whitelist()
def insert(job):
	partner = frappe.db.get_value("Frappe Partner", {"owner": frappe.session.user})
	if not partner:
		frappe.msgprint("Please update your Service Provider details before bidding")
		return

	bid = frappe.new_doc("Frappe Job Bid")
	bid.frappe_job = job
	bid.frappe_partner = partner
	bid.insert(ignore_permissions=True)

	return bid.name
