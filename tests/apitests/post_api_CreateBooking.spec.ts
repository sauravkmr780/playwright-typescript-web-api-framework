import {test, expect, APIResponse} from '@playwright/test';
import  fs   from "fs";
import { faker  } from '@faker-js/faker';
import { DateTime } from 'luxon';

test.describe('POST api request and validaion',()=>{
test('Create Booking API Request when request payload is static', async ({request})=>{
  //Request payload
  const createBookingPayload = {
    "firstname" : "Saurav",
    "lastname" : "Kumar",
    "totalprice" : 464,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2026-08-20",
        "checkout" : "2026-08-30"
    },
    "additionalneeds" : "Breakfast"
}
  //Request
    const res:APIResponse =  await request.post('/booking',
        {
        data:createBookingPayload
        }
    )
    //Validate status message
    expect(res.ok()).toBeTruthy();
    //Validate status code
    expect(res.status()).toBe(200);
    const resJsonBody = await res.json();
    console.log('Full Response body', resJsonBody);
    //Validate below attributes present or not in json body
    expect(resJsonBody).toHaveProperty('bookingid');
    expect(resJsonBody).toHaveProperty('booking');

    //Validate booking attributes details present in response.
    expect(resJsonBody.booking).toHaveProperty('firstname');
    expect(resJsonBody.booking).toHaveProperty('lastname');
    expect(resJsonBody.booking).toHaveProperty('totalprice');
    expect(resJsonBody.booking).toHaveProperty('depositpaid');
    expect(resJsonBody.booking).toHaveProperty('additionalneeds');   
    expect(resJsonBody.booking.bookingdates).toHaveProperty('checkin');
    expect(resJsonBody.booking.bookingdates).toHaveProperty('checkout');
     
    //Vaidate booking details matches with request payload
    expect(resJsonBody.booking).toMatchObject(createBookingPayload);
    //Vaidate only booking date details matches with request payload
    expect(resJsonBody.booking.bookingdates).toMatchObject({
        "checkin" : "2026-08-20",
        "checkout" : "2026-08-30"
    })
    //Print booking id
    const bookingId = resJsonBody.bookingid;
    console.log('Newly generated booking id: ', bookingId);
    
})

test('Create Booking API Request when request payload is placed on external path', async ({request})=>{
  //Request payload
   const jsonpath = 'testdata/post_bookingRequest.json';
   const requestPayload = await JSON.parse(fs.readFileSync(jsonpath, 'utf-8'))
  //Request
    const res:APIResponse =  await request.post('/booking',
        {
        data:requestPayload
        }
    )
    //Validate status message
    expect(res.ok()).toBeTruthy();
    //Validate status code
    expect(res.status()).toBe(200);
    const resJsonBody = await res.json();
    console.log('Full Response body', resJsonBody);
    //Validate below attributes present or not in json body
    expect(resJsonBody).toHaveProperty('bookingid');
    expect(resJsonBody).toHaveProperty('booking');

    //Validate booking attributes details present in response.
    expect(resJsonBody.booking).toHaveProperty('firstname');
    expect(resJsonBody.booking).toHaveProperty('lastname');
    expect(resJsonBody.booking).toHaveProperty('totalprice');
    expect(resJsonBody.booking).toHaveProperty('depositpaid');
    expect(resJsonBody.booking).toHaveProperty('additionalneeds');   
    expect(resJsonBody.booking.bookingdates).toHaveProperty('checkin');
    expect(resJsonBody.booking.bookingdates).toHaveProperty('checkout');
     
    //Vaidate booking details matches with request payload
    expect(resJsonBody.booking).toMatchObject(requestPayload);
    //Vaidate only booking date details matches with request payload
    expect(resJsonBody.booking.bookingdates).toMatchObject({
        "checkin" : "2026-08-20",
        "checkout" : "2026-08-30"
    })
    //Print booking id
    const bookingId = resJsonBody.bookingid;
    console.log('Newly generated booking id: ', bookingId);
    
})

test('Create Booking API Request when request payload is dynamic- faker + luxon', async ({request})=>{
  //Request payload dynamic generation using faker and luxon
  const firstName= faker.person.firstName();
  const lastName = faker.person.lastName();
  const amount = faker.number.int({ min: 50, max: 1000 });
  const checkin = DateTime.now().toFormat('yyyy-MM-dd');
  const checkout = DateTime.now().plus({ days: 5 }).toFormat('yyyy-MM-dd');
  const additionalneeds = faker.food.dish();
  const depositpaid = faker.datatype.boolean();

  const createBookingPayload = {
    "firstname" :firstName,
    "lastname" : lastName,
    "totalprice" : amount,
    "depositpaid" : depositpaid,
    "bookingdates" : {
        "checkin" : checkin,
        "checkout" : checkout
    },
    "additionalneeds" : additionalneeds
}
  //Request
    const res:APIResponse =  await request.post('/booking',
        {
        data:createBookingPayload
        }
    )
    //Validate status message
    expect(res.ok()).toBeTruthy();
    //Validate status code
    expect(res.status()).toBe(200);
    const resJsonBody = await res.json();
    console.log('Full Response body', resJsonBody);
    //Validate below attributes present or not in json body
    expect(resJsonBody).toHaveProperty('bookingid');
    expect(resJsonBody).toHaveProperty('booking');

    //Validate booking attributes details present in response.
    expect(resJsonBody.booking).toHaveProperty('firstname');
    expect(resJsonBody.booking).toHaveProperty('lastname');
    expect(resJsonBody.booking).toHaveProperty('totalprice');
    expect(resJsonBody.booking).toHaveProperty('depositpaid');
    expect(resJsonBody.booking).toHaveProperty('additionalneeds');   
    expect(resJsonBody.booking.bookingdates).toHaveProperty('checkin');
    expect(resJsonBody.booking.bookingdates).toHaveProperty('checkout');
     
    //Vaidate booking details matches with request payload
    expect(resJsonBody.booking).toMatchObject(createBookingPayload);
    //Vaidate only booking date details matches with request payload
    expect(resJsonBody.booking.bookingdates).toMatchObject({
        "checkin" : checkin,
        "checkout" : checkout
    })
    //Print booking id
    const bookingId = resJsonBody.bookingid;
    console.log('Newly generated booking id: ', bookingId);
    
})
})

