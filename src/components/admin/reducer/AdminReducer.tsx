import { useReducer } from 'react'

const initState = {
  categories: {
    success: '',
    error: '',
    data: [{
      id: '',
      category: '',
      prority: 2
    }]
  },
  art: {
    success: '',
    error: '',
    data: [{
      id: '',
      title: '',
      category: [''],
      image: '',
      year: ''
    }]
  },
  pages: {
    success: '',
    error: '',
    data: [{
      id: '',
      pageName: '',
      pageType: [''],
      pageImg: '',
      banner: ''
    }]
  }
}

const AdminReducer = (state: any, action: any) => {
  if (action.type === 'test') {
    return state
  }
  return state
}

export const useAdminData = () => {
  const [state, dispatch] = useReducer(AdminReducer, initState)
  const { categories, art, pages } = state

  return { categories, art, pages, dispatch }
}
