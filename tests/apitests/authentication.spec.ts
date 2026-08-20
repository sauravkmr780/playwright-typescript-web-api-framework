/*
1. No Auth (public api)
2. Basic Auth/Preemptive (username and password) authentication
3. Bearer token authentication
4. API key authentication
*/

import {test, expect} from '@playwright/test';

test('No Auth- public api authentication', async ({request})=>{
   const response  = await request.get('https://jsonplaceholder.typicode.com/posts/2');
   expect(response.ok()).toBeTruthy();
   expect(response.status()).toBe(200)

   const responseBody = await response.json();
   console.log(responseBody);
})

test('Basic authentication', async ({request})=>{
  const username = 'user';
  const password = 'pass';
  const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');

   const response  = await request.get('https://httpbin.org/basic-auth/user/pass',{
    headers:{
          Authorization: `Basic ${base64Credentials}`}
   });
   expect(response.ok()).toBeTruthy();
   expect(response.status()).toBe(200)

   const responseBody = await response.json();
   console.log(responseBody);
})

test('Bearer token authentication', async ({request})=>{
   const token = 'Need to fill from github PAT';//removed real token due to security purpose to avoid unauthorized access

   const response  = await request.get('https://api.github.com/user/repos',{
    headers:
    {
          Authorization: `Bearer ${token}`
    }
  }
);
   expect(response.ok()).toBeTruthy();
   expect(response.status()).toBe(200)

   const responseBody = await response.json();
   console.log(responseBody);
})

test('api-key authentication', async ({request})=>{
   const apikey = 'Need to fill from github PAT';//removed real api-key due to security purpose to avoid unauthorized access
   const response  = await request.get('https://api.openweathermap.org/data/2.5/weather',{
    params:
    {
        q:'Toronto',
        appid:apikey////removed real api-key due to security purpose to avoid unauthorized access
    }
  }
);
   expect(response.ok()).toBeTruthy();
   expect(response.status()).toBe(200)

   const responseBody = await response.json();
   console.log(responseBody);
})