Merging documents means combining or causing two documents to form single
entity.  

  

It may happen that at times, you may create two records against the same
customer, Item or Supplier. In future you might decide to merge these two
records into one. In such a case scenario, you can use the merge option which
is available in the Rename function.

  

For example; If you have created one customer record with the name of Afonso
and another record called Ivan Afonso for the same customer, you might want to
consider merging these two records and keeping all the information  regarding
this record under one name. To do so, you can use the rename function and
merge the records.

  

Figure 1: Customer list showing two records of same person.

![](assets/frappe_io/images/erpnext/merging-documents.png)  

  

**Step 1: Open the document with the name you wish to change.**

For Example, If you wish to merge the records of Afonso with Ivan Afonso and
keep all records under Ivan Afonso's name, then open the customer record with
the name Afonso.

**  
**

**Step 2: Click on the top black bar and select Rename.**

There is no direct selection called Merge. Click on the Rename function.

  

Figure 2: Select Rename to Merge.** **  

![](assets/frappe_io/images/erpnext/merging-documents-1.png)**  
**

**  
**

**Step 3: Change the name to new name**

In the above example, to merge the name Afonso into Ivan Afonso, fill the new
name Ivan Afonso in the rename box.

  

**Step  4: Check the box to select merge option.**

By clicking on the merge option all the details of records and forms under
Afonso will get merged with the new name Ivan Afonso.

**  
**

Figure 3: Rename Old Name  

![](assets/frappe_io/images/erpnext/merging-documents-2.png)  

  

**Step 5: Check the customer list for merged name.**

**  
**

Figure 4: Customer list with merged name.

![](assets/frappe_io/images/erpnext/merging-documents-3.png)**  
**

  

  

The records under the name Afonso are now merged with Ivan Afonso. The
attributes of Afonso  cease to exist.  

  

Note 1: Every customer or supplier have their respective account heads. Thus,
when the customer name is renamed, the old account head gets deleted and new
account name comes into existence.

Note 2: If new customer/supplier/warehouse has no account head, then old
account name will be renamed into a new account head. The old account head
will be deleted.

Note 3: If you wish to merge two warehouses, note that both the warehouses
should belong to the same company.

Note 4: Two Items will be merged based on 4 conditions. a) Both the Items
should be stock Items. One stock Item and another non-stock Item cannot be
merged.

b) Both the Items should have the same UOM. Items with different UOM cannot be
merged. c)Both the Items should have serial numbers. Serialized and Non-
Serialized Items cannot be merged. d) Both the Items should have Batch
numbers. One Item with Batch no and another without one, will not merge.

Note 5: When you merge an Item or a warehouse all the related quantities like
actual qty, received qty, ordered qty etc will be merged.

  

  

  

  

  

  

  

**  
**

**  
**

**  
**

**  
**

  

  

  

  

