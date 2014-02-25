Stock reconciliation is the process of counting and evaluating stock-in-trade,
usually at an organisations year end in order to value the total stock for
preparation of the accounts. In this process actual physical stocks are
checked and recorded in the system. The actual stocks and the stocks mentioned
in the system should be in agreement and accurate. If they are not, you can
use the stock reconciliation tool.

**Difference between Serialized and Non-serialized Items.**  

A serial number is a unique, identifying number or group of numbers and
letters assigned to an individual Item.The Items are serialized in order to
enable warranty's and service agreements on that product. Serialized Items are
Items like laptops or electronic products.

Non Serialized Items are Items like jute bags, pens, erasers, pencils. These
Items are consumed generally in large quantities and do not require serialized
numbers. Stock Reconciliation option is available for these non serialized
Items.

It is important to note that Stock Reconciliation can be performed only on
non-serialized Items.  

**Opening Stocks**

You can upload your opening stock in the system using Stock Reconciliation.
Stock Reconciliation will update your stock for a given Item on a given date
for a given Warehouse to the given quantity.  

Stock Reconciliation will make a “difference entry” (the difference between
the system stock and the actual stock in your file) for the Item.

Tip: Stock Reconciliation can also be used to update the “value” of an Item.
To understand how Items are valued read [Valuation](item-valuation-fifo-and-
moving-average).

To perform Stock Reconciliation, go to:

> Stock > Stock Reconciliation > New Stock Reconciliation

and follow the steps mentioned on the page.

  

Click on the Action button and select Download Template.

  

#### Step 1: Download Template

In order to enter the correct entries as per the actual stock in the
warehouse, download a template. In this template, you can type the actual
stock quantity as seen in the warehouse.

  

Figure 1: Download Template

![](assets/frappe_io/images/erpnext/stock-reconciliation-4.png)  

Note: While filling the valuation rates of Items, if you wish to find out the
valuation rates of all items, you can go to stock and click on Item prices
report. The report will show you all types of rates.  

  

#### Step 2: Enter Data in csv file.

![](assets/frappe_io/images/erpnext/stock-reconciliation-with-data.png)  

  

The csv format is case-sensitive. Thus special care should be taken to avoid
spelling errors or wrong names. Even if you do not list some quantities or
valuation rates, the file will still process the data. If you do not want to
change the quantity or valuation rate of an Item, you should leave it blank.  

Note: Make sure you do not put zero if you do not want to change the quantity
amount or valuation amount. The system will calculate zero as zero quantity.
So leave the field blank.

#### **Step 3: Upload the csv file with data and upload** **the file**

  

![](assets/frappe_io/images/erpnext/stock-recociliation-upload.png)  

After reviewing saved Reconciliation Data, submit the Stock Reconciliation. On
successful submission, the data will be updated in the system. To check the
submitted data go to stock and view stock level report.  

  

#### **Step 4: Review the reconciliation data **

![](assets/frappe_io/images/erpnext/reconciliation-data.png)**  
**

#### **Stock Ledger Report**  

![](assets/frappe_io/images/erpnext/stock-ledger-report-sr000001.png)**  
**

  

**For advanced users: Know-how of transaction that takes place at the back-end.**

  

If the system shows a particular stock entry and if the physical stock doesn't
match, you can use the stock reconciliation tool.

For Example: If the actual physical stock is 10 and if the system shows 6,
there is a difference of 4 in the system. The stock reconciliation tool will
create a  stock ledger entry for the difference in Qty which is equal to 4.
Thus the stock will be brought to 10.

  

If you are using perpetual entry method for accounting of stocks then system
will do a parallel accounting entry for the difference amount. Every warehouse
will be debited /credited depending on the difference. The Difference account
will be stock adjustment account or any other expense account as per the users
preference. Selecting Cost center is mandatory for every transaction of
expense account.

  

To check the accounting entries go to the General Ledger Report.

  

