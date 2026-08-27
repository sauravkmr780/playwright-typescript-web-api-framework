/*
1. No Auth (public api)
2. Basic Auth/Preemptive (username and password) authentication
3. API key authentication 
4. Bearer token authentication
5. OAuth2.0 authentication
*/

import {test, expect} from '@playwright/test';
//Enable these in playwright.config.ts file so each file can access .env values
// import dotenv from 'dotenv';
// dotenv.config()

test('No Auth- public api authentication', async ({request})=>{
   const response  = await request.get('https://jsonplaceholder.typicode.com/posts/2');
   expect(response.ok()).toBeTruthy();
   expect(response.status()).toBe(200)

   const responseBody = await response.json();
   console.log(responseBody);
})

test('Basic authentication', async ({request})=>{
  const username = process.env.AUTH_USERNAME
  const password = process.env.AUTH_PASSWORD
  const base64Credentials = Buffer.from(`${username}:${password}`).toString('base64');
  console.log('Encoded value',base64Credentials);//cG9zdG1hbjpwYXNzd29yZA==

   const response  = await request.get('https://postman-echo.com/basic-auth',{
    headers:{
          Authorization: `Basic ${base64Credentials}`}
   });
   expect(response.ok()).toBeTruthy();
   expect(response.status()).toBe(200)

   const responseBody = await response.json();
   console.log(responseBody);
})

test('api-key authentication with OpenWeatherMap', async ({ request }) => {
  const apikey = process.env.WEATHER_API_KEY;

  const response = await request.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: 'Toronto,CA',
      appid: apikey!,//sometimes value can be undefined so passing ! at the end
    },
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody.name).toBe('Toronto');
});

test('Bearer token authentication', async ({request})=>{
   const token = process.env.GITHUB_TOKEN//placed in .env file and .env placed in .gitignore file
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

let accessToken="";
const repoName = `Playwright-Auth-demo-${Date.now()}`;

test.describe.configure({mode:'serial'})
test.describe('Auth2.0 authentication', () => {
test('Generate Access token', async ({request})=>{
   const GITHUB_CONFIG= {
      client_id:process.env.GITHUB_CLIENT_ID!,
      client_secret :process.env.GITHUB_CLIENT_SECRET!,
      authorizationCode:process.env.GITHUB_AUTHORIZATION_CODE!,
      token_url:process.env.GITHUB_TOKEN_URL!,
      api_url:process.env.GITHUB_API_BASE_URL!,
      owner:process.env.GITHUB_USERNAME!
   }


   const response  = await request.post(GITHUB_CONFIG.token_url,{
   headers:{
    Accept:'application/json',
   },   
   form:{
      client_id:GITHUB_CONFIG.client_id,
      client_secret:GITHUB_CONFIG.client_secret,
      code:GITHUB_CONFIG.authorizationCode
   }
  });
   expect(response.ok()).toBeTruthy();
   expect(response.status()).toBe(200)

   const responseBody = await response.json();
   accessToken= responseBody.access_token
   console.log('Access token: ', accessToken);


})

test('Create Repository', async ({request})=>{
   const GITHUB_CONFIG= {
      api_url:process.env.GITHUB_API_BASE_URL!,
   }

   const response  = await request.post(`${GITHUB_CONFIG.api_url}/user/repos`,{
   headers:{
      Accept: "application/vnd.github+json",
      Authorization:`Bearer ${accessToken}`
   },   
   data:{
     name:`${repoName}`,
     description:'Repository created while tetsing playwright-auth2.0 process',
     private:false
   }
  });
   expect(response.ok()).toBeTruthy();
   expect(response.status()).toBe(201)
   const responseBody = await response.json();
   console.log(responseBody);

   console.log('Repository Created successfully!');
})

test('Get Repository', async ({request})=>{
   const GITHUB_CONFIG= {
      api_url:process.env.GITHUB_API_BASE_URL!,
      owner:process.env.GITHUB_USERNAME!
   }

   const response  = await request.get(`${GITHUB_CONFIG.api_url}/repos/${GITHUB_CONFIG.owner}/${repoName}`,{
   headers:{
      Accept: "application/vnd.github+json",
      Authorization:`Bearer ${accessToken}`
   },   
  });
   expect(response.ok()).toBeTruthy();
   expect(response.status()).toBe(200)

   const responseBody = await response.json();
   console.log(responseBody);
   expect(responseBody.name).toBe(repoName);
   expect(responseBody.owner.login).toBe(GITHUB_CONFIG.owner);
   console.log('Repository Retrived successfully!');

})

test('Update Repository', async ({request})=>{
   const GITHUB_CONFIG= {
      api_url:process.env.GITHUB_API_BASE_URL!,
      owner:process.env.GITHUB_USERNAME!
   }

   const response  = await request.patch(`${GITHUB_CONFIG.api_url}/repos/${GITHUB_CONFIG.owner}/${repoName}`,{
   headers:{
      Accept: "application/vnd.github+json",
      Authorization:`Bearer ${accessToken}`
   },
   data:{
     name:`${repoName}`,
     description:'Repository created while tetsing playwright-auth2.0 process for API Chaining',
     private:false
   }   
  });
   expect(response.ok()).toBeTruthy();
   expect(response.status()).toBe(200)

   const responseBody = await response.json();
   console.log(responseBody);
   expect(responseBody.private).toBeFalsy();
   console.log('Repository Updated successfully!')


})

test('Delete Repository', async ({request})=>{
   const GITHUB_CONFIG= {
      api_url:process.env.GITHUB_API_BASE_URL!,
      owner:process.env.GITHUB_USERNAME!
   }

   const response  = await request.delete(`${GITHUB_CONFIG.api_url}/repos/${GITHUB_CONFIG.owner}/${repoName}`,{
   headers:{
      Accept: "application/vnd.github+json",
      Authorization:`Bearer ${accessToken}`
   } 
  });
   expect(response.ok()).toBeTruthy();
   expect(response.status()).toBe(204);
   console.log('Repository Deleted successfully!')


})

})


