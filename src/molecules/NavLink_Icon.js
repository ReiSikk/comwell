import React from 'react'
import Image from 'next/image'
import styles from './NavLink_Icon.module.css'


function NavLink_Icon({link_name, onClick, link_href, image_src, weight, height, image_alt}) {
  return (
      <a onClick={onClick} className={styles.nav_link} href={link_href}><p>{link_name}</p>
    <Image src={image_src}
      width={weight}
      height={height}
      alt={image_alt}/>
      </a>
  )
}

export default NavLink_Icon