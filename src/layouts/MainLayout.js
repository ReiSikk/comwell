import React from 'react'
import Nav from '@/organisms/Nav'
import localFont from 'next/font/local'

// Font files can be colocated inside of `pages`
const fontRegular = localFont({ src: '..//pages/fonts/Fellix-Regular-bb0c0db8.ttf' })


function MainLayout({children}) {
  return (
    <div className={fontRegular.className}>
        <Nav />
        {children}
    </div>
  )
}

export default MainLayout