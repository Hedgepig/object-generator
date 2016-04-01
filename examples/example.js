'use strict';

var Generator = require('../main.js').Generator
 ,  _ = require('underscore')
 ,  chance = new require('chance').Chance()
 ,  beast = new Generator();

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
