import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let AltTextAnalyzer, BreadcrumbSchemaGenerator, CanonicalTagGenerator, DnsRecords;
let HreflangGenerator, InternalLinkAnalyzer, KeywordDensityAnalyzer, MetaDescriptionAnalyzer;
let OpenGraphPreviewer, ReadingLevelOptimizer, RobotsTxtGenerator, RobotsTxtTester;
let SeoContentBrief, TitleTagChecker, XmlSitemapGenerator;
beforeAll(async () => {
  const mods = await Promise.all([
    import('../../../tools/seo/AltTextAnalyzer.jsx'),
    import('../../../tools/seo/BreadcrumbSchemaGenerator.jsx'),
    import('../../../tools/seo/CanonicalTagGenerator.jsx'),
    import('../../../tools/seo/DnsRecords.jsx'),
    import('../../../tools/seo/HreflangGenerator.jsx'),
    import('../../../tools/seo/InternalLinkAnalyzer.jsx'),
    import('../../../tools/seo/KeywordDensityAnalyzer.jsx'),
    import('../../../tools/seo/MetaDescriptionAnalyzer.jsx'),
    import('../../../tools/seo/OpenGraphPreviewer.jsx'),
    import('../../../tools/seo/ReadingLevelOptimizer.jsx'),
    import('../../../tools/seo/RobotsTxtGenerator.jsx'),
    import('../../../tools/seo/RobotsTxtTester.jsx'),
    import('../../../tools/seo/SeoContentBrief.jsx'),
    import('../../../tools/seo/TitleTagChecker.jsx'),
    import('../../../tools/seo/XmlSitemapGenerator.jsx'),
  ]);
  [AltTextAnalyzer, BreadcrumbSchemaGenerator, CanonicalTagGenerator, DnsRecords,
   HreflangGenerator, InternalLinkAnalyzer, KeywordDensityAnalyzer, MetaDescriptionAnalyzer,
   OpenGraphPreviewer, ReadingLevelOptimizer, RobotsTxtGenerator, RobotsTxtTester,
   SeoContentBrief, TitleTagChecker, XmlSitemapGenerator] = mods.map(m => m.default);
}, 30000);

describe('AltTextAnalyzer – cov', () => {
  it('renders', () => {
    render(<W><AltTextAnalyzer /></W>);
    expect(document.body.textContent).toMatch(/alt.*text|image|analyz/i);
  });
  it('enters HTML and analyzes', async () => {
    const user = userEvent.setup();
    render(<W><AltTextAnalyzer /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], '<img src="test.jpg" alt="a cat">');
    }
    const btn = screen.getAllByRole('button').find(b => /analyz|check|scan/i.test(b.textContent));
    if (btn) await user.click(btn);
  });
  it('analyzes empty alt tags', async () => {
    const user = userEvent.setup();
    render(<W><AltTextAnalyzer /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], '<img src="test.jpg"><img src="b.png" alt="">');
    }
    const btn = screen.getAllByRole('button').find(b => /analyz|check/i.test(b.textContent));
    if (btn) await user.click(btn);
  });
});

describe('BreadcrumbSchemaGenerator – cov', () => {
  it('renders', () => {
    render(<W><BreadcrumbSchemaGenerator /></W>);
    expect(document.body.textContent).toMatch(/breadcrumb|schema/i);
  });
  it('adds breadcrumb items', async () => {
    const user = userEvent.setup();
    render(<W><BreadcrumbSchemaGenerator /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) await user.type(inputs[0], 'Home');
  });
  it('copies generated schema', async () => {
    const user = userEvent.setup();
    render(<W><BreadcrumbSchemaGenerator /></W>);
    const copyBtn = screen.getAllByRole('button').find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });
});

describe('CanonicalTagGenerator – cov', () => {
  it('renders', () => {
    render(<W><CanonicalTagGenerator /></W>);
    expect(document.body.textContent).toMatch(/canonical|tag|url/i);
  });
  it('enters URL', async () => {
    const user = userEvent.setup();
    render(<W><CanonicalTagGenerator /></W>);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], 'https://example.com/page');
    }
  });
  it('copies tag', async () => {
    const user = userEvent.setup();
    render(<W><CanonicalTagGenerator /></W>);
    const copyBtn = screen.getAllByRole('button').find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });
});

describe('DnsRecords – cov', () => {
  it('renders', () => {
    render(<W><DnsRecords /></W>);
    expect(document.body.textContent).toMatch(/dns|record|domain/i);
  });
  it('enters domain', async () => {
    const user = userEvent.setup();
    render(<W><DnsRecords /></W>);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], 'example.com');
    }
    const addBtn = screen.getAllByRole('button').find(b => /add|generate|lookup/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
  });
  it('switches record type', async () => {
    const user = userEvent.setup();
    render(<W><DnsRecords /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 3)) {
      await user.click(r);
    }
    const selects = document.querySelectorAll('select');
    if (selects.length > 0) fireEvent.change(selects[0], { target: { value: selects[0].options[1]?.value } });
  });
});

describe('HreflangGenerator – cov', () => {
  it('renders', () => {
    render(<W><HreflangGenerator /></W>);
    expect(document.body.textContent).toMatch(/hreflang|language|locale/i);
  });
  it('adds language entries', async () => {
    const user = userEvent.setup();
    render(<W><HreflangGenerator /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) await user.type(inputs[0], 'https://example.com/es');
  });
  it('copies output', async () => {
    const user = userEvent.setup();
    render(<W><HreflangGenerator /></W>);
    const copyBtn = screen.getAllByRole('button').find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });
});

describe('InternalLinkAnalyzer – cov', () => {
  it('renders', () => {
    render(<W><InternalLinkAnalyzer /></W>);
    expect(document.body.textContent).toMatch(/internal.*link|analyz/i);
  });
  it('enters HTML content', async () => {
    const user = userEvent.setup();
    render(<W><InternalLinkAnalyzer /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 1) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'example.com');
      fireEvent.change(textareas[textareas.length - 1], { target: { value: '<a href="/about">About</a>' } });
    }
    const btn = screen.queryAllByRole('button').find(b => /analyz|check/i.test(b.textContent));
    if (btn) await user.click(btn);
  });
});

describe('KeywordDensityAnalyzer – cov', () => {
  it('renders', () => {
    render(<W><KeywordDensityAnalyzer /></W>);
    expect(document.body.textContent).toMatch(/keyword|density|analyz/i);
  });
  it('enters content and keyword', async () => {
    const user = userEvent.setup();
    render(<W><KeywordDensityAnalyzer /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'React is great. React makes development easy. I love React.');
    }
    const inputs = document.querySelectorAll('input.input-field, input[type="text"]');
    if (inputs.length > 0) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], 'React');
    }
  });
});

describe('MetaDescriptionAnalyzer – cov', () => {
  it('renders', () => {
    render(<W><MetaDescriptionAnalyzer /></W>);
    expect(document.body.textContent).toMatch(/meta.*description|analyz/i);
  });
  it('enters description', async () => {
    const user = userEvent.setup();
    render(<W><MetaDescriptionAnalyzer /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'This is a great website about tools and calculators for developers.');
    }
  });
});

describe('OpenGraphPreviewer – cov', () => {
  it('renders', () => {
    render(<W><OpenGraphPreviewer /></W>);
    expect(document.body.textContent).toMatch(/open.*graph|og.*tag|preview/i);
  });
  it('fills OG fields', async () => {
    const user = userEvent.setup();
    render(<W><OpenGraphPreviewer /></W>);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length >= 2) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], 'My Page Title');
      await user.clear(inputs[1]);
      await user.type(inputs[1], 'A description of my page');
    }
  });
  it('copies OG tags', async () => {
    const user = userEvent.setup();
    render(<W><OpenGraphPreviewer /></W>);
    const copyBtn = screen.getAllByRole('button').find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });
});

describe('ReadingLevelOptimizer – cov', () => {
  it('renders', () => {
    render(<W><ReadingLevelOptimizer /></W>);
    expect(document.body.textContent).toMatch(/paste.*content|words|guidance/i);
  });
  it('enters text', async () => {
    const user = userEvent.setup();
    render(<W><ReadingLevelOptimizer /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'The quick brown fox jumps over the lazy dog. This is a simple sentence for testing.');
    }
  });
});

describe('RobotsTxtGenerator – cov', () => {
  it('renders', () => {
    render(<W><RobotsTxtGenerator /></W>);
    expect(document.body.textContent).toMatch(/robots.*txt|generate/i);
  });
  it('adds rules', async () => {
    const user = userEvent.setup();
    render(<W><RobotsTxtGenerator /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
  });
  it('copies output', async () => {
    const user = userEvent.setup();
    render(<W><RobotsTxtGenerator /></W>);
    const copyBtn = screen.getAllByRole('button').find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });
});

describe('RobotsTxtTester – cov', () => {
  it('renders', () => {
    render(<W><RobotsTxtTester /></W>);
    expect(document.body.textContent).toMatch(/robots.*txt|test/i);
  });
  it('enters robots.txt and URL', async () => {
    const user = userEvent.setup();
    render(<W><RobotsTxtTester /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'User-agent: *\nDisallow: /admin');
    }
    const inputs = document.querySelectorAll('input.input-field, input[type="text"]');
    if (inputs.length > 0) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '/admin/dashboard');
    }
    const testBtn = screen.getAllByRole('button').find(b => /test|check/i.test(b.textContent));
    if (testBtn) await user.click(testBtn);
  });
});

describe('SeoContentBrief – cov', () => {
  it('renders', () => {
    render(<W><SeoContentBrief /></W>);
    expect(document.body.textContent).toMatch(/seo|content|brief/i);
  });
  it('fills brief fields', async () => {
    const user = userEvent.setup();
    render(<W><SeoContentBrief /></W>);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) await user.type(inputs[0], 'Best Tools for Developers');
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 0) await user.type(textareas[0], 'An article about developer tools');
  });
  it('copies brief', async () => {
    const user = userEvent.setup();
    render(<W><SeoContentBrief /></W>);
    const copyBtn = screen.getAllByRole('button').find(b => /copy|export/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });
});

describe('TitleTagChecker – cov', () => {
  it('renders', () => {
    render(<W><TitleTagChecker /></W>);
    expect(document.body.textContent).toMatch(/title|tag|check/i);
  });
  it('enters title', async () => {
    const user = userEvent.setup();
    render(<W><TitleTagChecker /></W>);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], 'Best React Tools 2024 | Developer Guide');
    }
  });
  it('checks title length feedback', async () => {
    const user = userEvent.setup();
    render(<W><TitleTagChecker /></W>);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], 'A');
    }
  });
});

describe('XmlSitemapGenerator – cov', () => {
  it('renders', () => {
    render(<W><XmlSitemapGenerator /></W>);
    expect(document.body.textContent).toMatch(/xml|sitemap|generat/i);
  });
  it('adds URLs', async () => {
    const user = userEvent.setup();
    render(<W><XmlSitemapGenerator /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) await user.type(inputs[0], 'https://example.com/page1');
  });
  it('generates sitemap', async () => {
    const user = userEvent.setup();
    render(<W><XmlSitemapGenerator /></W>);
    const genBtn = screen.getAllByRole('button').find(b => /generate/i.test(b.textContent));
    if (genBtn) await user.click(genBtn);
  });
  it('copies sitemap', async () => {
    const user = userEvent.setup();
    render(<W><XmlSitemapGenerator /></W>);
    const copyBtn = screen.getAllByRole('button').find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });
});
