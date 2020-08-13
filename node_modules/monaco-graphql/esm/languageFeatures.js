var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "monaco-editor/esm/vs/editor/editor.api", "vscode-languageserver-types"], function (require, exports, editor_api_1, vscode_languageserver_types_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DiagnosticsAdapter {
        constructor(defaults, _worker) {
            this.defaults = defaults;
            this._worker = _worker;
            this._disposables = [];
            this._listener = Object.create(null);
            this._worker = _worker;
            const onModelAdd = (model) => {
                const modeId = model.getModeId();
                if (modeId !== this.defaults.languageId) {
                    return;
                }
                let handle;
                this._listener[model.uri.toString()] = model.onDidChangeContent(() => {
                    clearTimeout(handle);
                    handle = setTimeout(() => this._doValidate(model.uri, modeId), 200);
                });
                this._doValidate(model.uri, modeId);
            };
            const onModelRemoved = (model) => {
                editor_api_1.editor.setModelMarkers(model, this.defaults.languageId, []);
                const uriStr = model.uri.toString();
                const listener = this._listener[uriStr];
                if (listener) {
                    listener.dispose();
                    delete this._listener[uriStr];
                }
            };
            this._disposables.push(editor_api_1.editor.onDidCreateModel(onModelAdd));
            this._disposables.push(editor_api_1.editor.onWillDisposeModel(model => {
                onModelRemoved(model);
            }));
            this._disposables.push(editor_api_1.editor.onDidChangeModelLanguage(event => {
                onModelRemoved(event.model);
                onModelAdd(event.model);
            }));
            this._disposables.push(defaults.onDidChange((_) => {
                editor_api_1.editor.getModels().forEach(model => {
                    if (model.getModeId() === this.defaults.languageId) {
                        onModelRemoved(model);
                        onModelAdd(model);
                    }
                });
            }));
            this._disposables.push({
                dispose: () => {
                    for (const key in this._listener) {
                        this._listener[key].dispose();
                    }
                },
            });
            editor_api_1.editor.getModels().forEach(onModelAdd);
        }
        dispose() {
            this._disposables.forEach(d => d && d.dispose());
            this._disposables = [];
        }
        _doValidate(resource, languageId) {
            return __awaiter(this, void 0, void 0, function* () {
                const worker = yield this._worker(resource);
                const diagnostics = yield worker.doValidation(resource.toString());
                editor_api_1.editor.setModelMarkers(editor_api_1.editor.getModel(resource), languageId, diagnostics);
            });
        }
    }
    exports.DiagnosticsAdapter = DiagnosticsAdapter;
    const mKind = monaco.languages.CompletionItemKind;
    function toCompletionItemKind(kind) {
        switch (kind) {
            case vscode_languageserver_types_1.CompletionItemKind.Text:
                return mKind.Text;
            case vscode_languageserver_types_1.CompletionItemKind.Method:
                return mKind.Method;
            case vscode_languageserver_types_1.CompletionItemKind.Function:
                return mKind.Function;
            case vscode_languageserver_types_1.CompletionItemKind.Constructor:
                return mKind.Constructor;
            case vscode_languageserver_types_1.CompletionItemKind.Field:
                return mKind.Field;
            case vscode_languageserver_types_1.CompletionItemKind.Variable:
                return mKind.Variable;
            case vscode_languageserver_types_1.CompletionItemKind.Class:
                return mKind.Class;
            case vscode_languageserver_types_1.CompletionItemKind.Interface:
                return mKind.Interface;
            case vscode_languageserver_types_1.CompletionItemKind.Module:
                return mKind.Module;
            case vscode_languageserver_types_1.CompletionItemKind.Property:
                return mKind.Property;
            case vscode_languageserver_types_1.CompletionItemKind.Unit:
                return mKind.Unit;
            case vscode_languageserver_types_1.CompletionItemKind.Value:
                return mKind.Value;
            case vscode_languageserver_types_1.CompletionItemKind.Enum:
                return mKind.Enum;
            case vscode_languageserver_types_1.CompletionItemKind.Keyword:
                return mKind.Keyword;
            case vscode_languageserver_types_1.CompletionItemKind.Snippet:
                return mKind.Snippet;
            case vscode_languageserver_types_1.CompletionItemKind.Color:
                return mKind.Color;
            case vscode_languageserver_types_1.CompletionItemKind.File:
                return mKind.File;
            case vscode_languageserver_types_1.CompletionItemKind.Reference:
                return mKind.Reference;
            case vscode_languageserver_types_1.CompletionItemKind.Folder:
                return mKind.Folder;
            case vscode_languageserver_types_1.CompletionItemKind.EnumMember:
                return mKind.EnumMember;
            case vscode_languageserver_types_1.CompletionItemKind.Constant:
                return mKind.Constant;
            case vscode_languageserver_types_1.CompletionItemKind.Struct:
                return mKind.Struct;
            case vscode_languageserver_types_1.CompletionItemKind.Event:
                return mKind.Event;
            case vscode_languageserver_types_1.CompletionItemKind.Operator:
                return mKind.Operator;
            case vscode_languageserver_types_1.CompletionItemKind.TypeParameter:
                return mKind.TypeParameter;
            default:
                return mKind.Text;
        }
    }
    exports.toCompletionItemKind = toCompletionItemKind;
    function toCompletion(entry) {
        return {
            label: entry.label,
            insertText: entry.insertText || entry.label,
            sortText: entry.sortText,
            filterText: entry.filterText,
            documentation: entry.documentation,
            detail: entry.detail,
            range: entry.range,
            kind: toCompletionItemKind(entry.kind),
        };
    }
    exports.toCompletion = toCompletion;
    class CompletionAdapter {
        constructor(_worker) {
            this._worker = _worker;
            this._worker = _worker;
        }
        get triggerCharacters() {
            return [' ', ':'];
        }
        provideCompletionItems(model, position, _context, _token) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const resource = model.uri;
                    const worker = yield this._worker(model.uri);
                    const completionItems = yield worker.doComplete(resource.toString(), position);
                    return {
                        incomplete: true,
                        suggestions: completionItems.map(toCompletion),
                    };
                }
                catch (err) {
                    console.error(`Error fetching completion items\n\n${err}`);
                    return { suggestions: [] };
                }
            });
        }
    }
    exports.CompletionAdapter = CompletionAdapter;
    class DocumentFormattingAdapter {
        constructor(_worker) {
            this._worker = _worker;
            this._worker = _worker;
        }
        provideDocumentFormattingEdits(document, _options, _token) {
            return __awaiter(this, void 0, void 0, function* () {
                const worker = yield this._worker(document.uri);
                const text = document.getValue();
                const formatted = yield worker.doFormat(text);
                return [
                    {
                        range: document.getFullModelRange(),
                        text: formatted,
                    },
                ];
            });
        }
    }
    exports.DocumentFormattingAdapter = DocumentFormattingAdapter;
    class HoverAdapter {
        constructor(_worker) {
            this._worker = _worker;
        }
        provideHover(model, position, _token) {
            return __awaiter(this, void 0, void 0, function* () {
                const resource = model.uri;
                const worker = yield this._worker(model.uri);
                const hoverItem = yield worker.doHover(resource.toString(), position);
                if (hoverItem) {
                    return {
                        range: hoverItem.range,
                        contents: [{ value: hoverItem.content }],
                    };
                }
                return;
            });
        }
        dispose() { }
    }
    exports.HoverAdapter = HoverAdapter;
});
//# sourceMappingURL=languageFeatures.js.map