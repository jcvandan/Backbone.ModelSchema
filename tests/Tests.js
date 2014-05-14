
describe("Given I have a Backbone.Model with a schema,", function() {
  
	var PersonModel;
	beforeEach(function () {
		PersonModel = Backbone.Model.extend({
			schema: {Name: 'any', Age: 'any'}
		});
	});

	describe('setting an "any" property on the model', function () {

		it("not in the schema should cause an exception", function() {	  		
	  		expect(function () {
	  			var model = new PersonModel();
	  			model.set('NotInSchema', 'Dan');
	  		}).toThrow('specified propery is not present in schema');
	  	});
		
	  	it("present in the schema should be ok", function() {
	    	expect(function () {
	    		var model = new PersonModel();
	  			model.set('Name', 'Dan');
	    	}).not.toThrow();
	  	});

  	});

  	describe('initialising a model with an "any" property', function () {

		it("not in the schema should cause an exception", function() {	  		
	  		expect(function () {
	  			new PersonModel({NotInSchema: 'Dan'});
	  		}).toThrow('specified propery is not present in schema');
	  	});

	  	it("present in the schema should be ok", function() {
	  		expect(function () {
	  			new PersonModel({Name: 'Dan'});
	  		}).not.toThrow();
	  	});

  	});

});