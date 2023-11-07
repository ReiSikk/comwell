import React, {useState} from "react";
import Image from "next/image";
import profileIcon from "../assets/icons/profile_icon.svg";
import hotelIcon from "../assets/icons/nav_hotel_icon.svg";
import hamburgerIcon from "../assets/icons/hamburger.svg";
import locationsIcon from "../assets/icons/locations_icon.svg";
import NavLink_Icon from "@/molecules/NavLink_Icon";
import styles from "./Nav.module.scss";
import Login_Popup from "./Login_Popup";

function Nav() {

const [isPopupVisible, setPopupVisible] = useState(false);




  return (
    <>
    <header className={styles.nav_container}>
      <a href="#">
        <Image src={hotelIcon} width={120} height={34.55} alt="Comwell Hotel Icon" />
      </a>
      <div className={styles.links_container}>
        <NavLink_Icon link_name="Locations" link_href="/fourohfour" image_src={locationsIcon} image_alt="Arrow" />
        <NavLink_Icon link_name="Profile" image_src={profileIcon} image_alt="Profile Icon" onClick={() => setPopupVisible(true)} onClose={() => setPopupVisible(false)}/>
        <NavLink_Icon link_name="Menu" link_href="/fourohfour" image_src={hamburgerIcon} image_alt="Comwell Hotel Icon" />
      </div>
    </header>
    <Login_Popup isVisible={isPopupVisible} onClose={() => setPopupVisible(false)}/>
    </>
  );
}

export default Nav;
