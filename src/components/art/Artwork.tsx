import type { ArtworkType } from './Artwork.types'

const Artwork = ({ artwork }: { artwork: ArtworkType }) => {
  return (
    <article className="artwork-container">
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
  )
}

export default Artwork
