import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import TagPage from '../../pages/TagPage.jsx';

describe('TagPage', () => {
  it('renders without crashing', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/tag/calculator']}>
          <Routes>
            <Route path="/tag/:tag" element={<TagPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>
    );
  });
});
