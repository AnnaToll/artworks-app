export interface CategoryResponse {
  id: number
  category: string
  priority: number
}

export interface ArtResponse {
  id: number
  title: string
  category_id: number
  image: string
  year: number
}

export interface PageResponse {
  page: string
  page_type: string
  text: string
  banner: string
  page_img: string
}
