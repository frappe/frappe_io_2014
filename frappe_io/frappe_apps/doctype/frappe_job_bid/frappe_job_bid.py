# Copyright (c) 2013, Web Notes Technologies Pvt Ltd and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.website.website_generator import WebsiteGenerator

class FrappeJobBid(WebsiteGenerator):
	template = "templates/generators/bid.html"
	page_title = "Bid"
	def onload(self):
		self.frappe_job_title = frappe.db.get_value("Frappe Job", self.frappe_job, "job_title")
		self.frappe_job_title = frappe.db.get_value("Frappe Job", self.frappe_job, "job_title")

	def before_insert(self):
		if frappe.db.get_value("Frappe Job Bid",
			{"frappe_partner": self.frappe_partner, "frappe_job": self.frappe_job}):
			frappe.msgprint("You have already bid for this job")
			raise frappe.ValidationError

		if frappe.db.get_value("Frappe Job", self.frappe_job, "owner")==frappe.session.user:
			frappe.msgprint("You can't bid for your own job!")
			raise frappe.ValidationError

		self.frappe_job_title = frappe.db.get_value("Frappe Job", self.frappe_job,
			"job_title")
		self.frappe_partner_title = frappe.db.get_value("Frappe Partner", self.frappe_partner,
			"partner_name")

	def get_context(self, context):
		context.job = frappe.get_doc("Frappe Job", self.frappe_job)
		context.partner = frappe.get_doc("Frappe Partner", self.frappe_partner)

	def get_parents(self, context):
		return [{"title":"Community", "name": "community"},
			{"title":"Jobs", "name": "community/jobs"},
			{"title": context.job.job_title, "name": context.job.get_route() }]


	def on_trash(self):
		if self.status == "Accepted":
			frappe.throw(_("Accepted bid cannot be deleted"))


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

@frappe.whitelist()
def accept(bid):
	bid = frappe.get_doc("Frappe Job Bid", bid)
	job = frappe.get_doc("Frappe Job", bid.frappe_job)
	if job.owner != frappe.session.user:
		frappe.throw(_("Not Allowed"), frappe.PermissionError)
	if job.status != "Open":
		frappe.throw(_("Bid not Open"))
	bid.status = "Accepted"
	bid.save()
	job.status = "Assigned"
	job.save()

@frappe.whitelist()
def delete(bid):
	bid = frappe.get_doc("Frappe Job Bid", bid)
	if bid.owner != frappe.session.user:
		frappe.throw(_("Not Allowed"), frappe.PermissionError)

	frappe.delete_doc("Frappe Job Bid", bid.name, ignore_permissions=True)
