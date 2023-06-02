// import Main from '../../containers/MainContainer'
import Headline from '../../Headline'
import { useNavigate } from 'react-router-dom'
import List from './List'
import type { BaseObj } from '../../../context/DataContext'

interface EditWrapperProps {
  headline: string
  endpoint: string
  state: BaseObj
}

const EditWrapper = ({ headline, endpoint, state }: EditWrapperProps) => {
  const navigate = useNavigate()

  const handleClickAdd = () => {
    navigate('skapa-ny')
  }

  return (
    <main className='admin-main'>
      <section className='edit-container'>
        <Headline headline={headline} />
        <button onClick={handleClickAdd} className='btn bg-blue'><i className="bi bi-plus"></i><span>Lägg till ny</span></button>
        <List list={state.data} endpoint={endpoint} />
      </section>
    </main>
  )
}

export default EditWrapper
