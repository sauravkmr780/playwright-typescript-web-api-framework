import {test, expect, APIResponse} from '@playwright/test';
import { faker } from "@faker-js/faker";

test.describe('GET api rquest and its valiation either path parameter or query parameter',()=>{
test('Get reponse based on booking id as path parameter', async ({request})=>{
   const bookingId = faker.number.int({ min: 10, max: 100 })
   //Request using path parameter
    const res:APIResponse =  await request.get(`/booking/${bookingId}`)
    //Validate status message
    expect(res.ok()).toBeTruthy();
    //Validate status code
    expect(res.status()).toBe(200);
    const resJsonBody = await res.json();
    console.log('Full Response body', resJsonBody);
    //Validate booking attributes details present in response.
    expect(resJsonBody).toHaveProperty('firstname');
    expect(resJsonBody).toHaveProperty('lastname');
    expect(resJsonBody).toHaveProperty('totalprice');
    expect(resJsonBody).toHaveProperty('depositpaid');
    expect(resJsonBody).toHaveProperty('additionalneeds');   
    expect(resJsonBody.bookingdates).toHaveProperty('checkin');
    expect(resJsonBody.bookingdates).toHaveProperty('checkout');
    
})

test('Get reponse based on booking id as query parameter', async ({request})=>{
   //Request using query parameter
    const res:APIResponse =  await request.get('/booking',{
        params:{
                'firstname':'Saurav',
                'lastname': 'Kumar',
        }
    })
    //Validate status message
    expect(res.ok()).toBeTruthy();
    //Validate status code
    expect(res.status()).toBe(200);
    const resJsonBody = await res.json();
    console.log('Full Response body', resJsonBody);
    //Validate booking attributes details present in response.
    expect(resJsonBody).not.toBeNull();
    expect(resJsonBody.length).toBeGreaterThan(0);
    //Validation of array response
    for (const data of resJsonBody){
        expect(data).toHaveProperty('bookingid');
        expect(data.bookingid).toBeGreaterThan(0);
        expect(typeof(data.bookingid)).toBe('number');
    }

})
})

