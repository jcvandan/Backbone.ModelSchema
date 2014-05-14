
(function() {
	var originalSet = Backbone.Model.prototype.set;
	var originalGet = Backbone.Model.prototype.get;

	Backbone.Model.prototype.set = function (key, val, options) {
		validateProperty.bind(this)(key);
		originalSet.bind(this)(key, val, options);
	};

	Backbone.Model.prototype.get = function (attr) {
		validateProperty.bind(this)(attr);
		originalGet.bind(this)(attr);
	};

	function validateProperty(key) {
		if (typeof key === 'object') {
	        for (var k in key) {
	        	checkPropertyInSchema.bind(this)(k);
	        }
	    }
	    else {
	 	   checkPropertyInSchema.bind(this)(key);
	    }

	    function checkPropertyInSchema(schemaKey) {
			if (!this.schema[schemaKey]) {
				throw 'specified propery is not present in schema';
			}
		}
	}
})();