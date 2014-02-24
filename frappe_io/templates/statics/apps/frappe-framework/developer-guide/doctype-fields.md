#### Field Columns

In the fields table, there are many columns. The columns of the field table
are explained below:

Column

Description

Label

Field Label (that appears in the form).

Type

Field Type

Name

Column name in the database, must be code friendly with no white spaces,
special characters and capital letters.

options

Field settings:  
For Select: List of options (each on a new line).  
For Link: DocType that is “linked”.  
For HTML: HTML Content

Perm Level

Permission level (number) of the field. You can group fields by numbers,
called levels, and apply rules on the levels.

Width

Width of the field (in pixels) - useful for “Table” types.

Reqd

Checked if field is mandatory (required).

In Filter

Checked if field appears as a standard filter in old style reports.

Hidden

Checked if field is hidden.

Print Hide

Checked if field is hidden in Print Formats.

Report Hide

Checked if field is hidden in old style reports.

Allow on Submit

Checked if this field can be edited after the document is “Submitted”.

Depends On

The fieldname of the field that will decide whether this field will be shown
or hidden. It is useful to hide un-necessary fields.

Description

Description of the field

Default

Default value when a new record is created.  
Note: “user” will set the current user as default and “today” will set today’s
date (if the field is a Date field).

#### Field Types and Options

Here is a list of the different types of fields used to make / customize forms
in ERPNext.

Type

Description

Options/Setting

Data

Single line text field with 180 characters

Select

Select from a pre-determined items in a drop-down.

The “Options” contains the drop-down items, each on a new row

Link

Link an existing document / record

Options contains the name of the type of document (DocType)

Currency

Number with 2 decimal places, that will be shown separated by commas for
thousands etc. in Print.

e.g. 1,000,000.00

Float

Number with 6 decimal places.

e.g. 3.141593

Int

Integer (no decimals)

e.g. 100

Date

Date

Format can be selected in Global Defaults

Time

Time

Text

Text

Multi-line text box without formatting features

Text editor

Multi-line text box with formatting toolbar etc

Code

Code Editor

Options can include the type of language for syntax formatting. Eg JS / Python
/ HTML

Table (Grid)

Table

Table of child items linked to the record.

Options contains the name of the DocType of the child table. For example
“Sales Invoice Item” for “Sales Invoice”

Layout

Section Break

Break into a new horizontal section.

The layout in ERPNext is evaluated from top to bottom.

Column Break

Break into a new vertical column.

HTML

Add a static text / help / link etc in HTML

Options contains the HTML.

Action

Button

Button

[for developers only]

