import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { App } from "../src/App";
import { ENDPOINT } from "../src/constants/constants";

const server = setupServer(
  http.post(ENDPOINT, async ({ request }) => {
    const data = (await request.json()) as { email: string };
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
    return HttpResponse.json({ status: 200 });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Home", () => {
  it("expect landing page elements to be visible", () => {
    render(<App />);
    // Brand.
    expect(screen.getByText("Broccoli & Co.")).toBeInTheDocument();
    // Body.
    expect(
      screen.getByText("A better way to enjoy everyday")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Be the first to know when we launch!")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Discover What Awaits" })
    ).toBeInTheDocument();
    // Footer.
    expect(screen.getByText("Made with ♥️ in Singapore.")).toBeInTheDocument();
    expect(
      screen.getByText("All rights reserved © 2025 Broccoli & Co.")
    ).toBeInTheDocument();
  });

  it("expect registration modal to be visible", async () => {
    render(<App />);
    await userEvent.click(
      screen.getByRole("button", { name: "Discover What Awaits" })
    );
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

  it("expect user to be able to close registration modal", async () => {
    render(<App />);
    await userEvent.click(
      screen.getByRole("button", { name: "Discover What Awaits" })
    );
    await userEvent.click(screen.getByRole("button", { name: "✘" }));
  });

  it("expect registration modal to flag invalid inputs", async () => {
    render(<App />);
    // Expect "Sign Me Up!" button to not do anything on empty form.
    await userEvent.click(
      screen.getByRole("button", { name: "Discover What Awaits" })
    );
    await userEvent.click(screen.getByRole("button", { name: "Sign Me Up!" }));
    expect(
      screen.getByRole("textbox", { name: "fullName" })
    ).toBeInTheDocument();

    // Error checking.
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
    expect(
      screen.getByText("Full Name needs to be at least 3 characters long.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please enter a valid email address.")
    ).toBeInTheDocument();
    expect(screen.getByText("Emails do not match.")).toBeInTheDocument();

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

  it("expect registration modal to flag used emails", async () => {
    render(<App />);
    await userEvent.click(
      screen.getByRole("button", { name: "Discover What Awaits" })
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: "fullName" }),
      "usedemail@airwallex.com"
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
    await screen.findByText("Bad Request: Email is already in use");
    // expect(screen.getByText("Email is already in use.")).toBeInTheDocument();
  });

  it("expect registration modal to register successfully", async () => {
    render(<App />);
    await userEvent.click(
      screen.getByRole("button", { name: "Discover What Awaits" })
    );
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
    await screen.findByText("All set!");
    await userEvent.click(screen.getByRole("button", { name: "✘" }));
  });
});
