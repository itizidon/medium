"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
function uniqueBy(array, iteratee) {
    var FilteredMap = new Map();
    var result = [];
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var item = array_1[_i];
        var uniqeValue = iteratee(item);
        if (!FilteredMap.has(uniqeValue)) {
            FilteredMap.set(uniqeValue, true);
            result.push(item);
        }
    }
    return result;
}
exports.uniqueBy = uniqueBy;
function mergeAST(documentAST) {
    var fragmentDefinitions = Object.create(null);
    for (var _i = 0, _a = documentAST.definitions; _i < _a.length; _i++) {
        var definition = _a[_i];
        if (definition.kind === 'FragmentDefinition') {
            fragmentDefinitions[definition.name.value] = definition;
        }
    }
    return graphql_1.visit(documentAST, {
        FragmentSpread: function (node) {
            return __assign(__assign({}, fragmentDefinitions[node.name.value]), { kind: 'InlineFragment' });
        },
        SelectionSet: function (node) {
            return __assign(__assign({}, node), { selections: uniqueBy(node.selections, function (selection) { return selection.name.value; }) });
        },
        FragmentDefinition: function () {
            return null;
        },
    });
}
exports.default = mergeAST;
//# sourceMappingURL=mergeAst.js.map