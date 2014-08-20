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
		clear_cache("partners")
