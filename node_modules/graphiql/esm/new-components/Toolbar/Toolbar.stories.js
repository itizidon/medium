import List, { ListRow } from '../List';
import Tabs from './Tabs';
import React from 'react';
import Toolbar from './index';
import Content from './Content';
import { layout } from '../themes/decorators';
export default { title: 'Toolbar', decorators: [layout] };
export var Basic = function () { return (React.createElement(List, null,
    React.createElement(ListRow, { padding: true },
        React.createElement("p", null, "Toolbars group together widgets in a flexbox. You can cutomize what type of\n      justification to use and if elements go together it'll add dividers\n      between them")),
    React.createElement(ListRow, null,
        React.createElement(Toolbar, { justifyContent: "center" },
            React.createElement(Content, null, 'Some text'),
            React.createElement(Content, null, 'Some text'),
            React.createElement(Content, null, 'Some text'))),
    React.createElement(ListRow, null,
        React.createElement(Toolbar, { justifyContent: "flex-start" },
            React.createElement(Content, null, 'Some text'),
            React.createElement(Content, null, 'Some text'),
            React.createElement(Content, null, 'Some text'))),
    React.createElement(ListRow, null,
        React.createElement(Toolbar, { justifyContent: "flex-end" },
            React.createElement(Content, null, 'Some text'),
            React.createElement(Content, null, 'Some text'),
            React.createElement(Content, null, 'Some text'))),
    React.createElement(ListRow, null,
        React.createElement(Toolbar, { justifyContent: "space-between" },
            React.createElement(Content, null, 'Some text'),
            React.createElement(Content, null, 'Some text'),
            React.createElement(Content, null, 'Some text'))))); };
export var ToolbarWithTabs = function () { return (React.createElement(List, null,
    React.createElement(ListRow, { padding: true },
        React.createElement("p", null, "The dividers don't nest so if you have tabs inside a toolbar the tabs won't get dividers")),
    React.createElement(ListRow, null,
        React.createElement(Toolbar, { justifyContent: "center" },
            React.createElement(Tabs, { active: 2, tabs: ['First', 'Second', 'Third'] }),
            React.createElement(Tabs, { active: 2, tabs: ['First', 'Second', 'Third'] }))),
    React.createElement(ListRow, null,
        React.createElement(Toolbar, { justifyContent: "flex-start" },
            React.createElement(Tabs, { active: 2, tabs: ['First', 'Second', 'Third'] }),
            React.createElement(Tabs, { active: 2, tabs: ['First', 'Second', 'Third'] }))),
    React.createElement(ListRow, null,
        React.createElement(Toolbar, { justifyContent: "flex-end" },
            React.createElement(Tabs, { active: 2, tabs: ['First', 'Second', 'Third'] }),
            React.createElement(Tabs, { active: 2, tabs: ['First', 'Second', 'Third'] }))),
    React.createElement(ListRow, null,
        React.createElement(Toolbar, { justifyContent: "space-between" },
            React.createElement(Tabs, { active: 2, tabs: ['First', 'Second', 'Third'] }),
            React.createElement(Tabs, { active: 2, tabs: ['First', 'Second', 'Third'] }))))); };
//# sourceMappingURL=Toolbar.stories.js.map