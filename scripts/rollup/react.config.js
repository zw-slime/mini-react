import { getPackageJSON, resolvePkgPath, getBaseRollupPlugins } from './utils.js';

import generatePackageJson from 'rollup-plugin-generate-package-json';
import path from 'path';

const { name } = getPackageJSON('react');
const pkgPath = resolvePkgPath(name);
const pkgDistPath = resolvePkgPath(name, true);

const basePlugins = getBaseRollupPlugins({
  typescript: {
    tsconfigOverride: {
      compilerOptions: {
        baseUrl: path.resolve(pkgPath, '../'),
        paths: {
          hostConfig: [`./${name}/src/hostConfig.ts`]
        }
      }
    }
  }
});



export default [{
  input: `${pkgPath}/index.ts`,
  output: {
    file: `${pkgDistPath}/index.js`,
    name: 'index.js',
    format: 'umd'
  },
  plugins: [
    ...basePlugins,
    generatePackageJson({
      inputFolder: pkgPath,
      outputFolder: pkgDistPath,
      baseContents: ({ name, description, version }) => ({
        name,
        description,
        version,
        main: 'index.js'
      })
    })
  ]

},// jsx-runtime
  {
    input: `${pkgPath}/jsx-dev-runtime.ts`,
    output: [
      {
        file: `${pkgDistPath}/jsx-dev-runtime.js`,
        name: 'jsx-runtime.js',
        format: 'umd'
      }
    ],
    plugins: basePlugins
  },
  {
    input: `${pkgPath}/jsx-runtime.ts`,
    output: [
      {
        file: `${pkgDistPath}/jsx-runtime.js`,
        name: 'jsx-runtime.js',
        format: 'umd'
      }
    ],
    plugins: basePlugins
  }]
