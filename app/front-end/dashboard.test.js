// __tests__/dashboard.test.js
import { render, screen } from "@testing-library/react";
import Dashboard from "./dashboard"; // Import the Dashboard component

describe("Dashboard Component", () => {
  // Before each test runs, render the Dashboard component
  beforeEach(() => {
    render(<Dashboard />);
  });

  // Test to ensure the Dashboard heading is rendered
  test("renders dashboard heading", () => {
    // Find an element with text "Dashboard"
    const headingElement = screen.getByText(/Dashboard/i);
    // Assert that the heading element is in the document
    expect(headingElement).toBeInTheDocument();
  });

  // Test to ensure the Line Chart is rendered
  test("renders Line Chart", () => {
    // Find an element with text "Line Chart"
    const lineChartElement = screen.getByText(/Line Chart/i);
    // Assert that the Line Chart element is in the document
    expect(lineChartElement).toBeInTheDocument();
  });

  // Test to ensure the Bar Chart is rendered
  test("renders Bar Chart", () => {
    // Find an element with text "Bar Chart"
    const barChartElement = screen.getByText(/Bar Chart/i);
    // Assert that the Bar Chart element is in the document
    expect(barChartElement).toBeInTheDocument();
  });

  // Test to ensure the Pie Chart is rendered
  test("renders Pie Chart", () => {
    // Find an element with text "Pie Chart"
    const pieChartElement = screen.getByText(/Pie Chart/i);
    // Assert that the Pie Chart element is in the document
    expect(pieChartElement).toBeInTheDocument();
  });

  // Test to ensure the Candlestick Chart is rendered
  test("renders Candlestick Chart", () => {
    // Find an element with text "Candlestick Chart"
    const candlestickChartElement = screen.getByText(/Candlestick Chart/i);
    // Assert that the Candlestick Chart element is in the document
    expect(candlestickChartElement).toBeInTheDocument();
  });
});
