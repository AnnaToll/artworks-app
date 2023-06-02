import { useEffect, useState } from 'react'
import EditSingleWrapper from './EditSingleWrapper'
import useAdminData from '../../../context/DataContext'
import { useParams } from 'react-router-dom'
import type { ArtObj } from '../../../context/DataContext'
import Error from '../../features/Error'
import useImagePicker from '../../../hooks/useImagePicker'

const AdminArt = () => {
  const { id } = useParams()
  const { categories, art } = useAdminData()
  const { ImagePicker, chosenImage, openImagePicker } = useImagePicker()
  const [error, setError] = useState(['', ''])
  const [artwork, setArtwork] = useState<ArtObj>({
    id: null,
    name: '',
    image: '',
    category: [],
    year: ''
  })

  useEffect(() => {
    if (chosenImage) {
      setArtwork({ ...artwork, image: chosenImage })
    }
  }, [chosenImage])

  useEffect(() => {
    const newArt = art.data.filter((artwork) => typeof artwork.id === 'number' ? artwork.id.toString() === id : false)[0]
    if (newArt) {
      setArtwork({ ...newArt })
    }
  }, [categories, id])

  const validate = (item: any) => {
    const newError = error
    if (item.name.length < 2) {
      newError[0] = 'Titeln måste ha minst två bokstäver.'
    } else {
      newError[0] = ''
    }
    if (item.year.length !== 4) {
      newError[1] = 'Vänligen ange år med fyra siffror.'
    } else {
      newError[1] = ''
    }
    setError(newError)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const string = e.target.id.replace('artwork-', '')
    const newArtwork: any = { ...artwork }
    newArtwork[string] = e.target.value
    setArtwork(newArtwork)
    validate(newArtwork)
  }

  const handleChangeCheckBoxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newArtwork: any = { ...artwork }

    if (e.target.checked) {
      newArtwork.category.push(e.target.name)
    } else {
      const newCategories = newArtwork.category.filter((category: string) => category !== e.target.name)
      newArtwork.category = newCategories
    }

    setArtwork(newArtwork)
  }

  const selectImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    openImagePicker()
  }

  return (
    <EditSingleWrapper
      headline={artwork.name}
      itemData={artwork}
      endpoint='/artwork'
      navigateUrl='/admin/redigera/konstverk'
    >
      <ImagePicker />
      <label htmlFor="artwork-name">Namn på konstverk:</label>
      <Error error={error[0]} />
      <input type='text' minLength={2} id='artwork-name' value={artwork.name} onChange={handleChange} />
      <label htmlFor="artwork-year">År:</label>
      <Error error={error[1]} />
      <input type='number' maxLength={4} minLength={4} id='artwork-year' value={artwork.year} onChange={handleChange} />
      <div className='mt-3 mb-4'>
        Kategorier
        <div className='check-boxes-container'>
          { categories.data.map((category, index) => {
            const isSelected = artwork.category.includes(category.name)
            return (
              <div key={`checkbox-${index}`}>
                <input checked={isSelected} className='visually-hidden' type="checkbox" id={`checkbox-${category.name}`} name={category.name} onChange={handleChangeCheckBoxes} />
                <label className={isSelected ? 'selected' : ''} htmlFor={`checkbox-${category.name}`}>{isSelected && <i className="bi bi-check-lg"></i>}<span>{category.name}</span></label>
              </div>
            )
          })}
        </div>
      </div>
      <div className='mt-4'>
        <button onClick={selectImage} className='btn-blue-s'>
          <i className="bi bi-image" />
          <span>Ladda upp en ny bild</span>
        </button>
      </div>
      { artwork.image
        ? (
          <div className='mt-3'>
            <label>Nuvarande bild:</label>
            <img src={artwork.image} alt={artwork.name}/>
          </div>)
        : <></>}
    </EditSingleWrapper>

  )
}

export default AdminArt
