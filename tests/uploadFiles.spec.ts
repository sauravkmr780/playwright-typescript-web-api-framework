import { test,expect } from "@playwright/test";

test('Single File Upload validation', async({page})=>{
  await page.goto('https://testautomationpractice.blogspot.com/');
  const filename = 'Day22-Actions.pdf';
  //single file upload
  await page.locator('#singleFileInput').setInputFiles(`uploads/${filename}`);
  //click upload button
  await page.getByRole('button',{name:'Upload Single File'}).click();
  //text after upload
  const uploadText = await page.locator('#singleFileStatus').innerText();
  expect(uploadText).toContain(`Single file selected: ${filename}`);
  console.log('Upload Successful!');
})

test('Multiple File Upload validation', async({page})=>{
  await page.goto('https://testautomationpractice.blogspot.com/');
  const filename1 = 'Day22-Actions.pdf';
  const filename2 = 'Day22-Lab.pdf';
  //multiple files upload
  await page.locator('#multipleFilesInput').setInputFiles([`uploads/${filename1}`,`uploads/${filename2}`]);
  //click upload button
  await page.getByRole('button',{name:'Upload Multiple Files'}).click();
  //text after upload
  const uploadText = await page.locator('#multipleFilesStatus').innerText();
  expect(uploadText).toContain('Multiple files selected');
  expect(uploadText).toContain(filename1);
  expect(uploadText).toContain(filename2);
  console.log('Upload Successful!');

})