import React, { useState } from "react";
import Image from "next/image";
import profileIcon from "../assets/icons/profile_icon.svg";
import hotelIcon from "../assets/icons/nav_hotel_icon.svg";
import hamburgerIcon from "../assets/icons/hamburger.svg";
import locationsIcon from "../assets/icons/locations_icon.svg";
import NavLink from "@/molecules/NavLink";
import styles from "./Nav.module.scss";
import Nav_Popup from "./Nav_Popup";
import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";

function Nav() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <>
      <header className={styles.nav_container}>
        <Link href="/">
          <Image src={hotelIcon} width={120} height={34.55} alt="Comwell Hotel Icon" />
        </Link>
        <div className={styles.links_container}>
          <NavLink link_name="Locations" link_href="/fourohfour" image_src={locationsIcon} image_alt="Arrow" />
          <NavLink link_name={isLoggedIn ? "username" : "Profile"} image_src={profileIcon} image_alt="Profile Icon" onClick={() => setPopupVisible(true)} />
          <NavLink link_name="Menu" link_href="/fourohfour" image_src={hamburgerIcon} image_alt="Comwell Hotel Icon" />
        </div>
      </header>
      <Nav_Popup isVisible={isPopupVisible} onClose={() => setPopupVisible(false)} />
    </>
  );
}

export default Nav;
