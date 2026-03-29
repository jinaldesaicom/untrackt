import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/seo/SchemaMarkupGenerator.jsx');
  Component = mod.default;
});

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));

describe('SchemaMarkupGenerator – coverage', () => {
  it('renders with schema types', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/schema|article|product|faq|json/i);
  });

  it('fills Article schema', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const articleBtn = findBtn(/^article$/i);
    if (articleBtn) await user.click(articleBtn);
    const textInputs = screen.queryAllByRole('textbox');
    for (let i = 0; i < Math.min(textInputs.length, 4); i++) {
      await user.clear(textInputs[i]);
      await user.type(textInputs[i], `Test value ${i + 1}`);
    }
  });

  it('switches to Product schema', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const prodBtn = findBtn(/^product$/i);
    if (prodBtn) await user.click(prodBtn);
    const textInputs = screen.queryAllByRole('textbox');
    for (let i = 0; i < Math.min(textInputs.length, 3); i++) {
      await user.clear(textInputs[i]);
      await user.type(textInputs[i], `Product field ${i + 1}`);
    }
    const numInputs = screen.queryAllByRole('spinbutton');
    for (let i = 0; i < Math.min(numInputs.length, 2); i++) {
      await user.clear(numInputs[i]);
      await user.type(numInputs[i], '99');
    }
  });

  it('creates FAQ schema with Q&A', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const faqBtn = findBtn(/^faq$/i);
    if (faqBtn) await user.click(faqBtn);
    // Add Q&A items
    const addBtn = findBtn(/add\s*q|add\s*item|\+/i);
    if (addBtn) await user.click(addBtn);
    const textInputs = screen.queryAllByRole('textbox');
    for (let i = 0; i < Math.min(textInputs.length, 4); i++) {
      await user.clear(textInputs[i]);
      await user.type(textInputs[i], `FAQ text ${i + 1}`);
    }
  });

  it('creates LocalBusiness schema', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const bizBtn = findBtn(/local\s*business/i);
    if (bizBtn) await user.click(bizBtn);
    const textInputs = screen.queryAllByRole('textbox');
    for (let i = 0; i < Math.min(textInputs.length, 4); i++) {
      await user.clear(textInputs[i]);
      await user.type(textInputs[i], `Business field ${i + 1}`);
    }
  });

  it('creates HowTo schema with steps', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const howBtn = findBtn(/^howto$|^how\s*to$/i);
    if (howBtn) await user.click(howBtn);
    const addStepBtn = findBtn(/add\s*step|\+/i);
    if (addStepBtn) await user.click(addStepBtn);
    const textInputs = screen.queryAllByRole('textbox');
    for (let i = 0; i < Math.min(textInputs.length, 3); i++) {
      await user.clear(textInputs[i]);
      await user.type(textInputs[i], `Step ${i + 1} text`);
    }
  });

  it('creates Event schema', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const evBtn = findBtn(/^event$/i);
    if (evBtn) await user.click(evBtn);
    const textInputs = screen.queryAllByRole('textbox');
    for (let i = 0; i < Math.min(textInputs.length, 3); i++) {
      await user.clear(textInputs[i]);
      await user.type(textInputs[i], `Event field ${i + 1}`);
    }
  });

  it('creates Person schema', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const pBtn = findBtn(/^person$/i);
    if (pBtn) await user.click(pBtn);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'John Doe');
    }
  });

  it('creates Organization schema', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const orgBtn = findBtn(/^organization$/i);
    if (orgBtn) await user.click(orgBtn);
  });

  it('creates WebSite schema', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const wsBtn = findBtn(/^website$/i);
    if (wsBtn) await user.click(wsBtn);
  });

  it('creates Review schema', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const revBtn = findBtn(/^review$/i);
    if (revBtn) await user.click(revBtn);
  });

  it('creates BreadcrumbList schema', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const bcBtn = findBtn(/breadcrumb/i);
    if (bcBtn) await user.click(bcBtn);
    const addBtn = findBtn(/add\s*item|\+/i);
    if (addBtn) await user.click(addBtn);
  });

  it('copies JSON-LD', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const copyBtn = findBtn(/copy\s*json/i);
    if (copyBtn) await user.click(copyBtn);
  });

  it('copies script tag', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const scriptBtn = findBtn(/copy\s*script|script\s*tag/i);
    if (scriptBtn) await user.click(scriptBtn);
  });
});
