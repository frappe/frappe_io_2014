# Payment Options

### International (Non-India) Customers.

#### Option A: PayPal

Please select option below to pay via Pay Pal:

<div class="row">
	<div class="col-md-8">
		<div class="well">

		<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
		<input type="hidden" name="cmd" value="_s-xclick">
		<input type="hidden" name="hosted_button_id" value="HSAA2QNGH9BXU">
		<table>
		<tr><td><input type="hidden" name="on0" value="Buy">Buy</td></tr><tr><td><select name="os0">
			<option value="FrappeCloud Enterprise"
				data-label="Enterprise">FrappeCloud Enterprise $599.00 USD</option>
			<option value="FrappeCloud Small Business"
				data-label="SmallBusiness">FrappeCloud Small Business $299.00 USD</option>
			<option value="FrappeCloud Startup"
				data-label="Startup">FrappeCloud Startup $149.00 USD</option>
			<option value="Commercial Support"
				data-label="CommercialSupport">Commercial Support $599.00 USD</option>
			<option value="Production Support"
				data-label="ProductionSupport">Production Support $3,000.00 USD</option>
			<option value="Developer Training"
				data-label="DeveloperTraining">Developer Training $1,500.00 USD</option>
			<option value="Developer Support"
				data-label="DeveloperSupport">Developer Support $5,000.00 USD</option>
			<option value="Sponsorship"
				data-label="Sponsor">Sponsorship $5,000.00 USD</option>
		</select> </td></tr>
		</table>
		<input type="hidden" name="currency_code" value="USD">
		<input type="image" src="https://www.paypalobjects.com/en_GB/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online.">
		<img alt="" border="0" src="https://www.paypalobjects.com/en_GB/i/scr/pixel.gif" width="1" height="1">
		</form>
	</div>
	</div>
</div>
#### Option B: Wire Transfer:

You can also wire us the amount to our bank account below. Please note, Bank and transfer charges are to be borne by you.

    Name of Bank: HDFC Bank Ltd.
    Address of Bank: Rupam Center, Cine Planet, Sion (E), Mumbai 400022, India.
    Account Number: 01632320001931
    Account Name (Beneficiary Name): Web Notes Technologies Pvt. Ltd.
    IFSC Code: HDFC0000163
    SWIFT Code: HDFCINBBXXX

> Please notify us with your transaction id when you are sending a payment so that we can update your account.

---

### Indian Customers

12.36% Service Tax is applicable for Indian Customers, so our pricing (inclusive of Service Tax) is as follows:

#### Pricing per year:

- Enterprise Plan: **Rs. 33,708**
- Small Business Plan: **Rs. 16,854**
- Startup Plan: **Rs. 8,427**
- 1-Year Commercial Open Source Support: **Rs. 33,708**

#### Option A: Direct Transfer

You can directly remit the amount to our bank. All bank transfer charges, if any, are to be borne by you.

    Name of Bank: HDFC Bank Ltd.
    Account Number: 01632320001931
    Account Name: Web Notes Technologies Pvt. Ltd.
    IFSC Code: HDFC0000163
    SWIFT Code: HDFCINBBXXX

#### Option B: Deposit Cash / Check

You can also directly deposit a check to your local HDFC Bank Branch to our account:

    Payable to: Web Notes Technologies Pvt Ltd
    Account Number: 01632320001931

#### Option C: Mail / Courier Us A Check

You can send us your check by courier at:

**Web Notes Technologies Pvt Ltd.**
D - 324, Neelkanth Business Park,
Next to Vidyavihar Station,
Vidyavihar West,
Mumbai 400 086.
Notify Us

> Please notify us with your transaction id / check number when you are sending a payment so that we can update your account.

---

For any queries, please write to us, or email us at support@frappe.io


<script>
frappe.ready(function() {
	if(window.location.hash) {
		var val = decodeURIComponent(window.location.hash.substr(1));
		$('option[data-label="'+val+'"]').prop("selected", true);
	}
});
</script>
