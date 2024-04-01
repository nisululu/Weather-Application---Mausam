import React from 'react'
import Wrapper from './Wrapper'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Header = ({ type, setSearch, search, setSearchedData, searchedData }) => {

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { data } = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?q=${search}&apikey=${import.meta.env.VITE_API_KEY}`)
    setSearchedData(data)
  }

  return (
    <nav className='py-2 bg-slate-900'>
      <Wrapper>
        <section className='flex flex-row justify-between items-center'>
          <div>
            <span className='text-2xl font-medium text-white hover:cursor-pointer' onClick={() => navigate('/')}>Mausam</span>
          </div>
          {type && (
            <form className='w-7/12' onSubmit={handleSubmit}>
              <input
                className='w-full border px-2 py-1 rounded-md shadow-sm outline-none'
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search anywhere everywhere'
              />
            </form>
          )}
        </section>
      </Wrapper>
    </nav>
  )
}

export default Header
