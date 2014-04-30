# Installing Frappe

## Frappe bench

The following steps help you setup an isolated environment (bench) to run and
develop Frappe apps. A virtualenv is installed in the env directory. You can
activate it by running `source ./env/bin/activate` or use execute using
absolute/relative path (eg, `./env/bin/frappe`).

#### Prerequisites

* Add MariaDB repository from https://downloads.mariadb.org/mariadb/repositories/

* Install packages


		sudo apt-get install python-dev build-essential python-mysqldb git memcached ntp vim screen htop 
		sudo apt-get install mariadb-server mariadb-common libmariadbclient-dev  libxslt1.1 libxslt1-dev redis-server

#### Usage

	git clone https://github.com/frappe/frappe-bench
	cd frappe-bench
	./scripts/install.sh single [sitename [dbname]]

The above commands install apps in
[`standard_apps.json`](https://github.com/frappe/frappe-bench/blob/master/standard_apps.json).
You can adjust the json file to remove or add Frappe apps. By default, it
installs [ERPNext](/apps/erpnext).

### Development

The bench comes with a Procfile which lists processes required to run Frappe.
They include a WSGI web server, a celery beat daemon and a celery worker for
background jobs. For redis and MariaDB, use the init scripts provided by your
distribution.

The Procfile can by used by
a [foreman](http://rubydoc.info/gems/foreman/0.67.0/frames) like process
manager. The bench installs honcho but you can install foreman itself or its
clones.

```
./env/bin/honcho start
```

### Updating

```
./scripts/update.sh
```
