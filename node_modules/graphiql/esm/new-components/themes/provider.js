import { ThemeProvider } from 'theme-ui';
import { theme, Layout } from './default';
import React from 'react';
import { Global } from '@emotion/core';
var Reset = function () { return (React.createElement(Global, { styles: function (themeStyles) { return ({
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
export function useThemeLayout() {
    return Layout;
}
export function Provider(_a) {
    var children = _a.children;
    return (React.createElement(ThemeProvider, { theme: theme },
        React.createElement(Reset, null),
        children));
}
export default Provider;
//# sourceMappingURL=provider.js.map