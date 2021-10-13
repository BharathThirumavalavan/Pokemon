import {useEffect,useState} from 'react'

export const MainCard = (props)=>{
 const[animate,setAnimate] = useState(true)
 const [close,setClose] = useState(null)
 const [moves,setMoves] = useState([])
 const [ablities,setAblities] = useState([])
 useEffect(() => {
  let temp=[];
  setClose(false)
   for (const key in props.moves) {
    if(temp.length>5){
     break
    }else{
      temp.push(props.moves[key]?.move.name)
    }
   }
   setMoves(temp)
   temp= []
   for (const key in props.ablities) {
       temp.push(props.ablities[key]?.ability.name)
    }
    setAblities(temp)

 }, [props])
   
 useEffect(() => {
   const timer = setTimeout(() => {
     if (close) {
       setAnimate(false)
     } else {
       setAnimate(true)
     }
    },500)
     return () => {
       clearTimeout(timer)
     }
   }, [close])
 
 
  return (
    <>
    {animate&&(<div className={close ? `fadeIn ` : 'mainCard '}>
      <button
        className='absolute right-10'
        onClick={() => {
          setClose((prev) => !prev)
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-8 w-8'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>

      <h1 className='text-center text-6xl font-thin mt-5 mb-10 capitalize'>
        {props.name}
      </h1>

      <div className='flex md:flex-row flex-col w-100 py-3 justify-center'>
        <div className=' w-1/2  mx-auto'>
          <img
            src={props.image}
            alt='Pokemon Image'
            className='imageContainer object-contain'
          />
        </div>

        <div className='  h-full p-5 mx-auto'>
          <h2 className='text-2xl my-3'>Physical Appearance</h2>

          <section>
            <li>
              Weight:{' '}
              <span className='font-medium text-gray-100'>{props.weight}</span>
              <span className='text-gray-200 text-xs'> kg</span>
            </li>
            <li>
              Height:{' '}
              <span className='font-medium text-gray-100'>{props.height}</span>
              <span className='text-gray-200 text-xs'> ft</span>
            </li>
          </section>
          <section>
            <h2 className='text-2xl my-3'>Ablities</h2>
            {}
            {ablities.map((move, index) => (
              <li className='capitalize' key={index}>
                {move}
              </li>
            ))}
          </section>
          <section>
            <h2 className='text-2xl my-3'>Moves</h2>
            {moves.map((move, index) => (
              <li className='capitalize' key={index}>
                {move}
              </li>
            ))}
          </section>
        </div>
      </div>
    </div>)}
  </> 
  )
}