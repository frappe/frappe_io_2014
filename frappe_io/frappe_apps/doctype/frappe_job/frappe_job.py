# Copyright (c) 2013, Web Notes Technologies Pvt Ltd and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class FrappeJob(Document):
	condition_field = "show_in_website"
	template = "templates/generators/job.html"
	page_title_field = "job_title"

	def get_parents(self):
		return [{"title":"Partners", "name": "partners"}]
