import { SxStyleProp } from 'theme-ui';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
export declare type DividerProps = {
    innerSx: SxStyleProp;
};
export declare type WithDividersPropTypes = {
    padding?: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
declare const WithDividers: ({ children, padding, ...props }: WithDividersPropTypes) => JSX.Element;
export default WithDividers;
//# sourceMappingURL=WithDividers.d.ts.map