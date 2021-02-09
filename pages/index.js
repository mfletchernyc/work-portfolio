import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import parse from 'html-react-parser'
import axios from 'axios'
import { v4 } from 'uuid'

import headTags from '../config/headTags'
import options from '../config/axiosOptions'

const getPortfolio = async () => axios(options)
  .then((response) => ({
    error: false,
    portfolio: response.data.data
  }))
  .catch((error) => ({
    error: error.toString(),
    portfolio: null
  }))

const Portfolio = ({ portfolio, error }) => {
  if (error) {
    return (
      <div className="content-center flex flex-wrap h-screen justify-center">
        {error}
      </div>
    )
  }

  return (
    <div className="bg-gray-100 flex justify-center">
      <Head>
        <title>{portfolio.generalSettings.title}</title>
        {headTags}
      </Head>

      <main className="sm:max-w-4xl">
        <h1 className="font-normal mt-8 mx-4 text-4xl text-blue-slate">
          {portfolio.generalSettings.title}
        </h1>

        {portfolio.posts.nodes.map((item) => (
          <div className="bg-gray-200 border mb-10 mt-8 mx-4 p-4 pb-8 sm:px-8 shadow-0" key={v4()}>
            <h2 className="font-normal mb-5 mt-2 text-2xl text-gray-700">{item.title}</h2>
            {parse(
              item.content // Keep things CSS-free. Use Image.
                .replace(/<p>/g, '<p class="mt-4">')
                .replace(/<a/g, '<a class="text-blue-slate"')
            )}
          </div>
        ))}
      </main>
    </div>
  )
}

Portfolio.propTypes = {
  portfolio: PropTypes.shape({
    generalSettings: PropTypes.shape({
      title: PropTypes.string
    }),
    posts: PropTypes.PropTypes.shape({
      nodes: PropTypes.instanceOf(Array)
    })
  }).isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]).isRequired
}

export const getStaticProps = async () => ({ props: await getPortfolio() })

export default Portfolio
