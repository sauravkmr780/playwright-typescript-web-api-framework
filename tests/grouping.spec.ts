import { test, expect } from "@playwright/test";
/*
test.describe() --> Most IMP - Never use async in describe block.
test.describe() --> Synchronous ONLY (It's just a folder/grouping structure to register tests).
test() / beforeAll() / beforeEach() / afterEach() / afterAll()-->  Async (Where the actual browser actions, API calls, and assertions happen).
•Purpose: Group related tests together.
•Use Case: Organize tests by feature, page, or functionality.
*/
test.describe('Group1',()=>{
test("test 1 ", async ({ page }) => {
// test logic
console.log('This is test 1');
});

test("test 2 ", async ({ page }) => {
// test logic
console.log('This is test 2');
});

})

test.describe('Group2',()=>{

    test("test 3 ", async ({ page }) => {
// test logic
console.log('This is test 3');
});

test("test 4 ", async ({ page }) => {
// test logic
console.log('This is test 4');
});
})

