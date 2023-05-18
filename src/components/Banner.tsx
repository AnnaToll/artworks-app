import type { NavObj } from '../context/Nav.types'

const Banner = ({ data }: { data: NavObj }) => {
  if (!data.banner) {
    return null
  } else {
    return (
      <img className="banner" src={data.banner}/>
    )
  }
}

export default Banner
