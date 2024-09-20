import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">Healthcare Connect</Link>
        </div>
        <ul className={styles.navLinks}>
          <li className={router.pathname === '/services' ? styles.active : ''}>
            <Link href="/services">Services</Link>
          </li>
          <li className={router.pathname === '/insurance' ? styles.active : ''}>
            <Link href="/insurance">Insurance</Link>
          </li>
          <li className={router.pathname === '/about' ? styles.active : ''}>
            <Link href="/about">About Us</Link>
          </li>
          <li className={router.pathname === '/contact' ? styles.active : ''}>
            <Link href="/contact">Contact</Link>
          </li>
            <li className={styles.auth}>
                {isSignedIn ? (
                <button onClick={() => setIsSignedIn(false)}>Sign Out</button>
                ) : (
                <button onClick={() => setIsSignedIn(true)}>Sign In</button>
                )}
            </li>
        </ul>
      </div>
    </nav>
  );
}
