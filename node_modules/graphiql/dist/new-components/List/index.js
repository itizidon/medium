"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var theme_ui_1 = require("theme-ui");
var ListRow = function (_a) {
    var children = _a.children, _b = _a.flex, flex = _b === void 0 ? false : _b, _c = _a.padding, padding = _c === void 0 ? false : _c;
    return (theme_ui_1.jsx("div", { sx: {
            overflow: 'auto',
            flex: flex && '1 1 auto',
            padding: padding ? function (_a) {
                var spaces = _a.spaces;
                return spaces.rowPadding;
            } : undefined,
            minHeight: function (_a) {
                var spaces = _a.spaces;
                return spaces.rowMinHeight;
            },
        } }, children));
};
exports.ListRow = ListRow;
var List = function (_a) {
    var children = _a.children;
    return (theme_ui_1.jsx("div", { sx: {
            backgroundColor: 'cardBackground',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            '> *:not(:first-of-type)': {
                borderTop: function (theme) { return "1px solid " + theme.colors.border; },
            },
            '> *': {
                flex: '0 0 auto',
            },
        } }, children));
};
exports.default = List;
//# sourceMappingURL=index.js.map