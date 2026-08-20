import{test,expect} from '@playwright/test';

test('Assignment on iframes', async ({page})=>{
   await page.goto('https://ui.vision/demo/webtest/frames/');
   await expect(page).toHaveURL(/frames/);
   const fr5 = page.frameLocator('[src="frame_5.html"]');
   await fr5.locator('[name="mytext5"]').fill('Welcome Saurav!');
   await expect(fr5.locator('[name="mytext5"]')).toHaveValue('Welcome Saurav!');
   // after link click it opens a new iframe
   await fr5.getByRole('link').click();
   await expect(fr5.getByAltText('Ui.Vision by a9t9 software - Image-Driven Automation')).toBeVisible();
})