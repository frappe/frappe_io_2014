# Copyright (c) 2013, Web Notes Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.website.render import clear_cache
from frappe.website.website_generator import WebsiteGenerator

class FrappePartner(WebsiteGenerator):
	condition_field = "show_in_website"
	template = "templates/generators/partner.html"
	page_title_field = "partner_name"
	def validate(self):
		self.priority = {
			"Sponsor": 3,
			"Verified": 2
		}.get(self.partner_category) or 1
		clear_cache("partners")

	def get_parents(self):
		return [{"title":"Partners", "name": "partners"}]

def get_list_item(doc):
	return frappe.get_template("frappe_apps/doctype/frappe_partner/list_item.html").render(doc)
