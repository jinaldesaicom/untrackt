import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SitemapPage from '../../pages/SitemapPage.jsx';

describe('SitemapPage', () => {
  it('renders without crashing', () => {
    render(<HelmetProvider><MemoryRouter><SitemapPage /></MemoryRouter></HelmetProvider>);
  });
});
