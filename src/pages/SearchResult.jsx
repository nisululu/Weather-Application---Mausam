import React from 'react'
import { useNavigate } from 'react-router-dom'

const SearchResult = ({ data, handleClick }) => {
    const navigate = useNavigate()

    return (
        <>
            <div className='my-5 hover:cursor-pointer' onClick={()=>handleClick(data)}>
                <h2 className='text-lg'>{data.EnglishName}</h2>
                <span className='text-sm text-slate-500'>{`${data.AdministrativeArea.EnglishName}, ${data.Country.EnglishName}`}</span>
            </div>
            <hr></hr>
        </>
    )
}

export default SearchResult
