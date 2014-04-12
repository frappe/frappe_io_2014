# Payment Options

### International (Non-India) Customers.

#### Option A: PayPal

Please select option below to pay via Pay Pal:

<div class="row">
	<div class="col-md-8">
		<div class="well">
		<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
		<input type="hidden" name="cmd" value="_s-xclick">
		<input type="hidden" name="hosted_button_id" value="CDD2ULNLG248W">
		<table>
		<tr><td><input type="hidden" name="on0" value="Buy">Buy</td></tr><tr><td><select name="os0" class="form-control">
			<option value="Lunch">Lunch $20.00 USD</option>
			<option value="Adwords">Adwords $50.00 USD</option>
			<option value="Solo Plan">Solo Plan $99.00 USD</option>
			<option value="Small Business Plan">Small Business Plan $299.00 USD</option>
			<option value="Enterprise Plan">Enterprise Plan $599.00 USD</option>
			<option value="Commerical Support">Commerical Support $599.00 USD</option>
			<option value="Sponsorship">Sponsorship $5,000.00 USD</option>
		</select> </td></tr>
		<tr><td><input type="hidden" name="on1" value="Your Company Name">Your Company Name</td></tr><tr><td><input type="text" class="form-control" name="os1" maxlength="200"></td></tr>
		<tr><td><input type="hidden" name="on2" value="Your Email Id">Your Email Id</td></tr><tr><td><input type="text" name="os2" class="form-control" maxlength="200"></td></tr>
		</table>
		<input type="hidden" name="currency_code" value="USD">
		<input type="image" src="https://www.paypalobjects.com/en_GB/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online." style="margin-top: 7px;">
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

Enterprise Plan: Rs 33,708
Small Business Plan: Rs 16,854
Solo Plan: Rs 5,618
1-Year Commercial Open Source Support: Rs 33,708

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
    Option C: Mail / Courier Us A Check

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
		$('option[value="'+val+'"]').parent().val(val);
	}
});
</script>
