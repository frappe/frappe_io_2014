# Set-up

After setting up the customer name in the system, it is time to create an Item based on the requirement of the customer. In this example, the customer Ms. Jane Dsouza wants a baby bed with a wardrobe attached to it. Thus, based on the description create the Item, and the possible raw material that will go into its making.

### Item

An Item is your company's product or a service.The term Item is applicable to your core products as well as your raw materials. It can be a product or service that you buy/sell from your customers/ suppliers. ERPNext allows you to manage all sorts of items like raw-materials, sub-assemblies, finished goods, item variants and service items.

> Stock> Item> New Item

Go to stock and create Items. Make Items for all the raw materials that will go into the final product. Let us call the final product as Child Bed Baby. The raw materials required will be teak-wood, plywood, fevicol, hinges, nails, beadings, slotted angles, foam , teak patti, sponge, coir , teak wood panels, paint etc. The raw materials will also be created as Items in ERPNext. However, their Item Group will be raw materials. Visit Item for detail understanding.

In ETO type of manufacturing, you can store milestones as Items. For example, the baby bed cum wardrobe custom order requires one bed, one wardrobe and 5 drawers. So the 

Item-milestones can be bed , wardrobe and drawers individually. The final product will be assembling these milestone Items. 

### Item Codification

Item Codification helps in keeping a count of long and and complicated names.It is preferred if you have lots of products.

In this example, lets make Bbed-1 as one product milestone, Bwardrobe-1 as another and Bdrawer-1 as the last milestone product. Note that B stands for the Baby range, which means furniture will have no sharp edges, then comes the name of the item along with the order no in this category. The product is codified so that there is no confusion with other orders. The final completed and assembled Item will be ‘Child Bed Baby’

Note that for milestone Item like Bwardrobe1, Bbed1 and Bdrawers-1Items; 
‘Allow BOM’ as Yes  and group them as raw materials since these Items will be produced in-house and will go into the making of the final product. The item milestones will be the sub-assemblies.
‘Allow Production Order’ should be marked as  No. They will all follow the one production order raised for the main product Child Bed Baby. 


### Sub-assembly
An assembled unit forming a component to be incorporated into a larger assembly is known as a Sub-assembly.To produce an Item , you require a lot of raw-materials. These raw-materials themselves have to be manufactured in some cases. Thus, along with standard raw materials, there is a requirement of raw materials with their  own Bill of Materials. These raw materials have their own BOM’s and are called sub-assemblies. 

In this example Child Bed Baby is the final product, the Bbed1, Bwardrobe1 and Bdrawers-1 are sub-assemblies.

### Warehouse

![Warehouse](/assets/frappe_io/images/erpnext/e-t-o-warehouse.jpg)

A warehouse is a commercial building for storage of goods. Warehouses are used by manufacturers, importers, exporters, wholesalers, transport businesses, customs, etc. They are usually large plain buildings in industrial areas of cities,towns, and villages. They usually have loading docks to load and unload goods from trucks. In ERPNext this is a mandatory field. No Item form will be saved without mentioning Warehouse Details.

In E-T-O type of company, create one warehouse for Work-In-Progress and one for Finished Goods. Note that the Warehouses should be under the stock-expenses head. Here the goods will be under the __parent group__ stock-expenses.  Assign these Warehouses to Items accordingly. Select stock-expenses under parent group section in the system. You will have to create this new Warehouses in the system. The existing work-in-progress and finished goods warehouse are by default categorised under “Assets” by the system. For E-T-O transactions, the finished goods will come under the
expense category. Thus create new warehouses under stock-expenses category.

__Note :__ In reality you may not have three warehouses. You may have only one, which you use for raw material, for manufacturing/stitching/producing and also for storing finished goods. In this case, you have to only imagine separate spaces for each activity, and name them accordingly in ERPNext. For system entry purpose, having three different warehouses for stocking raw materials, manufacturing unfinished goods and storing finished goods is a necessity. 
