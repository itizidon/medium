"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styles = {
    maxWidth: '60em',
    margin: '5em auto',
    border: '1px solid #eee',
};
exports.layout = function (storyFn) { return (react_1.default.createElement("div", { style: styles }, storyFn())); };
//# sourceMappingURL=decorators.js.map