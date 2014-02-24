# ERPNext Plugins (Beta)

The aim of the Plugins architecture is to make ERPNext extensible. In its
current state, you can use it to write custom server scripts (py files) and
write python scripts for script reports.

#### Folder Structure

  * erpnext_folder_name
    * app
    * lib
    * public
    * plugins
      * erpnext_folder_name (default plugin for custom scripts)
        * module
          * doctype
            * doctype_name
              * doctype_name.py
          * report
            * report_name
              * report_name.py

  

To add a Custom Server Script, run:

`lib/wnf.py --make_custom_server_script DOCTYPE`

  

When you save a Script Report, a new report_name.py file will get created in
plugins' report > report_name folder.

  

_Note: Plugins cannot have __init__.py files, since they are not supposed to
be imported._

* * *

#### Upcoming features

  1. Custom Modules
  2. Custom DocTypes
  3. Custom Fields that can be synced

