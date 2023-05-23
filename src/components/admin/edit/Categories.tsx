import EditWrapper from './EditWrapper'
import useFetch from '../../../hooks/useFetch'
import { useEffect } from 'react'
import List from './List'

const Categories = () => {
  const {
    data: categories,
    fetchGet,
    fetchPut,
    fetchDelete,
    fetchPost
  } = useFetch('/categories')

  useEffect(() => () => {
    fetchGet()
  }, [])

  const handleClickAdd = () => {
    fetchPost({ category: 'New category' })
  }

  const handleClickEdit = () => {
    fetchPut({ id: 'someData', category: 'New category name' })
  }

  return (
    <EditWrapper title="Admin Kategorier" headline="Kategorier">
      <button onClick={handleClickAdd}>Lägg till ny kategori</button>
      <List list={categories} editFn={handleClickEdit} deleteFn={fetchDelete} />
    </EditWrapper>
  )
}

export default Categories
