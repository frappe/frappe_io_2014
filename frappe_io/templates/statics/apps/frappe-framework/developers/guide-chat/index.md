# Developer Guide 2: Chat

Welcome to the Frappe Developer Guide, this guide created to teach you all about creating and distributing apps for Frappe Framework. Some of you may feel confident enough to jump straight into coding. If that's the case, you might want to skip ahead and start writing your first app.

However, we strongly recommend to at least skim through this guide. Frappe Framework has its own way of doing things and spending some time reading these pages will help you a lot in the long run.

### Getting Started

Frappe Framework provides a platform to build and deploy rich web applications. It contains the entire stack of web development from MVC (Model-View-Controller) management, desktop environment, CMS (Content Management), schema management and patching, REST APIs, backup and job management, user management etc. Multiple applications can be installed in one database and they can talk to each other via hooks.

The Frappe Framework was built to create ERPNext, an application with great complexity and thousands of use cases. Keeping this in mind will help you understand where our design decisions come from and also help you get an idea of the structure.

What is different from other popular frameworks is that Frappe is a highly opinionated framework. While most other frameworks provide you toolkits and are happy to let you design the way you want to build user interaction, Frappe has an already defined user interaction enviornment. Frappe also forces you to define your application in a certain structure so that the design becomes implicit in the structure.

### Who is this For?

For this guide, we will assume you have some idea of how web applications are built and run. You should have an idea of what is the role of the server and the browser and how HTTP requests are sent, processed and received. We also hope you understand the role of Javascript in delivering a rich user experience. Finally, we assume you know a bit of how databases manage your data and can write a few basic SQL queries.

