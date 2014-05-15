# Backbone.ModelSchema

Backbone.ModelSchema is an extremely simple library which allows you to enforce a schema on Backbone models. Backbone.ModelSchema allows you to declare a set of restricted properties for a model, so calling set / get on the model for properties not in the schema throws an exception. This gives more visibility on incorrect use of a model when changes are made, and also makes your tests fail where they should after making changes.

The reason I wrote this library is because I often find myself in situations where I want to refactor a model type which is being used throughout an application, and it can be hard to find all the places in which this model's properties are being set / read. If any of these places are missed it can result in silent bugs which don't raise their ugly head until further down the line.

There are a few other libraries out there doing something similar but I don't think they are as intuitive or as simple as they could be.

## Setting Up Backbone.ModelSchema

You don't need to do any global initialization or anything similar, you just load the main `Backbone.ModelSchema.js` script after you load the main Backbone script, and it will be good to go.

## Declaring A Schema

Adding a schema is as simple as declaring a custom model type, passing an object named 'schema' which follows a `{PropertyName: 'PropertyType'}` pattern:

```
var PersonModel = Backbone.Model.extend({
	schema: {
		// PropertyName: 'propertyType'
		Name: 'any',
		Age: 'any'
	}
});
```

From now on when you initialize your custom model, call `set`, or call `get`, an error will be thrown if you try to pass a property name not in the schema. There are some simple examples of this in the `tests.js` file if you clone the source.

## Property Types

Property types can be set as any JavaScript data type, so any of the following are legitimate:

 - `boolean`
 - `string`
 - `array`
 - `function`
 - `object`
 - `number`