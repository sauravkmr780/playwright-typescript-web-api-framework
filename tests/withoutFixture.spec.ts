import {test, expect} from '@playwright/test';

test('Login', async({page})=>{
    //login steps
 console.log('Login successful');
})

test('Finding a product', async({page})=>{
    //login steps
 console.log('Finding a product');
 console.log('product not available')
})

test('Add a product to cart', async({page})=>{
    //login steps
 console.log('product added to cart');
})

//login steps is repeating code in both test cases, so we can create a custom fixture once and reuse as many times we want.