# How To Repack Products / Items Into Smaller Units?

To repack go to the Stock module and click on Stock Entry.

> Stock > Stock Entry

__Step 1:__ Go to the Stock Entry.

__Step 2:__ Select Purpose as Manufacture/Repack.

![Repack](assets/frappe_io/images/erpnext/repack-1.png)

__Step 3:__ Fill Item details and BOM details.

A lot of retailers / distributors buy large quantities of an item and repack
them into smaller units. You can do this in ERPNext through Stock Entry.

This entry is explained with an example.

If you have a product, say - wheat, create a Stock Entry for the total amount
of wheat stock in the Source Warehouse. Keep the UOM as KG.

![Repack](assets/frappe_io/images/erpnext/stock-entry-repack.png)

If you pack your item-wheat in boxes, and want to measure stock in terms of
numbers, say - [5 kg wheat in 1 box]; then, go to Stock Entry and select
purpose as 'Manufacture/Repack'. Create one Item as Wheat with UOM KG. In this
case mention only the source warehouse. Create another Item as Wheat Bag and
mention UOM as Nos. Mention Target Warehouse for Wheat Bags. Mention Valuation
numbers, save and submit the entry.

The stock will be calculated as per the entry and will reflect in the stock
report.

![Repack](assets/frappe_io/images/erpnext/repack-2.png)

