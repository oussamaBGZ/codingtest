import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Asteroids, { selectedAstro, selectedAstroProps } from '@/components/Asteroids';

type Target<T extends string> = EventTarget & {
  [key in T]: {
    value: string
  }
}

export default function Home() {
  const [dateVal, setDateVal] = useState<{ [key in string]: any }>({})
  const [selectedAstro, setSelectedAstro] = useState<selectedAstro>()
  const [err, setErr] = useState<null | string>(null)
  const [disabled, setDisabled] = useState<boolean>(false)

  const formatDate = (date: string) => {
    const dateString = new Date(date)
    return dateString.getFullYear() + '-' + ("0" + (dateString.getMonth() + 1)).slice(-2) + '-' + ("0" + dateString.getDate()).slice(-2)
  }

  const handleSelect = async (e: SyntheticEvent) => {
    e.preventDefault()
    setDisabled(true)
    setDateVal({})
    setErr(null)
    const target = e.target as Target<"minDate" | "maxDate">
    try {
      const response = await axios.get<{
        near_earth_objects: {
          [key in string]: selectedAstro[]
        }
      }>(`/api/search?minDate=${formatDate(target.minDate.value)}&maxDate=${formatDate(target.maxDate.value)}`)
      setDisabled(false)
      setDateVal(response.data.near_earth_objects)
    } catch (e: any) {
      setErr(e.response.data.error_message)
      setDisabled(false)
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          {selectedAstro ?
            <Asteroids selectedAstro={selectedAstro} setSelectedAstro={setSelectedAstro} />
            : <> <form onSubmit={handleSelect}>
              <label>Start date: </label>
              <input type="date" name="minDate" id="minDate" placeholder='Start date' required />
              <br />
              <label>End date: </label>
              <input type="date" name="maxDate" id="maxDate" placeholder='End date' required />
              <button type='submit' disabled={disabled}>Submit</button>
            </form>
              <div>
                {
                  Object.keys(dateVal).sort()?.map(el => <div key={el}>
                    <h3>{el}</h3>
                    {dateVal[el].map((Element: any) =>
                      <ul key={Element.id}>
                        <li onClick={() => setSelectedAstro(Element)}>{Element.name}
                        </li>
                      </ul>
                    )}
                  </div>)
                }
                <p className={styles['error-code']}>{err}</p>
              </div></>}
        </div>
      </main>
    </>
  )
}
