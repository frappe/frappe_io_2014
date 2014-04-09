# How Do I Bill / Deliver / Receive / Purchase More Than The Ordered Quantity?

Go to the Item form in the stock module to make this allocation or go to stock settings to change requirement globally.

> Stock > Item > 

To bill /deliver/receive or purchase Items more than the ordered quantity, set allowance percent. Allowance Percent is the percentage variation in quantity to be allowed while receiving or delivering an Item.

![Allowance Percent](/assets/frappe_io/images/erpnext/faq-allowance-percent.png)

For Example: If a company orders 100 kg white cement, and the vendor sends 120 kg because he had extra space in the truck; the company can adjust the system's allowance percent to accept 20% more. Set the Allowance percent as 20%, and the system will allow you to accept as well as bill the extra quantity that is received. You can also set the allowance percent for different sales orders.

> Note: If you have set the allowance percent in stock settings globally, and also given seperate Item-wise allowance percent on a particular Item, the system will give preference to the Item-wise entry.