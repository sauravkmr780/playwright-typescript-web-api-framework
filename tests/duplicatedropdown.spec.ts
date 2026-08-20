import {test,expect} from'@playwright/test';

test('Verify colors dropdown consist duplicate value or not', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const optionsExistList:string[] = (await page.locator('select#colors option').allTextContents()).map(i=>i.trim());
    console.log('Original Array List',optionsExistList);
    const removedDuplicateList:string[] = [...new Set(optionsExistList)]
    console.log('Distinct array', removedDuplicateList);
    if(optionsExistList.length === removedDuplicateList.length){
     console.log('dropdown does not consist duplicate value!');
    }
    else{
     console.log('dropdown consist duplicate value!');
    }
    expect(optionsExistList.length).not.toBe(removedDuplicateList.length);

})

test('Verify animal dropdown consist duplicate value or not', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const optionsExistList:string[] = (await page.locator('select#animals option').allTextContents()).map(i=>i.trim());
    console.log('Original Array List',optionsExistList);
    const removedDuplicateList:string[] = [...new Set(optionsExistList)]
    console.log('Distinct array', removedDuplicateList);
    if(optionsExistList.length === removedDuplicateList.length){
     console.log('dropdown does not consist duplicate value!');
    }
    else{
     console.log('dropdown consists duplicate value!');
    }
    expect(optionsExistList.length).toBe(removedDuplicateList.length);
})

test('IMP --> Verify colors dropdown consist duplicate value or not using Set and duplicate array', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const optionsExistList:string[] = (await page.locator('select#colors option').allTextContents()).map(i=>i.trim());
    console.log('Original Array List',optionsExistList);
    const myset = new Set();//set for fitering data
    const duplicateArray:string[] = [];

    for (const data of optionsExistList){
        if(myset.has(data)){
           duplicateArray.push(data);
        }
        else{
          myset.add(data);
        }
    }
    console.log("Non Duplicate data exist in set: => ",myset);
    console.log("Duplicate array consist data : => ",duplicateArray);
    //duplicate exist
    expect(duplicateArray.length).toBeGreaterThan(0);
})
