# Copyright (c) 2013, Web Notes Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

# For license information, please see license.txt

from __future__ import unicode_literals
import frappe

from frappe.website.website_generator import WebsiteGenerator

class DocType(WebsiteGenerator):
	def __init__(self, d, dl):
		self.doc, self.doclist = d, dl
		
	def get_page_title(self):
		return self.doc.application_name
		
	def get_parent_website_sitemap(self):
		return "apps"