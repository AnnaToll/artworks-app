import { useEffect, useState, useRef } from 'react'
import EditSingleWrapper from './EditSingleWrapper'
import useAdminData from '../../../context/DataContext'
import { useParams } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'

interface CategoryState {
  id: number | null
  category: string
  text: string
}

const Category = () => {
  const { id } = useParams()
  const editorRef = useRef<any>(null)
  const { categories } = useAdminData()
  const [category, setCategory] = useState<CategoryState>({
    id: null,
    category: '',
    text: ''
  })

  useEffect(() => {
    const newCategory = categories.data.filter((category) => typeof category.id === 'number' ? category.id.toString() === id : false)[0]
    if (newCategory) {
      setCategory({
        id: newCategory.id,
        category: newCategory.name,
        text: newCategory.text
      })
    }
  }, [categories, id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({
      ...category,
      category: e.target.value
    })
  }

  const handleChangeEditor = (value: string) => {
    setCategory({ ...category, text: value })
  }

  return (
    <EditSingleWrapper
      headline={category.category}
      itemData={category}
      endpoint='/category'
      navigateUrl='/admin/redigera/kategorier'
    >
      <label htmlFor="category-name">Namn på kategori:</label>
      <input type='text' id='category-name' value={category.category} onChange={handleChange} />
      <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        value={category.text}
        onEditorChange={(value) => handleChangeEditor(value)}
        init={{
          height: 300,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />

    </EditSingleWrapper>

  )
}

export default Category
