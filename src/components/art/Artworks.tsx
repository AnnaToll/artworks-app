import { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import LoadingBlock from '../features/LoadingBlock'
import type { ArtworkType } from './Artwork.types'
import Artwork from './Artwork'
import Error from '../features/Error'

const Artworks = ({ id }: { id: number | string | undefined }) => {
  const { data: artworks, fetchGet, isLoading, error } = useFetch(`/art/${id}`)

  useEffect(() => {
    fetchGet()
  }, [id])

  return (
    <div className='artworks-container'>
      <Error error={error} />
      { isLoading
        ? <LoadingBlock />
        : (
          <div className='artworks'>
            { artworks.map((artwork: ArtworkType) => (
              <Artwork key={artwork.id} artwork={artwork} />
            ))}
          </div>)
      }
    </div>
  )
}

export default Artworks
