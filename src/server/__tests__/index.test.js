import request from 'supertest'
import httpMocks from "node-mocks-http"
import app from '../index'

describe("App routes", () => {
  it("should return 'This is a private API' for GET /", () => {
    const mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/"
    });
    const mockResponse = httpMocks.createResponse();
    app(mockRequest, mockResponse);
    const actualResponseBody = mockResponse._getData();
    const expectedResponseBody = "This is a private API";
    request(actualResponseBody, expectedResponseBody);
  });

  it("should return 'This is a private API' for any unknown route", () => {
    const mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/whatever/"
    });
    const mockResponse = httpMocks.createResponse();
    app(mockRequest, mockResponse);
    const actualResponseBody = mockResponse._getData();
    const expectedResponseBody = "This is a private API";
    request(actualResponseBody, expectedResponseBody);
  });
});