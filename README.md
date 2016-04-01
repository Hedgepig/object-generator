# Random Generator

This simple class allows the generation of a JSON object, with values that 
depend upon one another.

The best way to show what this means is by example.

```javascript
var beast = new Generator();

beast.property('animalType', [], () => {
    return chance.weighted(
        ["reptilian", "mammal"], 
        [5, 8]
    );
});

beast.property('dietType', ['animalType'],  (ctx) => {
    let weights = [10, 8, 5, 3];
    if (ctx.animalType == "reptilian") {
        weights = [5, 7, 2, 10];
    }
    return chance.weighted(
        ["herbivore", "carnivore", "omnivore", "insectivore"], 
        weights
    );
});

console.log(beast.generate()); //=> { animalType: 'mammal', dietType: 'omnivore' }
console.log(beast.generate()); //=> { animalType: 'reptilian', dietType: 'insectivore' }
```
