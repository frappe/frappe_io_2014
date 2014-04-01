# Production Planning Tool

Production Planning Tool helps you plan production and purchase of Items for a period (usually a week or a month). This list of Items can be generated from the open Sales Orders in the system . It will generate Production Orders for each Item and Purchase Requests for Items whose Projected Quantity is likely to fall below zero.

The Production Planning Tool in ERPNext enables you to complete the production cycle in a fast and efficient manner. From procuring materials, producing goods, to updating stocks - everything is done by clicking on buttons which appear after every transaction. The tool is user friendly and does not require you to go back and forth into the system to make and log different forms. Everything is intuitive and can be performed step by step. 

You can pull sales orders directly by clicking on a button. Select whichever you wish to process and click on another button to get items for that sales order. Mention Item details and click on the button ‘Make Production Orders’. It is that simple! After this you can click on another button and create material requests required to complete this production order. The whole process is fuss free and easy.

> Manufacturing > Production Planning Tool

> Use the Production Planning Tool to make Production Order

#### Step 1: Pull Sales Order

Sales Order is an order issued by a business to a customer. 

Figure 1: Pull Sales Order

![Pull Sales Order](/assets/frappe_io/images/erpnext/m-t-o-ppt-pull-so.png)

Select Items by clicking on the ‘Get Items from Sales Order’ button. Do not tick the box that says ‘Use multi-level BOM’. This box is checked only if you have sub-assemblies. In other words, only if you have a BOM within a BOM. In the current example, there are no sub-assemblies.

#### Step 2: Pull Items

Figure 2: Item pulled from Get Items button

![Pulled Items](/assets/frappe_io/images/erpnext/m-t-o-ppt-fetch-item.png)

#### Step 3: Create Production Order

Production Order is an order to produce a specific quantity of material within a predefined timeframe. It contains all of the relevant information required for the execution of the process, including how much should be manufactured when. It also includes information about the work site and all the high level steps involved.

Figure 3: Production Order Created

![Production Order Created](/assets/frappe_io/images/erpnext/m-t-o-ppt-po-jps-1.png)

#### Step 4: Create Material Request

Material Request is a request to order materials for the production of your item/product.

Figure 4: Material Request Created

This request is created by clicking on the box ‘Create Material Request’

![Material Request](/assets/frappe_io/images/erpnext/m-t-o-ppt-material-request-jps-1.png)


Click on the highlighted Material Request number. The click will open into a Material Request Form. Click on the ‘Make Purchase Order’ button,on the right side upper corner, and create a Purchase Order for the same.

#### Step 5: Make Purchase Order

Purchase order (PO) is a commercial document and first official offer issued by a buyer to a seller, indicating types, quantities, and agreed prices for the products. In ERPNext, You can create Purchase Orders directly by clicking on the Material Request Form.

Figure 5: Make Purchase Order

![Make Purchase Order](/assets/frappe_io/images/erpnext/m-t-o-ppt-make-po-jps-1.png)

#### Step 6: Submit Purchase Order

![Submit PO](/assets/frappe_io/images/erpnext/m-t-o-ppt-po-submit-jps-1.png)

Figure 6: Submit Purchase Order 

#### Step 7: Create Purchase Receipt

Purchase Receipt is a printed record that is given when a purchase has been made. It contains the detailed information of the items purchased including the name of the item, the price as well as the time when the purchase has been made.

Figure 7: Create Purchase Receipt

![Purchase Receipt](/assets/frappe_io/images/erpnext/m-t-o-ppt-purchase-receipt-jps-1.png)

In this manner create Purchase Orders and Purchase Receipts for all the Material Requests created by the Production Planning Tool. Remember to Save and Submit all the forms. Download the Materials Required for Manufacturing.


#### Quick Overview of PPT-Production Planning Tool

* Get Sales Order
* Get Items from Sales Order
* Create Production Order
* Create Material Request
* Download Materials Required


<i class="icon-lightbulb text-warning" style="font-size: 200%"></i> All the buttons on this tool work ! If you have entered the data properly, the tool will work flawlessly.

#### Step 8: Manually Check the PO and submit the Production Order

Mention the Warehouse where you wish to update the stock quantity and also the place where the material will be manufactured, the work-in-progress warehouse.

Figure 8: Production Order generated from PPT

![Production Order](/assets/frappe_io/images/erpnext/m-t-o-production-order-ppt-jps-1.png)

Save and submit the Production Order. After completion of the production order, transfer the raw materials from stores to the work-in-progress warehouse.

### Transfer Raw Materials 

![Transfer Raw Material](/assets/frappe_io/images/erpnext/m-t-o-transfer-rawmaterial-1.jpg)

On this form, mention the Source Warehouse and the Target Warehouse. The Source Warehouse is a place from where you issue or transfer materials. A Target warehouse is a place where stock/item is received. In this example, the system will  transfer Raw Materials from the stores warehouse to the work-in-progress warehouse. 

__Note:__ The production order has two buttons on the right hand corner. One says transfer raw material and the other says update finished goods. Both the buttons will work if  you enter source and target warehouse information properly. In case you do not and get an error, note that the stock entry which you make manually should mention the purpose correctly. For transfer the purpose will be Material Transfer. For transferring to Finished Goods, the purpose will be Manufacture/Repack.


<i class="icon-lightbulb text-warning" style="font-size: 200%"></i> Tip: If you get negative error, ensure that you have enough stock.  your purchase receipt should be saved and submitted.

You will find the ‘Transfer Raw Material’ button on right hand corner of the Production Order. Click on Action and select ‘Transfer Raw Material’. 

Figure 9: Transfer Raw Materials.

After transferring the material to the work-in-progress warehouse, the product gets manufactured. After completion, it is essential to shift the finished product to the finished goods warehouse. Thus one more stock entry has to be done that updates the finished goods in the warehouse. 

#### Update Finished Goods 

![Update FG](/assets/frappe_io/images/erpnext/m-t-o-finished-goods.jpg)

Under this section, you will mention your source Warehouse as WIP-SOG and target warehouse as Finished Goods  Warehouse. The purpose will be Manufacture/Repack. This is so because, once the product gets manufactured, it is supposed to go to Finished Goods Stock to enable delivery.

__Note:__(a) If you wish to get stock and valuation rates at this stage, press on ‘Get stock and Rate’. Valuation Rate is the average rate divided by the actual price of an item. This is arrived at by the FIFO method- weighted average of the lot.
(b) At this stage if you wish to change the BOM manufacturing quantity, you can do so. Then click on ‘Get Items’.

Save and submit the document. To see if everything has gone as planned, go back to the production order. It will show as 100% completed. The green line will be complete.


