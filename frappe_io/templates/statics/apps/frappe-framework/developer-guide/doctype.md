ERPNext is a based on a “metadata” (data about data) framework that helps
define all the different types of documents in the system. The basic building
block of ERPNext is a DocType.

A DocType represents both a table in the database and a form from which a user
can enter data.

Many DocTypes are single tables, but some work in groups. For example,
Quotation has a “Quotation” DocType and a “Quotation Item” doctype for the
Items table, among others. DocTypes contain a collection of fields called
DocFields that form the basis of the columns in the database and the layout of
the form.

<table class="table table-bordered">
	<thead>
		<tr>
			<th style="width:  50%">Column / Field</th>
			<th style="width:  50%">Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Name</td>
			<td>Record ID</td>
		</tr>
		<tr>
			<td>Owner</td>
			<td>Creator & Owner</td>
		</tr>
		<tr>
			<td>Created On</td>
			<td>Timestamp of creation</td>
		</tr>
		<tr>
			<td>Modified By</td>
			<td>Last user who modified</td>
		</tr>
		<tr>
			<td>Modified On</td>
			<td>Timestamp of modification</td>
		</tr>
		<tr>
			<td>Docstatus</td>
			<td>
				Status of the record:
				<br>0 = Saved/Draft  
				<br>1 = Submitted  
				<br>2 = Cancelled/Deleted
			</td>
		</tr>
		<tr>
			<td>Parent</td>
			<td>Name of parent record (if child type)</td>
		</tr>
		<tr>
			<td>Parent Type</td>
			<td>DocType of parent</td>
		</tr>
		<tr>
			<td>Parent Field</td>
			<td>Relation with parent</td>
		</tr>
		<tr>
			<td>Idx</td>
			<td>Sequence in child table</td>
		</tr>
	</tbody>
</table>

#### Single DocType

There are a certain type of DocTypes that are “Single”, i.e. they have no
table associated and have only one record of its fields. DocTypes such as
Global Defaults, Production Planning Tool are “Single” DocTypes.

