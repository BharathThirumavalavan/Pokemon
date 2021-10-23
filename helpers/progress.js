export const LoadingAnimation = ()=>{
  return (
    <div className='flex items-center justify-center '>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='5rem'
        height='5rem'
        viewBox='0 0 100 100'
        className='loading'
      >
        <path
          d='M 30 50
		a 1 1 1 0 1 40 0
		h-12.5
		a 1 1 1 0 0 -15 0
		z'
          fill='#f00'
          stroke='#222'
        ></path>
        <circle cx='50' cy='50' r='5' fill='#222' stroke='#222'></circle>
        <path
          d='M 30 50
		a 1 1 1 0 0 40 0
		h-12.5
		a 1 1 1 0 1 -15 0
		z'
          fill='#fff'
          stroke='#222'
        ></path>
      </svg>
      <span className='loadingAnimate text-gray-600 tracking-widest'>
        Loading...
      </span>
    </div>
  )
}