import {test,expect,Locator} from '@playwright/test';

test('Static web table',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    //capture table element
    const table:Locator = page.locator('table[name="BookTable"] tbody');
    await expect(table).toBeVisible();
    // Validate number of row is 6 and column 4
    const tableRows:Locator = page.locator('table[name="BookTable"] tbody tr');
    await expect(tableRows).toHaveCount(7);
    const tableColumns:Locator = page.locator('table[name="BookTable"] tbody tr th');
    await expect(tableColumns).toHaveCount(4);

    //Reading Data from a Specific Row:2
    const secondRow:Locator =  page.locator('table[name="BookTable"] tbody tr').nth(1).locator('td');
    const tableSecondRowsText:string[] = await page.locator('table[name="BookTable"] tbody tr').nth(1).locator('td').allInnerTexts();
    //const newformattedSecondRow:string[] = tableSecondRowsText.map(i=>i.trim().replaceAll('\t',','));
    console.log(tableSecondRowsText);
    await expect(secondRow).toHaveText([ 'Learn Selenium', 'Amit', 'Selenium', '300' ]);
    
    //Reading All Data (excluding header):
    const tableData:Locator = page.locator('table[name="BookTable"] tbody tr td');
    //normal for loop
    console.log('*****using normal for loop*******')
    for (let i = 0; i<await tableData.count() ; i++){
        console.log(await tableData.nth(i).innerText());
    }
    console.log('*****using for in loop*******')
    const tableallData:Locator[] = await page.locator('table[name="BookTable"] tbody tr td').all();
    for (const i in tableallData){
        console.log(await tableallData[i].innerText());
    }
    console.log('*****using for of loop*******')
    //using for of loop
    for (const data of tableallData){
        console.log(await data.innerText());
    }
    //using allinnerText() approach
    console.log('*****using for of loop*******')
    const dataValue:Array<string> = await page.locator('table[name="BookTable"] tbody tr td').allInnerTexts();
    console.log(dataValue);

    //Filtering Rows Based on Cell Value (Author = Mukesh):
    const allData = page.locator('table[name="BookTable"] tbody tr td');
    for(let i =0 ; i <await allData.count();i++ ){
        const author = await allData.nth(i).innerText();
        const bookName = await allData.nth(i-1).innerText();
        if(author==="Mukesh"){
          console.log(`Book Name written by Mukesh is ${bookName}`);
        }
    }
    // Using another approach
    const allRowsData:Locator[] = (await page.locator('table[name="BookTable"] tbody tr').all()).slice(1);
    const mukeshBooks:string[] =[];
    for (const data of allRowsData){
        const cell:string[]=await data.locator('td').allInnerTexts();
        let bookName = cell[0]
        let authorName = cell[1];
        if(cell[1]==="Mukesh"){
            console.log(`${authorName} \t ${bookName} `);
            mukeshBooks.push(`${bookName}`);
        }
    }
    console.log('Book written by Mukesh is ' , mukeshBooks);
    //expect(mukeshBooks.length).toBe(2);
    expect(mukeshBooks).toHaveLength(2);

    //price totalsum of all value of price column
    let totalPrice =0;
    for (const data of allRowsData){
        const cell:string[]=await data.locator('td').allInnerTexts();
        const priceCell = cell[3];
        totalPrice+=parseInt(priceCell);
    }
    console.log(`Total price of aggerate of Price column is ${totalPrice}`);
    expect(totalPrice).toBe(7100);
})