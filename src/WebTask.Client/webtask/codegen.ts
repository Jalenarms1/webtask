
import type { CodegenConfig } from '@graphql-codegen/cli';

// const config: CodegenConfig = {
//   overwrite: true,
//   schema: "http://localhost:5050/graphql",
//   documents: "graphql/gen/**/*.graphql",
//   generates: {
//     "graphql/client/generated.ts": {
//       plugins: [
//         "typescript",
//         "typescript-operations",
//         "typescript-react-apollo",
//         "typed-document-node"
//       ],
//       config: {
//         withHooks: true,
//         importSources: ['@apollo/client'],
//         apolloReactHooksImportFrom: "@apollo/client",
//         apolloReactCommonImportFrom: "@apollo/client"
//       }
//     }
//   }
// };
const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:5050/graphql",
  documents: "graphql/gen/**/*.graphql",
  generates: {
    "graphql/client/generated.ts": {
      plugins: ["typescript","typescript-operations", "typed-document-node"],
      config: {
        withHooks: true,
        avoidOptionals: {
          // Use `null` for nullable fields instead of optionals
          field: true,
          // Allow nullable input fields to remain unspecified
          inputValue: false,
        },
        // Use `unknown` instead of `any` for unconfigured scalars
        defaultScalarType: "unknown",
        // Apollo Client always includes `__typename` fields
        nonOptionalTypename: true,
        // Apollo Client doesn't add the `__typename` field to root types so
        // don't generate a type for the `__typename` for root operation types.
        skipTypeNameForRoot: true,
      },
    },
  },
};


export default config;
