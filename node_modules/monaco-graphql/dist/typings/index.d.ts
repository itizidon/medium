import type { SchemaConfig as SchemaConfiguration, GraphQLLanguageConfig } from 'graphql-language-service';
import type { Options as PrettierConfig } from 'prettier';
export interface IDisposable {
    dispose(): void;
}
export declare type SchemaConfig = SchemaConfiguration;
export interface IEvent<T> {
    (listener: (e: T) => any, thisArg?: any): IDisposable;
}
export declare type FilePointer = string | string[];
export declare type FormattingOptions = {
    prettierConfig?: PrettierConfig;
};
export interface ModeConfiguration {
    readonly documentFormattingEdits?: boolean;
    readonly documentRangeFormattingEdits?: boolean;
    readonly completionItems?: boolean;
    readonly hovers?: boolean;
    readonly documentSymbols?: boolean;
    readonly tokens?: boolean;
    readonly colors?: boolean;
    readonly foldingRanges?: boolean;
    readonly diagnostics?: boolean;
    readonly selectionRanges?: boolean;
}
export interface ICreateData {
    languageId: string;
    enableSchemaRequest: boolean;
    formattingOptions?: FormattingOptions;
    languageConfig: GraphQLLanguageConfig;
}
//# sourceMappingURL=index.d.ts.map