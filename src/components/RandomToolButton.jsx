import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dices } from 'lucide-react'
import tools from '../data/tools.js'

function RandomToolButton() {
  const navigate = useNavigate()

  const goToRandom = useCallback(() => {
    const randomTool = tools[Math.floor(Math.random() * tools.length)]
    navigate(randomTool.path)
  }, [navigate])

  return (
    <button
      onClick={goToRandom}
      className="shrink-0 p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-indigo-300 dark:hover:bg-gray-800 transition-colors duration-200"
      aria-label="Open a random tool"
      title="Random tool"
    >
      <Dices className="w-5 h-5" />
    </button>
  )
}

export default memo(RandomToolButton)
