import{test,expect,Locator} from '@playwright/test';

test('Mouse hover',async ({page})=>{
   await page.goto('https://testautomationpractice.blogspot.com/');
   // mouse hover on points me button
   await page.getByRole('button',{name:'Point Me'}).hover();
   await expect(page.getByRole('link',{name:'Mobiles'})).toBeVisible();
   await expect(page.getByRole('link',{name:'Laptops'})).toBeVisible();
   //mouse hover on Laptops link
   await page.getByRole('link',{name:'Laptops'}).hover();
})

test('Right click',async ({page})=>{
   await page.goto('https://swisnl.github.io/jQuery-contextMenu/demo/input.html');
   // right click on button
   await page.getByText('right click me', { exact: true }).click({button:'right'});

   //extra validation (selecting dropdown post right click section)
   //await page.locator('select[name="context-menu-input-select"]').selectOption('three');
   //await expect(page.locator('select[name="context-menu-input-select"]')).toHaveValue('3');
  
})

test('Double click',async ({page})=>{
   await page.goto('https://testautomationpractice.blogspot.com/#');
   const value:string = await page.locator('#field1').inputValue();
   // Double click on button
   await expect(page.locator('#field2')).toHaveValue('');
   await page.getByRole('button',{name:'Copy Text'}).dblclick();
   //after double click validation 
  await expect(page.locator('#field2')).toHaveValue(value);
  
})

test('Drag and drop action',async ({page})=>{
   await page.goto('https://testautomationpractice.blogspot.com/#');
   // Approach 1 - Drag and Drop action (Best Recommneded)
   const source:Locator = page.locator('#draggable');
   const target:Locator = page.locator('#droppable');
   await source.dragTo(target);
   const afterDropText:string = await page.locator('#droppable p').innerText();
   //validation after drop
   expect(afterDropText).toContain('Dropped!');
   /*
   //Approach 2 - Using mouse hover manual drag and drop action
   await page.locator('#draggable').hover();
   await page.mouse.down();
   await page.locator('#droppable').hover();
   await page.mouse.up();
   //validation after drop
   const afterDropText:string = await page.locator('#droppable p').innerText();
   expect(afterDropText).toContain('Dropped!');
   */
})

