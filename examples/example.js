'use strict';

var Generator = new require('../main.js').Generator();

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

console.log(beast.generate());
