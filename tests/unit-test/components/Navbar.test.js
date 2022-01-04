// navBar.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from './navBar';

// include as many test cases as you want here
const links = [
  { text: 'Home', location: "/" },
  { text: 'Contact', location: "/contact" },
  { text: 'About', location: "/about" },
  { text: 'Search', location: "/search" },
];

// I use test.each to iterate the test cases above
test.each(links)(
  "Check if Nav Bar have %s link.",
  (link) => {
    render(<NavBar />);
//Ensure the text is in the dom, will throw error it can't find
    const linkDom = screen.getByText(link.text); 

//use jest assertion to verify the link property
    expect(linkDom).toHaveAttribute("href", link.location);
  }
);

test('Check if have logo and link to home page', () => {
  render(<NavBar />);
        // get by TestId define in the navBar
    const logoDom = screen.getByTestId(/company-logo/); 
        // check the link location
    expect(logoDom).toHaveAttribute("href", "/"); 
    //check the logo image
  expect(screen.getByAltText(/Company Logo/)).toBeInTheDocument(); 
});