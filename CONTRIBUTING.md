# Contributing to UnTrackt

## How to Add a Tool

### Step 1: Create the component

```jsx
// src/tools/{category}/YourTool.jsx
import SEOHead from '../../components/SEOHead'
import DisclaimerBadge from '../../components/DisclaimerBadge'

export default function YourTool() {
  return (
    <>
      <SEOHead
        title="Your Tool Name - Free | UnTrackt"
        description="What it does."
        path="/tools/your-tool-id"
      />
      <div>
        <DisclaimerBadge />
      </div>
    </>
  )
}
```

### Step 2: Register the tool

Add this shape to `src/data/tools.js`:

```js
{
  id: 'your-tool-id',
  name: 'Your Tool Name',
  description: 'One line description.',
  category: 'general',
  icon: 'Wrench',
  path: '/tools/your-tool-id',
  component: lazy(() => import('../tools/general/YourTool.jsx')),
  tags: ['tag1', 'tag2', 'tag3']
}
```

### Step 3: Add tests

Create `src/tests/tools/{category}/YourTool.test.jsx`

Required tests:

- Renders without crashing
- Core calculation is correct
- User interaction works
- Disclaimer and SEOHead are present

## Tool requirements checklist

- [ ] Uses React local state only unless there is a clear reason
- [ ] Includes SEOHead
- [ ] Includes DisclaimerBadge
- [ ] Works with localStorage cleared
- [ ] No new external API calls unless explicitly approved
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Dark mode classes included
- [ ] Accessible labels and keyboard flow

## Code Style

- Functional components
- Tailwind CSS classes
- Lucide React for icons
- No external UI component libraries
- Keep the privacy model intact: no analytics, cookies, or trackers
