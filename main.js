'use strict';

var _ = require('underscore');

class Generator {
    constructor() {
        this._props = {};
    }
    
    property(id, deps, fn) {
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
                let depsFulfilled = 
                    _(prop.deps)
                        .difference(fulfilled)
                        .length == 0;
                if (depsFulfilled) {
                    let ctx = _(prop.deps).chain()
                        .map( (dep) => [ dep, generated[dep] ] )
                        .object();
                    generated[propKey] = prop.fn(ctx);
                    fulfilled.push(propKey);
                    unfulfilled = _(unfulfilled).without(propKey);
                    count = 0;
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
