import { useLocalStorage } from 'react-use'

export type Config = {
  apiKey: string
  max_tokens: number
  temperature: number
  top_p: number
  frequency_penalty: number
  presence_penalty: number
  n: number
}

export const useConfig = () => {
  const [config, setConfig] = useLocalStorage<Config>(
    'config',
    {
      apiKey: '',
      temperature: 0.78,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      n: 1,
    },
  )

  return { config, setConfig } as {
    config: Config
    setConfig: typeof setConfig
  }
}
