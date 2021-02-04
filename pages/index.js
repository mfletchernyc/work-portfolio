import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import parse from 'html-react-parser'
import { v4 } from 'uuid'

import headTags from '../config/headTags'
import { database, opts } from '../config/dbQuery'

export default function Home() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [portfolio, setportfolio] = useState([])

  useEffect(() => {
    fetch(database, opts)
      .then((response) => response.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setportfolio(result)
        },
        (err) => {
          setIsLoaded(true)
          setError(err)
        }
      )
  }, [])

  const content = () => {
    if (error) {
      return (
        <div className="content-center flex flex-wrap h-screen justify-center">
          Error! {error.message}
        </div>
      )
    }

    if (!isLoaded || portfolio.length === 0) {
      return (
        <div className="content-center flex flex-wrap h-screen justify-center">
          Loading...
        </div>
      )
    }

    return (
      <div className="bg-gray-100 flex justify-center">
        <Head>
          <title>{portfolio.data.generalSettings.title}</title>
          {headTags}
        </Head>

        <main className="sm:max-w-4xl">
          <h1 className="font-normal mt-8 mx-4 text-4xl text-blue-slate">
            {portfolio.data.generalSettings.title}
          </h1>

          {portfolio.data.posts.nodes.map((item) => (
            <div className="bg-gray-200 border mb-10 mt-8 mx-4 p-4 pb-8 sm:px-8 shadow-0" key={v4()}>
              <h2 className="font-normal mb-5 mt-2 text-2xl text-gray-700">{item.title}</h2>
              {parse(
                item.content // Keeping things CSS-free...
                  .replace(/<p>/g, '<p class="mt-4">')
                  .replace(/<a/g, '<a class="text-blue-slate"')
              )}
            </div>
          ))}
        </main>
      </div>
    )
  }

  return content()
}
