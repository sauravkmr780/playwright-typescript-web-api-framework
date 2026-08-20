import { test, expect, Locator  } from "@playwright/test";
import fs  from "fs";
import path  from "path";

test('Assignment -Upload single file',async ({page})=>{
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');
    await page.locator('input#filesToUpload').setInputFiles('uploads/Day22-Actions.pdf');
    await expect(page.locator('#fileList')).toContainText('Day22-Actions.pdf');
})

test('Assignment -Upload multiple file',async ({page})=>{
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');
    await page.locator('input#filesToUpload').setInputFiles(['uploads/Day22-Actions.pdf','uploads/Day22-Lab.pdf']);
    await expect(page.locator('#fileList')).toContainText('Day22-Actions.pdf');
    await expect(page.locator('#fileList')).toContainText('Day22-Lab.pdf');
})

test('IMP - Assignment - Upload multiple files considering cicd ', async ({ page }) => {
  await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');

  // Resolve absolute paths relative to this test file location
  const file1Path = path.join(__dirname, '..','uploads', 'Day22-Actions.pdf');
  const file2Path = path.join(__dirname, '..','uploads', 'Day22-Lab.pdf');

  // IMP - Guard assertion: Ensure files exist in the runner before setting input if not it will return custom error message
  expect(fs.existsSync(file1Path), `File missing at ${file1Path}`).toBeTruthy();
  expect(fs.existsSync(file2Path), `File missing at ${file2Path}`).toBeTruthy();

  // Upload multiple files by passing the array of absolute paths
  await page.locator('input#filesToUpload').setInputFiles([file1Path, file2Path]);

  // Assertions
  await expect(page.locator('#fileList')).toContainText('Day22-Actions.pdf');
  await expect(page.locator('#fileList')).toContainText('Day22-Lab.pdf');
});