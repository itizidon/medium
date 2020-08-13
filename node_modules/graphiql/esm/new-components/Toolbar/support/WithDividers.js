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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx } from 'theme-ui';
import { Children } from 'react';
var Divider = function (_a) {
    var innerSx = _a.innerSx;
    return (jsx("div", { "data-is-divider": true, "aria-hidden": true, sx: __assign(__assign({}, innerSx), { background: function (_a) {
                var colors = _a.colors;
                return colors.border;
            }, width: '1px' }) }));
};
var WithDividers = function (_a) {
    var children = _a.children, _b = _a.padding, padding = _b === void 0 ? false : _b, props = __rest(_a, ["children", "padding"]);
    return (jsx("ul", __assign({ "data-contains-divider": true }, props, { sx: {
            display: 'flex',
            alignItems: 'stretch',
            '[data-contains-divider] [data-is-divider]': {
                display: 'none',
            },
        } }), Children.map(children, function (child, index) {
        var isFirst = index === 0;
        return (jsx("li", { sx: {
                position: 'relative',
                display: 'grid',
                marginLeft: padding && !isFirst
                    ? function (_a) {
                        var spaces = _a.spaces;
                        return spaces.rowPadding * 2;
                    }
                    : undefined,
            } },
            !isFirst && (jsx(Divider, { innerSx: {
                    position: 'absolute',
                    top: function (_a) {
                        var space = _a.space;
                        return space[2];
                    },
                    bottom: function (_a) {
                        var space = _a.space;
                        return space[2];
                    },
                    left: padding && !isFirst
                        ? function (_a) {
                            var spaces = _a.spaces;
                            return spaces.rowPadding * -1;
                        }
                        : 0,
                } })),
            child));
    })));
};
export default WithDividers;
//# sourceMappingURL=WithDividers.js.map