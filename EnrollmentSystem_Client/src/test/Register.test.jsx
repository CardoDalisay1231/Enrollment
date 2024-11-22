import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../Components/Register";  // Adjust path as necessary
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

// Mock the axios post request
jest.mock("axios");

describe("Register Component", () => {
  // Mock localStorage manually by replacing the getItem method with a mocked version
  beforeEach(() => {
    // Mocking `localStorage.getItem`
    Storage.prototype.getItem = jest.fn(() => "mock-registrar-token"); // Mocking token value
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("displays an error message when registration fails due to duplicate email", async () => {
    // Mocking the response from axios to simulate a registration failure
    axios.post.mockRejectedValueOnce({
      response: { data: "Email already exists" }, // Simulating a failure due to email duplication
    });

    render(
      <Router>
        <Register />
      </Router>
    );

    // Get the input fields and the submit button
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const registerButton = screen.getByRole("button", { name: /register/i });

    // Fill out the form
    fireEvent.change(emailInput, { target: { value: "existing.email@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Submit the form
    fireEvent.click(registerButton);

    // Wait for the error message to appear, allow for any async rendering
    const errorMessage = await screen.findByText((content, element) =>
      content.includes("Error registering student:") || element.querySelector('.error-message')
    );

    // Assert that the error message is displayed
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays an error message when registration fails due to unauthorized access", async () => {
    // Simulating an unauthorized access error (wrong token or no token)
    axios.post.mockRejectedValueOnce({
      response: { data: "Unauthorized access" }, // Simulate 401 unauthorized error
    });

    render(
      <Router>
        <Register />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const registerButton = screen.getByRole("button", { name: /register/i });

    fireEvent.change(emailInput, { target: { value: "existing.email@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(registerButton);

    const errorMessage = await screen.findByText((content, element) =>
      content.includes("Error registering student:") || element.querySelector('.error-message')
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
