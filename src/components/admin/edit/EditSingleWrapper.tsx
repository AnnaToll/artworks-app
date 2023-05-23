import { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import { useParams, useNavigate } from 'react-router-dom'
import Headline from '../../Headline'

interface EditSingleWrapperProps {
  headline: string
  itemData: any
  updateItemData: any
  endpoint: string
  navigateUrl: string
  children: JSX.Element | JSX.Element[]
}

const EditSingleWrapper = ({ headline, itemData, updateItemData, endpoint, navigateUrl, children }: EditSingleWrapperProps) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: categoryRes, fetchDelete } = useFetch(endpoint)
  const { data: actionRes, fetchPut, fetchPost, fetchGet } = useFetch(endpoint, { success: false })
  const [fetchMethod, setFetchMethod] = useState<(body?: Record<string, unknown>) => void>(fetchPost)

  useEffect(() => {
    if (id !== 'create-new' || id !== undefined) {
      fetchGet()
      setFetchMethod(fetchPut)
    }
  }, [id])

  useEffect(() => {
    updateItemData(categoryRes)
  }, [categoryRes])

  useEffect(() => {
    if (actionRes.success) {
      navigate(navigateUrl)
    }
  }, [actionRes])

  const handleSave = () => {
    fetchMethod(itemData)
  }

  const handleDelete = () => {
    fetchDelete({ id: itemData.id })
  }

  return (
    <main>
      <Headline headline={headline} />
      <form>
        <button onClick={handleSave}>Spara</button>
        { itemData.id && (
          <button onClick={handleDelete}>
              Radera
          </button>
        )}
        { children }
      </form>
    </main>
  )
}

export default EditSingleWrapper
