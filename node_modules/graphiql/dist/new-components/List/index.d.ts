/// <reference types="@emotion/core" />
/// <reference types="theme-ui" />
import { PropsWithChildren } from 'react';
export declare type ListRowPropTypes = PropsWithChildren<{
    flex?: boolean;
    padding?: boolean;
}>;
declare const ListRow: ({ children, flex, padding, }: PropsWithChildren<{
    flex?: boolean | undefined;
    padding?: boolean | undefined;
}>) => JSX.Element;
export declare type ListPropTypes = PropsWithChildren<{}>;
declare const List: ({ children }: {
    children?: import("react").ReactNode;
}) => JSX.Element;
export default List;
export { ListRow };
//# sourceMappingURL=index.d.ts.map