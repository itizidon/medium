var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "monaco-editor/esm/vs/editor/editor.api", "vscode-languageserver-types"], function (require, exports, editor_api_1, vscode_languageserver_types_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DiagnosticsAdapter = (function () {
        function DiagnosticsAdapter(defaults, _worker) {
            var _this = this;
            this.defaults = defaults;
            this._worker = _worker;
            this._disposables = [];
            this._listener = Object.create(null);
            this._worker = _worker;
            var onModelAdd = function (model) {
                var modeId = model.getModeId();
                if (modeId !== _this.defaults.languageId) {
                    return;
                }
                var handle;
                _this._listener[model.uri.toString()] = model.onDidChangeContent(function () {
                    clearTimeout(handle);
                    handle = setTimeout(function () { return _this._doValidate(model.uri, modeId); }, 200);
                });
                _this._doValidate(model.uri, modeId);
            };
            var onModelRemoved = function (model) {
                editor_api_1.editor.setModelMarkers(model, _this.defaults.languageId, []);
                var uriStr = model.uri.toString();
                var listener = _this._listener[uriStr];
                if (listener) {
                    listener.dispose();
                    delete _this._listener[uriStr];
                }
            };
            this._disposables.push(editor_api_1.editor.onDidCreateModel(onModelAdd));
            this._disposables.push(editor_api_1.editor.onWillDisposeModel(function (model) {
                onModelRemoved(model);
            }));
            this._disposables.push(editor_api_1.editor.onDidChangeModelLanguage(function (event) {
                onModelRemoved(event.model);
                onModelAdd(event.model);
            }));
            this._disposables.push(defaults.onDidChange(function (_) {
                editor_api_1.editor.getModels().forEach(function (model) {
                    if (model.getModeId() === _this.defaults.languageId) {
                        onModelRemoved(model);
                        onModelAdd(model);
                    }
                });
            }));
            this._disposables.push({
                dispose: function () {
                    for (var key in _this._listener) {
                        _this._listener[key].dispose();
                    }
                },
            });
            editor_api_1.editor.getModels().forEach(onModelAdd);
        }
        DiagnosticsAdapter.prototype.dispose = function () {
            this._disposables.forEach(function (d) { return d && d.dispose(); });
            this._disposables = [];
        };
        DiagnosticsAdapter.prototype._doValidate = function (resource, languageId) {
            return __awaiter(this, void 0, void 0, function () {
                var worker, diagnostics;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this._worker(resource)];
                        case 1:
                            worker = _a.sent();
                            return [4, worker.doValidation(resource.toString())];
                        case 2:
                            diagnostics = _a.sent();
                            editor_api_1.editor.setModelMarkers(editor_api_1.editor.getModel(resource), languageId, diagnostics);
                            return [2];
                    }
                });
            });
        };
        return DiagnosticsAdapter;
    }());
    exports.DiagnosticsAdapter = DiagnosticsAdapter;
    var mKind = monaco.languages.CompletionItemKind;
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
    var CompletionAdapter = (function () {
        function CompletionAdapter(_worker) {
            this._worker = _worker;
            this._worker = _worker;
        }
        Object.defineProperty(CompletionAdapter.prototype, "triggerCharacters", {
            get: function () {
                return [' ', ':'];
            },
            enumerable: true,
            configurable: true
        });
        CompletionAdapter.prototype.provideCompletionItems = function (model, position, _context, _token) {
            return __awaiter(this, void 0, void 0, function () {
                var resource, worker, completionItems, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            resource = model.uri;
                            return [4, this._worker(model.uri)];
                        case 1:
                            worker = _a.sent();
                            return [4, worker.doComplete(resource.toString(), position)];
                        case 2:
                            completionItems = _a.sent();
                            return [2, {
                                    incomplete: true,
                                    suggestions: completionItems.map(toCompletion),
                                }];
                        case 3:
                            err_1 = _a.sent();
                            console.error("Error fetching completion items\n\n" + err_1);
                            return [2, { suggestions: [] }];
                        case 4: return [2];
                    }
                });
            });
        };
        return CompletionAdapter;
    }());
    exports.CompletionAdapter = CompletionAdapter;
    var DocumentFormattingAdapter = (function () {
        function DocumentFormattingAdapter(_worker) {
            this._worker = _worker;
            this._worker = _worker;
        }
        DocumentFormattingAdapter.prototype.provideDocumentFormattingEdits = function (document, _options, _token) {
            return __awaiter(this, void 0, void 0, function () {
                var worker, text, formatted;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this._worker(document.uri)];
                        case 1:
                            worker = _a.sent();
                            text = document.getValue();
                            return [4, worker.doFormat(text)];
                        case 2:
                            formatted = _a.sent();
                            return [2, [
                                    {
                                        range: document.getFullModelRange(),
                                        text: formatted,
                                    },
                                ]];
                    }
                });
            });
        };
        return DocumentFormattingAdapter;
    }());
    exports.DocumentFormattingAdapter = DocumentFormattingAdapter;
    var HoverAdapter = (function () {
        function HoverAdapter(_worker) {
            this._worker = _worker;
        }
        HoverAdapter.prototype.provideHover = function (model, position, _token) {
            return __awaiter(this, void 0, void 0, function () {
                var resource, worker, hoverItem;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resource = model.uri;
                            return [4, this._worker(model.uri)];
                        case 1:
                            worker = _a.sent();
                            return [4, worker.doHover(resource.toString(), position)];
                        case 2:
                            hoverItem = _a.sent();
                            if (hoverItem) {
                                return [2, {
                                        range: hoverItem.range,
                                        contents: [{ value: hoverItem.content }],
                                    }];
                            }
                            return [2];
                    }
                });
            });
        };
        HoverAdapter.prototype.dispose = function () { };
        return HoverAdapter;
    }());
    exports.HoverAdapter = HoverAdapter;
});
//# sourceMappingURL=languageFeatures.js.map