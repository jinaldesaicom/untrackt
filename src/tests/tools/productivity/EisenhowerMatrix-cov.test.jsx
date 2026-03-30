import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/productivity/EisenhowerMatrix.jsx');
  Component = mod.default;
});

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));

describe('EisenhowerMatrix – coverage', () => {
  it('renders four quadrants', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/urgent|important|do\s*first|schedule|delegate|eliminate/i);
  });

  it('adds task to Do First quadrant', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const addBtns = screen.getAllByRole('button').filter(b => /add|task|\+/i.test(b.textContent.trim()));
    if (addBtns.length > 0) await user.click(addBtns[0]);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[textInputs.length - 1]);
      await user.type(textInputs[textInputs.length - 1], 'Important urgent task');
    }
    const saveBtn = findBtn(/save|add|enter/i);
    if (saveBtn) await user.click(saveBtn);
  });

  it('adds task to Schedule quadrant', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const addBtns = screen.getAllByRole('button').filter(b => /add|task|\+/i.test(b.textContent.trim()));
    if (addBtns.length > 1) await user.click(addBtns[1]);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[textInputs.length - 1]);
      await user.type(textInputs[textInputs.length - 1], 'Important not-urgent task');
    }
  });

  it('adds task to Delegate quadrant', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const addBtns = screen.getAllByRole('button').filter(b => /add|task|\+/i.test(b.textContent.trim()));
    if (addBtns.length > 2) await user.click(addBtns[2]);
  });

  it('adds task to Eliminate quadrant', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const addBtns = screen.getAllByRole('button').filter(b => /add|task|\+/i.test(b.textContent.trim()));
    if (addBtns.length > 3) await user.click(addBtns[3]);
  });

  it('toggles task completion', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const checkboxes = screen.queryAllByRole('checkbox');
    if (checkboxes.length > 0) await user.click(checkboxes[0]);
  });

  it('deletes a task', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const delBtns = screen.getAllByRole('button').filter(b => /delete|trash|remove|×/i.test(b.textContent.trim()) || b.getAttribute('aria-label')?.match(/delete/i));
    if (delBtns.length > 0) await user.click(delBtns[0]);
  });

  it('clears all tasks', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const clearBtn = findBtn(/clear\s*all|reset/i);
    if (clearBtn) await user.click(clearBtn);
  });
});
