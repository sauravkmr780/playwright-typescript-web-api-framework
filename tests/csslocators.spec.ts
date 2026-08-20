/*
There are two main types of selectors:
•Absolute CSS Selectors – Follow the full path to find the element.
•Relative CSS Selectors – Find the element using a shortcut path.
Tag with ID tag#id
Tag with Class tag.classname
Tag with Attribute tag[attribute="value"]
Tag with Class and Attribute  tag.classname[attribute="value"]
*/

import {test,expect} from '@playwright/test';

test('Css locators in automation',async ({page})=>{
    await page.goto('https://demowebshop.tricentis.com/');
    //tag#id
    //await page.locator('input#small-searchterms').fill('Fiction EX');
    //tag.class
    //await page.locator('input.search-box-text').fill('Fiction EX');
    //tag with another attribute
    //await page.locator('input[value="Search store"]').fill('Fiction EX');
    //await page.locator('input[name=q]').fill('Fiction EX');
    //tag.classname[attribute="value"]
    //await page.locator('input.search-box-text[value="Search store"]').fill('Fiction EX');
    //await page.locator('input.search-box-text[name=q]').fill('Fiction EX');

    /*
Attribute Selectors (Pattern Matching)
Use these when you want to match part of an attribute's value.
Class starts with "ma" ---> p[class^='ma']
Class ends with "ub" --> p[class$='ub']
Class contains "ai"--> p[class*='ai']
    */
});