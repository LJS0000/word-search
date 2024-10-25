import { createContext, useContext, useState } from 'react'

interface WordContextType {
  words: string[]
  setWords: React.Dispatch<React.SetStateAction<string[]>>
}

const WordContext = createContext<WordContextType | undefined>(undefined)

export const WordProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [words, setWords] = useState<string[]>([])

  return (
    <WordContext.Provider value={{ words, setWords }}>
      {children}
    </WordContext.Provider>
  )
}

export const useWordContext = () => {
  const context = useContext(WordContext)
  if (!context) {
    throw new Error('useWordContext must be used within a WordProvider')
  }
  return context
}
