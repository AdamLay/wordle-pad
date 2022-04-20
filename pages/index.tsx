import type { NextPage } from 'next'
import Head from 'next/head'
import WordGrid from '../components/WordGrid'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>World-Pad</title>
        <meta name="description" content="Wordle guess pad" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <WordGrid />
        <ol style={{color:"white"}}>
          <li>Type in your guessed words</li>
          <li>Click on the letters to cycle through Absent/Present/Correct</li>
        </ol>
      </main>
    </div>
  )
}

export default Home
