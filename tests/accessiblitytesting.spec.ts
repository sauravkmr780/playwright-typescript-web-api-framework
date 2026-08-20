/*
What is Accessibility Testing? Accessibility testing ensures that your web application is usable by people with disabilities. 
It checks for compliance with WCAG (Web Content Accessibility Guidelines), covering issues like:
•Missing ALT text on images
•Poor colour contrast
•Missing labels on forms
•Inaccessible keyboard navigation

Every website should follow WCAG protocol guidelines
https://www.w3.org/WAI/standards-guidelines/wcag/

Setting Up Accessibility Testing in Playwright
To get started, install the accessibility testing plugin: details here --https://www.npmjs.com/package/@axe-core/playwright
npm install @axe-core/playwright
This plugin integrates Axe-core, a powerful accessibility engine, into your Playwright tests.

*/



import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Accessibility test', async({page},testInfo)=>{
  //await page.goto('https://demowebshop.tricentis.com/');//page with few accessiblity voilations
  await page.goto('https://www.w3.org/');//page with no WCAG voilations-100% accesiblity standrads
  //1) Scanning detect all types of WCAG voilations
//    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
//    console.log(accessibilityScanResults);
//    console.log('Total number of WCAG voilations: ',accessibilityScanResults.violations.length);//7
//    //expect(accessibilityScanResults.violations).toEqual([]);
//    expect(accessibilityScanResults.violations.length).toEqual(0);

   //2) Scanning detect few WCAG withTags voilations
   //const accessibilityScanResults = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();

   //3) Scanning with few WCAG Rules voilations
   const accessibilityScanResults = await new AxeBuilder({ page }).disableRules(['duplicate-id']).analyze();

   //attaching scan results to reporter
   await testInfo.attach('accessibility-scan-results', {
    body: JSON.stringify(accessibilityScanResults, null, 2),
    contentType: 'application/json'
  });
   console.log(accessibilityScanResults);
   console.log('Total number of WCAG voilations: ',accessibilityScanResults.violations.length);//4
   expect(accessibilityScanResults.violations.length).toEqual(0);    
   

})