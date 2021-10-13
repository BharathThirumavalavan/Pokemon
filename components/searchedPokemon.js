import axios from 'axios'
import { useState,  useRef } from 'react'
import{LoadingAnimation} from '../helpers/progress'
import {MainCard} from '../components/mainCard'
import { AttentionSeeker } from 'react-awesome-reveal';
export const SearchedPokemon = () => {
  const [isFetching, setIsFetching] = useState(true)
  const [hasSearched, setHasSearched] = useState(false)
  const [searchedItem, setSearchedItem] = useState({
    success: false,
    name: '',
    weight: '',
    height: '',
    image: '',
    ablities: [],
    moves: [],
  })
  const search = useRef('')

  const ErrorPage = ()=>{
    setTimeout(() => {
      setHasSearched(false)
    }, 3000);
   return (
     <AttentionSeeker effect='headShake' triggerOnce>
       <div className='flex items-center justify-center flex-row my-5 p-5'>
         <svg
           xmlns='http://www.w3.org/2000/svg'
           className='h-10 w-10 text-red-500'
           fill='none'
           viewBox='0 0 24 24'
           stroke='currentColor'
         >
           <path
             strokeLinecap='round'
             strokeLinejoin='round'
             strokeWidth='2'
             d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
           />
         </svg>
         <h2 className='text-2xl mx-5'>No Pokemons Found</h2>
       </div>
     </AttentionSeeker>
   )
  }



  async function searchPokemon() {
   
    const lookFor = search.current.value.toString().toLowerCase()
    
   
    if (lookFor) {
     setHasSearched(true)
     setIsFetching(true)
     try{
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${lookFor}`
      )
      const fetchedData = res?.data
    
      if (fetchedData?.name){
        setSearchedItem({
          success: true,
          name: fetchedData?.name,
          weight: fetchedData?.weight,
          height: fetchedData?.height,
          image: fetchedData?.sprites.other.dream_world.front_default,
          ablities: fetchedData?.abilities,
          moves: fetchedData?.moves,
        })

      }else{
       setSearchedItem((prev)=>{
         return { ...prev, success: false }
       })
      }

     }catch(error){
       setSearchedItem((prev) => {
         return { ...prev, success: false }
       })
      console.error(error)
     }finally{
       setIsFetching(false)
     }
    }
  }


  return (
    <>
      <nav className='nav'>
        <div className='m-5 flex md:flex-row flex-col  items-center justify-center'>
          <div className='relative '>
            <input
              type='text'
              className=' border p-2 pl-10 rounded-md my-3 self-center justify-between'
              placeholder='Search pokemon'
              required
              maxLength='15'
              ref={search}
            />
            <img
              src='https://img.icons8.com/material-outlined/24/000000/search--v1.png'
              className='absolute bottom-5 left-3 opacity-50'
            />
          </div>
          <button className='btn btn-gradient mx-5 ' onClick={searchPokemon}>
            Catch
          </button>
        </div>
      </nav>

      <div>
        {hasSearched &&
          (isFetching ? (
            <div className='flex items-center justify-center'>
              <LoadingAnimation />{' '}
            </div>
          ) : searchedItem.success ? (
            <MainCard {...searchedItem} />
          ) : (
            <ErrorPage />
          ))}
      </div>
    </>
  )
}

{/*/ */}