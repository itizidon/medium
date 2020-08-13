"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var theme_ui_1 = require("theme-ui");
var WithDividers_1 = __importDefault(require("./support/WithDividers"));
var Toolbar = function (_a) {
    var children = _a.children, _b = _a.justifyContent, justifyContent = _b === void 0 ? 'space-between' : _b;
    var needsExtraPadding = !justifyContent.includes('space');
    return (theme_ui_1.jsx("div", { sx: {
            overflow: 'auto',
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: justifyContent,
        } }, needsExtraPadding ? (theme_ui_1.jsx(WithDividers_1.default, { padding: true }, children)) : (children)));
};
exports.default = Toolbar;
//# sourceMappingURL=index.js.map