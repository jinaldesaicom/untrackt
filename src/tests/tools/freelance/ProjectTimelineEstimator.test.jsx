import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import ProjectTimelineEstimator from '../../../tools/freelance/ProjectTimelineEstimator.jsx'

describe('ProjectTimelineEstimator', () => {
  it('renders task controls and adds a task to the timeline', async () => {
    const user = userEvent.setup()
    render(
      <HelmetProvider>
        <ProjectTimelineEstimator />
      </HelmetProvider>
    )

    expect(screen.getByText(/project start date/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /add task/i }))
    expect(screen.getByText(/timeline visualization/i)).toBeInTheDocument()
  })
})
