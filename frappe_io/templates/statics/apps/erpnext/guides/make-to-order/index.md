
![Penstand](/assets/frappe_io/images/erpnext/pen-stand.jpg)


Copyright 2013, Web Notes Technologies Pvt. Ltd, Mumbai, India

Images: This book contains images from flickr-creative commons license. We are grateful to Shades of Green for sharing their product pictures and allowing us to use their case-example.


This guide explains how a manufacturing unit would run their operations in ERPNext. It will explain a complete business cycle based on make-to-order type of manufacturing. For this study, a jute artefact company, Shades of Green, is used as a case-example. 

Shades of Green is an eco-friendly company that manufactures and trades in Jute artefacts and jute gift items. It manufactures items based on make-to-order type of manufacturing.

Make-To-Order  is a  system in which the company has basic design of the product but manufacturing begins only after a customer's order is received. When customers place orders for their products with specific quantities and delivery dates, the company begins its manufacturing process by fixing the delivery dates by policy or by agreement with the concerned party.The company has some standard items and design in place, but the product is made only when the customer places an order.

Differences between the two manufacturing methods, make-to-stock and make-to-order are given below:

<table class="table table-bordered">
	<thead>
		<tr>
		<th width=50%>Make to Stock</th>
		<th width=50%>Make to Order</th>
	</tr>
	</thead>
	<tbody>
		<tr>
			<td>Make-to-stock manufacturing is a system based on keeping stocks ready for customers in order to provide instant availability to customers.</td>
			<td>Make-To-Order  is a system in which manufacturing begins only after a customer's order is received.</td>
		</tr>
		<tr>
			<td>Production orders depend on statistical data and forecasting results.</td>
			<td>Production orders depends on number of sales orders and quantity requested by customers.</td>
		</tr>
		<tr>
			<td>Production is not linked to Sales Orders.</td>
			<td>Production is linked to Sales Orders.</td>
		</tr>
		<tr>
			<td>Cost of Inventory is high.</td>
			<td>Cost of Inventory is low.</td>
		</tr>
		<tr>
			<td>Production can be planned evenly over a given period.</td>
			<td>Production is based on customer orders and thus cannot be pre-planned.</td>
		</tr>
		<tr>
			<td>Doesn’t reduce the risk of inefficiency and wastage.</td>
			<td>Reduces risk of inefficiency and wastage.</td>
		</tr>
		</tbody>
</table>


A case Example: Shades of Green (SOG), has the design document of the pen-stand. It also has some basic raw material lying in their stocks. They will however, start manufacturing only after they receive a definite order to make pen-stands.
