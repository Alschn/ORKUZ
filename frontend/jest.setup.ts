import "@testing-library/jest-dom";

// env file has to be mocked because Jest is stupid and does not fully support ES6 modules
jest.mock("~/env.js", () => ({
  env: {
    NEXT_PUBLIC_API_URL: "http://127.0.0.1:8000",
  },
}));
