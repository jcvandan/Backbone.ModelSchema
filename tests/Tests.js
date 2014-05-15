
describe("Given I have a Backbone.Model with a schema,", function() {
  
	var PersonModel;
	beforeEach(function () {
		PersonModel = Backbone.Model.extend({
			schema: {
				Any: 'any',
				Name: 'string',
				Age: 'number',
				Child: 'object',
				Func: 'function',
				Arr: 'array',
				Bool: 'boolean'
			}
		});
	});

	it("setting a property on the model not in the schema should cause an exception", function() {	  		
  		expect(function () {
  			var model = new PersonModel();
  			model.set('NotInSchema', 'Dan');
  		}).toThrow('specified property is not present in schema');
  	});

	it("initialising a model with a property not in the schema should cause an exception", function() {	  		
  		expect(function () {
  			new PersonModel({NotInSchema: 'Dan'});
  		}).toThrow('specified property is not present in schema');
  	});

	describe('and I want to set an "any" property', function () {
		
	  	it("with a all value types should be ok", function() {
	  		for (var v in allTypeValues) {
				expectSetToWork('Any', allTypeValues[v]);
	  		}
	  	});

	});

	describe('and I want to initialise a model with an "any" property', function () {
		
	  	it("with a all value types should be ok", function() {
	  		for (var v in allTypeValues) {
				expectInitialiseToWork({Any: allTypeValues[v]});
	  		}
	  	});

	});

	describe('and I want to set a "string" property', function () {
		
	  	it("with a string should be ok", function() {
	  		expectSetToWork('Name', 'Dan');
	  	});

		it("with all other types should fail", function() {
	  		expectSetToFailWithWrongTypes('Name', 'string');
	  	});

	});

	describe('and I want initialise a model with a "string" property', function () {
		
	  	it("with a string should be ok", function() {
	  		expectInitialiseToWork({Name: 'Dan'});
	  	});

		it("with all other types should fail", function() {
	  		expectInitialiseToFailWithWrongTypes('Name', 'string');
	  	});

	});

	describe('and I want to set a "number" property', function () {
		
	  	it("with a number should be ok", function() {
	  		expectSetToWork('Age', 123);
	  	});

		it("with all other types should fail", function() {
	  		expectSetToFailWithWrongTypes('Age', 'number');
	  	});

	});

	describe('and I want initialise a model with a "number" property', function () {
		
	  	it("with a number should be ok", function() {
	  		expectInitialiseToWork({Age: 123});
	  	});

		it("with all other types should fail", function() {
	  		expectInitialiseToFailWithWrongTypes('Age', 'number');
	  	});

	});

	describe('and I want to set an "object" property', function () {
		
	  	it("with an object should be ok", function() {
	  		expectSetToWork('Child', {});
	  	});

		it("with all other types should fail", function() {
	  		expectSetToFailWithWrongTypes('Child', 'object');
	  	});

	});

	describe('and I want initialise a model with an "object" property', function () {
		
	  	it("with an object should be ok", function() {
	    	expectInitialiseToWork({Child: {}});
	  	});

		it("with all other types should fail", function() {
	  		expectInitialiseToFailWithWrongTypes('Child', 'object');
	  	});

	});

	describe('and I want to set a "function" property', function () {
		
	  	it("with a function should be ok", function() {
	  		expectSetToWork('Func', function() {});
	  	});

		it("with all other types should fail", function() {
	  		expectSetToFailWithWrongTypes('Func', 'function');
	  	});

	});

	describe('and I want initialise a model with a "function" property', function () {
		
	  	it("with a function should be ok", function() {
	    	expectInitialiseToWork({Func: function () {}});
	  	});

		it("with all other types should fail", function() {
	  		expectInitialiseToFailWithWrongTypes('Func', 'function');
	  	});

	});

	describe('and I want to set a "boolean" property', function () {
		
	  	it("with a boolean boolean be ok", function() {
	  		expectSetToWork('Bool', true);
	  	});

		it("with all other types should fail", function() {
	  		expectSetToFailWithWrongTypes('Bool', 'boolean');
	  	});

	});

	describe('and I want initialise a model with a "boolean" property', function () {
		
	  	it("with a boolean should be ok", function() {
	    	expectInitialiseToWork({Bool: true});
	  	});

		it("with all other types should fail", function() {
	  		expectInitialiseToFailWithWrongTypes('Bool', 'boolean');
	  	});

	});

	function expectInitialiseToWork(properties) {
		expect(function () {
			var model = new PersonModel(properties);
		}).not.toThrow();
	}

	var allTypeValues = ['Dan', {}, function (){}, true, 123, []];

	function expectInitialiseToFailWithWrongTypes(key, ignoreType) {
		for (var v in allTypeValues) {
			var value = allTypeValues[v];
			if (typeof value != ignoreType) {
				expect(function () {
					var init = {};
					init[key] = value;
					new PersonModel(init);
				}).toThrow('value does not match specified property type');
			}
		}
	}

	function expectSetToWork(property, value) {
		expect(function () {
			var model = new PersonModel();
			model.set(property, value);
		}).not.toThrow();
	}

	function expectSetToFailWithWrongTypes(key, ignoreType) {
		for (var v in allTypeValues) {
			var value = allTypeValues[v];
			if (typeof value != ignoreType) {
				expect(function () {
					new PersonModel().set(key, value);
				}).toThrow('value does not match specified property type');
			}
		}
	}

});