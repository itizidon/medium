import React from 'react';
var styles = {
    maxWidth: '60em',
    margin: '5em auto',
    border: '1px solid #eee',
};
export var layout = function (storyFn) { return (React.createElement("div", { style: styles }, storyFn())); };
//# sourceMappingURL=decorators.js.map