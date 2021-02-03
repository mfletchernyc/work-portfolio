const database = 'https://fletcher.nyc/work/graphql'

const query = `
  query {
    generalSettings {
      title
    }
    posts {
      nodes {
        title
        content
      }
    }
  }
`

const opts = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
}

export { database, opts }
