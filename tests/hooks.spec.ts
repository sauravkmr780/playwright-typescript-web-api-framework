import { test, expect } from "@playwright/test";
/*
Playwright provides several hooks to manage how and when tests are executed.
These help in setting up test environments, cleaning up after tests, and organizing or skipping specific tests.

test.beforeEach()
•Purpose: Runs before each individual test.
•Use Case: Set up a fresh state like opening a new page or logging into an app.

test.afterEach()
•Purpose: Runs after each individual test.
•Use Case: Clean up after each test like closing the page or clearing local storage.

test.beforeAll()
•Purpose: Runs once before all tests in a file or a describe block.
•Use Case: Initialize shared resources like launching a browser or setting up test data.

test.afterAll()
•Purpose: Runs once after all tests in a file or a describe block.
•Use Case: Clean up resources like closing the browser or deleting test data.
*/

test.beforeAll('Before All',async()=>{
console.log('This is before all');
})

test.beforeEach('Before each',async () =>{
//login
console.log('This is before each');
})

test.afterEach('After each',async()=>{
//logout
console.log('This is after each');
})

test.afterAll('After All',async()=>{
console.log('This is after all');    
})

test("test 1 ", async () => {
//login
// test logic
console.log('This is test 1');
//logout
});

test("test 2 ", async () => {
//login
// test logic
console.log('This is test 2');
//logout
});

test("test 3 ", async () => {
//login    
// test logic
console.log('This is test 3');
//logout
});

test("test 4 ", async () => {
//login    
// test logic
console.log('This is test 4');
//logout
});


