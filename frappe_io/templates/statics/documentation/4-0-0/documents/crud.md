# Documents

### Creating a Document

Using the Python shell,


	In [1]: d = frappe.new_doc('Person')

	In [2]: d.set('first_name', 'Jane')

	In [3]: d.set('last_name', 'Doe')

	In [4]: d.save()

	In [5]: d.as_dict()
	Out[5]: 
	{u'creation': '2014-04-25 17:56:51.105372',
	 u'docstatus': 0,
	 u'doctype': u'Person',
	 u'first_name': u'Jane',
	 u'idx': None,
	 u'last_name': u'Doe',
	 u'modified': '2014-04-25 17:56:51.105372',
	 u'modified_by': u'Administrator',
	 u'name': u'000000012',
	 u'owner': u'Administrator',
	 u'parent': None,
	 u'parentfield': None,
	 u'parenttype': None}

You can also set attributes directly on the Document object. For example, 

	d.first_name = 'Jane'

However, this would not work for fields that start with '_'(underscore).

There is also a method, `doctype.db_set(fieldname, value)` which inserts the
value to the database without running validations or hooks.

### Retrieving a Document

You can retrieve a document using `frappe.get_doc`

	In [1]: jane = frappe.get_doc('Person', '000000012') 

	In [2]: jane.as_dict()
	Out[2]: 
	{u'creation': u'2014-04-25 17:56:51.105372',
	 u'docstatus': 0,
	 u'doctype': u'Person',
	 u'first_name': u'Jane',
	 u'idx': None,
	 u'last_name': u'Doe',
	 u'modified': u'2014-04-25 17:56:51.105372',
	 u'modified_by': u'Administrator',
	 u'name': u'000000012',
	 u'owner': u'Administrator',
	 u'parent': None,
	 u'parentfield': None,
	 u'parenttype': None}

	In [3]: jane = frappe.get_doc('Person', {'first_name': 'Jane'})

	In [4]: jane.as_dict()
	Out[4]: 
	{u'creation': u'2014-04-25 17:56:51.105372',
	 u'docstatus': 0,
	 u'doctype': u'Person',
	 u'first_name': u'Jane',
	 u'idx': None,
	 u'last_name': u'Doe',
	 u'modified': u'2014-04-25 17:56:51.105372',
	 u'modified_by': u'Administrator',
	 u'name': u'000000012',
	 u'owner': u'Administrator',
	 u'parent': None,
	 u'parentfield': None,
	 u'parenttype': None}

### Updating a Document

You can update a document by first getting it, changing or setting values and
saving the doc again


	In [1]: jane = frappe.get_doc('Person', {'first_name': 'Jane'})

	In [2]: jane.first_name = 'John'

	In [3]: jane.save()
	Out[3]: <sample_app.sample_app.doctype.person.person.Person at 0x32d5950>

	In [4]: john = frappe.get_doc('Person', {'first_name': 'John'})

	In [5]: john.as
	john.as_dict  john.as_json  

	In [5]: john.as_dict()
	Out[5]: 
	{u'creation': u'2014-04-25 17:26:22.728327',
	 u'docstatus': 0,
	 u'doctype': u'Person',
	 u'first_name': u'John ',
	 u'idx': None,
	 u'last_name': u'Doe',
	 u'modified': u'2014-04-25 17:26:22.728327',
	 u'modified_by': u'Administrator',
	 u'name': u'000000008',
	 u'owner': u'Administrator',
	 u'parent': None,
	 u'parentfield': None,
	 u'parenttype': None}

### Deleting a document

	In [1]: john = frappe.get_doc('Person', {'first_name': 'John'})

	In [2]: frappe.delete_doc('Person', john.name)
