/*Contract Testing
prerequisite - 
Install the required dependencies
npm install --save-dev @playwright/test ajv

AJV is used for schema validation
*/
import Ajv from "ajv";
import fs from "fs";
import { test, expect } from "@playwright/test";

function readJson(filepath: string) {
  return JSON.parse(fs.readFileSync(filepath, "utf-8"));
}

test("Schema validation", async ({ request }) => {
  const response = await request.get("https://mocktarget.apigee.net/json", {
    headers: {
      Accept: "application/json",
    },
  });
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log("Response Body:", responseBody);

  //Schema validation from schema definition json file
  const schemaFile = "testdata/schema.json";
  const schema = readJson(schemaFile);

  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValid = validate(responseBody);
  expect(isValid).toBe(true);
});

test("Schema validation with another api", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts/2",
  );
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log("Response Body:", responseBody);

  //Schema validation from schema definition json file
  const schemaFile = "testdata/placeholder-api_schema.json";
  const schema = readJson(schemaFile);

  
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValid = validate(responseBody);
  expect(isValid).toBe(true);
});
