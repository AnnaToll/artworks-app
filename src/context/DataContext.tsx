import { createContext, useContext, useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom'

type NumberOrNull = number | null

export interface BaseObj {
  success: string
  error: string
  data: any[]
}

export interface ImageObj {
  id: NumberOrNull
  url: string
  publicId: string
}

export interface ImagesObj extends BaseObj {
  data: ImageObj[]
}

interface DataObj {
  id: NumberOrNull
  name: string
  beforeSave?: any
}

export interface CategoryObj extends DataObj {
  page: string[]
  navigationOrder: NumberOrNull
  priority: NumberOrNull
  text: string
}

interface CategoriesObj extends BaseObj {
  data: CategoryObj[]
}

export interface ArtObj extends DataObj {
  category: string[]
  image: string
  year: string
}

interface ArtworksObj extends BaseObj {
  data: ArtObj[]
}

interface Priority {
  isChanged: boolean
  categories: CategoryObj[]
}

export interface PageObj extends DataObj {
  pageType: string
  pageImg: string
  banner: string
  text: string
  navigationOrder: NumberOrNull
  categoryPriority: Priority
}

interface PagesObj extends BaseObj {
  data: PageObj[]
}

interface PageType {
  id: NumberOrNull
  pageType: string
}

interface StateObj {
  categories: CategoriesObj
  art: ArtworksObj
  pages: PagesObj
  images: ImagesObj
  pageTypes: PageType[]
}

const initState: StateObj = {
  categories: {
    success: '',
    error: '',
    data: [{
      id: null,
      name: '',
      page: [''],
      navigationOrder: null,
      priority: null,
      text: ''
    }]
  },
  art: {
    success: '',
    error: '',
    data: [{
      id: null,
      name: '',
      category: [''],
      image: '',
      year: ''
    }]
  },
  pages: {
    success: '',
    error: '',
    data: [{
      id: null,
      name: '',
      pageType: '',
      pageImg: '',
      banner: '',
      text: '',
      navigationOrder: null,
      categoryPriority: {
        isChanged: false,
        categories: []
      }
    }]
  },
  images: {
    success: '',
    error: '',
    data: []
  },
  pageTypes: []
}

interface ContextObj {
  state: StateObj
  setState: any
}

const DataContext = createContext<ContextObj>({ state: initState, setState: null })

export const AdminProvider = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  const [state, setState] = useState(initState)
  return (
    <DataContext.Provider value={{ state, setState }}>
      { children }
    </DataContext.Provider>
  )
}

const useAdminData = (navigateUrl: string = '') => {
  const { data: res, fetchGet } = useFetch('/all', false)
  const { state, setState } = useContext(DataContext)
  const { categories, art, pages, images, pageTypes } = state
  const navigate = useNavigate()

  const fetchData = () => {
    fetchGet()
  }

  useEffect(() => {
    if (!res) {
      return
    }

    const categories: CategoryObj[] = res.categories.map((category: any) => {
      return {
        ...category,
        navigationOrder: category.navigation_order
      }
    })

    const artworks: ArtObj[] = res.art.map((artwork: any) => {
      return {
        ...artwork,
        year: artwork.year.toString()
      }
    })

    const pages = res.pages.map((page: any) => {
      return {
        ...page,
        navigationOrder: page.navigation_order,
        pageType: page.page_type,
        pageImg: page.page_img,
        categoryPriority: {
          isChanged: false,
          categories: []
        }
      }
    })

    const pageTypes = res.page_types.map((pageType: any) => {
      return {
        ...pageType,
        pageType: pageType.page_type
      }
    })

    const images = res.images.map((image: any) => {
      return {
        ...image,
        publicId: image.public_id
      }
    })

    const newState: StateObj = {
      categories: {
        ...state.categories,
        data: categories
      },
      art: {
        ...state.art,
        data: artworks
      },
      pages: {
        ...state.pages,
        data: pages
      },
      images: {
        ...state.images,
        data: images
      },
      pageTypes
    }

    setState(newState)
    if (navigateUrl) {
      navigate(navigateUrl)
    }
  }, [res])

  return { categories, art, pages, pageTypes, images, state, setState, fetchData }
}

export default useAdminData
