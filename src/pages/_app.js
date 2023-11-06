import '@/styles/globals.css'
import { Inter } from 'next/font/google';
import localFont from 'next/font/local'
// Font files can be colocated inside of `pages`
const fontRegular = localFont({ src: '/fonts/Fellix-Bold-fe0f33a2.ttf' })

// If loading a variable font, you don't need to specify the font weight
/* const inter = Inter({ subsets: ['latin'] }); */

export default function App({ Component, pageProps }) {
  return (
  <main className={fontRegular.className}>
   <Component {...pageProps} />
  </main>
  )
}
