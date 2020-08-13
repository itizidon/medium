import { parse, GraphQLSchema, ParseOptions, ValidationRule } from 'graphql';
import type { Position } from 'graphql-language-service-types';
import { RawSchema } from './types';
import { defaultSchemaLoader, SchemaConfig, SchemaResponse, defaultSchemaBuilder } from './schemaLoader';
export declare type GraphQLLanguageConfig = {
    parser?: typeof parse;
    schemaLoader?: typeof defaultSchemaLoader;
    schemaBuilder?: typeof defaultSchemaBuilder;
    rawSchema?: RawSchema;
    parseOptions?: ParseOptions;
    schemaConfig: SchemaConfig;
};
export declare class LanguageService {
    private _parser;
    private _schema;
    private _schemaConfig;
    private _schemaResponse;
    private _schemaLoader;
    private _schemaBuilder;
    private _rawSchema;
    private _parseOptions;
    constructor({ parser, schemaLoader, schemaBuilder, schemaConfig, rawSchema, parseOptions, }: GraphQLLanguageConfig);
    get schema(): GraphQLSchema;
    getSchema(): Promise<GraphQLSchema>;
    setSchema(schema: RawSchema): Promise<GraphQLSchema>;
    getSchemaResponse(): Promise<SchemaResponse>;
    loadSchemaResponse(): Promise<SchemaResponse>;
    loadSchema(): Promise<GraphQLSchema>;
    parse(text: string, options?: ParseOptions): Promise<import("graphql").DocumentNode>;
    getCompletion: (_uri: string, documentText: string, position: Position) => Promise<import("graphql-language-service-types").CompletionItem[]>;
    getDiagnostics: (_uri: string, documentText: string, customRules?: ValidationRule[] | undefined) => Promise<import("vscode-languageserver-types").Diagnostic[]>;
    getHover: (_uri: string, documentText: string, position: Position) => Promise<string | import("vscode-languageserver-types").MarkupContent | {
        language: string;
        value: string;
    } | import("vscode-languageserver-types").MarkedString[]>;
}
//# sourceMappingURL=LanguageService.d.ts.map