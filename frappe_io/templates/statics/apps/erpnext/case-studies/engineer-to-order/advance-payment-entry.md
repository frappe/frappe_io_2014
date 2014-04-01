# Advance Payment Entry

Journal Voucher

A journal voucher (JV) is a method of entering accounting information. JV entries include debit and credit information.

Make a JV to note the advance given by Jane-the customer.

> Accounts > Journal Voucher

Payment done by the customer before accepting delivery of the product is an Advance Payment. For Orders of high value, the business houses expect to receive advance. Open a new Journal Voucher and make the advance entry.

#### Figure 1 : Journal Voucher -Advance Entry

![Advance Entry](/assets/frappe_io/images/erpnext/e-t-o-advance.png)

Since the customer has given 10000/- as cash advance, it will be recorded as a credit entry against the customer. To balance it with the debit entry [Double accounting Entry] enter 10000/- as debit against the Company’s cash account.

### Double Entry Accounting

Double entry bookkeeping is a system of accounting in which every transaction has a corresponding positive and negative entry : debits and credits. Every transaction involves a debit entry in one account and a credit entry in another account. This means that every transaction must be recorded in two accounts; one account will be debited because it receives value and the other account will be credited because it has given value.

#### Figure 2 : Double Accounting Entry

![Double Accounting Entry](/assets/frappe_io/images/erpnext/e-t-o-jv-advance-childbed.png)

Save and submit the JV. If this document is not saved it will not be pulled in other accounting documents.

### Sales Invoice

A Sales Invoice is a bill that you send to your Customers, against which the customer processes the payment. Sales Invoice is an accounting transaction. On submission of Sales Invoice,  the system updates the receivable and books income against a Customer Account.

In this case, the Sales Order is made for an amount of Rs 100000/- Supreme Furniture will charge the customer in phases. Thus they will make 3 Sales Invoices, two will charge 25,000 each and one will be for Rs 50, 000/- Quantity will be specified as 0.25, 0.25 and 0.50 respectively.

#### Figure 3 : Sales Invoice for Quarter of the total amount.

![Sales Invoice](/assets/frappe_io/images/erpnext/e-t-o-sales-invoice-childbed.png)

To link the Sales Invoice to the Journal Voucher which mentions the advance payment entry, click on ‘Get Advances Received’.  Allocate the amount of  advance in the advances table. The accounting will be adjusted accordingly.

Note: In case you get error while saving, due to Qty being in fraction, go to UOM master and uncheck the box that says ‘Must be whole number’.


#### Figure 4: Advance pulled from JV

![Advance Pulled](/assets/frappe_io/images/erpnext/e-t-o-salinv-get-advance-childbed.png)


 Save and submit the Sales Invoice.

