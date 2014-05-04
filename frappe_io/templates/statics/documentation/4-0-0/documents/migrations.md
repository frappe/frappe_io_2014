# Migrations

A project often undergoes changes related to database schema during course of
its life. It may also be required patch existing data. Frappe bundles tools to
handle these schenarios.

## Schema changes

You can edit a DocType to add, remove or change fields. On saving a DocType,
a JSON file containing the DocType is add to source tree of your app. When you
add an app to a site, the DocTypes are installed using this JSON file.

On run
