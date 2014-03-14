A bill of materials [BOM] is a list of the prices of raw materials, sub-
assemblies, intermediate assemblies, sub-components, parts and the quantities
of each needed to manufacture or sell an [end
product](http://en.wikipedia.org/wiki/Product_\(business\)).

  

In case of a Sales BOM it is an ingredient list that gets bundled along with
the main Item / parent Item, when sold to the customer. When a Sales BOM is
created the other Items which are bundled along with the main product are all
sold as one Item. These  Items are deducted from the stores when the main Item
is sold. Thus a Sales BOM helps in  maintaining accurate stock records.

  

For Example: If you are a Jute Bag Seller and as a promotion drive you wish to
give Jute Pouch and Jute Pen-Stand free, then you prepare a Sales BOM for the
Item Jute Bag. The Sales BOM for the Jute Bag will have Jute pouch and Jute
pen-stand as part of it's Sales-BOM. The production BOM of Jute Bag however,
will not have Jute Pouch or Jute Pen-stand as part of the BOM.

  

To make a Sales Bill of Material (BOM) go to

  

Selling> Sales BOM> New Sales BOM

  

__Step 1:__ Select the Parent Item

> Note 1: The Parent Item should be a non-stock Item. This is non-stock item
because there is no stock maintained for this Item. It is only a Package Item.

> Note 2: If you wish to maintain stock for this Parent Item, then you should
create a regular Bill of Material (BOM) and package it [repack function] using
a Stock Entry Transaction.  

> Note 3: The Parent Item should be a Sales Item.

  

#### Figure 1: Sales BOM for Jute Bag

![](assets/frappe_io/images/erpnext/sales-bom-.png)  

  

__Step 2:__ Add Child Items

Enter the Child Items which will be reserved along with the Parent Item.  

> Note 1: Child Items will be stock Items because they can be tracked as per
usage for replenishment of stocks.

  

__Step 3:__ Save  and Submit the Document

  
**Q. How to use a Sales BOM in transactions like Sales Orders, Delivery Notes, Sales Invoice etc ?**

__Answer:__ When making sales transactions like Sales Invoice, Sales Order or
Delivery Note,

__Step 1:__ Select Parent Item in the main Item table.  

__Step 2:__ Mention the Warehouse where this Item will be packaged.  

> Note: Since Jute Bag is a non-stock Item you have not specified a warehouse
for this Item. However, in Sales Order form or other forms, it is mandatory to
mention the Reserved Warehouse. This Warehouse will serve as a place to
reserve the offer Items.

__Step 3:__ Save this Document. After saving, the Packing List feature is added to this form. The list will automatically fetch the Child Items which will be packaged/bundled along with the parent Item.

  

#### Figure 2: Packing List with Child Items

![](assets/frappe_io/images/erpnext/sales-bom-usein-so.png)  

  

> Note 1: On submission of this transaction, the system will reduce/reserve the
stock level of Child Items from the warehouse which was mentioned in their
respective Item forms.  

> Note 2: You can define a separate price-list for sales BOM considering all the
package Items.

  