
var originalSet = Backbone.Model.prototype.set;
Backbone.Model.prototype.set = function (key, val, options) {
	if (typeof key === 'object') {
        for (var k in key) {
        	checkPropertyInSchema.bind(this)(k);
        }
    }
    else {
 	   checkPropertyInSchema.bind(this)(key);
    }

	originalSet.bind(this)(key, val, options);

	function checkPropertyInSchema(schemaKey) {
		if (!this.schema[schemaKey]) {
			throw 'specified propery is not present in schema';
		}
	}
};