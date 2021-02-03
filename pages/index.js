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
        <div className="h-screen flex flex-wrap content-center justify-center">
          Error! {error.message}
        </div>
      )
    }

    if (!isLoaded || portfolio.length === 0) {
      return (
        <div className="h-screen flex flex-wrap content-center justify-center">
          Loading...
        </div>
      )
    }

    return (
      <div className="flex justify-center">
        <Head>
          <title>{portfolio.data.generalSettings.title}</title>
          {headTags}
        </Head>

        <main className="sm:max-w-4xl">
          <h1 className="mx-4 mt-8 text-4xl font-normal">
            {portfolio.data.generalSettings.title}
          </h1>

          {portfolio.data.posts.nodes.map((item) => (
            <div className="mx-4 mt-8 mb-10 p-4 pb-8 sm:px-8 border border-grey-50 shadow-lg" key={v4()}>
              <h2 className="text-2xl font-normal mb-5 mt-2">{item.title}</h2>
              {parse(
                item.content
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
