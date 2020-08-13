import { jsx } from 'theme-ui';
import WithDividers from './support/WithDividers';
var Toolbar = function (_a) {
    var children = _a.children, _b = _a.justifyContent, justifyContent = _b === void 0 ? 'space-between' : _b;
    var needsExtraPadding = !justifyContent.includes('space');
    return (jsx("div", { sx: {
            overflow: 'auto',
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: justifyContent,
        } }, needsExtraPadding ? (jsx(WithDividers, { padding: true }, children)) : (children)));
};
export default Toolbar;
//# sourceMappingURL=index.js.map