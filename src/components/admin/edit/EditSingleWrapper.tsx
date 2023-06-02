import { useEffect } from 'react'
import useFetch from '../../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import Headline from '../../Headline'
import Error from '../../features/Error'
import useModal from '../../../hooks/useModal'
import useAdminData from '../../../context/DataContext'

interface EditSingleWrapperProps {
  headline: string
  itemData: any
  endpoint: string
  navigateUrl: string
  children: JSX.Element | JSX.Element[]
}

const EditSingleWrapper = ({ headline, itemData, endpoint, navigateUrl, children }: EditSingleWrapperProps) => {
  const { id } = useParams()
  const { ModalConfirm, hasConfirmed, openModal } = useModal()
  const { fetchData } = useAdminData(navigateUrl)
  const { data: actionRes, error: actionError, fetchPut, fetchPost, fetchDelete } = useFetch(`${endpoint}/${id}`, false)
  const isCreateNew = id === 'skapa-ny'

  useEffect(() => {
    if (actionRes) {
      fetchData()
    }
  }, [actionRes])

  useEffect(() => {
    if (hasConfirmed) {
      fetchDelete()
    }
  }, [hasConfirmed])

  const handleSave = async () => {
    if (isCreateNew) {
      fetchPost(itemData)
    } else if (id !== undefined) {
      fetchPut(itemData)
    }
  }

  const handleDelete = () => {
    openModal(`Är du säker på att du vill radera "${headline}"?`)
  }

  return (
    <main className='admin-main'>
      <ModalConfirm />
      <Headline headline={headline} />
      <button onClick={handleSave} className='btn bg-blue'>
        <span>{isCreateNew ? 'Spara' : 'Uppdatera'}</span>
      </button>
      { itemData.id && (
        <button onClick={handleDelete} className='btn bg-red'>
          <i className="bi bi-trash3"></i>
          <span>Radera</span>
        </button>
      )}
      <Error error={actionError} />
      <form className='edit-single-form'>
        { children }
      </form>
    </main>
  )
}

export default EditSingleWrapper
