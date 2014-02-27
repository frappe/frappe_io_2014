Production

![Production](/assets/frappe_io/images/erpnext/m-t-s-production-2.jpg)

### Production Order
Production Order (also called as Work Order) is a document that is given to the manufacturing shop floor by the Production Planner as a signal to produce a certain quantity of a certain Item. Production Order also helps to generate the material requirements (Stock Entry) for the Item to be produced from its Bill of Materials.


Figure 8: Production Order

![Production Order](/assets/frappe_io/images/erpnext/m-t-s-production-2.jpg)

Save and submit the Production Order. An Action button will appear at the extreme right of the form. It will have a drop-down button. Click on Transfer Raw Materials to proceed further. 

### Transfer Raw-Material

Materials which are in stores need to be transferred to the Work-in-Progress Warehouse.

Figure 9: Transfer Raw Material

![Transfer Raw Material](/assets/frappe_io/images/erpnext/transfer-raw-material.png)

Figure 10: Transfer Material with Warehouse Details.

![Transfer Material 2](/assets/frappe_io/images/erpnext/m-t-s-transfer-material.png)

Note that transferring the raw material is a stock entry. To be able to manufacture, you are required to transfer your raw-material from the stores to the work-in-progress warehouse. The stock entry specifies the transfer of goods from one warehouse to other. After the final product is manufactured in the work-in-progress it is necessary to transfer it to a Finished Goods Warehouse. This transaction, has to be shown in another stock entry.

To make this stock entry directly, click on the Action button of the Production Order and select Update Finished Goods.

![Bulb](/assets/frappe_io/images/erpnext/bulb.png)

__Tip:__  To go to your Production Order you may use a shortcut route. Go to the head bar at the top ( the black bar) and click on History. Then, select the respective Production Order.

### Back Flush and  Update Finished Goods.

Back flush means to consume raw materials gone into the making of the product. 
After clicking on Update Finished Goods, a Stock Entry form will appear.  Fill that form.
Update Source Warehouse and Target Warehouse.The Source Warehouse is a place from where you issue or transfer materials. A Target warehouse is a place where stock/item is received. In this case it will be Finished Goods-SOG

Note that this stock entry will have its purpose as Manufacture/Repack. In this form mention the source warehouse as Work-In-Progress warehouse and Target Warehouse as Finished Goods Warehouse. Then click on ‘Get Stock and Rate’. Save and submit the document.

Figure 11: Update Finished Goods

![Update](/assets/frappe_io/images/erpnext/m-t-s-update-fg.png)

Since this is a make-to-stock product, the billing will not happen immediately. Money will be recovered only when these products are sold at an exhibition or when a retailer buys them.

To check your Finished Goods stock balance go to stocks and click on Warehouse -wise stock balance report.

Figure 12: Warehouse-wise stock balance report
![Stock Balance Report](/assets/frappe_io/images/erpnext/m-t-s-warehouse-wise-balance.png)


The make-to-stock cycle is completed . Now profitability will depend on the sales performance. Let us imagine that Shades of Green convinced a corporate organisation, to gift their employees Jute Bags as a return gift on their annual gathering event. Thus, Shades of Green gets a Sales Order.

Celebrate
Enjoy every Sales Order

![Celebrate](/assets/frappe_io/images/erpnext/celebrate-1.jpg)

