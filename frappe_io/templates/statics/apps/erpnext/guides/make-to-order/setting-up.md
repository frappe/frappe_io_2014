# Setting Up

Make-to-order process starts only when a confirmed __Sales Order__ is placed for an Item. To be able to make a Sales Order, an Item has to exist. Thus, enter the Item details in the system.

### Item

An Item is your company's product or a service. The term Item is applicable to your core products as well as your raw materials. It can be a product or service that you buy/sell from your customers/ suppliers. ERPNext allows you to manage all sorts of items like raw-materials, sub-assemblies, finished goods, item variants and service items.

Create the Item- Pen Stand in ERPNext. Since this is a sales Item, it should be grouped as ‘Product’. The material that goes into making of this product like jute wire and fabric paint will also be called Item. However, the Item Group of jute wire and fabric paint will be termed as Raw Material.

#### Figure 1: Item

![Item](/assets/frappe_io/images/erpnext/m-t-s-item.png)

1. Click Yes on ‘Allow Bill of Materials’, 
1. Click Yes on ‘Allow Production Order’ and 
1. Click No on  ‘Is Purchase Item’.

![bulb](/assets/frappe_io/images/erpnext/bulb.jpg)

__Tip:__ Please mention the  Default Warehouse for this Item as “Finished Goods”. This product is available at the Finished Goods Warehouse only after it gets manufactured at the Work-in-Progress Warehouse. It cannot be kept in stores-because it is not purchased, it is manufactured.

> Note : In reality you may not have three warehouses. You may have one, which you use for raw material, for manufacturing/stitching/producing and also for storing finished goods. In this case, you have to only imagine separate spaces for each activity, and name them accordingly. For system entry purpose, having three different warehouses for stocking raw materials, manufacturing unfinished goods and storing finished goods is a necessity. 

To understand in detail visit [Item](/apps/erpnext/user-guide/stock-inventory).

Create raw material as “Item” in ERPNext.


![Raw Material](/assets/frappe_io/images/erpnext/m-t-o-jute-raw-material.jpg)

#### Figure 2: Item Jute-wire as raw material

![Jute Wire](/assets/frappe_io/images/erpnext/m-t-o-jute-wire-rawmaterial.png)

Note:  Mention Item Group as Raw Material, 
           Click No on ‘Allow Bill of Materials’, since BOM is required only for products
           unless you are manufacturing the raw material too.
           Click No on Allow Production Order, and 
           Click Yes on ‘Is Purchase Item’.

Create Items for all the raw materials that will go into the Bill of Materials. Following is the list of raw materials that will go into making of a jute pen-stand.

1. fabric colour
1. Jute wire
1. Tree glue

#### Figure 3: Item List

![Item List](/assets/frappe_io/images/erpnext/m-t-o-item-list.png)

Make a Bill of Materials with the help of these raw materials.

Before making the Bill of Materials, log in the Sales Order in the system.

