# Making A New App

We will use an example to understand how an app is built step by step.

For this tutorial we will build a chat application. The use-case is this. Most websites now have a chat widget where a visitor can chat with an agent, if available or can leave an offline message. This feature will be nice if its integrated into a CRM, so that the transcript can be logged along with other email / phone communication.

The application will have 3 models:

1. Chat Sesssion
1. Chat Message
1. Chat Agent

The there will be a portal page for chat which will be same for the agent and the vistor. The difference is that the agent will be able to manage multiple chats at the same time.

To check if a new message is arrived, the client will keep querying the server at regular intervals. To notify the agent of a new message or chat session, we will use the HTML5 Notification API.

### Starting A New App

Let us call this application as `website_chat`. For this, we need to create a new folder in `bench/apps`.

To bootstrap an app, use the `frappe --make_app` command.

	bench/apps $ frappe --make_app
	App Name: website_chat
	App Title: Website Chat
	App Description: Chat application for website
	App Publisher: Web Notes
	App Icon: icon-comments
	App Color: #f1c40f
	App Email: info@frappe.io
	App URL: https://frappe.io/apps/website-chat
	App License: GPL

Notes:

1. App Name is the python module for the app, hence must be slugfied
2. For Icon, you can either use FontAwesome 3.x icons or a url to an svg file. (You can set this later via hooks.py)

If you check your apps folder, a new folder `website_chat` would have been created, with basic setup.

#### Install it in the environment

To start using it, go to the folder and run `python setup.py develop`.

#### Make it available for install in the site

Now add it in the `apps.txt` file in your bench or the site on which you want to install this app.

### Intall it in your site

You can install it on your site via, the browser or command line. To install it using the command line, run

	frappe --install_app website_chat

To check if the app has been installed, login to your site and click on "Installer"

![Installer](/assets/frappe_io/images/app-development/installer.png)

{next}
