import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import styles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";

import logo from  '../../public/logo.png'

export default function Navbar() {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);

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
        </div>
        <ul className={styles.navLinks}>
          <li className={router.pathname === '/' ? styles.active : ''}>
            <Link href="/">Test</Link>
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
            {/* <li className={styles.auth}>
                {isSignedIn ? (
                <button onClick={() => setIsSignedIn(false)}>Sign Out</button>
                ) : (
                <button onClick={() => setIsSignedIn(true)}>Sign In</button>
                )}
            </li> */}
        </ul>
      </div>
    </nav>
  );
}
