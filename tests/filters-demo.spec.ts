import {test, expect} from '@playwright/test';

/* ======================================================
    Playwright Locator Filters 

    1.Verify "Add to cart" for Product 2   
    2.Count items not having "Out of stock"
    3.Find items with "In stock"
    4.Verify elements using data-testid
    5.Count all elements with test ids
    6.Find "Say goodbye" button for John
    7.Find "Say hello" button for Mary
    8.Find "Subscribe" buttons using multiple conditions
    9.Find "details" buttons for done tasks
    10.Verify stock status counts

======================================================*/


test.beforeEach('Launch application', async({page})=>{
    await page.goto('https://sdetqa.vercel.app/filters_practice');
})

test.afterAll('close the application', async ({page})=>{
    await page.close();
})

test.describe('Test suite related to filters usage',()=>{
test('Verify "Add to cart" for Product 2', async ({page})=>{
   const product2AddToCart = page.getByRole('listitem').filter({hasText:'Product 2'}).getByRole('button',{name:'Add to cart'});
   await expect(product2AddToCart).toBeVisible();
})

test('Count items not having "Out of stock"', async ({page})=>{
   const countItem = page.locator('.card').nth(1).getByRole('listitem').filter({hasNotText:'Out of stock'});
   await expect(countItem).toHaveCount(3);
})

test('Find items with "In stock"', async ({page})=>{
   const countItem = page.getByRole('listitem').filter({hasText:'In stock'});
   await expect(countItem).toHaveCount(3);
})

test('Verify elements using data-testid', async ({page})=>{
    const apple = page.getByTestId('apple');
    const banana = page.getByTestId('banana');
    const orange = page.getByTestId('orange');

    await expect(apple).toBeVisible();
    await expect(banana).toBeVisible();
    await expect(orange).toBeVisible();

    await expect(apple).toContainText('apple')
    await expect(banana).toContainText('banana');
    await expect(orange).toContainText('orange');    
})

test('Count all elements with test ids', async ({page})=>{
    const count = page.locator('[data-testid]');
    await expect(count).toHaveCount(5)
})

test('Find "Say goodbye" button for John', async ({page})=>{
  const goodbyeButtonForJohn = page.getByRole('listitem').filter({hasText:'John'}).getByRole('button',{name:'Say goodbye'});
  await expect(goodbyeButtonForJohn).toBeVisible();

})

test('Find "Say hello" button for Mary', async ({page})=>{
  const sayHelloButtonForMary = page.getByRole('listitem').filter({hasText:'Mary'}).getByRole('button',{name:'Say hello'});
  await expect(sayHelloButtonForMary).toBeVisible();

})

test('Find "Subscribe" buttons using multiple conditions', async ({page})=>{
  const subscribeButton = page.getByRole('button').and(page.getByTitle('Subscribe',{exact:true})).first();
  await expect(subscribeButton).toBeVisible();

})

test('Find "details" buttons for done tasks', async ({page})=>{
  const detailsButtonsforDone = page.getByRole('listitem').filter({hasText:'done'}).getByRole('button',{name:'details'})
  await expect(detailsButtonsforDone).toHaveCount(2);
})

test('Verify stock status counts', async ({page})=>{
  const inStock = page.getByRole('listitem').filter({hasText:'In stock'});
  const outOfStock = page.getByRole('listitem').filter({hasText:'Out of stock'});
  await expect(inStock).toHaveCount(3);
  await expect(outOfStock).toHaveCount(2);
})

})



