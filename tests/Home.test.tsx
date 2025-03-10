import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { App } from "../src/App";
import { ENDPOINT } from "../src/constants/constants";

// Setup mock server
const server = setupServer(
  http.post(ENDPOINT, async ({ request }) => {
    const data = (await request.json()) as { email: string };

    // Mock response for already used email
    if (data.email === "usedemail@airwallex.com") {
      return new HttpResponse(
        JSON.stringify({
          errorMessage: "Bad Request: Email is already in use",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Mock successful registration response
    return HttpResponse.json({ status: 200 });
  })
);

// Lifecycle hooks for server setup
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Home", () => {
  it("should display landing page elements", () => {
    render(<App />);

    // Check for brand and body text
    expect(screen.getByText("Broccoli & Co.")).toBeInTheDocument();
    expect(
      screen.getByText("A better way to enjoy everyday")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Be the first to know when we launch!")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Discover What Awaits" })
    ).toBeInTheDocument();

    // Check for footer text
    expect(screen.getByText("Made with ♥️ in Singapore.")).toBeInTheDocument();
    expect(
      screen.getByText("All rights reserved © 2025 Broccoli & Co.")
    ).toBeInTheDocument();
  });

  it("should display registration modal", async () => {
    render(<App />);
    await userEvent.click(
      screen.getByRole("button", { name: "Discover What Awaits" })
    );

    // Check for input fields and button in the modal
    expect(
      screen.getByRole("textbox", { name: "fullName" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "email" })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "confirmEmail" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Sign Me Up!" })
    ).toBeInTheDocument();
  });

  it("should allow user to close registration modal", async () => {
    render(<App />);
    await userEvent.click(
      screen.getByRole("button", { name: "Discover What Awaits" })
    );
    await userEvent.click(screen.getByRole("button", { name: "✘" }));
  });

  it("should flag invalid inputs in registration modal", async () => {
    render(<App />);
    await userEvent.click(
      screen.getByRole("button", { name: "Discover What Awaits" })
    );
    await userEvent.click(screen.getByRole("button", { name: "Sign Me Up!" }));

    // Check for error messages on empty form submission
    expect(
      screen.getByRole("textbox", { name: "fullName" })
    ).toBeInTheDocument();

    // Input invalid data
    await userEvent.type(
      screen.getByRole("textbox", { name: "fullName" }),
      "@"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: "email" }),
      "invalid@invalid1"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: "confirmEmail" }),
      "invalid@invalid2"
    );
    await userEvent.click(screen.getByRole("button", { name: "Sign Me Up!" }));

    // Check for specific error messages
    expect(
      screen.getByText("Full Name needs to be at least 3 characters long.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please enter a valid email address.")
    ).toBeInTheDocument();
    expect(screen.getByText("Emails do not match.")).toBeInTheDocument();

    // Input valid data
    await userEvent.type(
      screen.getByRole("textbox", { name: "fullName" }),
      "Athena"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: "email" }),
      "athena@valid.com"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: "confirmEmail" }),
      "athena@valid.com"
    );
    await userEvent.click(screen.getByRole("button", { name: "Sign Me Up!" }));
  });

  it("should flag used emails in registration modal", async () => {
    render(<App />);
    await userEvent.click(
      screen.getByRole("button", { name: "Discover What Awaits" })
    );

    // Input a used email
    await userEvent.type(
      screen.getByRole("textbox", { name: "fullName" }),
      "Used Email User"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: "email" }),
      "usedemail@airwallex.com"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: "confirmEmail" }),
      "usedemail@airwallex.com"
    );
    await userEvent.click(screen.getByRole("button", { name: "Sign Me Up!" }));

    // Check for error message indicating the email is already in use
    await screen.findByText("Bad Request: Email is already in use");
  });

  it("should register successfully with valid inputs", async () => {
    render(<App />);
    await userEvent.click(
      screen.getByRole("button", { name: "Discover What Awaits" })
    );

    // Input valid registration data
    await userEvent.type(
      screen.getByRole("textbox", { name: "fullName" }),
      "Athena"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: "email" }),
      "athena@valid.com"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: "confirmEmail" }),
      "athena@valid.com"
    );
    await userEvent.click(screen.getByRole("button", { name: "Sign Me Up!" }));

    // Check for success message
    await screen.findByText("All set!");

    // Close the modal
    await userEvent.click(screen.getByRole("button", { name: "✘" }));
  });
});
