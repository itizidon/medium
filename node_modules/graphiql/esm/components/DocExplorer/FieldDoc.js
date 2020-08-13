import React from 'react';
import Argument from './Argument';
import MarkdownContent from './MarkdownContent';
import TypeLink from './TypeLink';
export default function FieldDoc(_a) {
    var field = _a.field, onClickType = _a.onClickType;
    var argsDef;
    if (field && 'args' in field && field.args.length > 0) {
        argsDef = (React.createElement("div", { className: "doc-category" },
            React.createElement("div", { className: "doc-category-title" }, 'arguments'),
            field.args.map(function (arg) { return (React.createElement("div", { key: arg.name, className: "doc-category-item" },
                React.createElement("div", null,
                    React.createElement(Argument, { arg: arg, onClickType: onClickType })),
                React.createElement(MarkdownContent, { className: "doc-value-description", markdown: arg.description }))); })));
    }
    return (React.createElement("div", null,
        React.createElement(MarkdownContent, { className: "doc-type-description", markdown: (field === null || field === void 0 ? void 0 : field.description) || 'No Description' }),
        field && 'deprecationReason' in field && (React.createElement(MarkdownContent, { className: "doc-deprecation", markdown: field === null || field === void 0 ? void 0 : field.deprecationReason })),
        React.createElement("div", { className: "doc-category" },
            React.createElement("div", { className: "doc-category-title" }, 'type'),
            React.createElement(TypeLink, { type: field === null || field === void 0 ? void 0 : field.type, onClick: onClickType })),
        argsDef));
}
//# sourceMappingURL=FieldDoc.js.map