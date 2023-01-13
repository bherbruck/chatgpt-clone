import clsx from 'clsx'
import { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { Config } from '../hooks/use-config'
import { useModal } from '../hooks/use-modal'
import { Input } from './input'
import { Modal } from './modal'

export type ConfigModalProps = {
  modal: ReturnType<typeof useModal>
  config: Config
  onChange: (config: Config) => void
}

export const ConfigModal: FC<ConfigModalProps> = ({
  config,
  onChange,
  modal,
}) => (
  <Modal className="modal-bottom md:modal-middle" modal={modal}>
    <h3 className="fong-bold mb-4 text-lg">Config</h3>
    <div className="flex flex-col gap-2">
      {/* config controls */}
      <Input
        label="OpenAI API Key"
        type="text"
        value={config.apiKey}
        onInput={(e) => onChange({ ...config, apiKey: e.currentTarget.value })}
        placeholder="sk-... (required)"
        className={twMerge(
          'input-bordered input',
          clsx({
            'input-error': config.apiKey.length === 0,
          })
        )}
      />
      <Input
        label="Max Tokens"
        type="number"
        value={config.max_tokens}
        onChange={(e) =>
          onChange({ ...config, max_tokens: Number(e.target.value) })
        }
      />
      <Input
        label="Temperature"
        type="number"
        value={config.temperature}
        onChange={(e) =>
          onChange({ ...config, temperature: Number(e.target.value) })
        }
      />
      <Input
        label="Top P"
        type="number"
        value={config.top_p}
        onChange={(e) => onChange({ ...config, top_p: Number(e.target.value) })}
      />
      <Input
        label="Frequency Penalty"
        type="number"
        value={config.frequency_penalty}
        onChange={(e) =>
          onChange({
            ...config,
            frequency_penalty: Number(e.target.value),
          })
        }
      />
      <Input
        label="Presence Penalty"
        type="number"
        value={config.presence_penalty}
        onChange={(e) =>
          onChange({ ...config, presence_penalty: Number(e.target.value) })
        }
      />
      <Input
        label="N"
        type="number"
        value={config.n}
        onChange={(e) => onChange({ ...config, n: Number(e.target.value) })}
      />
    </div>
    <div className="modal-action">
      <button className="btn" onClick={() => modal.close()}>
        Close
      </button>
    </div>
  </Modal>
)
