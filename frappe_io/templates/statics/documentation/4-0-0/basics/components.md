# Components

The Frappe platform is built on existing free software. 

### External Services

#### MariaDB

MariaDB provides persistence to documents in Frappe.

#### Redis

Frappe uses [Celery](http://celery.readthedocs.org/) to manage scheduled and
asynchronous jobs. We use Redis as broker for celery. You can replace this with
any other broker supported by Celery.

#### SMTP Server

Utilities to send emails are included in Frappe but to perform actual sending, it
requires a working SMTP server. 

#### Server Components

### Request Handling

The Frappe Platform responds to HTTP requests via the WSGI application
`frappe.app:application`. The WSGI application is implemented using
[Werkzeug](http://werkzeug.pocoo.org/) library.
