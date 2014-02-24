ERPNext is a based on a “metadata” (data about data) framework that helps
define all the different types of documents in the system. The basic building
block of ERPNext is a DocType.

A DocType represents both a table in the database and a form from which a user
can enter data.

Many DocTypes are single tables, but some work in groups. For example,
Quotation has a “Quotation” DocType and a “Quotation Item” doctype for the
Items table, among others. DocTypes contain a collection of fields called
DocFields that form the basis of the columns in the database and the layout of
the form.

Column

Description

Name

Name of the record

Owner

Creator and Owner of the record

Created on

Date and Time of Creation

Modified On

Date and Time of Modification

Docstatus

Status of the record  
0 = Saved/Draft  
1 = Submitted  
2 = Cancelled/Deleted

Parent

Name of the Parent

Parent Type

Type of Parent

Parent Field

Specifying the relationship with the parent (there can be multiple child
relationships with the same DocType).

Index(idx)

Index (sequence) of the record in the child table.

#### Single DocType

There are a certain type of DocTypes that are “Single”, i.e. they have no
table associated and have only one record of its fields. DocTypes such as
Global Defaults, Production Planning Tool are “Single” DocTypes.

