# Copyright (c) 2013, Web Notes Technologies Pvt. Ltd. and Contributors
# MIT License. See license.txt

from __future__ import unicode_literals

import frappe
from frappe.website.doctype.website_slideshow.website_slideshow import get_slideshow

doctype = "Frappe App"
condition_field = "published"

def get_context(context):
	app_context = {}
	if hasattr(context.doc, 'slideshow'):
		app_context["slideshow"] = context.doc.slideshow
		app_context.update(get_slideshow(context.doc))

	return app_context
