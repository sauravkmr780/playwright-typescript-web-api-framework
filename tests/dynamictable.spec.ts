import {test,expect, Locator} from '@playwright/test';


test('Verify dynamic table behaviour',async ({page})=>{
   await page.goto('https://practice.expandtesting.com/dynamic-table');
   await expect(page).toHaveURL(/dynamic-table/);
   //Expected value extraction
   const cpuPercentage:string= (await page.locator('p#chrome-cpu').innerText()).split(':')[1].trim().split('%')[0].trim();
   const expectedCpuPercentageValue=parseFloat(cpuPercentage);
   console.log('expectedCPUValue',expectedCpuPercentageValue);
   
   //convert all table rows into Array<Locator>
   const allRows:Locator[] = await page.locator('table tbody tr').all();
   for(const data of allRows){
    let extractedData:string[] = await data.locator('td').allInnerTexts();
    if(extractedData[0]==='Chrome'){
        for(const data of extractedData){
            if(data.includes('%')){
                const actualCpuValue:number = parseFloat(data.split('%')[0].trim());
                console.log('actualCPUValue',actualCpuValue);
                expect(actualCpuValue).toEqual(expectedCpuPercentageValue);
                break
            }
        }
        break
    }
   }
})