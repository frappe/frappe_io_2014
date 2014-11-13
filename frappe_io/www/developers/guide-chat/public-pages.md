# Making Public Pages

As you may have figured by now, there are two types of user interfaces:

1. Frappe Desk: This can be only accessed by users of type **System User** and has a built-in form generator and a desktop interface.
1. Public pages: These are generated on the server side and can be accessed by all users (they can also be permission controlled). Public pages are in the folder `templates` and are of 3 types:
	- Static: Static markdown or HTML pages, whose route is the same as the route of the folder structure.
	- Page: Server generated page template (using Jinja).
	- Generator: Templated pages for each instance of a particular DocType. For example, a Blog Post - each Blog Post is a separate page, from the same template.

For our chat application, we need to make a publicly accessible pages for the client and the agent.

For the client:

1. To begin a chat session: Here the client will enter name, email id and question.
1. A chat session window that will allow the user to exchange chat messages and an agent to switch between muliple chats.

### Making the Page

#### Create the HTML Template

To make a new page, we add a file at `website_chat/templates/pages/chat.html`. Lets start with a simple page:

	{% block content %}
	<div class="welcome">
		<p class"status"></p>
		<p>Please enter your name, email and question to begin.</p>
	</div>
	<div class="sessions">
	</div>
	{% endblock %}

In the templates, you only need to define the content. The header, footer, toolbar etc will all be added, if you want to override, then you must add the relevant blocks.

#### Create a Controller

Create a controller for this page. It must be named exactly the same as the html file: `website_chat/templates/pages/chat.py`.

The `get_context` method should return context elements for the page.

	from __future__ import unicode_literals
	import frappe
	from frappe import _
	
	no_cache = True
	
	def get_context(context):
		return {
			"title": _("Chat")
		}

#### Test

To build this page, run `frappe --build_sitemap` from the sites folder.

Go to `http://localhost:8000/chat` to see how it works.

![New Page](/assets/frappe_io/images/app-development/new-page.png)

Now complete the basic parts of the chat page in HTML.

