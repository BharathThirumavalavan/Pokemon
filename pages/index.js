import Head from 'next/head'
import  PokemonCard  from '../components/pokemonCard'
import axios from 'axios'
import { SearchedPokemon } from '../components/searchedPokemon'

export default function Home(props) {
  
  return (
    <>
      <Head>
        <title>Pokemon</title>
        <link
          href='//db.onlinewebfonts.com/c/f4d1593471d222ddebd973210265762a?family=Pokemon'
          rel='stylesheet'
          type='text/css'
        />
      </Head>
      <div className='sticky top-0'>
        <header className='p-2 cursor-pointer'>
          <h1 className=' pokemon heading '>Pokemon Finder</h1>
        </header>
        <section>
          <SearchedPokemon />
        </section>

        <main className='flex flex-wrap justify-center items-center relative  container mx-auto'>
          <PokemonCard {...props} />
        </main>
      </div>
    </>
  )
}

export async function getStaticProps() {
  let response;

  try {
    response = await axios.get(
      'https://pokeapi.co/api/v2/pokemon?limit=50&offset=75'
    )
   
    const pokemonURL = response.data.results.map((pokemon) => {
      return pokemon.url
    })

    return {
      props: {
        pokemonURL: pokemonURL,
      },
    }
  } catch (error) {
    return {
      props: {
        fetchedData: error?.response ? error?.response : error.message,
      },
    }
  }
}


