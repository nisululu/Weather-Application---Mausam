import React, { useContext, useState } from 'react'
import Wrapper from '../components/Wrapper'
import axios from 'axios'
import SearchResult from './SearchResult'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getData } from '../slice/dataSlice'


const Home = () => {
    const [search, setSearch] = useState("")
    const [searchedData, setSearchedData] = useState([])
    const [data, setData] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { data } = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?q=${search}&apikey=${import.meta.env.VITE_API_KEY}`)
        setSearchedData(data)
    }

    const handleClick = (item) => {
        // setData(item)
        dispatch(getData(item))
        navigate(`/weather/${item.Key}`)
    }

    const getLocation = () => {
        const successCallback = async (position) => {
            const {data} = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?q=${position.coords.latitude},${position.coords.longitude}&apikey=${import.meta.env.VITE_API_KEY}`)
            // setData(data)
            dispatch(getData(data))
            navigate(`/weather/${data?.Key}`)
          };
          
          const errorCallback = (error) => {
            console.log(error);
          };
          
          navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
    }

    return (
        <>
            <Header type={false} />
            <div className=''>
                <Wrapper>
                    <h1 className='text-3xl text-center mt-20'>Mausam</h1>
                    <form className='mt-10 flex justify-center' onSubmit={handleSubmit}>
                        <input
                            className='w-full border px-3 py-2 rounded-l-md shadow-sm outline-none'
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Search anywhere everywhere'
                        />
                        <button type='button' className='bg-slate-900 rounded-r-md px-5 w-40 text-white font-semibold' onClick={getLocation}>Get Location</button>
                    </form>
                    {
                        searchedData?.map((item, index) => {
                            return <SearchResult key={index} data={item} handleClick={handleClick} />
                        })
                    }

                </Wrapper>
            </div>
        </>
    )
}

export default Home
