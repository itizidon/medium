import { jsx } from 'theme-ui';
import List, { ListRow } from './index';
export default { title: 'Lists' };
var longText = Array(300)
    .fill('scroll')
    .map(function (c, i) { return jsx("div", { key: i }, c); });
export var WithFlexChild = function () { return (jsx("div", { style: { height: '100vh', display: 'grid' } },
    jsx(List, null,
        jsx(ListRow, { padding: true },
            jsx("div", null, 'Lists are a vertical stack of components and form the basis of most modules. This one is very long')),
        jsx(ListRow, { padding: true, flex: true },
            'You normally want 1 flex area that grows forever like this one',
            longText,
            'the end')))); };
export var WithStackedRows = function () { return (jsx("div", { style: { height: '100vh', display: 'grid' } },
    jsx(List, null,
        jsx(ListRow, { padding: true }, 'Title'),
        jsx(ListRow, { padding: true }, 'Navigation'),
        jsx(ListRow, { padding: true }, 'Search'),
        jsx(ListRow, { padding: true }, 'Filter'),
        jsx(ListRow, { padding: true, flex: true },
            'Actual content',
            longText,
            'Actual content ends here'),
        jsx(ListRow, { padding: true }, 'Footer'),
        jsx(ListRow, { padding: true }, 'Footers footer')))); };
//# sourceMappingURL=List.stories.js.map