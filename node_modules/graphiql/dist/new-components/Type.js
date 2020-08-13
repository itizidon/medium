"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var theme_ui_1 = require("theme-ui");
var SectionHeader = function (_a) {
    var children = _a.children;
    return (theme_ui_1.jsx("h2", { sx: { color: 'primary', fontSize: [2] } }, children));
};
exports.SectionHeader = SectionHeader;
var Explainer = function (_a) {
    var children = _a.children;
    return (theme_ui_1.jsx("span", { sx: { fontSize: [0] } }, children));
};
exports.Explainer = Explainer;
//# sourceMappingURL=Type.js.map