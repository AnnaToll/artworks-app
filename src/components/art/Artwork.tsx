import type { ArtworkType } from './Artwork.types'
import useImageModal from '../../hooks/useImageModal'

const Artwork = ({ artwork }: { artwork: ArtworkType }) => {
  const { ImageModal, setIsOpen } = useImageModal(artwork.image)
  return (
    <>
      <ImageModal />
      <article className="artwork-container" onClick={() => setIsOpen(true)}>
        <img src={artwork.image} alt={artwork.title} />
        <div className='artwork-text-container'>
          <p className='artwork-title'>
            {artwork.title}
          </p>
          <p className='artwork-year'>
            {artwork.year}
          </p>
        </div>
      </article>
    </>
  )
}

export default Artwork
