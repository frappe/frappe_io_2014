### Introduction

The is the detailed explanation. use [bench install](apps/frappe-framework/developer-guide/install) for quick start

1. All applications are Python modules
1. Installation will by via `setuptools`
1. Apps communicate to base framework and other apps via `hooks.txt`
1. Important: DocType names and module names must be unique throughout all apps! So please check existing names before creating new apps / modules / doctypes

## Setting up the Environment

1. Setup a `virtualenv`.
1. Create your `bench` folder - which will contain the sites and repos.
1. In bench, you can create a separate folder for each app repository. Clone your `wnframework` and `erpnext` folders here. Please clone `wnframework` as `frappe` - the repository name will be changed when the final release is complete.
1. In bench, create a `sites` folder for all sites to be served on this implementation.
1. You may need to install the required packages for your system. For ubuntu, run
    `sudo apt-get install libmysqlclient-dev libxml2-dev libxslt-dev`
1. Install `frappe` and `erpnext` by running `python setup.py develop` in each folder.
1. Create `sites/apps.txt` for list of globally installable apps.
1. Create `sites/languages.txt` for installable languages. Copy from `frappe/data/languages.txt`
1. For executing command line `frappe` the working directory must be `sites`

Final Directory structure should be:

```
- bench
  - repos
    + frappe
    + erpnext
  - sites
    apps.txt
    languages.txt
    + assets
    + site1
    + site2
```

Sample `apps.txt`

```
frappe
erpnext
```

### Installing for Development

- Setup each app (`frappe`, `erpnext` etc) `python setup.py develop`
- Change to sites folder `bench/sites`
- run `frappe site1 --install_db [dbname]`
- run `frappe site1 --install_app erpnext`
- run `frappe site1 --build`

To add a new site:

- create a folder in the `sites` folder
- run `frappe [newsite] --install [dbname]`
 
To start serving

- From the sites folder: `frappe site1 --serve`

