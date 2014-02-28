# Item

An Item is your company's product or a service.The term Item is applicable to your core products as well as your raw materials. It can be a product or service that you buy/sell from your customers/ suppliers. ERPNext allows you to manage all sorts of items like raw-materials, sub-assemblies, finished goods, item variants and service items.

> Stock > Item > New Item

#### Create an Item: Butterfly Print Bag

1. Say Yes to ‘ Is Stock Item’, since this is a stock Item. Mention the Default Warehouse as ‘Finished Goods’ because after being manufactured it will be stored at the Finished Goods Warehouse. 
1. ‘Is Purchase Item’, should be No,  since this Item will be manufactured. 
1. Say Yes to  ‘Is sales Item, since this product will be sold. 
1. Say Yes to ‘Allow Production Order’ and 
1. Say Yes to ‘ Allow Bill of Materials’.

Warehouse is a mandatory field. The Item form will not be saved unless you enter a default Warehouse.

**Note:** In reality you may not have three warehouses. You may have one, which you use for raw material, for manufacturing/stitching/producing and also for storing finished goods. In this case, you have to only imagine separate spaces for each activity, and name them accordingly. For system entry purpose, having three different warehouses for stocking raw materials, manufacturing unfinished goods and storing finished goods is a necessity. 

> Visit [Item](/apps/erpnext/user-guide/stock-inventory/item-master) to understand in detail.

#### Figure 1: Create an Item Butterfly Print Bag

Create other Items and categorize them as Raw Materials. These Items like jute handle and jute cloth will say No to ‘Allow Bill of Materials’, since raw material is purchased not produced in-house. This raw material will not be Sales Item. They will say Yes to ‘Is Purchase Item.These Items like jute cloth and jute handle, will be required in order to manufacture the jute Butterfly Print bag.
