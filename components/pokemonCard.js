import { useState, useEffect } from 'react'
import axios from 'axios'
import { LoadingAnimation } from '../helpers/progress'


export default function PokemonCard({  pokemonURL }) {
  let arrayPokemon = []
  const [pokemonData, setPokemonData] = useState([{
   name:'',
   weight:'',
   height:'',
   image:'',
   ablities:'',
   isHover:false
  }])
  const [isFetching, setIsFetching] = useState(true)

  function showDetails( name){
    let temp = pokemonData.map(poke => {
      if (poke.name === name){

        return {
          ...poke,
          isHover: true,
        }
      }else{
        return poke
      }  
    });
    setPokemonData(temp)
  }

  function hideDetails(name){
     let temp = pokemonData.map((poke) => {
       if (poke.name === name) {
         return {
           ...poke,
           isHover: false,
         }
       } else {
         return poke
       }
     })

     setPokemonData(temp)
  }

  useEffect(() => {

    async function fetchData(){
     try{
    
       for (let i = 0; i < pokemonURL.length; i++) {
         const res = await axios(pokemonURL[i])
         arrayPokemon.push({
           name: res.data.name,
           weight: res.data.weight,
           height: res.data.height,
           image: res.data.sprites.other.dream_world.front_default,
           ablities: res.data.abilities,
           isHover: false,
         })
       }
        setPokemonData(arrayPokemon)

       }
 
     catch(err){
       setPokemonData([
         {
           name: '',
           weight: '',
           height: '',
           image: '',
           ablities: '',
           isHover: false,
         },
       ])

     }finally{
       setIsFetching(false)
     }
    }
   
    fetchData()
  }, [pokemonURL])

  return pokemonData.map((onePoki, index) => {
    let Ablity = []
    for (const key of onePoki.ablities) {
      Ablity.push(<li className='px-3 leading-relaxed'>{key.ability.name}</li>)
    }
    return (
      <>
        {isFetching ? (
          <div className='flex items-center justify-center'>
            <LoadingAnimation />{' '}
          </div>
        ) : (
          <div
            className='card scaleOnHover'
            key={index}
            onMouseOver={() => {
              showDetails(onePoki.name)
            }}
            onMouseLeave={() => {
              hideDetails(onePoki.name)
            }}
          >
            {onePoki.isHover && (
              <div className={`showMore popup`}>
                <h1 className='text-center text-xl mx-2'>Ablity</h1>
                <div className='d-flex'>{Ablity}</div>
              </div>
            )}

            <h2 className='text-3xl text-center font-light capitalize'>
              {onePoki.name}
            </h2>

            <div className=' text-gray-500 font-light text-lg my-3'>
              <div className='mx-2 my-5'>
                <img
                  src={onePoki.image}
                  className='object-contain h-64 w-64'
                ></img>
              </div>
              <div className='px-5'>
                <li>
                  Weight:{' '}
                  <span className='font-normal '>
                    {onePoki.weight}
                    <span className='text-sm'> kg</span>
                  </span>
                </li>
                <li>
                  Height:{' '}
                  <span className=' font-normal '>
                    {onePoki.height}
                    <span className='text-sm'> ft</span>
                  </span>
                </li>
              </div>
            </div>
          </div>
        )}
      </>
    )
  })
}


