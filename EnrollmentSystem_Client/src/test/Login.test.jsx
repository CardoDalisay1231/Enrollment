import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from '../Components/Login.jsx';
import axios from "axios";

// Mock axios
jest.mock("axios");

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login Component - Registrar Role", () => {
  test("handles login for Registrar role successfully", async () => {
    // Mock successful login response
    axios.post.mockResolvedValueOnce({
      data: { token: "fake-jwt-token" },
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "registrar@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "registrarpassword" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "registrar" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for successful response
    await screen.findByText(/login successful/i); // Adjust if success message isn't rendered
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3000/api/auth/login",
      {
        email: "registrar@example.com",
        password: "registrarpassword",
        role: "registrar",
      }
    );
    expect(mockNavigate).toHaveBeenCalledWith("/"); // Redirect to root path
  });

  test("displays error for Registrar role with invalid credentials", async () => {
    // Mock failed login response
    axios.post.mockRejectedValueOnce({
      response: { data: { message: "Invalid credentials" } },
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "registrar@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "registrar" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for error message to appear
    const errorMessage = await screen.findByText(/invalid credentials/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
