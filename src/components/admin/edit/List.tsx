import { useNavigate } from 'react-router-dom'
import useModal from '../../../hooks/useModal'
import { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import useAdminData from '../../../context/DataContext'

interface ListProps {
  list: Array<{ name: string, id: number }>
  endpoint: string
}

const List = ({ list, endpoint }: ListProps) => {
  const navigate = useNavigate()
  const { ModalConfirm, hasConfirmed, openModal } = useModal()
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const { fetchData } = useAdminData()
  const { fetchDelete } = useFetch(endpoint, {}, fetchData)

  const handleClickItem = (id: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target: HTMLElement = e.target as HTMLElement
    if (target.nodeName !== 'BUTTON' && target.nodeName !== 'I') {
      navigate(`${id}`)
    }
  }

  const handleClickDelete = (id: number, name: string) => {
    setSelectedId(id)
    openModal(`Är du säker på att du vill radera "${name}"?`)
  }

  useEffect(() => {
    if (hasConfirmed) {
      fetchDelete({ id: selectedId })
    }
  }, [hasConfirmed])

  return (
    <>
      <ModalConfirm />
      <ul className='admin-list'>
        {list.map((listItem: any) => (
          <li onClick={(e) => handleClickItem(listItem.id, e)} key={`listItem${listItem.id}`}>
            <span>{listItem.name}</span>
            <div>
              <button onClick={() => navigate(`${listItem.id}`)}>
                <i className="bi bi-pencil-fill" />
              </button>
              <button onClick={() => handleClickDelete(listItem.id, listItem.name)}>
                <i className="bi bi-trash3" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default List
