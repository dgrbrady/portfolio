/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// const webpackConfig = require('./webpack.config');
// const { startDevServer } = require('@cypress/webpack-dev-server');
import * as webpackConfig from './webpack.config';

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  const { startDevServer } = require('@cypress/webpack-dev-server');
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('dev-server:start', (options) => {
    /* const componentFolder: string = options.config.component.componentFolder;
    const wp = {...webpackConfig};
    const tsLoader = {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    };

    if (componentFolder.startsWith('apps')) {
      tsLoader.options['configFile'] = 'tsconfig.app.json'
    } else if (componentFolder.startsWith('libs')) {
      tsLoader.options['configFile'] = 'tsconfig.lib.json'
    }

    const tsWebpackRule = {
      test: /\.ts$/,
      use: [
        {
          ...tsLoader
        },
        {
          loader: 'angular2-template-loader',
        },
      ],
      exclude: [/node_modules/, /test.ts/, /polyfills.ts/],
    };
    wp['module'].rules.push(tsWebpackRule);
    console.log('==================== wp ================')
    console.dir(wp); */

    // const rules = [tsWebpackRule, ...webpackConfig['module']['rules']];
    // const webpackModule = {...webpackConfig['module'] };
    // webpackModule.rules = rules;
    // const wp = {...webpackModule, module: {...webpackModule} }
    // webpackConfig['module']['rules'].push(tsWebpackRule)

    return startDevServer({
      options,
      webpackConfig
      // wp,
    });
  });
  return config;
}
