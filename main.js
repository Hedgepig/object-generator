'use strict';

var _ = require('underscore');

class Generator {
    constructor() {
        this._props = {};
    }
    
    property(id, deps, fn) {            //Add a property
        this._props[id] = {
            fn: fn,
            deps: deps
        }
    }

    generate(failureAtCount) {
        var fulfilled = []
         ,  unfulfilled = _(this._props).keys()
         ,  numberOfProps  = unfulfilled.length
         ,  unfinished = true
         ,  count = 0
         ,  generated = {};

        failureAtCount = failureAtCount || 1000;

        while (unfinished) {
            _(unfulfilled).each( (propKey) => {
                let prop = this._props[propKey];
                let depsFulfilled =                  //Check if all the dependancies have been fulfilled
                    _(prop.deps)
                        .difference(fulfilled)
                        .length == 0;
                if (depsFulfilled) {
                    let ctx = _(prop.deps).chain()
                        .map( (dep) => [ dep, generated[dep] ] )
                        .object()
                        .value();
                    generated[propKey] = prop.fn(ctx);              //The function is executed with the required variables in the context
                    unfulfilled = _(unfulfilled).without(propKey);  //The property id is taken from the unfulfilled array
                    fulfilled.push(propKey);                        //And put into the fulfilled array
                    count = 0;                                      //Reset count as algorithm is still working
                }
            });

            count++;

            if (fulfilled.length = numberOfProps) {
                unfinished = false;
            }

            if (count > failureAtCount) {
                console.error("Failed, check for dependancy recursion");
                unfinished = false;
            }
        }
        return generated;
    }
}

exports.Generator = Generator;
