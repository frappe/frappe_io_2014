# DocType

Records in Frappe are called Documents. Each Document is related to another
Document called its DocType (aka model in other popular MVC frameworks). The
DocType record holds meta data about the Documents. The DocType of a DocType is
DocType.

#### Creating a Simple DocType

Easiest way to create a new DocType is to use the GUI. It also helps you to
create the [fields](/documentation/4-0-0/documents/fields) easily.

Before you create a doctype, make sure that
[developer\_mode](/documentation/4-0-0/configuration#developer_mode) is on.

1. Login as Administrator.
2. Go to File > New > DocType.
3. Select a Module. The `developer_mode` option will allow you to create
   a  doctype in any module of any app (even Frappe!) so be careful.
   ![Select module](/assets/frappe_io/images/documentation/4-0-0/documents/doctype-1.png)
4. Add fields to the DocType.
   ![Add Fields](/assets/frappe_io/images/documentation/4-0-0/documents/doctype-2.png)
5. Add a [permission](/documentation/4-0-0/documents/permissions) row. Below is
   a basic example for Administrator.
   ![Add Permissions](/assets/frappe_io/images/documentation/4-0-0/documents/doctype-3.png)
6. Save and enter the name of the new DocType in the popup.

A new DocType should appear in the desk's module page.

###	Single DocTypes

There are a certain type of DocTypes that are “Single”, i.e. they have no table
associated and have only one record of its fields. DocTypes such as Global
Defaults. You can set a doctype as single when creating a new DocType. An
Example of a Single DocType is 'Global Defaults'.

### Naming

### Linking DocTypes

Another Document can be linked by adding
a [Link](/documentation/4-0-0/documents/fields#Link) field. DocTypes can have
a parent-child relationship using the
[Table](/documentation/4-0-0/documents/fields#Table) field.

### Standard Fields

Apart from the fields you add to its DocType, a Documents has the following standard fields,

||**Field**    || **Description**                                           ||
||Name         || Name of the record.                                       ||
||Owner        || Creator + owner of the record.                            ||
||Created On   || Date / time of creation.                                  ||
||Modified On  || Date / time of modification.                              ||
||Doc Status   || Status of the record.                                     ||
||             || 0 - Saved / Draft                                         ||
||             || 1 - Submitted                                             ||
||             || 2 - Cancelled / Deleted.                                  ||
||Parent       || Name of the parent (in case if child).                    ||
||Parent Type  || Type of parent                                            ||
||Parent Field || The field name specifying the relationship with the parent||
||             || (there can be multiple child relationships with the same  ||
||             || DocType).                                                 ||
||Index (idx)  || Index (sequence) of the record in the child table.        ||
