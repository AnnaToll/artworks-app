import { useEffect, useState, useRef } from 'react'
import EditSingleWrapper from './EditSingleWrapper'
import useAdminData from '../../../context/DataContext'
import { useParams } from 'react-router-dom'
import type { PageObj } from '../../../context/DataContext'
import Error from '../../features/Error'
import useImagePicker from '../../../hooks/useImagePicker'
import { Editor } from '@tinymce/tinymce-react'

const Page = () => {
  const editorRef = useRef<any>(null)
  const { id } = useParams()
  const { pages, pageTypes, categories } = useAdminData()
  const { ImagePicker, chosenImage, openImagePicker } = useImagePicker()
  const [imageToUpdate, setImageToUpdate] = useState<string | null>(null)
  const [error, setError] = useState([''])
  const [page, setPage] = useState<PageObj>({
    id: null,
    name: '',
    pageType: pageTypes[0].pageType,
    pageImg: '',
    banner: '',
    text: '',
    navigationOrder: null,
    categoryPriority: {
      isChanged: false,
      categories: []
    }
  })

  useEffect(() => {
    const newPage = pages.data.filter((page) => typeof page.id === 'number' ? page.id.toString() === id : false)[0]
    if (newPage && categories.data) {
      setPage({
        ...newPage,
        categoryPriority: {
          ...page.categoryPriority,
          categories: JSON.parse(JSON.stringify(categories.data))
        }
      })
    }
  }, [pages, id, categories])

  const filterCategories = () => {
    const filtered = page.categoryPriority.categories.filter(category => category.priority !== null)
    const sorted = filtered.sort((first, second) => {
      if (first.priority && second.priority) {
        return first.priority - second.priority
      } else return -1
    })
    return sorted
  }

  const filteredCategories = filterCategories()

  useEffect(() => {
    if (chosenImage) {
      console.log(chosenImage)
      const newPage: any = { ...page }
      if (!imageToUpdate) return
      newPage[imageToUpdate] = chosenImage
      setPage(newPage)
    }
  }, [chosenImage])

  const validate = (item: any) => {
    const newError = error
    if (item.name.length < 2) {
      newError[0] = 'Sidnamnet måste ha minst två bokstäver.'
    } else {
      newError[0] = ''
    }
    setError(newError)
  }

  const handleChange = (event: unknown) => {
    const e = event as React.ChangeEvent<HTMLInputElement>
    const string = e.target.id.replace('page-', '')
    const newPage: any = { ...page }
    newPage[string] = e.target.value
    setPage(newPage)
    validate(newPage)
  }

  const handleChangeCheckBoxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPage: any = { ...page }
    newPage.categoryPriority.isChanged = true
    const categories: [] = newPage.categoryPriority.categories

    if (e.target.checked) {
      categories.forEach((category: any) => {
        if (category.name === e.target.name) {
          category.priority = filteredCategories.length + 1
        }
      })
    } else {
      categories.forEach((category: any) => {
        if (category.name === e.target.name) {
          category.priority = null
        }
      })
      categories.sort((first: any, second: any) => {
        const prioFirst = first.priority || categories.length + 2
        const prioSecond = second.priority || categories.length + 2
        return prioFirst - prioSecond
      })
      categories.forEach((category: any, index: number) => {
        if (category.priority) {
          category.priority = index + 1
        }
      })
    }

    console.log(categories)

    setPage(newPage)
  }

  const selectImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const target = e.currentTarget as HTMLButtonElement
    setImageToUpdate(target.id.replace('page-', ''))
    openImagePicker()
  }

  const handleChangeEditor = (value: string) => {
    setPage({ ...page, text: value })
  }

  const handleClickMove = (priority: number, direction: string) => {
    const newPage: any = { ...page }
    newPage.categoryPriority.isChanged = true
    const categories: any[] = newPage.categoryPriority.categories
    const selectedIndex = categories.findIndex(category => category.priority === priority)
    const switchPriority = direction === 'up' ? priority - 1 : priority + 1
    const switchIndex = categories.findIndex(category => category.priority === switchPriority)
    categories[selectedIndex].priority = switchPriority
    categories[switchIndex].priority = priority

    setPage(newPage)
  }

  return (
    <EditSingleWrapper
      headline={page.name}
      itemData={page}
      endpoint='/page'
      navigateUrl='/admin/sidor'
    >
      <ImagePicker />
      <label htmlFor="page-name">Namn på sidan:</label>
      <Error error={error[0]} />
      <input type='text' minLength={2} id='page-name' value={page.name} onChange={handleChange} />
      <label htmlFor="page-type">Sidtyp:</label>
      <div className='select-container'>
        <select id="page-pageType" onChange={handleChange} value={page.pageType}>
          {pageTypes.map((pageType) => (
            <option
              key={`page-pageType-${pageType.id}`}
              value={pageType.pageType}
            >
              {pageType.pageType}
            </option>
          ))}
        </select>
        <i className="bi bi-caret-down-fill" />
      </div>
      {page.pageType === 'Text page'
        ? (
          <>
            <Editor
              onInit={(evt, editor) => editorRef.current = editor}
              value={page.text}
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
          </>)
        : <></>
      }
      <div className='mt-4'>
        <button onClick={selectImage} id="page-banner" className='btn-blue-s'>
          <i className="bi bi-image" />
          <span>Ladda upp en ny banner</span>
        </button>
      </div>
      { page.banner
        ? (
          <div className='mt-3 admin-img-container'>
            <label>Nuvarande banner:</label>
            <img src={page.banner} alt={`Banner för ${page.name}`}/>
          </div>)
        : <></>}
      {
        page.pageType === 'Text page'
          ? (
            <>
              <div className='mt-4'>
                <button onClick={selectImage} id="page-pageImg" className='btn-blue-s'>
                  <i className="bi bi-image" />
                  <span>Ladda upp en ny bild</span>
                </button>
              </div>
              { page.pageImg
                ? (
                  <div className='mt-3 admin-img-container'>
                    <label>Nuvarande bild:</label>
                    <img src={page.pageImg} alt={`Bild för ${page.name}`}/>
                  </div>)
                : <></>}

            </>)
          : <></>
      }
      { page.pageType === 'Home'
        ? (
          <>
            <p>Välj kategorier:</p>
            <div className='check-boxes-container mb-6'>
              { page.categoryPriority.categories.map((category, index) => {
                const isSelected = category.priority !== null
                return (
                  <div key={`checkbox-${index}`}>
                    <input
                      checked={isSelected}
                      className='visually-hidden'
                      type="checkbox" id={`checkbox-${category.name}`}
                      name={category.name}
                      onChange={handleChangeCheckBoxes}
                    />
                    <label
                      className={isSelected ? 'selected' : ''}
                      htmlFor={`checkbox-${category.name}`}
                    >
                      {isSelected && <i className="bi bi-check-lg"></i>}
                      <span>{category.name}</span>
                    </label>
                  </div>
                )
              })}
            </div>
            <div>
              <p>Välj ordning på kategorier:</p>
              {filteredCategories.map((category, index) => (
                <div key={`filtered-categoried-${category.id}`} className='prio-categories'>
                  <span>{`${index + 1}. ${category.name}`}</span>
                  <div>
                    {index !== 0 && (
                      <i
                        className="bi bi-arrow-up-short"
                        onClick={() => handleClickMove(index + 1, 'up')}
                      />)}
                    {index !== filteredCategories.length - 1 &&
                    <i
                      className="bi bi-arrow-down-short"
                      onClick={() => handleClickMove(index + 1, 'down')}
                    />}
                  </div>
                </div>
              ))}
            </div>
          </>)
        : <></>}
    </EditSingleWrapper>

  )
}

export default Page
