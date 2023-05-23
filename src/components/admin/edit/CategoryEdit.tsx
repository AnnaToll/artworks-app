import { useState } from 'react'
import EditSingleWrapper from './EditSingleWrapper'
// import type { CategoryResponse } from '../Admin.types'

const CategoryEdit = () => {
  const [category, setCategory] = useState({
    id: '',
    category: ''
  })

  const updateCategory = (categoryRes: { id: number, category: string }) => {
    setCategory({
      id: categoryRes.id.toString(),
      category: categoryRes.category
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({
      ...category,
      category: e.target.value
    })
  }

  return (
    <EditSingleWrapper
      headline={category.category}
      itemData={category}
      updateItemData={updateCategory}
      endpoint='/category'
      navigateUrl='/admin/redigera/kategorier'
    >
      <label htmlFor="category-name">Namn på kategori:</label>
      <input type='text' id='category-name' value={category.category} onChange={handleChange} />
    </EditSingleWrapper>

  )
}

export default CategoryEdit
