import '@/css/index.scss';
import type { AppProps } from 'next/app'
import Context from '@/contex/BreedContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Context>
        <Component {...pageProps} />
      </Context>
    </>
  )
}
