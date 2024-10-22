import React, { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"

const DarkModeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (darkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
      {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">Toggle dark mode</span>
    </Button>
  )
}

export default DarkModeToggle