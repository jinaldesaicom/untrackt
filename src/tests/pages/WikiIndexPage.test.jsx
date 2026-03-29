import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import WikiIndexPage from '../../pages/WikiIndexPage.jsx';

describe('WikiIndexPage', () => {
  it('renders without crashing', () => {
    render(<HelmetProvider><MemoryRouter><WikiIndexPage /></MemoryRouter></HelmetProvider>);
  });
});
