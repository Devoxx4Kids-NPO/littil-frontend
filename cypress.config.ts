import { defineConfig } from 'cypress';
import webpack from '@cypress/webpack-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200', // Adjust to your app's base URL
    specPattern: '**/*.feature', // Path to your feature files
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        'file:preprocessor',
        webpack({
          webpackOptions: {
            resolve: {
              extensions: ['.ts', '.js'],
            },
            module: {
              rules: [
                {
                  test: /\.ts$/,
                  exclude: /node_modules/,
                  use: 'ts-loader',
                },
                {
                  test: /\.feature$/, use: [
                    {
                      loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                      options: config,
                    },
                  ],
                },
              ],
            },
          },
        })
      );
      return config;
    },
  },
});
