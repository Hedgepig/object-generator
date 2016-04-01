# Random Generator

This simple class allows the generation of a JSON object, with values that 
depend upon one another.

The best way to show what this means is by example.

```javascript
var numbers = new Generator();

numbers.property('numberOne', [], () => {
    return Math.random();
});

numbers.property('numberTwo', ['numberOne'],  (ctx) => {
    if (ctx['numberOne'] > 0.5) {
        return 0;
    } else {
        return 1;
    }
});

console.log(beast.generate()); //=> { numberOne: 0.33563215, numberTwo: 0 }
console.log(beast.generate()); //=> { numberOne: 0.63401577, numberTwo: 1 }
```

## Generator.prototype.property(id, dependencies, function)

Adds a property to the generator

* **id** - the unique id that will be used as the key in the output object
* **dependencies** - list of ids that this property is dependend upon
* **function** - the function used to generate the value for this property 
  which will be given the following parameter
    - **ctx** - the context variable containing all the properties specified 
      by the dependencies array
