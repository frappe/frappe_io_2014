# Copyright (c) 2013, Web Notes Technologies Pvt Ltd and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.website.website_generator import WebsiteGenerator
from frappe.utils.user import get_fullname_and_avatar
from frappe.website.utils import get_comment_list
from frappe import _

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
			if self.status in ("Expired", "Withdrawn"):
				for bid in all_bids:
					bid = frappe.get_doc("Frappe Job Bid", bid.name)
					bid.status = self.status
					bid.save()

			elif self.status == "Completed":
				bid = frappe.get_doc("Frappe Job Bid", {"frappe_job": self.name, "status":"Accepted"})
				if bid:
					bid.status = "Completed"
					bid.save()

			elif self.status in "Assigned":
				for bid in all_bids:
					bid = frappe.get_doc("Frappe Job Bid", bid.name)
					if bid.status != "Accepted":
						bid.status = "Lost"
						bid.save()

	def before_update_after_submit(self):
		self.validate()

	def get_all_bids(self):
		return frappe.get_all("Frappe Job Bid", filters={"frappe_job": self.name})

	def get_context(self, context):
		context.update(get_fullname_and_avatar(self.owner))
		context.comment_list = get_comment_list(self.doctype, self.name)
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
		for bid in self.get_all_bids():
			frappe.delete_doc("Frappe Job Bid", bid.name)

@frappe.whitelist()
def bid(job):
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
def delete(job):
	job = frappe.get_doc("Frappe Job", job)
	if job.owner != frappe.session.user:
		frappe.throw(_("Not Allowed"), frappe.PermissionError)

	frappe.delete_doc("Frappe Job", job.name, ignore_permissions=True)

@frappe.whitelist()
def complete(job, feedback, rating):
	job = frappe.get_doc("Frappe Job", job)
	if job.owner != frappe.session.user:
		frappe.throw(_("Not Allowed"), frappe.PermissionError)

	job.status = "Completed"
	job.feedback = feedback
	job.rating = rating
	job.save(ignore_permissions=True)

@frappe.whitelist()
def close(job):
	job = frappe.get_doc("Frappe Job", job)
	if job.owner != frappe.session.user:
		frappe.throw(_("Not Allowed"), frappe.PermissionError)

	job.status = "Withdrawn"
	job.save(ignore_permissions=True)

def expire_jobs():
	for job in frappe.db.sql_list("""select name from `tabFrappe Job`
		where datediff(curdate(), creation) > 30 and status='Open'"""):
		print job
		job = frappe.get_doc("Frappe Job", job)
		job.status = "Expired"
		job.save(ignore_permissions=True)

def weekly_digest():
	new_jobs = frappe.db.sql("""select job_title, page_name, job_detail, company_name
		from `tabFrappe Job` where datediff(curdate(), creation) < 7""", as_dict=True)

	if not new_jobs:
		return

	recipients = frappe.db.sql_list("""select distinct owner from `tabFrappe Partner`
		where name != 'Administrator'""")

	template = """
<h3>New Jobs Listed on Frappe.io</h3>

<table style="width: 100%" cellspacing="0" border="1px" cellpadding="2px">
	<tbody>
		{% for j in jobs %}
		<tr>
			<td style="width: 50%">
				<a href="https://frappe.io/community/jobs/{{ j.page_name }}">
					{{ j.job_title }}</a>
				<br><span style="color: #888">{{ j.company_name }}</span>
			</td>
			<td>
				{{ j.job_detail[:300] }}{{ "..." if j.job_detail|length > 300 else "" }}
			</td>
		</tr>
		{% endfor %}
	</tbody>
</table>
"""
	frappe.sendmail(recipients = recipients, subject="New Jobs This Week on Frappe.io",
		message = frappe.render_template(template, {"jobs": new_jobs}), bulk=True)
