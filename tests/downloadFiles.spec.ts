import { test,expect, Download } from "@playwright/test";
import * as fs from 'fs';
import * as path from 'path';

test('Download text - file validation', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html');
    await page.getByRole('textbox',{name:'Enter Text:'}).fill('Welcome');
    //click generate and download text button
    await page.getByRole('button',{name:'Generate and Download Text File'}).click();
    await expect(page.getByRole('link',{name:'Download Text File'})).toBeVisible();
    //click download link with event listener - waitForEvent('download')
    const [download] = await Promise.all([page.waitForEvent('download'),page.getByRole('link',{name:'Download Text File'}).click()])
    //save file to path with custom filename
    const downloadpath = 'downloads/textFile.txt';
    await download.saveAs(downloadpath);
    //verify whether file is download successfully or not and readfile whether same text present or not
    /*
     To use fs module of typescript and avoid error we need to install 
     1 npm install --save-dev @types/node
     2 setup tsconfig.json and include - "types": ["node"] 
    */
   //we can check whether file exist or not using fs.existsSync() ,return boolean value - true/false
    const fileexists = fs.existsSync(downloadpath);
    expect(fileexists).toBeTruthy();
    //we can read file data from file -- using fs.readFileSync()
    const fileDetails = fs.readFileSync(downloadpath,'utf-8');
    console.log(fileDetails);
    expect(fileDetails).toBe('Welcome');

    //automatically clean up downloaded files after validation
    if(fileexists){
        fs.unlinkSync(downloadpath);
    }
})

test('Download pdf - file validation', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html');
    await page.getByRole('textbox',{name:'Enter Text:'}).fill('Welcome');
    //click generate and download pdf button
    await page.getByRole('button',{name:'Generate and Download PDF File'}).click();
    await expect(page.getByRole('link',{name:'Download PDF File'})).toBeVisible();
    //click download link
    const [download] = await Promise.all([page.waitForEvent('download'),page.getByRole('link',{name:'Download PDF File'}).click()])
    //save file to path with custom filename
    const downloadpath = 'downloads/textFile.pdf';
    await download.saveAs(downloadpath);
    const fileexists = fs.existsSync(downloadpath);
    expect(fileexists).toBeTruthy();
    //we can read file data from file -- using fs.readFileSync()
    const fileDetails = fs.readFileSync(downloadpath,'utf-8');
    console.log(fileDetails);
    expect(fileDetails).toBe('Welcome');

    //automatically clean up downloaded files after validation
    if(fileexists){
        fs.unlinkSync(downloadpath);
    }
})

//extra validation to run this in cicd path with adding folder structure and proper cleanup
test('IMP- Download text - file validation with proper run in cicd path', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html');
  await page.getByRole('textbox', { name: 'Enter Text:' }).fill('Welcome');

  // Click generate and download text button
  await page.getByRole('button', { name: 'Generate and Download Text File' }).click();
  await expect(page.getByRole('link', { name: 'Download Text File' })).toBeVisible();

  // Define dynamic downloads directory path using path.join
  //const downloadsDir = path.join(__dirname, 'downloads'); -- this will add download folder inside test folder as __dirname = The absolute path to the directory where the current test file resides (.../PWDEMOS/tests).
  const downloadsDir = path.join(__dirname, '..', 'downloads'); //this will add folder at root level

  //FIX 1: Ensure directory exists in clean CI containers
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
  }

  // FIX 2: Use unique filename per test run to prevent parallel worker collisions
  const downloadPath = path.join(downloadsDir, `textFile_${Date.now()}.txt`);

  // Wait for download event and trigger click
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('link', { name: 'Download Text File' }).click()
  ]);

  // Save downloaded file
  await download.saveAs(downloadPath);

  // Validate file existence
  const fileExists = fs.existsSync(downloadPath);
  expect(fileExists).toBeTruthy();

  // Read and assert file content
  const fileDetails = fs.readFileSync(downloadPath, 'utf-8');
  console.log('Downloaded File Content:', fileDetails);
  expect(fileDetails.trim()).toBe('Welcome');

  // Cleanup downloaded file
  if (fileExists) {
    fs.unlinkSync(downloadPath);
  }
});