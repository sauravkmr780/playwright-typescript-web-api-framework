import {test, expect} from '@playwright/test';
//api mocking and network inetrception - Real URL - https://demo.playwright.dev/api-mocking/

test("Modifying api response without fetching real response only my fake details as response", async ({ page }) => {
  // Mock the api call before navigating Route url-https://demo.playwright.dev/api-mocking/api/v1/fruits
  await page.route('*/**/api/v1/fruits', async route => {
    const fakeResponse = [{ name: 'Priyanka', id: 21 }, { name: 'Saurav', id: 45 } ];
    // fullfill the request with mock data
    await route.fulfill({ 
        status:200,
        contentType:'application/json' ,
        body : JSON.stringify(fakeResponse)
    });
  });
  // Go to the page
  await page.goto('https://demo.playwright.dev/api-mocking');

  // Assert that the mock value are visible
  await expect(page.getByText('Priyanka')).toBeVisible();
  await expect(page.getByText('Saurav')).toBeVisible();

});


test("Modify api response with existing real server response and adding my fake details", async ({ page }) => {
  // Mock the api call before navigating 
  await page.route('*/**/api/v1/fruits', async route => {
    const response = await route.fetch();
    const json = await response.json();
    //Append my own data on existing real response
    json.push({ name: 'Loquat', id: 100 });
    // Fulfill using the original response, while patching the response body
    // with the given JSON object.
    await route.fulfill({ 
     response,   
     json
    });

  });
  // Go to the page
  await page.goto('https://demo.playwright.dev/api-mocking');
  await expect(page.getByText('Loquat', { exact: true })).toBeVisible();


});


test("Modify api response with Blocking images ", async ({ page }) => {
  //Blocking images
  await page.route("**/*.{png,jpeg,jpg,svg,webp}", async (route) => {
    //print all the blocked url
    console.log(route.request().url());
    route.abort();
  })

  // Go to the page
  await page.goto('https://demoblaze.com/');
});