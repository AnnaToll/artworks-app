import { useState } from 'react'

const useModal = () => {
  const [hasConfirmed, setHasConfirmed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('Är du säker?')

  const openModal = (message: string) => {
    setMessage(message)
    setIsOpen(true)
  }

  const handleClickConfirm = () => {
    setHasConfirmed(true)
    setIsOpen(false)
  }

  const ModalConfirm = () => isOpen
    ? (
      <div className="fs-dark">
        <section className="modal-container">
          <div className="modal-message">{message}</div>
          <div className='centered'>
            <button onClick={handleClickConfirm} className="btn bg-blue"><span>Ja</span></button>
            <button onClick={() => setIsOpen(false)} className="btn bg-red"><span>Avbryt</span></button>
          </div>
        </section>
      </div>)
    : null

  return { ModalConfirm, hasConfirmed, openModal }
}

export default useModal
