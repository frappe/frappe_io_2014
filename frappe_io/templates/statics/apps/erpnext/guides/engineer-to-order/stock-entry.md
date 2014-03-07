# Stock Entry

### Transfer Raw Material 

Materials which are in stores need to be transferred to the Work-in-Progress Warehouse.

Go to the Production Order and  click on the button ‘Transfer Raw Material’ . Mention the Source Warehouse and the Target Warehouse. The Source Warehouse is a place from where you issue or transfer materials. A Target warehouse is a place where stock/item is received. In this example, the system will  transfer raw materials from the stores warehouse to the work-in-progress warehouse. Note that the work-in-progress warehouse is stored under the parent-stock expenses.

__Note:__ The production order has two buttons on the right hand corner. One says transfer raw material and the other says update finished goods. Both the buttons will work if  you enter source and target warehouse information properly. In case you do not and get an error, note that the stock entry which you make manually should mention the purpose correctly. For transfer the purpose will be Material Transfer. For transferring to Finished Goods, the purpose will be Manufacture/Repack.


![Bulb](/assets/frappe_io/images/erpnext/bulb.jpg)

__Tip:__ if you get negative error, ensure that your purchase receipt is saved and submitted. Now come back to Production Order and click on Transfer Raw Material. Click on the Action Button and select ‘ Transfer Raw Material’ Save and submit the Stock Entry.

### Update Finished Goods

Stocks which are completed need to be transferred to the finished goods area. 

Under this section, you will mention your source Warehouse as WIP-stock expenses and target warehouse as Finished Goods-stock expenses. The purpose will be Manufacture/Repack. This is so because, once the product gets manufactured, it is supposed to go to Finished Goods Stock to enable delivery.

__Note:__(a) If you wish to get stock and valuation rates at this stage, press on ‘Get stock and Rate’. Valuation Rate is the average rate divided by the actual price of an item. This is arrived at by the FIFO method- weighted average of the lot.
(b) At this stage if you wish to change the BOM manufacturing quantity, you can do so. Then click on ‘Get Items’.

Go to Production Order and click on Update Finished Goods

#### Figure 1: Update Finished Goods

![Update Finished Goods](/assets/frappe_io/images/erpnext/e-t-o-update-finished-g-childbed.png)

Save and submit the Stock Entry.

To see if everything has gone as planned, go back to the production order. It will show as 100% completed. The green line will be complete.

Now complete the balance payment cycle. The client Jane D’souza has been given 1 sales invoice. Now raise another 2  sales invoices. One for 25000/- and another for 50000/- Make Payment Entries for Both.

With the final payment done, make the Delivery Note by going to Sales Order.

You can see how much profit you made on this order by going to Gross Profit Report.