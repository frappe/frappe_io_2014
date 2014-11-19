# Basic Setup

Before you start building an app, you must create a basic setup. In this section, we will walk you through setting up a developer **bench** for Frappe.

### `git` and GitHub

Frappe Framework uses the git version control system for code management. The latest versions of the Framework and Issues are hosted on GitHub, a free service for hosting git projects. Though it is not required that you have an account on GitHub, if you want to raise Issues or contribute back, you must create an account in GitHub.

Though you do not have to understand git to use this guide, but it would be very handy if you are planning to create and publish apps for Frappe.

### Pre requisites

You will need the following applications installed on your server before you can start app development in Frappe.

1. Python 2.7
1. MySQL/MariaDB Database Server
1. Memcache
1. Python-MySQL connector
1. Git Version Control System.

If you are on Ubuntu, go you your terminal to install:

	sudo apt-get install python-dev build-essential python-mysqldb git memcached ntp vim screen htop mysql-server libmysqlclient-dev libxslt1.1 libxslt1-dev

### Python VirtualEnv

Python VirtualEnv creates a container where you can install specific versions of Python libraries. This is very useful if you are running, building Python applications that require different version of Python libraries. For detailed documentation, go to [http://www.virtualenv.org/en/latest/virtualenv.html]().

If you want to get started quickly, install `virtualenvwrapper` [http://www.virtualenv.org/en/latest/virtualenv.html]()

### Setup

Once you have created your virtualenv, create a `bench` folder to create your developer workbench. Inside the bench folder, create two more folders, `apps` (where the applications will be installed) and `sites` (from where the sites will be served).

In a fresh install, we will only install the Frappe Framework. The Frappe Framework is also an application that contains the core libraries and models on which other applications are built. The Frappe Framework also contains the User Interfaces:

1. Frappe Desktop - The web based desktop envinronment (Javascript application)
1. Content Management System (CMS) - Statically or dynamically generated web pages on server side.

#### 1. Clone `frappe`

Inside the apps, folder, clone the `frappe` repository:

		git clone https://github.com/frappe/frappe

Create a text file `apps.txt` with list of installed apps, (right now only `frappe`)

Your structure should look like this:

	- bench
	  - apps
	    + frappe
	  - sites
	    apps.txt

Sample `apps.txt`:

	frappe

#### 2. Install requirements and setup `frappe`

Now, setup the `frappe` application by going to frappe folder and running

	cd apps/frappe && python setup.py develop

This will install all the pre-requisites and also the `frappe` command line tool. Using this you can start new applications and sites.

#### 3. Start a New Site

To run the application, a new site needs to be created. A new site contains a database and a folder from which the site is run via a web server.

To create a new site, go to the `sites` folder and run

	cd sites
	frappe --install [sitename] [databasename]

Once your site is installed, you can build the application, start the development server and fire up your browser and login to check if it works:

	frappe --use [sitename]
	frappe --build
	frappe --serve

Go to your browser and open localhost:800

![Desk](assets/frappe_io/images/app-development/login.png)

You should see the login screen. The Administrator Login is `Administrator` and password is `admin`. Once you login, you should see the a desktop environment with icons.

![Desk](assets/frappe_io/images/app-development/desk.png)

{next}
