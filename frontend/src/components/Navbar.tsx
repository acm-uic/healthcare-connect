import Image from "next/image";
import Link from "next/link";
import logo from '../../public/logo.png';
import styles from "../styles/Navbar.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use the useAuth hook to get authentication status
  const { authenticated } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle Sign Out (add your sign-out logic here)
  const handleSignOut = () => {
    // Clear token and redirect to sign-in page
    localStorage.removeItem('access_token');
    router.push('/signin');
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
          <li className={router.pathname === '/about' ? styles.active : ''}>
            <Link href="/about">About Us</Link>
          </li>
          {/* Conditionally render based on authentication status */}
          {authenticated ? (
            <>
              <li className={router.pathname === '/profile' ? styles.active : ''}>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button className="text-red-500" onClick={handleSignOut}>Sign Out</button>
              </li>
            </>
          ) : (
            <>
              <li className={router.pathname === '/signup' ? styles.active : ''}>
                <Link href="/signup">Sign Up</Link>
              </li>
              <li className={router.pathname === '/signin' ? styles.active : ''}>
                <Link href="/signin">Sign In</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
