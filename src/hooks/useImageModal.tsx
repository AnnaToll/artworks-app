import { useState } from 'react'

const useImageModal = (imgSrc: string) => {
  const [isOpen, setIsOpen] = useState(false)

  const ImageModal = () => isOpen
    ? (
      <div className="fs-dark">
        <section className="modal-image-container">
          <button onClick={() => setIsOpen(false)} className="image-modal-btn"><i className="bi bi-x-lg" /></button>
          <img src={imgSrc} alt="" />
        </section>
      </div>)
    : null

  return { ImageModal, setIsOpen }
}

export default useImageModal
