import { it, expect, vi } from "vitest";
import { HttpError } from "./errors";
import { sendDataRequest } from "./http";

const testResponseData = { testKey: "testData" };
const testFecth = vi.fn((url, option) => {
  return new Promise((resolve, reject) => {
    if (typeof option.body !== "string") {
      return reject("Not a string");
    }
    const testResponse = {
      ok: true,
      json() {
        return new Promise((resolve, reject) => {
          resolve(testResponseData);
        });
      },
    };
    resolve(testResponse);
  });
});
vi.stubGlobal("fetch", testFecth);

it("should creturn any available response data", () => {
  const testData = { key: "test" };
  return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
});

it("should convert the provided data to JSON before sending the request", async () => {
  const testData = { key: "test" };
  let errorMessage;
  try {
    await sendDataRequest(testData);
  } catch (error) {
    errorMessage = error;
  }
  expect(errorMessage).not.toBe("Not a string.");
});

it("should throw an HttpError in case of non-ok response", () => {
  testFecth.mockImplementationOnce((url, option) => {
    return new Promise((resolve, reject) => {
      const testResponse = {
        ok: false,
        json() {
          return new Promise((resolve, reject) => {
            resolve(testResponseData);
          });
        },
      };
      resolve(testResponse);
    });
  });
  const testData = { key: "test" };
  return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);
});
