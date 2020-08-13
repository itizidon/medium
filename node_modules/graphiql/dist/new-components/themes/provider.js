"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var theme_ui_1 = require("theme-ui");
var default_1 = require("./default");
var react_1 = __importDefault(require("react"));
var core_1 = require("@emotion/core");
var Reset = function () { return (react_1.default.createElement(core_1.Global, { styles: function (themeStyles) { return ({
        '*': {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            listStyle: 'none',
        },
        body: {
            fontFamily: themeStyles.fonts.body,
            fontSize: themeStyles.fontSizes[1],
            color: themeStyles.colors.text,
            backgroundColor: themeStyles.colors.background,
        },
        small: {
            fontSize: '100%',
        },
        a: {
            textDecoration: 'none',
        },
        button: {
            border: 0,
            padding: 0,
            fontSize: '100%',
            backgroundColor: 'transparent',
        },
    }); } })); };
function useThemeLayout() {
    return default_1.Layout;
}
exports.useThemeLayout = useThemeLayout;
function Provider(_a) {
    var children = _a.children;
    return (react_1.default.createElement(theme_ui_1.ThemeProvider, { theme: default_1.theme },
        react_1.default.createElement(Reset, null),
        children));
}
exports.Provider = Provider;
exports.default = Provider;
//# sourceMappingURL=provider.js.map