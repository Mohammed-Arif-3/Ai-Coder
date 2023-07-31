import { Html, Head, Main, NextScript } from 'next/document'
import { Link } from 'react-router-dom'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <title>Ai-Coder</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
