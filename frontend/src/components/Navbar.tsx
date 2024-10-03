import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import styles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";
import logo from '../../public/logo.png';

export default function Navbar() {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image 
            className={styles.logo_image}
            src={logo}
            alt="Temporary placeholder picture for logo"
          />
          <Link className={styles.logo_text} href="/">Healthcare Connect</Link>

          {/* Burger icon for mobile menu */}
          <div className={`${styles.burger} ${isMenuOpen ? styles.active : ''}`} onClick={toggleMenu}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>

        {/* Navigation Links */}
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
          <li className={router.pathname === '/' ? styles.active : ''}>
            <Link href="/">Home</Link>
          </li>
          <li className={router.pathname === '/about' ? styles.active : ''}>
            <Link href="/about">About Us</Link>
          </li>
          <li className={router.pathname === '/testimonials' ? styles.active : ''}>
            <Link href="/testimonials">Testimonials</Link>
          </li>
          <li className={router.pathname === '/signup' ? styles.active : ''}>
            <Link href="/signup">Sign Up</Link>
          </li>
          <li className={router.pathname === '/signin' ? styles.active : ''}>
            <Link href="/signin">Sign In</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
