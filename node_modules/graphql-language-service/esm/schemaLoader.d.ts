import { IntrospectionOptions, IntrospectionQuery, DocumentNode, BuildSchemaOptions } from 'graphql';
export declare type SchemaConfig = {
    uri: string;
    requestOpts?: RequestInit;
    introspectionOptions?: IntrospectionOptions;
    buildSchemaOptions?: BuildSchemaOptions;
};
export declare type SchemaResponse = IntrospectionQuery | DocumentNode;
export declare type SchemaLoader = (config: SchemaConfig) => Promise<SchemaResponse>;
export declare const defaultSchemaLoader: SchemaLoader;
export declare function defaultSchemaBuilder(response: SchemaResponse, buildSchemaOptions?: BuildSchemaOptions): import("graphql").GraphQLSchema;
//# sourceMappingURL=schemaLoader.d.ts.map