import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Timeout setup //added by Saurav
  //timeout:60000, //test timeout
  // expect:{
  //   timeout:10000  //assertion time out
  // },
  //globalTimeout:90000, //Maximum time in milliseconds the whole test suite can run
  */
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  /* Retry on local */
  //retries:3, //added by Saurav
  //grep:/@sanity/,//run sanity test //added by Saurav
  //grepInvert:/@regression/,//do not runregression test  //added by Saurav
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,//added by Saurav
  workers:4,//added by Saurav
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  reporter:[
        ['html',{open:'on-failure', outputFolder: 'html-report'}],//added by Saurav
        //['list'],//added by Saurav useful in ci reporting
        //['line'],//added by Saurav
        //['dot'],//added by Saurav
        //['junit',{outputFile:'result.xml'}],//added by Saurav
        //['json',{outputFile:'result.json'}],//added by Saurav
        //["allure-playwright"],//added by Saurav allure reporter addition steps added in reporters.spec.ts file
        //['./my-custom-reporter.ts', { customOption: 'some value' }] //custom reporter added by Saurav
  ],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    trace: 'retain-on-failure-and-retries',//in case for failure record trace //added by Saurav
    testIdAttribute:'data-pw',// configured data-testid attribute value //added by Saurav
    //viewport: {width:1280, height:720},  //global viewport setup for all test //added by Saurav
    screenshot:'only-on-failure',//in case for failure record screenshot //added by Saurav
    video:'retain-on-failure',//in case for failure record video //added by Saurav
    //baseURL:'https://restful-booker.herokuapp.com',//added by Saurav for api testing
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
