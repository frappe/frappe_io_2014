### Preamble

Frappe is, a Python based, meta-data driven framework. The framework
implements its own object-relational model (ORM) and provides a rich client
interface based on Javascript. It is originally used to develop
[ERPNext](https://github.com/frappe/frappe)

To develop on Frappe, you must have a basic understanding of how web
applications and client-server architectures work. 

Frappe also has its system of how metadata is defined. Each model is called a `DocType`.
Everything object in the system like a Customer or Journal Voucher is a
`DocType`.

Be prepared for a slight learning curve. A lot of the inner code /
design is not very elegant and you might encounter spaghetti at certain
places. We are working to reduce all of that.

* * *

## Meta data

Base model in Frappe is called a `DocType`. A `DocType` represents a
database table, a web form and a controller to execute business logic. In
classical MVC terms it is all three model, view and controller to an extent.

`DocType` objects have `DocField`s that are properties of the model.

* * *

