import ts from 'rollup-plugin-ts';
// import path from 'path'
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import tsTreeshaking from 'rollup-plugin-ts-treeshaking';
import bundleSize from 'rollup-plugin-bundle-size';
import * as pkg from './package.json';

export default [
  {
    input: './src/uStore.ts',
    external: Object.keys(pkg.devDependencies),
    plugins: [
      resolve(),
      json(),
      typescript(),
      tsTreeshaking(),
      bundleSize(),
      ts({ tsconfig: 'tsconfig.json' })
    ],
    onwarn: function (warning) {
      if (warning.code === 'THIS_IS_UNDEFINED') {
        return;
      }

      console.warn(warning.message);
    },
    output: [
      {
        file: 'dist/uStore.ejs',
        name: 'uStore',
        format: 'es',
        exports: 'named',
        sourcemap: true
      },
      {
        file: 'dist/uStore.js',
        name: 'uStore',
        format: 'umd',
        exports: 'named',
        sourcemap: true
      },
      {
        file: 'dist/uStore.ts',
        name: 'uStore',
        format: 'es',
        exports: 'auto',
        sourcemap: true
      }
    ]
  }
];
