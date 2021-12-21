import ts from 'rollup-plugin-ts';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import tsTreeshaking from 'rollup-plugin-ts-treeshaking';
import bundleSize from 'rollup-plugin-bundle-size';
import pkg from './package.json';
import utl from './package.json';


export default [
  {
    input: './src/index.ts',
    external: Object.keys(pkg.devDependencies),
    plugins: [resolve(), json(), typescript(), tsTreeshaking(), bundleSize(), ts({ tsconfig: 'tsconfig.json' })],
    onwarn: function (warning) {
      if (warning.code === 'THIS_IS_UNDEFINED') {
        return;
      }
      console.warn(warning.message);
    },
    output: [
      {
        file: 'dist/Store.ejs',
        name: 'Store',
        format: 'es',
        exports: 'named',
        sourcemap: true
      },
      {
        file: 'dist/Store.js',
        name: 'Store',
        format: 'umd',
        exports: 'named',
        sourcemap: true
      },
      {
        file: 'dist/Store.ts',
        name: 'Store',
        format: 'es',        
        exports: 'auto',
        sourcemap: true
      }
    ]
  }
];