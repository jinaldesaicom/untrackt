import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import WikiToolPage from '../../pages/WikiToolPage.jsx';

describe('WikiToolPage', () => {
  it('renders without crashing', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/wiki/unit-converter']}>
          <Routes>
            <Route path="/wiki/:slug" element={<WikiToolPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );
  });
});
