interface ListProps {
  list: Array<{ name: string, id: number }>
  editFn: () => void
  deleteFn: (body: Record<string, unknown>) => void
}

const List = ({ list, editFn, deleteFn }: ListProps) => {
  return (
    <ul className='admin-list'>
      {list.map((listItem: any) => (
        <li key={`listItem${listItem.id}`}>
          <span>{listItem.name}</span>
          <div>
            <button onClick={editFn}>
              <i className="bi bi-pencil-fill" />
            </button>
            <button onClick={() => deleteFn({ id: listItem.id })}>
              <i className="bi bi-trash3" />
            </button>
          </div>
        </li>
      ))}

    </ul>
  )
}

export default List
