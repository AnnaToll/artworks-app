export type NavType = 'Category' | 'Home' | 'Text page'

export interface NavResponse {
  id: number
  navigation_order: number
  page?: string
  category?: string
  page_type_id?: NavType
  name: string
  text: string
  banner?: string
  page_img?: string
}

export interface NavObj {
  id: number
  endpoint: string
  type: NavType
  name: string
  text: string
  order: number
  banner: string
  page_img: string
}
