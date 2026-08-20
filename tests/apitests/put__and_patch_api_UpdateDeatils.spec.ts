import { test, expect } from '@playwright/test';
import * as fs from 'fs';

// Helper function to read and parse JSON files
function readJsonFile(filePath: string) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

test.describe('Update booking using put(full update) or patch(partial update) REST api',()=>{
test('should successfully update booking details using PUT request', async ({ request }) => {
        // --- 1. File Path Constants ---
        const CREATE_BOOKING_PAYLOAD_PATH = 'testdata/post_bookingRequest.json';
        const AUTH_PAYLOAD_PATH = 'testdata/token_payload.json';
        const UPDATE_BOOKING_PAYLOAD_PATH = 'testdata/put_payload.json';

        // --- 2. Create Initial Booking ---
        const createBookingPayload = readJsonFile(CREATE_BOOKING_PAYLOAD_PATH);
        const createBookingResponse = await request.post('/booking', {
            data: createBookingPayload,
            headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json'
            },
        });

        expect(createBookingResponse.ok()).toBeTruthy();
        expect(createBookingResponse.status()).toBe(200);

        const createBookingResponseBody = await createBookingResponse.json();
        const bookingId = createBookingResponseBody.bookingid;
        expect(bookingId).toBeDefined();

        // --- 3. Generate Auth Token ---
        const authPayload = readJsonFile(AUTH_PAYLOAD_PATH);
        const authResponse = await request.post('/auth', {
            data: authPayload,
            headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json'
            },
        });

        expect(authResponse.ok()).toBeTruthy();
        expect(authResponse.status()).toBe(200);

        const authResponseBody = await authResponse.json();
        expect(authResponseBody).toHaveProperty('token');
        const authToken = authResponseBody.token.trim();

        // --- 4. Update Booking Details (PUT) ---
        const updateBookingPayload = readJsonFile(UPDATE_BOOKING_PAYLOAD_PATH);
        console.log(updateBookingPayload);
        const updateBookingResponse = await request.put(`/booking/${bookingId}`, {
            data: updateBookingPayload,
            headers: {
                Cookie: `token=${authToken}`,
               'Content-Type': 'application/json',
               'Accept': 'application/json'
            },
        });

        expect(updateBookingResponse.ok()).toBeTruthy();
        expect(updateBookingResponse.status()).toBe(200);

        // --- 5. Validate Updated Fields ---
        const updateBookingResponseBody = await updateBookingResponse.json();
        console.log(updateBookingResponseBody);
        expect(updateBookingResponseBody.firstname).toBe(updateBookingPayload.firstname);
        expect(updateBookingResponseBody.lastname).toBe(updateBookingPayload.lastname);
});
test('should successfully update booking details using PATCH request', async ({ request }) => {
        // --- 1. File Path Constants ---
        const CREATE_BOOKING_PAYLOAD_PATH = 'testdata/post_bookingRequest.json';
        const AUTH_PAYLOAD_PATH = 'testdata/token_payload.json';
        const UPDATE_BOOKING_PAYLOAD_PATH = 'testdata/patch_payload.json';

        // --- 2. Create Initial Booking ---
        const createBookingPayload = readJsonFile(CREATE_BOOKING_PAYLOAD_PATH);
        const createBookingResponse = await request.post('/booking', {
            data: createBookingPayload,
            headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json'
            },
        });

        expect(createBookingResponse.ok()).toBeTruthy();
        expect(createBookingResponse.status()).toBe(200);

        const createBookingResponseBody = await createBookingResponse.json();
        const bookingId = createBookingResponseBody.bookingid;
        expect(bookingId).toBeDefined();

        // --- 3. Generate Auth Token ---
        const authPayload = readJsonFile(AUTH_PAYLOAD_PATH);
        const authResponse = await request.post('/auth', {
            data: authPayload,
            headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json'
            },
        });

        expect(authResponse.ok()).toBeTruthy();
        expect(authResponse.status()).toBe(200);

        const authResponseBody = await authResponse.json();
        expect(authResponseBody).toHaveProperty('token');
        const authToken = authResponseBody.token.trim();

        // --- 4. Update Booking Details (PUT) ---
        const updateBookingPayload = readJsonFile(UPDATE_BOOKING_PAYLOAD_PATH);
        console.log(updateBookingPayload);
        const updateBookingResponse = await request.patch(`/booking/${bookingId}`, {
            data: updateBookingPayload,
            headers: {
                Cookie: `token=${authToken}`,
               'Content-Type': 'application/json',
               'Accept': 'application/json'
            },
        });

        expect(updateBookingResponse.ok()).toBeTruthy();
        expect(updateBookingResponse.status()).toBe(200);

        // --- 5. Validate Updated Fields ---
        const updateBookingResponseBody = await updateBookingResponse.json();
        console.log(updateBookingResponseBody);
        expect(updateBookingResponseBody.firstname).toBe(updateBookingPayload.firstname);
        expect(updateBookingResponseBody.lastname).toBe(updateBookingPayload.lastname);
});
})
