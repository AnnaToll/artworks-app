import { useState, useEffect } from 'react'
import useAdminData from '../../../context/DataContext'
import type { PageObj, CategoryObj } from '../../../context/DataContext'
import Error from '../../features/Error'
import Headline from '../../Headline'
import useFetch from '../../../hooks/useFetch'

interface NavType {
  pages: PageObj[]
  categories: CategoryObj[]
  all: any
}

const EditNav = () => {
  const { pages, categories, fetchData } = useAdminData()
  const { data: actionRes, error, fetchPut } = useFetch('/nav', false)

  const [navList, setNavList] = useState<NavType>({
    pages: [],
    categories: [],
    all: []
  })

  useEffect(() => {
    const newPages = JSON.parse(JSON.stringify(pages.data))
    const newCategories = JSON.parse(JSON.stringify(categories.data))
    setNavList({
      ...navList,
      pages: newPages,
      categories: newCategories,
      all: [...newPages, ...newCategories]
    })
  }, [pages, categories])

  useEffect(() => {
    if (actionRes) {
      fetchData()
    }
  }, [actionRes])

  const handleSave = () => {
    console.log(navList.all)
    fetchPut(navList)
  }

  const filterNavList = () => {
    const filtered = navList.all.filter((category: any) => category.navigationOrder !== null)
    const sorted = filtered.sort((first: any, second: any) => first.navigationOrder - second.navigationOrder)
    return sorted
  }

  const filteredNavList: any[] = filterNavList()

  const handleChangeCheckBoxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNavList: any = { ...navList }
    const allNavListItem: [] = newNavList.all

    if (e.target.checked) {
      allNavListItem.forEach((nav: any) => {
        if (nav.name === e.target.name) {
          nav.navigationOrder = filteredNavList.length + 1
        }
      })
    } else {
      allNavListItem.forEach((nav: any) => {
        if (nav.name === e.target.name) {
          nav.navigationOrder = null
        }
      })
      allNavListItem.sort((first: any, second: any) => {
        const prioFirst = first.navigationOrder || allNavListItem.length + 2
        const prioSecond = second.navigationOrder || allNavListItem.length + 2
        return prioFirst - prioSecond
      })
      allNavListItem.forEach((nav: any, index: number) => {
        if (nav.navigationOrder) {
          nav.navigationOrder = index + 1
        }
      })
    }

    setNavList(newNavList)
  }

  const handleClickMove = (navigationOrder: number, direction: string) => {
    const newNavList: any = { ...navList }
    const allNavListItems: any[] = newNavList.all
    const selectedIndex = allNavListItems.findIndex(nav => nav.navigationOrder === navigationOrder)
    const switchnavigationOrder = direction === 'up' ? navigationOrder - 1 : navigationOrder + 1
    const switchIndex = allNavListItems.findIndex(nav => nav.navigationOrder === switchnavigationOrder)
    allNavListItems[selectedIndex].navigationOrder = switchnavigationOrder
    allNavListItems[switchIndex].navigationOrder = navigationOrder

    setNavList(newNavList)
  }

  return (
    <main className='admin-main'>
      <Headline headline="Meny" />
      <button onClick={handleSave} className='btn bg-blue'>
        <span>Uppdatera</span>
      </button>
      <Error error={error} />
      <form className='edit-single-form'>
        <p>Välj sidor till meny:</p>
        <div className='check-boxes-container mb-6'>
          { navList.all.map((nav: any, index: number) => {
            const isSelected = nav.navigationOrder !== null
            return (
              <div key={`checkbox-${index}`}>
                <input
                  checked={isSelected}
                  className='visually-hidden'
                  type="checkbox" id={`checkbox-${nav.name}`}
                  name={nav.name}
                  onChange={handleChangeCheckBoxes}
                />
                <label
                  className={isSelected ? 'selected' : ''}
                  htmlFor={`checkbox-${nav.name}`}
                >
                  {isSelected && <i className="bi bi-check-lg"></i>}
                  <span>{nav.name}</span>
                </label>
              </div>
            )
          })}
        </div>
        <div>
          <p>Välj ordning på meny:</p>
          {filteredNavList.map((nav, index) => (
            <div key={`filtered-nav-${nav.id}+${nav.name}`} className='prio-categories'>
              <span>{`${index + 1}. ${nav.name}`}</span>
              <div>
                {index !== 0 && (
                  <i
                    className="bi bi-arrow-up-short"
                    onClick={() => handleClickMove(index + 1, 'up')}
                  />)}
                {index !== filteredNavList.length - 1 &&
                <i
                  className="bi bi-arrow-down-short"
                  onClick={() => handleClickMove(index + 1, 'down')}
                />}
              </div>
            </div>
          ))}
        </div>
      </form>
    </main>

  )
}

export default EditNav
