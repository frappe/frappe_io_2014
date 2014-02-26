## Frappe bench

This repository helps you setup an isolated environment (bench) to run and
develop ERPNext. A virtualenv is installed in the env directory. You can
activate it by running `source ./env/bin/activate` or use execute using
absolute/relative path (eg, `./env/bin/frappe`).

Repository: (https://github.com/frappe/frappe-bench)[https://github.com/frappe/frappe-bench]

#### Pre requisites

You will need some system packages

	sudo apt-get install python-dev build-essential python-mysqldb git memcached ntp vim screen htop mysql-server libmysqlclient-dev libxslt1.1 libxslt1-dev

#### Usage

	git clone https://github.com/frappe/frappe-bench
	cd frappe-bench
	./scripts/install.sh single [sitename [dbname]]

### Updating software

Not yet automated but you can run

	cd src/frappe && git pull && cd -
	cd src/erpnext && git pull && cd -
	cd src/shopping-cart && git pull && cd -
	./env/bin/frappe --latest sitename --sites_path sites
	./env/bin/frappe --build sitename --sites_path sites

### Shortcomings

Doesn't setup the scheduler yet. You can add `/path/to/env/bin/frappe
--run_scheduler --sites_path /path/to/sites sitename` to crontab. However,
frappe will soon be using celery for this.