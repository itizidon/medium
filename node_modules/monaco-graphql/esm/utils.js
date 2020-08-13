define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function toMonacoRange(range) {
        return {
            startLineNumber: range.start.line + 1,
            startColumn: range.start.character + 1,
            endLineNumber: range.end.line + 1,
            endColumn: range.end.character + 1,
        };
    }
    exports.toMonacoRange = toMonacoRange;
    function toGraphQLPosition(position) {
        return { line: position.lineNumber - 1, character: position.column - 1 };
    }
    exports.toGraphQLPosition = toGraphQLPosition;
    function toCompletion(entry, range) {
        return {
            label: entry.label,
            insertText: entry.insertText || entry.label,
            sortText: entry.sortText,
            filterText: entry.filterText,
            documentation: entry.documentation,
            detail: entry.detail,
            range: toMonacoRange(range),
            kind: entry.kind,
        };
    }
    exports.toCompletion = toCompletion;
    function toMarkerData(diagnostic) {
        return {
            startLineNumber: diagnostic.range.start.line + 1,
            endLineNumber: diagnostic.range.end.line + 1,
            startColumn: diagnostic.range.start.character + 1,
            endColumn: diagnostic.range.end.character,
            message: diagnostic.message,
            severity: 5,
            code: diagnostic.code || undefined,
        };
    }
    exports.toMarkerData = toMarkerData;
});
//# sourceMappingURL=utils.js.map