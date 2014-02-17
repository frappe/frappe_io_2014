// Hi there. How are you doing?

// My sole purpose to learn d3.js was to show the relationships between the doctypes of erpnext
// and to highlight the complexity of the product
// This is not the epitome of d3.js code.
// But I do hope that I could guide you to understand the code below.

// You will need some basic understanding of d3.js - check out the first few tutorials
// at https://github.com/mbostock/d3/wiki/Tutorials

// I am using a dictionary to store all the properties and functions used to render the diagram.
// I like the clean representation it offers

// The execution starts by calling diagram.render() at the end of this file

// notes
// 1. I have used "entity" in place of the usual "group" terminology of d3.js as I find it more intuitive
// 2. d3.js understands arrays. So you need to map your data to array index values.
// In this case, we map source and target entity names to array index values in
// diagram.initialize_ids_and_matrix() and diagram.assign_relationship_values_to_matrix()

// credits
// d3.js library, its tutorials and examples - http://d3js.org
// Stack Overflow article to make d3.js responsive http://stackoverflow.com/questions/9400615/whats-the-best-way-to-make-a-d3-js-visualisation-layout-responsive
// detect-zoom - https://github.com/tombigel/detect-zoom

var diagram = {
	set_dimensions: function(width, height, scale) {
		// set the width, height, inner and outer radius of the diagram
		var width = width || 600,
			height = height || 600,
			outer_radius = Math.min(width, height) / 2 - 10.0,
			scale = scale || 1;
		
		diagram.dimensions = {
			// double of these values is used to specify the size of the svg element
			width: width,
			height: height,
			
			// radius of the arcs (circle)
			outer_radius: outer_radius,
			inner_radius: outer_radius - 24.0,
			
			// position of origin of svg
			svg_position_x: width,
			svg_position_y: height * 0.8,
			
			// scale the svg
			scale: scale,
		};
		
		// why use a function? 
		// I wanted the diagram to be responsive, just like erpnext's website
		// Hence, I needed to set the values dynamically
	},
	
	opts: {
		// class of the container in which svg element will be created
		container_class: "erpnext-chord",
		
		// height to width ratio
		hw_ratio: 1.0,
		
		// set it to a higher value if you want 
		// non-related chords to be slightly visible on mouseover
		fade_out_opacity: 0.0,

		// max no of entities to be displayed in the chord diagram
		max_no_of_entities: 75,

		ignore: {
			// ignore list to truncate some data - used in diagram.get_data()
			entities: [],
			types: ["System", "Setup", "Other"]
		},
		
		// method to determine fill color for chords and arcs
		// index values i.e. 0, 1, 2, 3,.. are passed to diagram.opts.fill() 
		// and it returns corresponding color defined by range
		fill: d3.scale.ordinal()
			// range is passed a list of colors to use. see colorbrewer.js
			.range([]
				.concat(colorbrewer.BrBG[11])
				.concat(colorbrewer.Pastel1[9])
				.concat(colorbrewer.Spectral[11])
				.concat(colorbrewer.Set3[12])
				.concat(colorbrewer.PuBuGn[9])
			),

		// returns a method for fading, based on expected opacity
		// it is used to fade the unrelated chords on mouseover of entity arc
		fade: function(opacity) {
			return function(g) {
				diagram.elements.svg.selectAll("g.svg-group path.chord")
					// apply this opacity only on unrelated chords
					.filter(function(d) {
						return d.source.index != g.index && d.target.index != g.index;
					})
					// transition to opacity
					.transition(0)
						.delay(opacity==1 ? 100 : 0)
						.style("opacity", opacity);
			};
		},
	},
	
	render: function() {
		// and here we go!
		diagram.prepare_data_and_matrix();

		diagram.elements = {};
		
		diagram.make_svg_element();
		
		diagram.make_chord_diagram();
	},
	
	prepare_data_and_matrix: function() {
		diagram.data = diagram.get_data();
		diagram.initialize_ids_and_matrix();
		diagram.assign_relationship_values_to_matrix();
	},
	
	make_svg_element: function() {
		// select the chart
		var container = d3.select("." + diagram.opts.container_class);
		
		// remove svg elements if they exist
		container.selectAll("svg").remove();
		
		// set dimensions based on the width of the container's parent
		// its responsive baby!
		var target_width = parseFloat(d3.select(container.node().parentNode).style("width")) / 2;

		// the problem with making it responsive is that when zooming, it does not scale the diagram
		// this is because zooming also calls window resize
		// however, the window size remains same, hence we need to detect zoom too
		var scale = detectZoom.zoom();
		
		diagram.set_dimensions(target_width, diagram.opts.hw_ratio * target_width, scale)
		
		// now create an svg element
		diagram.elements.svg = container.append("svg")
				.attr("width", diagram.dimensions.width * 2 * diagram.dimensions.scale)
				.attr("height", diagram.dimensions.height * 2 * diagram.dimensions.scale)
			
			.append("g") // g is like div in svg
				.attr("class", "svg-group")
				// i think this is used to shift the origin 
				// because by default origin of svg is on the top left corner, 
				// but we want it centered
				.attr("transform", "translate(" 
					+ diagram.dimensions.svg_position_x * diagram.dimensions.scale + ","
					+ diagram.dimensions.svg_position_y * diagram.dimensions.scale + ")"
					+ "scale(" + diagram.dimensions.scale + ")"
				)
				
		// hmm. we also need to render again on resize of window
		d3.select(window).on("resize", function() {
			console.log("resized");
			diagram.render();
		});
	},
	
	make_chord_diagram: function() {
		diagram.prepare_chord_layout();
		
		// arcs represent entities
		diagram.make_arcs();
		
		// chords represent relationships
		diagram.make_chords();
	},
	
	initialize_ids_and_matrix: function() {
		// consolidate all possible unique entity names
		diagram.entity_names = [];
		diagram.data.forEach(function(relationship) {
			if(diagram.entity_names.indexOf(relationship.source)===-1)
				diagram.entity_names.push(relationship.source);
			
			if(diagram.entity_names.indexOf(relationship.target)===-1)
				diagram.entity_names.push(relationship.target);
			
		});
		
		// sorted entity names can be used to get entity name from id
		// id being the index value of the entity name in the array
		diagram.entity_names = diagram.entity_names.sort();
		
		// initialize ids
		// it is a map of entity names to array index values
		// because d3.js understands arrays (matrices) and not dictionaries
		diagram.entities = {};
		
		var n = 0;
		diagram.entity_names
			.forEach(function(entity_name) {
				diagram.entities[entity_name] = { id: n, name: entity_name };
				n++;
			});
		
		// store id values in data for ease of use
		diagram.data.forEach(function(relationship) {
			relationship.source_id = diagram.entities[relationship.source].id;
			relationship.target_id = diagram.entities[relationship.target].id;
		});
		
		// initialize matrix and set its elements to 0
		diagram.matrix = [];
		for(var i = 0; i < n; i++) {
			diagram.matrix[i] = [];
			for(var j = 0; j < n; j++) {
				diagram.matrix[i][j] = 0;
			}
		}
	},
	
	assign_relationship_values_to_matrix: function() {
		// matrix is required to give numeric values to relationships
		// matrix element (i, j) should represent weightage of relationship from i to j
		// it is a square matrix
		
		diagram.data.forEach(function(relationship) {
			diagram.matrix[relationship.source_id][relationship.target_id] = 1.0;
			
			// assigning some value to reverse relationship
			// so that the chord path appears thicker at the target
			// yet not the dominant relationship
			diagram.matrix[relationship.target_id][relationship.source_id] = 0.5;
		});
	},
	
	prepare_chord_layout: function() {
		// create a new chord layout object 
		diagram.layout = d3.layout.chord()
			.padding(0.04); // padding is the space between the entity arcs on the circle
		
		// assign matrix
		// on assiging matrix, d3 computes the data to be passed for generating chords and arcs
		diagram.layout.matrix(diagram.matrix);
	},
	
	make_arcs: function() {
		// arc generator - defines dimensions for the path of type arc
		var arc = d3.svg.arc()
			.innerRadius(diagram.dimensions.inner_radius)
			.outerRadius(diagram.dimensions.outer_radius);
			
		// make entity groups
		diagram.elements.entity_groups = diagram.elements.svg.selectAll("g.entity-group")
				.data(diagram.layout.groups) // assign computed entity id data to group
			.enter().append("g") // create new entity group elements for new data
				.attr("class", "entity-group");
				
		// add path having the shape of arc to each group element
		diagram.elements.entity_groups.append("path")
				.attr("d", arc)
				
				// fill color is based on the index value of the entity
				// it is used to automate color selection
				// you can pass a string color too
				.style("fill", function(d) { return diagram.opts.fill(d.index); })
				
				// add fade transitions
				.on("mouseover", diagram.opts.fade(diagram.opts.fade_out_opacity))
				.on("mouseout", diagram.opts.fade(1.0))
			
			// show title on hover - similar to tital attribute of html
			.append("title")
				// get text value of title using the index value
				.text(function(d) { return diagram.entity_names[d.index]; });
		
		// show protruding arc labels
		diagram.elements.entity_groups.append("text")
			// calculate angle at which the label needs to be shown
			// i.e. center of the start and end angle of the arc
			.each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
			
			// i think this acts as a padding and is used for centering the text between the arc
			.attr("dy", ".35em")
			
			// text-anchor is to svg what text-align is to html
			// by default, text is anchored at the start (left align)
			// for angles > 180 degrees, it needs to be anchored at the end (right align)
			.attr("text-anchor", function(d) { return d.angle > Math.PI ? "end": null; })
			
			// rotate the damn text already
			.attr("transform", function(d) {
					// first rotate by the derived angle
				return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
					// it also needs to be moved to the outer edge of the arc
					+ "translate(" + (diagram.dimensions.outer_radius + 5) + ")"
					// also, if the angle is greater than 180, 
					// it should be rotated another 180 degrees for it to remain outside the arc
					+ (d.angle > Math.PI ? "rotate(180)" : "")
			})
			// alright.. here is the text which will be displayed
			.text(function(d) { return diagram.entity_names[d.index]; });
			
			// phew! lot of work just to display the text 
			// or maybe I overdid on the comments :(
	},
	
	make_chords: function() {
		// chord generator (quadratic bézier curve for the chords)
		// defines dimensions for the path of type chord
		var chord = d3.svg.chord()
			.radius(diagram.dimensions.inner_radius);
		
		diagram.elements.svg.selectAll("path.chord")
				// assign computed relationship weights to construct the chords
				.data(diagram.layout.chords)
			.enter().append("path")
					.attr("class", "chord")

					// add path having the shape of chord
					.attr("d", chord)
					
					// fill color is based on the index value of the SOURCE entity
					// it is used to automate color selection
					// you can pass a string color too
					.style("fill", function(d) { return diagram.opts.fill(d.source.index); })
					
				// show title on hover - similar to tital attribute of html		
				.append("title")
					// get text value of title using the index values of source and target
					.text(function(d) {
						return diagram.entity_names[d.source.index] + " is used in "
							+ diagram.entity_names[d.target.index];
					});
	},
	
	get_data: function() {
		// please ignore this function if you find it too complicated
		// i wrote it in a hurry to automate elimination of data based on two ignore lists
		
		var entity_count = {};
		
		_data.forEach(function(rel) {
			// if entity is to be igored, dont do anything
			if(diagram.opts.ignore.entities.indexOf(rel.source)!==-1 || diagram.opts.ignore.entities.indexOf(rel.target)!==-1)
				return;
			
			// if entity type is to be ignored, dont do anything
			if(diagram.opts.ignore.types.indexOf(rel.source_type)!==-1 || diagram.opts.ignore.types.indexOf(rel.target_type)!==-1)
				return;
			
			// else, increment the counter every time the entity is encountered in the data
			if(entity_count[rel.source]===undefined)
				entity_count[rel.source] = 0.0;
			entity_count[rel.source] += 1;
			
			if(entity_count[rel.target]===undefined)
				entity_count[rel.target] = 0.0;
			entity_count[rel.target] += 1;
		});
		
		// now sort in descending order based on the no. of times the entity is encountered
		// in our case, the entities with maximum number of relationships will be on top
		var valid_entities = d3.keys(entity_count).sort(function(a, b) {
			return entity_count[b] - entity_count[a];
		});
		
		// make max no of entities configurable!
		var max_no_of_entities = diagram.opts.max_no_of_entities;
		var container = d3.select("." + diagram.opts.container_class);
		if(container.attr("max_no_of_entities")) {
			max_no_of_entities = parseInt(container.attr("max_no_of_entities"));
		}
		
		// only select upto max_no_of_entities - used to show only limited no. of entities
		valid_entities.splice(max_no_of_entities+1, valid_entities.length);

		// prepare new list of relationships based on valid entities
		var new_data = [];
		_data.forEach(function(rel) {
			if(valid_entities.indexOf(rel.source)!==-1 && valid_entities.indexOf(rel.target)!==-1)
				new_data.push(rel);
		});
		
		return new_data;
	},
};

// define relationships - focus on "source" and "target"
// "source_type" and "target_type" is extra data used to selectively truncate data set
var _data = [
{"source": "Account", "target_type": "Master", "target": "Cost Center", "source_type": "Master"},
{"source": "Account", "target_type": null, "target": "GL Entry", "source_type": "Master"},
{"source": "Account", "target_type": null, "target": "Journal Voucher", "source_type": "Master"},
{"source": "Account", "target_type": "Master", "target": "Mode of Payment", "source_type": "Master"},
{"source": "Account", "target_type": null, "target": "Multi Ledger Report Detail", "source_type": "Master"},
{"source": "Account", "target_type": null, "target": "Period Closing Voucher", "source_type": "Master"},
{"source": "Account", "target_type": null, "target": "POS Setting", "source_type": "Master"},
{"source": "Account", "target_type": "Transaction", "target": "Purchase Receipt", "source_type": "Master"},
{"source": "Account", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Account", "target_type": "Master", "target": "Company", "source_type": "Master"},
{"source": "Account", "target_type": "Master", "target": "Item", "source_type": "Master"},
{"source": "Account", "target_type": null, "target": "Landed Cost Wizard", "source_type": "Master"},
{"source": "Account", "target_type": null, "target": "Purchase Invoice", "source_type": "Master"},
{"source": "Account", "target_type": null, "target": "Sales Invoice", "source_type": "Master"},
{"source": "Account", "target_type": null, "target": "Bank Reconciliation", "source_type": "Master"},
{"source": "Account", "target_type": "Other", "target": "Payment to Invoice Matching Tool", "source_type": "Master"},
{"source": "Activity Type", "target_type": null, "target": "Timesheet", "source_type": "Master"},
{"source": "Activity Type", "target_type": "Master", "target": "Time Log", "source_type": "Master"},
{"source": "Address", "target_type": null, "target": "Customer Issue", "source_type": "Master"},
{"source": "Address", "target_type": null, "target": "Contact Us Settings", "source_type": "Master"},
{"source": "Address", "target_type": null, "target": "Purchase Invoice", "source_type": "Master"},
{"source": "Address", "target_type": null, "target": "Sales Invoice", "source_type": "Master"},
{"source": "Address", "target_type": "Transaction", "target": "Purchase Order", "source_type": "Master"},
{"source": "Address", "target_type": "Transaction", "target": "Supplier Quotation", "source_type": "Master"},
{"source": "Address", "target_type": null, "target": "Installation Note", "source_type": "Master"},
{"source": "Address", "target_type": "Transaction", "target": "Opportunity", "source_type": "Master"},
{"source": "Address", "target_type": "Transaction", "target": "Quotation", "source_type": "Master"},
{"source": "Address", "target_type": "Transaction", "target": "Sales Order", "source_type": "Master"},
{"source": "Address", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Address", "target_type": "Transaction", "target": "Purchase Receipt", "source_type": "Master"},
{"source": "Address", "target_type": null, "target": "Maintenance Schedule", "source_type": "Master"},
{"source": "Address", "target_type": null, "target": "Maintenance Visit", "source_type": "Master"},
{"source": "Appraisal Template", "target_type": null, "target": "Appraisal", "source_type": "Master"},
{"source": "Batch", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Batch", "target_type": "Transaction", "target": "Purchase Receipt", "source_type": "Master"},
{"source": "Batch", "target_type": null, "target": "Stock Entry", "source_type": "Master"},
{"source": "Batch", "target_type": null, "target": "Sales Invoice", "source_type": "Master"},
{"source": "Batch", "target_type": null, "target": "Quality Inspection", "source_type": "Master"},
{"source": "Blog Category", "target_type": null, "target": "Blog", "source_type": "Master"},
{"source": "Blogger", "target_type": null, "target": "Blog", "source_type": "Master"},
{"source": "BOM", "target_type": "Other", "target": "BOM Replace Tool", "source_type": "Master"},
{"source": "BOM", "target_type": null, "target": "Production Order", "source_type": "Master"},
{"source": "BOM", "target_type": null, "target": "Production Planning Tool", "source_type": "Master"},
{"source": "BOM", "target_type": null, "target": "Stock Entry", "source_type": "Master"},
{"source": "BOM", "target_type": "Master", "target": "Item", "source_type": "Master"},
{"source": "Branch", "target_type": "Master", "target": "Employee", "source_type": "Master"},
{"source": "Branch", "target_type": null, "target": "Leave Control Panel", "source_type": "Master"},
{"source": "Branch", "target_type": "Other", "target": "Salary Manager", "source_type": "Master"},
{"source": "Branch", "target_type": null, "target": "SMS Center", "source_type": "Master"},
{"source": "Branch", "target_type": null, "target": "Salary Slip", "source_type": "Master"},
{"source": "Branch", "target_type": null, "target": "Salary Structure", "source_type": "Master"},
{"source": "Brand", "target_type": "Transaction", "target": "Purchase Order", "source_type": "Master"},
{"source": "Brand", "target_type": "Transaction", "target": "Supplier Quotation", "source_type": "Master"},
{"source": "Brand", "target_type": "Transaction", "target": "Opportunity", "source_type": "Master"},
{"source": "Brand", "target_type": "Transaction", "target": "Quotation", "source_type": "Master"},
{"source": "Brand", "target_type": "Transaction", "target": "Sales Order", "source_type": "Master"},
{"source": "Brand", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Brand", "target_type": null, "target": "Material Request", "source_type": "Master"},
{"source": "Brand", "target_type": "Transaction", "target": "Purchase Receipt", "source_type": "Master"},
{"source": "Brand", "target_type": "Master", "target": "Serial No", "source_type": "Master"},
{"source": "Brand", "target_type": "Master", "target": "Item", "source_type": "Master"},
{"source": "Budget Distribution", "target_type": "Master", "target": "Cost Center", "source_type": null},
{"source": "Budget Distribution", "target_type": "Master", "target": "Sales Partner", "source_type": null},
{"source": "Budget Distribution", "target_type": "Master", "target": "Sales Person", "source_type": null},
{"source": "Budget Distribution", "target_type": "Master", "target": "Territory", "source_type": null},
{"source": "C-Form", "target_type": null, "target": "Sales Invoice", "source_type": null},
{"source": "Campaign", "target_type": "Master", "target": "Lead", "source_type": "Master"},
{"source": "Campaign", "target_type": null, "target": "Sales Invoice", "source_type": "Master"},
{"source": "Campaign", "target_type": "Transaction", "target": "Opportunity", "source_type": "Master"},
{"source": "Campaign", "target_type": "Transaction", "target": "Quotation", "source_type": "Master"},
{"source": "Campaign", "target_type": "Transaction", "target": "Sales Order", "source_type": "Master"},
{"source": "Campaign", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Company", "target_type": "Master", "target": "Account", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "GL Entry", "source_type": "Master"},
{"source": "Company", "target_type": "Master", "target": "Mode of Payment", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "Period Closing Voucher", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "POS Setting", "source_type": "Master"},
{"source": "Company", "target_type": "Master", "target": "Supplier", "source_type": "Master"},
{"source": "Company", "target_type": "Master", "target": "Attendance", "source_type": "Master"},
{"source": "Company", "target_type": "Transaction", "target": "Leave Application", "source_type": "Master"},
{"source": "Company", "target_type": "Other", "target": "Salary Manager", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "Production Order", "source_type": "Master"},
{"source": "Company", "target_type": "Master", "target": "Task", "source_type": "Master"},
{"source": "Company", "target_type": "Master", "target": "Lead", "source_type": "Master"},
{"source": "Company", "target_type": "Master", "target": "Authorization Rule", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "Global Defaults", "source_type": "Master"},
{"source": "Company", "target_type": "Master", "target": "Serial No", "source_type": "Master"},
{"source": "Company", "target_type": "Other", "target": "Stock Ledger Entry", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "Customer Issue", "source_type": "Master"},
{"source": "Company", "target_type": "System", "target": "Email Digest", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "Bank Reconciliation", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "C-Form", "source_type": "Master"},
{"source": "Company", "target_type": "Master", "target": "Cost Center", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "Journal Voucher", "source_type": "Master"},
{"source": "Company", "target_type": "Other", "target": "Payment to Invoice Matching Tool", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "Purchase Invoice", "source_type": "Master"},
{"source": "Company", "target_type": "Master", "target": "Purchase Taxes and Charges Master", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "Sales Invoice", "source_type": "Master"},
{"source": "Company", "target_type": "Master", "target": "Sales Taxes and Charges Master", "source_type": "Master"},
{"source": "Company", "target_type": "Transaction", "target": "Purchase Order", "source_type": "Master"},
{"source": "Company", "target_type": "Transaction", "target": "Supplier Quotation", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "Appraisal", "source_type": "Master"},
{"source": "Company", "target_type": "Master", "target": "Employee", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "Expense Claim", "source_type": "Master"},
{"source": "Company", "target_type": "Master", "target": "Leave Block List", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "Salary Slip", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "Salary Structure", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "Production Planning Tool", "source_type": "Master"},
{"source": "Company", "target_type": "Master", "target": "Project", "source_type": "Master"},
{"source": "Company", "target_type": "Master", "target": "Customer", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "Installation Note", "source_type": "Master"},
{"source": "Company", "target_type": "Transaction", "target": "Opportunity", "source_type": "Master"},
{"source": "Company", "target_type": "Transaction", "target": "Quotation", "source_type": "Master"},
{"source": "Company", "target_type": "Transaction", "target": "Sales Order", "source_type": "Master"},
{"source": "Company", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "Material Request", "source_type": "Master"},
{"source": "Company", "target_type": "Transaction", "target": "Purchase Receipt", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "Sales and Purchase Return Tool", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "Stock Entry", "source_type": "Master"},
{"source": "Company", "target_type": "Master", "target": "Warehouse", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "Maintenance Schedule", "source_type": "Master"},
{"source": "Company", "target_type": null, "target": "Maintenance Visit", "source_type": "Master"},
{"source": "Contact", "target_type": null, "target": "Customer Issue", "source_type": "Master"},
{"source": "Contact", "target_type": null, "target": "Support Ticket", "source_type": "Master"},
{"source": "Contact", "target_type": null, "target": "Purchase Invoice", "source_type": "Master"},
{"source": "Contact", "target_type": null, "target": "Sales Invoice", "source_type": "Master"},
{"source": "Contact", "target_type": "Transaction", "target": "Purchase Order", "source_type": "Master"},
{"source": "Contact", "target_type": "Transaction", "target": "Supplier Quotation", "source_type": "Master"},
{"source": "Contact", "target_type": null, "target": "Installation Note", "source_type": "Master"},
{"source": "Contact", "target_type": "Transaction", "target": "Opportunity", "source_type": "Master"},
{"source": "Contact", "target_type": "Transaction", "target": "Quotation", "source_type": "Master"},
{"source": "Contact", "target_type": "Transaction", "target": "Sales Order", "source_type": "Master"},
{"source": "Contact", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Contact", "target_type": "Transaction", "target": "Purchase Receipt", "source_type": "Master"},
{"source": "Contact", "target_type": null, "target": "Maintenance Schedule", "source_type": "Master"},
{"source": "Contact", "target_type": null, "target": "Maintenance Visit", "source_type": "Master"},
{"source": "Cost Center", "target_type": null, "target": "GL Entry", "source_type": "Master"},
{"source": "Cost Center", "target_type": null, "target": "Journal Voucher", "source_type": "Master"},
{"source": "Cost Center", "target_type": null, "target": "POS Setting", "source_type": "Master"},
{"source": "Cost Center", "target_type": "Transaction", "target": "Purchase Receipt", "source_type": "Master"},
{"source": "Cost Center", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Cost Center", "target_type": null, "target": "Purchase Invoice", "source_type": "Master"},
{"source": "Cost Center", "target_type": null, "target": "Sales Invoice", "source_type": "Master"},
{"source": "Cost Center", "target_type": "Master", "target": "Item", "source_type": "Master"},
{"source": "Country", "target_type": "Master", "target": "Lead", "source_type": "Master"},
{"source": "Country", "target_type": "Master", "target": "State", "source_type": "Master"},
{"source": "Country", "target_type": "Master", "target": "Address", "source_type": "Master"},
{"source": "Currency", "target_type": null, "target": "POS Setting", "source_type": null},
{"source": "Currency", "target_type": "Master", "target": "Supplier", "source_type": null},
{"source": "Currency", "target_type": "Master", "target": "Company", "source_type": null},
{"source": "Currency", "target_type": null, "target": "Global Defaults", "source_type": null},
{"source": "Currency", "target_type": "Master", "target": "Item", "source_type": null},
{"source": "Currency", "target_type": null, "target": "Purchase Invoice", "source_type": null},
{"source": "Currency", "target_type": null, "target": "Sales Invoice", "source_type": null},
{"source": "Currency", "target_type": "Transaction", "target": "Purchase Order", "source_type": null},
{"source": "Currency", "target_type": "Transaction", "target": "Supplier Quotation", "source_type": null},
{"source": "Currency", "target_type": "Master", "target": "Customer", "source_type": null},
{"source": "Currency", "target_type": "Transaction", "target": "Quotation", "source_type": null},
{"source": "Currency", "target_type": "Transaction", "target": "Sales Order", "source_type": null},
{"source": "Currency", "target_type": "Transaction", "target": "Delivery Note", "source_type": null},
{"source": "Currency", "target_type": null, "target": "Landed Cost Wizard", "source_type": null},
{"source": "Currency", "target_type": "Transaction", "target": "Purchase Receipt", "source_type": null},
{"source": "Customer", "target_type": null, "target": "Production Planning Tool", "source_type": "Master"},
{"source": "Customer", "target_type": null, "target": "Timesheet", "source_type": "Master"},
{"source": "Customer", "target_type": "Master", "target": "Lead", "source_type": "Master"},
{"source": "Customer", "target_type": "Master", "target": "Shipping Address", "source_type": "Master"},
{"source": "Customer", "target_type": null, "target": "SMS Center", "source_type": "Master"},
{"source": "Customer", "target_type": "Master", "target": "Item", "source_type": "Master"},
{"source": "Customer", "target_type": "Master", "target": "Serial No", "source_type": "Master"},
{"source": "Customer", "target_type": null, "target": "Customer Issue", "source_type": "Master"},
{"source": "Customer", "target_type": null, "target": "Support Ticket", "source_type": "Master"},
{"source": "Customer", "target_type": "Master", "target": "Address", "source_type": "Master"},
{"source": "Customer", "target_type": "Master", "target": "Contact", "source_type": "Master"},
{"source": "Customer", "target_type": null, "target": "C-Form", "source_type": "Master"},
{"source": "Customer", "target_type": null, "target": "Sales Invoice", "source_type": "Master"},
{"source": "Customer", "target_type": "Master", "target": "Project", "source_type": "Master"},
{"source": "Customer", "target_type": null, "target": "Installation Note", "source_type": "Master"},
{"source": "Customer", "target_type": "Transaction", "target": "Opportunity", "source_type": "Master"},
{"source": "Customer", "target_type": "Transaction", "target": "Quotation", "source_type": "Master"},
{"source": "Customer", "target_type": "Transaction", "target": "Sales Order", "source_type": "Master"},
{"source": "Customer", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Customer", "target_type": null, "target": "Stock Entry", "source_type": "Master"},
{"source": "Customer", "target_type": null, "target": "Maintenance Schedule", "source_type": "Master"},
{"source": "Customer", "target_type": null, "target": "Maintenance Visit", "source_type": "Master"},
{"source": "Customer Group", "target_type": null, "target": "Global Defaults", "source_type": "Master"},
{"source": "Customer Group", "target_type": null, "target": "Customer Issue", "source_type": "Master"},
{"source": "Customer Group", "target_type": null, "target": "Sales Invoice", "source_type": "Master"},
{"source": "Customer Group", "target_type": "Master", "target": "Customer", "source_type": "Master"},
{"source": "Customer Group", "target_type": null, "target": "Installation Note", "source_type": "Master"},
{"source": "Customer Group", "target_type": "Transaction", "target": "Opportunity", "source_type": "Master"},
{"source": "Customer Group", "target_type": "Transaction", "target": "Quotation", "source_type": "Master"},
{"source": "Customer Group", "target_type": "Transaction", "target": "Sales Order", "source_type": "Master"},
{"source": "Customer Group", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Customer Group", "target_type": null, "target": "Maintenance Schedule", "source_type": "Master"},
{"source": "Customer Group", "target_type": null, "target": "Maintenance Visit", "source_type": "Master"},
{"source": "Customer Issue", "target_type": null, "target": "Maintenance Visit", "source_type": null},
{"source": "Deduction Type", "target_type": null, "target": "Salary Slip", "source_type": "Master"},
{"source": "Deduction Type", "target_type": null, "target": "Salary Structure", "source_type": "Master"},
{"source": "Delivery Note", "target_type": null, "target": "Sales Invoice", "source_type": "Transaction"},
{"source": "Delivery Note", "target_type": null, "target": "Quality Inspection", "source_type": "Transaction"},
{"source": "Delivery Note", "target_type": null, "target": "Installation Note", "source_type": "Transaction"},
{"source": "Delivery Note", "target_type": "Transaction", "target": "Packing Slip", "source_type": "Transaction"},
{"source": "Delivery Note", "target_type": null, "target": "Sales and Purchase Return Tool", "source_type": "Transaction"},
{"source": "Delivery Note", "target_type": null, "target": "Stock Entry", "source_type": "Transaction"},
{"source": "Department", "target_type": "Master", "target": "Employee", "source_type": "Master"},
{"source": "Department", "target_type": null, "target": "Leave Control Panel", "source_type": "Master"},
{"source": "Department", "target_type": "Other", "target": "Salary Manager", "source_type": "Master"},
{"source": "Department", "target_type": null, "target": "SMS Center", "source_type": "Master"},
{"source": "Department", "target_type": null, "target": "Salary Slip", "source_type": "Master"},
{"source": "Department", "target_type": null, "target": "Salary Structure", "source_type": "Master"},
{"source": "Designation", "target_type": "Master", "target": "Employee", "source_type": "Master"},
{"source": "Designation", "target_type": null, "target": "Leave Control Panel", "source_type": "Master"},
{"source": "Designation", "target_type": "Other", "target": "Salary Manager", "source_type": "Master"},
{"source": "Designation", "target_type": "Master", "target": "Authorization Rule", "source_type": "Master"},
{"source": "Designation", "target_type": null, "target": "Salary Slip", "source_type": "Master"},
{"source": "Designation", "target_type": null, "target": "Salary Structure", "source_type": "Master"},
{"source": "Earning Type", "target_type": null, "target": "Salary Slip", "source_type": "Master"},
{"source": "Earning Type", "target_type": null, "target": "Salary Structure", "source_type": "Master"},
{"source": "Employee", "target_type": "Master", "target": "Attendance", "source_type": "Master"},
{"source": "Employee", "target_type": null, "target": "Leave Allocation", "source_type": "Master"},
{"source": "Employee", "target_type": "Transaction", "target": "Leave Application", "source_type": "Master"},
{"source": "Employee", "target_type": "Master", "target": "Authorization Rule", "source_type": "Master"},
{"source": "Employee", "target_type": "Master", "target": "About Us Settings", "source_type": "Master"},
{"source": "Employee", "target_type": null, "target": "Appraisal", "source_type": "Master"},
{"source": "Employee", "target_type": null, "target": "Expense Claim", "source_type": "Master"},
{"source": "Employee", "target_type": null, "target": "Salary Slip", "source_type": "Master"},
{"source": "Employee", "target_type": null, "target": "Salary Structure", "source_type": "Master"},
{"source": "Employee", "target_type": "Master", "target": "Sales Person", "source_type": "Master"},
{"source": "Employment Type", "target_type": null, "target": "Leave Control Panel", "source_type": "Master"},
{"source": "Employment Type", "target_type": "Master", "target": "Employee", "source_type": "Master"},
{"source": "Expense Claim Type", "target_type": null, "target": "Expense Claim", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": "Master", "target": "Cost Center", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": null, "target": "GL Entry", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": null, "target": "Period Closing Voucher", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": "Master", "target": "Attendance", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": null, "target": "Leave Allocation", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": "Transaction", "target": "Leave Application", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": null, "target": "Leave Control Panel", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": "Other", "target": "Salary Manager", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": "Master", "target": "Lead", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": null, "target": "Global Defaults", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": "Master", "target": "Territory", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": "Master", "target": "Serial No", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": null, "target": "Customer Issue", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": null, "target": "Budget Distribution", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": null, "target": "C-Form", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": null, "target": "Journal Voucher", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": null, "target": "Purchase Invoice", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": null, "target": "Sales Invoice", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": "Transaction", "target": "Purchase Order", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": "Transaction", "target": "Supplier Quotation", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": null, "target": "Appraisal", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": null, "target": "Expense Claim", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": "Master", "target": "Holiday List", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": "Master", "target": "Leave Block List", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": null, "target": "Salary Slip", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": null, "target": "Installation Note", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": "Transaction", "target": "Opportunity", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": "Transaction", "target": "Quotation", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": "Transaction", "target": "Sales Order", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": null, "target": "Material Request", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": "Transaction", "target": "Purchase Receipt", "source_type": "Master"},
{"source": "Fiscal Year", "target_type": null, "target": "Maintenance Visit", "source_type": "Master"},
{"source": "Grade", "target_type": "Master", "target": "Employee", "source_type": "Master"},
{"source": "Grade", "target_type": null, "target": "Leave Control Panel", "source_type": "Master"},
{"source": "Grade", "target_type": "Other", "target": "Salary Manager", "source_type": "Master"},
{"source": "Grade", "target_type": null, "target": "Salary Slip", "source_type": "Master"},
{"source": "Grade", "target_type": null, "target": "Salary Structure", "source_type": "Master"},
{"source": "Holiday List", "target_type": "Master", "target": "Employee", "source_type": "Master"},
{"source": "Industry Type", "target_type": "Master", "target": "Lead", "source_type": "Master"},
{"source": "Item", "target_type": "Transaction", "target": "Purchase Order", "source_type": "Master"},
{"source": "Item", "target_type": "Transaction", "target": "Supplier Quotation", "source_type": "Master"},
{"source": "Item", "target_type": "Master", "target": "BOM", "source_type": "Master"},
{"source": "Item", "target_type": null, "target": "Production Order", "source_type": "Master"},
{"source": "Item", "target_type": null, "target": "Production Planning Tool", "source_type": "Master"},
{"source": "Item", "target_type": null, "target": "Installation Note", "source_type": "Master"},
{"source": "Item", "target_type": "Transaction", "target": "Opportunity", "source_type": "Master"},
{"source": "Item", "target_type": "Transaction", "target": "Quotation", "source_type": "Master"},
{"source": "Item", "target_type": null, "target": "Sales and Purchase Return Tool", "source_type": "Master"},
{"source": "Item", "target_type": "Transaction", "target": "Sales Order", "source_type": "Master"},
{"source": "Item", "target_type": null, "target": "Bin", "source_type": "Master"},
{"source": "Item", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Item", "target_type": null, "target": "Featured Item", "source_type": "Master"},
{"source": "Item", "target_type": null, "target": "Material Request", "source_type": "Master"},
{"source": "Item", "target_type": "Transaction", "target": "Packing Slip", "source_type": "Master"},
{"source": "Item", "target_type": "Transaction", "target": "Purchase Receipt", "source_type": "Master"},
{"source": "Item", "target_type": "Master", "target": "Sales BOM", "source_type": "Master"},
{"source": "Item", "target_type": "Master", "target": "Serial No", "source_type": "Master"},
{"source": "Item", "target_type": null, "target": "Stock Entry", "source_type": "Master"},
{"source": "Item", "target_type": "Other", "target": "Stock Ledger Entry", "source_type": "Master"},
{"source": "Item", "target_type": null, "target": "Stock UOM Replace Utility", "source_type": "Master"},
{"source": "Item", "target_type": null, "target": "Customer Issue", "source_type": "Master"},
{"source": "Item", "target_type": null, "target": "Maintenance Schedule", "source_type": "Master"},
{"source": "Item", "target_type": null, "target": "Maintenance Visit", "source_type": "Master"},
{"source": "Item", "target_type": null, "target": "Purchase Invoice", "source_type": "Master"},
{"source": "Item", "target_type": "Master", "target": "Batch", "source_type": "Master"},
{"source": "Item", "target_type": null, "target": "Sales Invoice", "source_type": "Master"},
{"source": "Item", "target_type": null, "target": "Quality Inspection", "source_type": "Master"},
{"source": "Item Group", "target_type": "Transaction", "target": "Purchase Order", "source_type": "Master"},
{"source": "Item Group", "target_type": "Transaction", "target": "Supplier Quotation", "source_type": "Master"},
{"source": "Item Group", "target_type": "Transaction", "target": "Opportunity", "source_type": "Master"},
{"source": "Item Group", "target_type": "Transaction", "target": "Quotation", "source_type": "Master"},
{"source": "Item Group", "target_type": "Transaction", "target": "Sales Order", "source_type": "Master"},
{"source": "Item Group", "target_type": null, "target": "Global Defaults", "source_type": "Master"},
{"source": "Item Group", "target_type": "Master", "target": "Territory", "source_type": "Master"},
{"source": "Item Group", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Item Group", "target_type": null, "target": "Material Request", "source_type": "Master"},
{"source": "Item Group", "target_type": "Transaction", "target": "Purchase Receipt", "source_type": "Master"},
{"source": "Item Group", "target_type": "Master", "target": "Serial No", "source_type": "Master"},
{"source": "Item Group", "target_type": "Master", "target": "Item", "source_type": "Master"},
{"source": "Item Group", "target_type": "Other", "target": "Product Settings", "source_type": "Master"},
{"source": "Item Group", "target_type": null, "target": "Purchase Invoice", "source_type": "Master"},
{"source": "Item Group", "target_type": null, "target": "Sales Invoice", "source_type": "Master"},
{"source": "Job Opening", "target_type": "Transaction", "target": "Job Applicant", "source_type": "Transaction"},
{"source": "Journal Voucher", "target_type": null, "target": "Bank Reconciliation", "source_type": null},
{"source": "Journal Voucher", "target_type": "Other", "target": "Payment to Invoice Matching Tool", "source_type": null},
{"source": "Journal Voucher", "target_type": null, "target": "Purchase Invoice", "source_type": null},
{"source": "Journal Voucher", "target_type": null, "target": "Sales Invoice", "source_type": null},
{"source": "Lead", "target_type": null, "target": "Support Ticket", "source_type": "Master"},
{"source": "Lead", "target_type": "Master", "target": "Customer", "source_type": "Master"},
{"source": "Lead", "target_type": "Transaction", "target": "Opportunity", "source_type": "Master"},
{"source": "Lead", "target_type": "Transaction", "target": "Quotation", "source_type": "Master"},
{"source": "Leave Block List", "target_type": "Master", "target": "Department", "source_type": "Master"},
{"source": "Leave Type", "target_type": "Master", "target": "Attendance", "source_type": "Master"},
{"source": "Leave Type", "target_type": null, "target": "Leave Allocation", "source_type": "Master"},
{"source": "Leave Type", "target_type": "Transaction", "target": "Leave Application", "source_type": "Master"},
{"source": "Leave Type", "target_type": null, "target": "Leave Control Panel", "source_type": "Master"},
{"source": "Maintenance Schedule", "target_type": null, "target": "Maintenance Visit", "source_type": null},
{"source": "Material Request", "target_type": "Transaction", "target": "Purchase Order", "source_type": null},
{"source": "Material Request", "target_type": "Transaction", "target": "Supplier Quotation", "source_type": null},
{"source": "Material Request", "target_type": null, "target": "Stock Entry", "source_type": null},
{"source": "Mode of Payment", "target_type": null, "target": "Purchase Invoice", "source_type": "Master"},
{"source": "Mode of Payment", "target_type": null, "target": "Sales Invoice", "source_type": "Master"},
{"source": "Opportunity", "target_type": "Transaction", "target": "Quotation", "source_type": "Transaction"},
{"source": "Price List", "target_type": null, "target": "POS Setting", "source_type": "Master"},
{"source": "Price List", "target_type": "Master", "target": "Customer Group", "source_type": "Master"},
{"source": "Price List", "target_type": null, "target": "Global Defaults", "source_type": "Master"},
{"source": "Price List", "target_type": "Master", "target": "Item", "source_type": "Master"},
{"source": "Price List", "target_type": null, "target": "Purchase Invoice", "source_type": "Master"},
{"source": "Price List", "target_type": null, "target": "Sales Invoice", "source_type": "Master"},
{"source": "Price List", "target_type": "Transaction", "target": "Purchase Order", "source_type": "Master"},
{"source": "Price List", "target_type": "Transaction", "target": "Supplier Quotation", "source_type": "Master"},
{"source": "Price List", "target_type": "Master", "target": "Customer", "source_type": "Master"},
{"source": "Price List", "target_type": "Transaction", "target": "Quotation", "source_type": "Master"},
{"source": "Price List", "target_type": "Transaction", "target": "Sales Order", "source_type": "Master"},
{"source": "Price List", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Price List", "target_type": "Transaction", "target": "Purchase Receipt", "source_type": "Master"},
{"source": "Print Heading", "target_type": null, "target": "POS Setting", "source_type": "Master"},
{"source": "Print Heading", "target_type": null, "target": "Journal Voucher", "source_type": "Master"},
{"source": "Print Heading", "target_type": null, "target": "Purchase Invoice", "source_type": "Master"},
{"source": "Print Heading", "target_type": null, "target": "Sales Invoice", "source_type": "Master"},
{"source": "Print Heading", "target_type": "Transaction", "target": "Purchase Order", "source_type": "Master"},
{"source": "Print Heading", "target_type": "Transaction", "target": "Supplier Quotation", "source_type": "Master"},
{"source": "Print Heading", "target_type": "Transaction", "target": "Quotation", "source_type": "Master"},
{"source": "Print Heading", "target_type": "Transaction", "target": "Sales Order", "source_type": "Master"},
{"source": "Print Heading", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Print Heading", "target_type": null, "target": "Material Request", "source_type": "Master"},
{"source": "Print Heading", "target_type": "Transaction", "target": "Purchase Receipt", "source_type": "Master"},
{"source": "Print Heading", "target_type": null, "target": "Stock Entry", "source_type": "Master"},
{"source": "Production Order", "target_type": null, "target": "Stock Entry", "source_type": null},
{"source": "Project", "target_type": "Transaction", "target": "Purchase Order", "source_type": "Master"},
{"source": "Project", "target_type": "Transaction", "target": "Supplier Quotation", "source_type": "Master"},
{"source": "Project", "target_type": null, "target": "Production Order", "source_type": "Master"},
{"source": "Project", "target_type": "Master", "target": "Task", "source_type": "Master"},
{"source": "Project", "target_type": null, "target": "Timesheet", "source_type": "Master"},
{"source": "Project", "target_type": "Transaction", "target": "Purchase Receipt", "source_type": "Master"},
{"source": "Project", "target_type": null, "target": "Purchase Invoice", "source_type": "Master"},
{"source": "Project", "target_type": "Master", "target": "Time Log", "source_type": "Master"},
{"source": "Project", "target_type": null, "target": "Sales Invoice", "source_type": "Master"},
{"source": "Project", "target_type": "Master", "target": "BOM", "source_type": "Master"},
{"source": "Project", "target_type": "Transaction", "target": "Sales Order", "source_type": "Master"},
{"source": "Project", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Project", "target_type": null, "target": "Stock Entry", "source_type": "Master"},
{"source": "Purchase Invoice", "target_type": null, "target": "Journal Voucher", "source_type": null},
{"source": "Purchase Order", "target_type": "Transaction", "target": "Purchase Receipt", "source_type": "Transaction"},
{"source": "Purchase Order", "target_type": null, "target": "Purchase Invoice", "source_type": "Transaction"},
{"source": "Purchase Receipt", "target_type": null, "target": "Landed Cost Wizard", "source_type": "Transaction"},
{"source": "Purchase Receipt", "target_type": null, "target": "Purchase Invoice", "source_type": "Transaction"},
{"source": "Purchase Receipt", "target_type": null, "target": "Quality Inspection", "source_type": "Transaction"},
{"source": "Purchase Receipt", "target_type": null, "target": "Sales and Purchase Return Tool", "source_type": "Transaction"},
{"source": "Purchase Receipt", "target_type": null, "target": "Stock Entry", "source_type": "Transaction"},
{"source": "Purchase Taxes and Charges Master", "target_type": null, "target": "Purchase Invoice", "source_type": "Master"},
{"source": "Purchase Taxes and Charges Master", "target_type": "Transaction", "target": "Purchase Order", "source_type": "Master"},
{"source": "Purchase Taxes and Charges Master", "target_type": "Transaction", "target": "Supplier Quotation", "source_type": "Master"},
{"source": "Purchase Taxes and Charges Master", "target_type": "Transaction", "target": "Purchase Receipt", "source_type": "Master"},
{"source": "Quality Inspection", "target_type": "Transaction", "target": "Purchase Receipt", "source_type": null},
{"source": "Question", "target_type": null, "target": "Answer", "source_type": null},
{"source": "Quotation", "target_type": "Transaction", "target": "Sales Order", "source_type": "Transaction"},
{"source": "Quotation Lost Reason", "target_type": "Master", "target": "Lead", "source_type": "Master"},
{"source": "Sales Invoice", "target_type": null, "target": "C-Form", "source_type": null},
{"source": "Sales Invoice", "target_type": null, "target": "Journal Voucher", "source_type": null},
{"source": "Sales Invoice", "target_type": "Master", "target": "Time Log", "source_type": null},
{"source": "Sales Invoice", "target_type": "Transaction", "target": "Time Log Batch", "source_type": null},
{"source": "Sales Invoice", "target_type": null, "target": "Sales and Purchase Return Tool", "source_type": null},
{"source": "Sales Invoice", "target_type": null, "target": "Stock Entry", "source_type": null},
{"source": "Sales Order", "target_type": null, "target": "Production Order", "source_type": "Transaction"},
{"source": "Sales Order", "target_type": null, "target": "Production Planning Tool", "source_type": "Transaction"},
{"source": "Sales Order", "target_type": null, "target": "Material Request", "source_type": "Transaction"},
{"source": "Sales Order", "target_type": null, "target": "Sales Invoice", "source_type": "Transaction"},
{"source": "Sales Order", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Transaction"},
{"source": "Sales Order", "target_type": null, "target": "Maintenance Schedule", "source_type": "Transaction"},
{"source": "Sales Order", "target_type": null, "target": "Maintenance Visit", "source_type": "Transaction"},
{"source": "Sales Partner", "target_type": "Master", "target": "Address", "source_type": "Master"},
{"source": "Sales Partner", "target_type": "Master", "target": "Contact", "source_type": "Master"},
{"source": "Sales Partner", "target_type": null, "target": "Sales Invoice", "source_type": "Master"},
{"source": "Sales Partner", "target_type": "Master", "target": "Customer", "source_type": "Master"},
{"source": "Sales Partner", "target_type": "Transaction", "target": "Sales Order", "source_type": "Master"},
{"source": "Sales Partner", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Sales Person", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Sales Person", "target_type": null, "target": "Maintenance Schedule", "source_type": "Master"},
{"source": "Sales Person", "target_type": null, "target": "Maintenance Visit", "source_type": "Master"},
{"source": "Sales Person", "target_type": "Master", "target": "Territory", "source_type": "Master"},
{"source": "Sales Taxes and Charges Master", "target_type": null, "target": "POS Setting", "source_type": "Master"},
{"source": "Sales Taxes and Charges Master", "target_type": null, "target": "Sales Invoice", "source_type": "Master"},
{"source": "Sales Taxes and Charges Master", "target_type": "Transaction", "target": "Quotation", "source_type": "Master"},
{"source": "Sales Taxes and Charges Master", "target_type": "Transaction", "target": "Sales Order", "source_type": "Master"},
{"source": "Sales Taxes and Charges Master", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Serial No", "target_type": null, "target": "Customer Issue", "source_type": "Master"},
{"source": "Serial No", "target_type": null, "target": "Quality Inspection", "source_type": "Master"},
{"source": "State", "target_type": null, "target": "C-Form", "source_type": "Master"},
{"source": "Supplier", "target_type": null, "target": "SMS Center", "source_type": "Master"},
{"source": "Supplier", "target_type": "Master", "target": "Item", "source_type": "Master"},
{"source": "Supplier", "target_type": "Master", "target": "Serial No", "source_type": "Master"},
{"source": "Supplier", "target_type": "Master", "target": "Address", "source_type": "Master"},
{"source": "Supplier", "target_type": "Master", "target": "Contact", "source_type": "Master"},
{"source": "Supplier", "target_type": null, "target": "Purchase Invoice", "source_type": "Master"},
{"source": "Supplier", "target_type": "Transaction", "target": "Purchase Order", "source_type": "Master"},
{"source": "Supplier", "target_type": "Transaction", "target": "Supplier Quotation", "source_type": "Master"},
{"source": "Supplier", "target_type": "Transaction", "target": "Purchase Receipt", "source_type": "Master"},
{"source": "Supplier", "target_type": null, "target": "Stock Entry", "source_type": "Master"},
{"source": "Supplier Quotation", "target_type": "Transaction", "target": "Purchase Order", "source_type": "Transaction"},
{"source": "Supplier Type", "target_type": "Master", "target": "Supplier", "source_type": "Master"},
{"source": "Supplier Type", "target_type": null, "target": "Global Defaults", "source_type": "Master"},
{"source": "Task", "target_type": null, "target": "Timesheet", "source_type": "Master"},
{"source": "Task", "target_type": "Master", "target": "Time Log", "source_type": "Master"},
{"source": "Terms and Conditions", "target_type": null, "target": "POS Setting", "source_type": "Master"},
{"source": "Terms and Conditions", "target_type": null, "target": "Sales Invoice", "source_type": "Master"},
{"source": "Terms and Conditions", "target_type": "Transaction", "target": "Purchase Order", "source_type": "Master"},
{"source": "Terms and Conditions", "target_type": "Transaction", "target": "Supplier Quotation", "source_type": "Master"},
{"source": "Terms and Conditions", "target_type": "Transaction", "target": "Quotation", "source_type": "Master"},
{"source": "Terms and Conditions", "target_type": "Transaction", "target": "Sales Order", "source_type": "Master"},
{"source": "Terms and Conditions", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Terms and Conditions", "target_type": null, "target": "Material Request", "source_type": "Master"},
{"source": "Terms and Conditions", "target_type": "Transaction", "target": "Purchase Receipt", "source_type": "Master"},
{"source": "Territory", "target_type": null, "target": "C-Form", "source_type": "Master"},
{"source": "Territory", "target_type": null, "target": "POS Setting", "source_type": "Master"},
{"source": "Territory", "target_type": "Master", "target": "Lead", "source_type": "Master"},
{"source": "Territory", "target_type": null, "target": "Global Defaults", "source_type": "Master"},
{"source": "Territory", "target_type": "Master", "target": "Serial No", "source_type": "Master"},
{"source": "Territory", "target_type": null, "target": "Customer Issue", "source_type": "Master"},
{"source": "Territory", "target_type": null, "target": "Sales Invoice", "source_type": "Master"},
{"source": "Territory", "target_type": "Master", "target": "Customer", "source_type": "Master"},
{"source": "Territory", "target_type": null, "target": "Installation Note", "source_type": "Master"},
{"source": "Territory", "target_type": "Transaction", "target": "Opportunity", "source_type": "Master"},
{"source": "Territory", "target_type": "Transaction", "target": "Quotation", "source_type": "Master"},
{"source": "Territory", "target_type": "Transaction", "target": "Sales Order", "source_type": "Master"},
{"source": "Territory", "target_type": "Master", "target": "Sales Partner", "source_type": "Master"},
{"source": "Territory", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Territory", "target_type": null, "target": "Maintenance Schedule", "source_type": "Master"},
{"source": "Territory", "target_type": null, "target": "Maintenance Visit", "source_type": "Master"},
{"source": "Time Log", "target_type": "Transaction", "target": "Time Log Batch", "source_type": "Master"},
{"source": "Time Log Batch", "target_type": null, "target": "Sales Invoice", "source_type": "Transaction"},
{"source": "Time Log Batch", "target_type": "Master", "target": "Time Log", "source_type": "Transaction"},
{"source": "UOM", "target_type": "Transaction", "target": "Purchase Order", "source_type": "Master"},
{"source": "UOM", "target_type": "Transaction", "target": "Supplier Quotation", "source_type": "Master"},
{"source": "UOM", "target_type": "Master", "target": "BOM", "source_type": "Master"},
{"source": "UOM", "target_type": "Transaction", "target": "Opportunity", "source_type": "Master"},
{"source": "UOM", "target_type": null, "target": "Sales and Purchase Return Tool", "source_type": "Master"},
{"source": "UOM", "target_type": null, "target": "Global Defaults", "source_type": "Master"},
{"source": "UOM", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "UOM", "target_type": null, "target": "Material Request", "source_type": "Master"},
{"source": "UOM", "target_type": "Transaction", "target": "Packing Slip", "source_type": "Master"},
{"source": "UOM", "target_type": "Transaction", "target": "Purchase Receipt", "source_type": "Master"},
{"source": "UOM", "target_type": "Master", "target": "Sales BOM", "source_type": "Master"},
{"source": "UOM", "target_type": null, "target": "Stock Entry", "source_type": "Master"},
{"source": "UOM", "target_type": null, "target": "Stock UOM Replace Utility", "source_type": "Master"},
{"source": "UOM", "target_type": "Master", "target": "Item", "source_type": "Master"},
{"source": "UOM", "target_type": null, "target": "Purchase Invoice", "source_type": "Master"},
{"source": "Warehouse", "target_type": null, "target": "POS Setting", "source_type": "Master"},
{"source": "Warehouse", "target_type": "Transaction", "target": "Purchase Order", "source_type": "Master"},
{"source": "Warehouse", "target_type": "Transaction", "target": "Supplier Quotation", "source_type": "Master"},
{"source": "Warehouse", "target_type": null, "target": "Production Order", "source_type": "Master"},
{"source": "Warehouse", "target_type": "Master", "target": "Workstation", "source_type": "Master"},
{"source": "Warehouse", "target_type": "Transaction", "target": "Sales Order", "source_type": "Master"},
{"source": "Warehouse", "target_type": null, "target": "Bin", "source_type": "Master"},
{"source": "Warehouse", "target_type": "Transaction", "target": "Delivery Note", "source_type": "Master"},
{"source": "Warehouse", "target_type": "Master", "target": "Item", "source_type": "Master"},
{"source": "Warehouse", "target_type": null, "target": "Material Request", "source_type": "Master"},
{"source": "Warehouse", "target_type": "Transaction", "target": "Purchase Receipt", "source_type": "Master"},
{"source": "Warehouse", "target_type": "Master", "target": "Serial No", "source_type": "Master"},
{"source": "Warehouse", "target_type": null, "target": "Stock Entry", "source_type": "Master"},
{"source": "Warehouse", "target_type": "Other", "target": "Stock Ledger Entry", "source_type": "Master"},
{"source": "Warehouse", "target_type": null, "target": "Sales Invoice", "source_type": "Master"},
{"source": "Warehouse", "target_type": null, "target": "Production Planning Tool", "source_type": "Master"},
{"source": "Warehouse Type", "target_type": null, "target": "Global Defaults", "source_type": null},
{"source": "Warehouse Type", "target_type": "Other", "target": "Stock Ledger Entry", "source_type": null},
{"source": "Warehouse Type", "target_type": "Master", "target": "Warehouse", "source_type": null},
{"source": "Web Page", "target_type": "Other", "target": "Website Settings", "source_type": "Transaction"},
{"source": "Website Slideshow", "target_type": "Master", "target": "Item Group", "source_type": "Transaction"},
{"source": "Website Slideshow", "target_type": "Transaction", "target": "Web Page", "source_type": "Transaction"},
{"source": "Website Slideshow", "target_type": "Master", "target": "Item", "source_type": "Transaction"},
{"source": "Workstation", "target_type": "Master", "target": "BOM", "source_type": "Master"}
];

// it all starts with render()
diagram.render();