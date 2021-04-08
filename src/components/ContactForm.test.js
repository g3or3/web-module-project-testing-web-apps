import React from "react";
import { render, screen } from "@testing-library/react";
import {
	checkIfInDocument,
	typeInput,
	clickOnElem,
} from "../testingFuncs/utils";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
	render(<ContactForm />);
});

test("renders the contact form header", () => {
	render(<ContactForm />);

	expect(screen.queryByText(/contact form/i)).toBeTruthy();

	expect(screen.queryByText(/contact form/i)).toHaveTextContent(
		"Contact Form"
	);
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
	render(<ContactForm />);

	checkIfInDocument(screen.getByLabelText, /first name*/i);

	typeInput(screen.getByLabelText, /first name*/i, "abc");

	checkIfInDocument(screen.getByTestId, "error");
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
	render(<ContactForm />);

	clickOnElem(screen.getByRole, "button");

	expect(screen.getAllByTestId("error")).toHaveLength(3);
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
	render(<ContactForm />);

	typeInput(
		screen.getByLabelText,
		/first name*/i,
		"george",
		/last name*/i,
		"vinueza"
	);

	clickOnElem(screen.getByRole, "button");

	checkIfInDocument(screen.getByTestId, "error");
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
	render(<ContactForm />);

	typeInput(screen.getByLabelText, /email*/i, "a");

	expect(screen.getByTestId("error")).toHaveTextContent(
		"email must be a valid email address"
	);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
	render(<ContactForm />);

	typeInput(
		screen.getByLabelText,
		/first name*/i,
		"george",
		/email*/i,
		"abc@gmail.com"
	);

	clickOnElem(screen.getByRole, "button");

	expect(screen.getByTestId("error")).toHaveTextContent(
		"lastName is a required field"
	);
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
	render(<ContactForm />);

	typeInput(
		screen.getByLabelText,
		/first name*/i,
		"george",
		/last name*/i,
		"vinueza",
		/email*/i,
		"abc@gmail.com"
	);

	clickOnElem(screen.getByRole, "button");

	checkIfInDocument(
		screen.getByTestId,
		"firstnameDisplay",
		"lastnameDisplay",
		"emailDisplay"
	);

	expect(screen.queryByTestId("messageDisplay")).not.toBeInTheDocument();
});

test("renders all fields text when all fields are submitted.", async () => {
	render(<ContactForm />);

	typeInput(
		screen.getByLabelText,
		/first name*/i,
		"george",
		/last name*/i,
		"vinueza",
		/email*/i,
		"abc@gmail.com",
		/message*/i,
		"my name is george"
	);

	clickOnElem(screen.getByRole, "button");

	checkIfInDocument(
		screen.getByTestId,
		"firstnameDisplay",
		"lastnameDisplay",
		"emailDisplay",
		"messageDisplay"
	);
});
