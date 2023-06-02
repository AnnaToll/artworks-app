import { useEffect, useState } from 'react'
import useFetch from './useFetch'
import useAdminData from '../context/DataContext'
import Error from '../components/features/Error'

const useImagePicker = () => {
  const [currentImage, setCurrentImage] = useState('')
  const [chosenImage, setChosenImage] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState('')
  const { images, fetchData } = useAdminData()
  const { postImage, deleteImage, fetchPost, error: resError } = useFetch('/images')

  useEffect(() => {
    if (resError) {
      setError(error)
    }
  }, [resError])

  const openImagePicker = () => {
    setChosenImage('')
    setCurrentImage('')
    setIsOpen(true)
  }

  const handleClickDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const image = images.data.filter(image => image.url === currentImage)
    const res = await deleteImage(image[0].publicId)
    console.log(res)
  }

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    if (!e.target.files) {
      return
    }
    const file = e.target.files[0]
    console.log(file)
    if (file.size > 10000000) {
      setError('Image is to large. Maximum size is 10MB')
      return
    }
    const image = await postImage(file)
    const postRes = await fetchPost({ url: image.url, public_id: image.public_id })
    if (postRes?.success) {
      fetchData()
      setCurrentImage(image.url)
    }
  }

  const handleClick = (url: string) => {
    setCurrentImage(url)
  }

  const reset = () => {
    setChosenImage('')
    setCurrentImage('')
    setIsOpen(false)
  }

  const handleClickChoose = () => {
    setChosenImage(currentImage)
    setIsOpen(false)
  }

  const ImagePicker = () => isOpen
    ? (
      <div className="fs-dark">
        <section id='images-section-container'>
          <div>
            <h3>Mina bilder</h3>
            <Error error={error} />
          </div>
          <div id="images-container">
            {images.data.map((image: any) => (
              <div key={`imagepicker-${image.id}`}>
                {image.url === currentImage && <i className="bi bi-check-circle-fill" />}
                <img
                  src={image.url}
                  onClick={() => handleClick(image.url)}
                  className={image.url === currentImage ? 'image-selected' : ''}
                />
              </div>
            ))
            }
          </div>
          <div>
            <button
              disabled={currentImage === ''}
              onClick={handleClickChoose}
              className='btn-blue-s'
            >
              <i className="bi bi-check-lg" />
              <span>Använd vald bild</span>
            </button>
            <input type="file" id='image-picker-upload' onChange={handleChangeImage} className='visually-hidden' />
            <label htmlFor='image-picker-upload' className='btn-blue-s'>
              <i className="bi bi-file-earmark-arrow-up" />
              <span>Ladda upp ny bild</span>
            </label>
            <button
              disabled={currentImage === ''}
              onClick={handleClickDelete}
              className='btn-red-s'
            >
              <i className="bi bi-check-lg" />
              <span>Radera vald bild</span>
            </button>
            <button onClick={reset} className='btn-red-s'><span>Avbryt</span></button>
          </div>
        </section>
      </div>)
    : null

  return { ImagePicker, chosenImage, openImagePicker }
}

export default useImagePicker
