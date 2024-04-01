import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { severity } from '../severity'
import Wrapper from '../components/Wrapper';
import dayjs from 'dayjs';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import SearchResult from './SearchResult';
import { getData } from '../slice/dataSlice'

function Weather() {

  const { id } = useParams()
  const [data, setData] = useState([])
  const [forecast, setForecast] = useState([])
  const [getHourForecast, setHourForecast] = useState([])
  const [search, setSearch] = useState("")
  const [searchedData, setSearchedData] = useState([])

  const { data: getData2 } = useSelector((state) => state.home)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!id) {
    console.log("Page not found");
  }

  const currentConditions = async () => {
    const { data } = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${id}?apikey=${import.meta.env.VITE_API_KEY}`)
    setData(data?.[0])
  }

  const dailyForecast = async () => {
    const { data } = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}?apikey=${import.meta.env.VITE_API_KEY}`)
    setForecast(data)
  }

  const hourForecast = async () => {
    const { data } = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${id}?apikey=${import.meta.env.VITE_API_KEY}`)
    setHourForecast(data)
  }

  const max = Math.floor((forecast?.DailyForecasts?.[0]?.Temperature?.Maximum?.Value - 32) * 5 / 9)
  const min = Math.floor((forecast?.DailyForecasts?.[0]?.Temperature?.Minimum?.Value - 32) * 5 / 9)

  useEffect(() => {
    currentConditions()
    dailyForecast()
    hourForecast()
  }, [])

  const handleClick = (item) => {
    dispatch(getData(item))
    navigate(`/weather/${item.Key}`)
    setSearchedData([])
    setSearch("")
  }

  return (
    <>
      <Header type={true} setSearch={setSearch} search={search} searchedData={searchedData} setSearchedData={setSearchedData} />
      {
        searchedData[0] ? (
          <Wrapper>
            {
              searchedData.map((item, index) => {
                return <SearchResult key={index} data={item} handleClick={handleClick} />
              })
            }
          </Wrapper>
        ) : (
          <section>
            <Wrapper>
              {
                data && (
                  <div className='mb-10 sm:my-10 sm:mt-10 shadow-xl sm:py-20 sm:px-10 py-10 px-4 '>
                    <div className='flex justify-between mb-2 items-center'>
                      <span className='text-md sm:text-2xl font-semibold'>Current Weather</span>
                      <div className='flex flex-col'>
                        <span className='text-md sm:text-2xl font-normal'>{getData2?.LocalizedName}, {getData2?.Country?.LocalizedName}</span>
                        <span className='text-md sm:text-2xl font-normal'>{dayjs(data.LocalObservationDateTime).format('h:mm A, dddd')}</span>
                      </div>
                    </div>
                    <hr />
                    <div className='flex justify-between mt-5'>
                      <div className='flex flex-col gap-3'>
                        <h1 className='text-5xl sm:text-8xl font-semibold mb-5'>{Math.round(data.Temperature?.Metric?.Value)}°<span className='text-2xl sm:text-5xl text-slate-300'>C</span></h1>
                        <span>Max/Min: {`${max}°/${min}°`} - {forecast?.Headline?.Text}</span>
                        <Link className='' to={data.Link}>More Detail</Link>
                      </div>
                      <div>
                        <h1 className='text-xl sm:text-3xl font-semibold'>{data.WeatherText}</h1>
                      </div>
                    </div>
                  </div>
                )
              }

              <h1 className='text-md sm:text-lg font-normal mb-5'>Hourly Weather Forecast</h1>
              <div className="flex gap-5 overflow-y-scroll no-scrollbar">
                {
                  getHourForecast?.map((item, index) => {
                    return (
                      <div key={index} className='bg-neutral-200 py-3 px-2 min-w-40'>
                        <div className='flex justify-between'>
                          <span>{dayjs(item.DateTime).format('h A')}</span>
                          <span>{Math.floor((item.Temperature.Value - 32) * 5 / 9)}° C</span>
                        </div>
                        <span>{item.IconPhrase}</span>
                      </div>
                    )
                  })
                }
              </div>

              <div className='w-full shadow-xl sm:py-20 sm:px-5 py-10 px-4 flex flex-col gap-5'>
                <div>
                  <h1 className='text-md sm:text-xl font-semibold mb-2'>5 Days Weather Forecast</h1>
                  <hr />
                </div>
                <div className='flex flex-col'>
                  {
                    forecast?.DailyForecasts?.map((item, index) => {
                      return (
                        <div key={index}>
                          <div className='flex flex-col gap-2 sm:flex-row sm:gap-24 py-5 sm:items-center'>
                            <div className='flex justify-between sm:gap-32'>
                              <span className='w-24'>{dayjs(item.Date).format('dddd') === dayjs(data.LocalObservationDateTime).format('dddd') ? "Today" : dayjs(item.Date).format('dddd')}</span>
                              <span className='w-20'>{Math.floor((item.Temperature?.Maximum?.Value - 32) * 5 / 9)}°/{Math.floor((item.Temperature?.Minimum?.Value - 32) * 5 / 9)}°</span>
                            </div>
                            <div className='flex flex-col gap-1'>
                              <span>Day: {item.Day.IconPhrase}</span>
                              <span>Night: {item.Night.IconPhrase}</span>
                            </div>
                          </div>
                          <hr />
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </Wrapper>
          </section>
        )
      }
    </>
  )
}

export default Weather
