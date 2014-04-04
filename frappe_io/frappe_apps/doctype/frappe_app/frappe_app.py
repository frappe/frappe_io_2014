# Copyright (c) 2013, Web Notes Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

# For license information, please see license.txt

from __future__ import unicode_literals
import frappe

from frappe.website.website_generator import WebsiteGenerator

class FrappeApp(WebsiteGenerator):
	def on_update(self):
		self.set("parent_website_route", "apps")
		super(FrappeApp, self).on_update()

	def get_page_title(self):
		return self.application_name
