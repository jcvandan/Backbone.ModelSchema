
(function() {
	var originalSet = Backbone.Model.prototype.set;
	var originalGet = Backbone.Model.prototype.get;

	Backbone.Model.prototype.set = function (key, val, options) {
		validateProperty.bind(this)(key, val);
		originalSet.bind(this)(key, val, options);
	};

	Backbone.Model.prototype.get = function (attr) {
		validateProperty.bind(this)(attr);
		originalGet.bind(this)(attr);
	};

	function validateProperty(key, val) {
		if (typeof key === 'object') {
	        for (var k in key) {
	        	checkPropertyInSchema.bind(this)(k);
        		checkPropertyTypeCorrect.bind(this)(k, key[k]);
	        }
	    }
	    else {
	 	   checkPropertyInSchema.bind(this)(key);
	 	   checkPropertyTypeCorrect.bind(this)(key, val);
	    }

	    function checkPropertyInSchema(schemaKey) {
			if (!this.schema[schemaKey]) {
				throw 'specified property is not present in schema';
			}
		}

		function checkPropertyTypeCorrect(schemaKey, value) {
			var valueType = typeof value;
			var schemaDefinedType = this.schema[schemaKey];

			if (schemaDefinedType != 'any' && schemaDefinedType != valueType) {
				throw 'value does not match specified property type';
			}
		}
	}
})();