import React from 'react';
import { render , screen} from '@testing-library/react';
import App from '../../../src/enterprise_version/App';

test('renders learn react link', () => {
  const { getByText } = render(<App />); //render is from @testing-library/react
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument(); //expect assertion is from Jest

   render(<NavBar />);
  expect(screen.getByText(/about/)).toBeInTheDocument();
});


