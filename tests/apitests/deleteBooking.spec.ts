import { test, expect } from "@playwright/test";
import * as fs from "fs";
/*End-to-End API flow
create booking
get booking details
generate token
update request
delete request
search after delete request
*/

// Helper function to read and parse JSON files
function readJsonFile(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

test("end-to-end test for API - should successfully delete booking details using DELETE request", async ({
  request,
}) => {
  // --- 1. File Path Constants ---
  const CREATE_BOOKING_PAYLOAD_PATH = "testdata/post_bookingRequest.json";
  const AUTH_PAYLOAD_PATH = "testdata/token_payload.json";
  const UPDATE_BOOKING_PAYLOAD_PATH = "testdata/put_payload.json";

  // --- 2. Create Initial Booking ---
  const createBookingPayload = readJsonFile(CREATE_BOOKING_PAYLOAD_PATH);
  const createBookingResponse = await request.post("/booking", {
    data: createBookingPayload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  expect(createBookingResponse.ok()).toBeTruthy();
  expect(createBookingResponse.status()).toBe(200);

  const createBookingResponseBody = await createBookingResponse.json();
  const bookingId = createBookingResponseBody.bookingid;
  expect(bookingId).toBeDefined();
  console.log(bookingId);

  //--3 Get booking details
  const getResponse = await request.get(`/booking/${bookingId}`);
  expect(getResponse.ok()).toBeTruthy();
  expect(getResponse.status()).toBe(200);
  const getResBody = await getResponse.json();
  console.log(getResBody);

  // --- 4. Generate Auth Token ---
  const authPayload = readJsonFile(AUTH_PAYLOAD_PATH);
  const authResponse = await request.post("/auth", {
    data: authPayload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  expect(authResponse.ok()).toBeTruthy();
  expect(authResponse.status()).toBe(200);

  const authResponseBody = await authResponse.json();
  expect(authResponseBody).toHaveProperty("token");
  const authToken = authResponseBody.token.trim();

  // --- 5. Update Booking Details (PUT) ---
  const updateBookingPayload = readJsonFile(UPDATE_BOOKING_PAYLOAD_PATH);
  console.log(updateBookingPayload);
  const updateBookingResponse = await request.put(`/booking/${bookingId}`, {
    data: updateBookingPayload,
    headers: {
      Cookie: `token=${authToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  expect(updateBookingResponse.ok()).toBeTruthy();
  expect(updateBookingResponse.status()).toBe(200);

  // --- 6. Validate Updated Fields ---
  const updateBookingResponseBody = await updateBookingResponse.json();
  console.log(updateBookingResponseBody);
  expect(updateBookingResponseBody.firstname).toBe(
    updateBookingPayload.firstname,
  );
  expect(updateBookingResponseBody.lastname).toBe(
    updateBookingPayload.lastname,
  );

  // --- 7. Delete Booking Details (DELETE) ---

  const deleteBookingResponse = await request.delete(`/booking/${bookingId}`, {
    headers: {
      Cookie: `token=${authToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  expect(deleteBookingResponse.ok()).toBeTruthy();
  expect(deleteBookingResponse.status()).toBe(201);
  expect(deleteBookingResponse.statusText()).toBe('Created');//to extract raw text we use statusText()

  //8 -- get details post DELETE
  const getResponseAfterDelete = await request.get(`/booking/${bookingId}`);
  expect(getResponseAfterDelete.status()).toBe(404);
  expect(getResponseAfterDelete.statusText()).toBe('Not Found');//to extract raw text we use statusText()

});
