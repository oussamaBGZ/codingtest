import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
