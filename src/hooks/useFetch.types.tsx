
export type ResponseTypes = any

export interface DataObj {
  error?: string
  success?: ResponseTypes
}

export type Method = 'POST' | 'GET' | 'PUT' | 'DELETE'
