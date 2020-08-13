import { jsx } from 'theme-ui';
import List, { ListRow } from './List';
import { SectionHeader, Explainer } from './Type';
import { layout } from './themes/decorators';
export default { title: 'Type', decorators: [layout] };
export var type = function () { return (jsx(List, null,
    jsx(ListRow, { padding: true },
        jsx(SectionHeader, null, 'Title')),
    jsx(ListRow, { padding: true },
        jsx(Explainer, null, 'Small explainer text')),
    jsx(ListRow, { padding: true }, 'Normal text'))); };
//# sourceMappingURL=Type.stories.js.map