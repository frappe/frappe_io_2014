# Copyright (c) 2013, Web Notes Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

# For license information, please see license.txt

from __future__ import unicode_literals
import frappe

from frappe.website.doctype.website_slideshow.website_slideshow import get_slideshow
from frappe.website.website_generator import WebsiteGenerator

class FrappeApp(WebsiteGenerator):
	condition_field = "published"
	template = "templates/generators/frappe_app.html"
	page_title_field = "application_name"
	def on_update(self):
		self.set("parent_website_route", "apps")
		super(FrappeApp, self).on_update()
