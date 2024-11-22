// Dashboard.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../Components/Dashboard';
import { BrowserRouter, Link } from 'react-router-dom';

// Mock the necessary components that rely on external links or resources
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, to }) => <a href={to}>{children}</a>,  // Mock Link component properly with 'href'
}));

describe('Dashboard Component', () => {
  // Helper to render the component with necessary wrappers (like BrowserRouter)
  const renderWithRouter = () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  };

  test('should navigate to the login page when "APPLY NOW" is clicked', () => {
    renderWithRouter();

    const applyButton = screen.getByRole('link', { name: /APPLY NOW/i });
    expect(applyButton).toHaveAttribute('href', '/login');  // Check if it navigates to "/login"
  });

  test('renders the About section correctly', () => {
    renderWithRouter();

    // Check if the "About" section and its content are present
    expect(screen.getByText(/ABOUT/)).toBeInTheDocument();
    expect(screen.getByText(/MANDATE/)).toBeInTheDocument();
    expect(screen.getByText(/VISION/)).toBeInTheDocument();
    expect(screen.getByText(/MISSION/)).toBeInTheDocument();
    expect(screen.getByText(/HISTORY/)).toBeInTheDocument();
  });

  test('renders the Courses section correctly', () => {
    renderWithRouter();

    // Check if the "Courses" section and its content are present
    expect(screen.getByText(/COURSE/)).toBeInTheDocument();
    expect(screen.getByText(/CvSU Bacoor - Alliance of Computer Scientist/)).toBeInTheDocument();
    expect(screen.getByText(/Information Technology Society/)).toBeInTheDocument();
  });

  test('should display an image in the profile section', () => {
    renderWithRouter();

    // Check if the image is rendered correctly
    const profileImage = screen.getByAltText('John Doe profile picture');
    expect(profileImage).toHaveAttribute('src', './images/cvsu-logo.png');
  });
});
