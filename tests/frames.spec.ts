/*
Frames:
An iframe (inline frame) is an HTML element that allows one HTML document to be embedded inside another.
Commonly used to include:
•YouTube videos
•Google Maps
•Other webpages inside the current page

page.frames()
•Returns a list of all frames on the current page.
•Helps in understanding how many iframes exist.

page.frame()
•Used to access a specific frame by its URL or name.
•Returns a Frame object that allows us to interact with elements inside the iframe.

page.frameLocator()
•A newer and preferred way to work with frames.
•Allows you to directly locate elements inside an iframe using Playwright's powerful locators.
•More stable than page.frame().

childFrames()
•If a frame contains another nested frame, you can access it using frame.childFrames().

*/

import{test, expect,Locator} from '@playwright/test';

test('Working with iframe',async({page})=>{
    await page.goto('https://ui.vision/demo/webtest/frames/');
    await expect(page).toHaveURL(/frames/);
    const frameCountonpage = page.frames().length;
    console.log("Number of frames on Page: ",frameCountonpage);
    //Approach 1 - page.frame()
    const frame = page.frame({url :'https://ui.vision/demo/webtest/frames/frame_1'});
    if(frame){
    await frame.locator('input[name="mytext1"]').fill('Saurav Kumar');
    await expect(frame.locator('input[name="mytext1"]')).toHaveValue('Saurav Kumar');
    }
    else{
        console.log('Frame is not available');
    }
    //Approach 2 - using page.framelocator()
    const frLoc = page.frameLocator('[src="frame_1.html"]');
    frLoc.locator('input[name="mytext1"]').fill('Priyanka');
    await expect(frLoc.locator('input[name="mytext1"]')).toHaveValue('Priyanka');

})

test('Nested frames (parent-child) multiple frames concept',async({page})=>{
    await page.goto('https://ui.vision/demo/webtest/frames/');
    await expect(page).toHaveURL(/frames/);
    //Best approach - using framelocator way
    //parent frame
    const fr3 = page.frameLocator('[src="frame_3.html"]');
    //based on parent frame locator now moving into child frame using another framelocator
    await fr3.frameLocator('iframe').locator('div#i9').check();
    await expect(fr3.frameLocator('iframe').locator('div#i9')).toBeChecked();

    
    //Another way-using page.frame()
    const frame3 = page.frame({url:'https://ui.vision/demo/webtest/frames/frame_3'});
    if(frame3){
    await frame3.locator('[name="mytext3"]').fill('John Cena');
    await expect(frame3?.locator('[name="mytext3"]')).toHaveValue('John Cena');
    const childFrm = frame3.childFrames();
    //How many child frame within frame3
    console.log('Number of child frame within frame3 is -->',frame3.childFrames().length);
    //asonly 1 child frame hence passing [0] to access first index value of childframe.
    await childFrm[0].getByLabel('Hi, I am the UI.Vision IDE').check();
    await expect(childFrm[0].getByLabel('Hi, I am the UI.Vision IDE')).toBeChecked();
    }
    else{
        console.log('frame 3 does not exist!');
    }

})