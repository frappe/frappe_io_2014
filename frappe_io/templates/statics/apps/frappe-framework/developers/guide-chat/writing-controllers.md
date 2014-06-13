# Writing Controllers and API

We can call server-side methods using whitelisted methods or writing controllers for the DocTypes. Let us build the server-side logic for our app.

### Workflow

The use cases of the application will be as follows:

For the client:

1. Client is shown if there are any active agents.
1. Client enters name and email.
1. If agents are active, A new **Website Chat Session** is created and the client is shown the chat window.
1. If agents are not active, client is shown that the message has been saved.
1. When client closes window, set session as inactive.

For the agent:

1. If the user is logged in and is an agent, the chat session is directly shown.
1. All active chat sessions are shown in the sidebar
1. The latest session is activated and shown in the main chat window.
1. If the agent clicks on another session, then that session is loaded.

For chatting:

1. If a new message is sent, it is added to the **Website Chat Message** table.
1. The system polls to server every few seconds (if user is active) for new messages in the current session (after the last message id)
1. The messages are rendered in the chat session window.

#### API

For this we will need following services:

1. Get agent status
1. Register a new session
1. Add chat message
1. Get session messages (after last message id or all messages).
1. Get active sessions (for agent)
1. Set status (active / inactive)

### Get agent status

We can define a method for this. This is basically a query to see how many agents are active. To do this, we write a whitelisted method that will check how many agents are logged in. Let us add this method in the `chat` page controller itself.

	@frappe.whitelist(allow_guest=True)
	def get_agent_status():
		if frappe.get_list("Website Chat Agent", filters={"status":"Active"},
			ignore_permissions=True, limit_page_length=1):
			return "active"
		else:
			return "inactive"

here the `frappe.get_list` function generates an SQL query ignoring the DocType permissions and returns the list of active agents (we just need one).

To test this method, run in your browser

	http://localhost:8000/api/method/website_chat.templates.pages.chat.get_agent_status

You should get JSON output as:

	{"message":"inactive"}


#### Adding it in the page

For writing Javascript code, we create a `chat.js` file in the folder `website_chat/templates/includes` and write the code.

	// check agent status
	frappe.ready(function() {
		$.ajax({
			url:"api/method/website_chat.templates.pages.chat.get_agent_status",
			statusCode: {
				200: function(data) {
					if(data.message=="active") {
						$(".chat-status").html('<div class="alert alert-success">\
							Agents online. Please enter your name and email \
							to start a session.</div>')
					} else {
						$(".chat-status").html('<div class="alert alert-warning">\
							Agents offline. Please enter your name, email and question. \
								Our agents will get back to you as soon as possible.</div>')
					}
				}
			}
		})
	})

> Note that we are using `frappe.ready` instead of `$(document).ready`. This is because we use pushState API in Frappe to load new pages and this is the method that gets called after the page is rendered. `$(document).ready` get fired instantly.

Here is the expected output

![Showing Agent Status](assets/frappe_io/images/app-development/show-agent-status.png)

### Starting a New Sesssion

To start a new session, we can use the `/api/resource/[DocType]` API with a POST request.

For this, we must allow the role **Guest** to start a create session.

![Guest Permission](/assets/frappe_io/images/app-development/add-guest-permission.png)

A new session can now be created by sending a POST request:

	frappe.ready(function() {
		chat.set_agent_status();
		chat.bind_events();
	});

	chat.bind_events = function() {
		$("#chat-start").on("click", function() {
			var name = $("#client-name").val();
			var email = $("#client-email").val();
			var question = $("#client-question").val();
			if(name && email && question) {
				$.ajax({
					type:"POST",
					url: "api/resource/Website Chat Sesssion",
					data: {
						doclist: JSON.stringify([
							{
								"doctype":"Website Chat Session",
								"client_name": name,
								"client_email_id": email,
								"client_question": question
							}
						])
					},
					statusCode: {
						200: function(data) {
							alert("created");
						}
					}
				})
			} else {
				frappe.msgprint("All fields are required!")
			}
			return false;
		});
	}

	chat.set_agent_status = ...
	...


Now try entering "Submit" from the page, and you should get a message called created.

#### New Website Chat Session From the Desk

To check, go to the Desk (`/desk`) and open the **Website Chat Session** list. You should see the session created!

![New session](/assets/frappe_io/images/app-development/new-chat-session.png)

To see the application at this stage, go to:

https://github.com/frappe/website-chat/tree/e6860304b8176ab38f07520a06b39e69a23f6b89


#### Completing the View

Now we will go ahead and complete the view using the API and adding JS code in the view to create a basic chat appliction.

