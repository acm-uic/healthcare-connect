import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";
import logo from '../../public/logo.png';

export default function Navbar() {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mock function to simulate user authentication check (you can replace this with your real logic)
  const checkUserAuth = () => {
    return true
  };

  // useEffect to check if the user is signed in when the component mounts
  useEffect(() => {
    const userSignedIn = checkUserAuth();
    setIsSignedIn(userSignedIn);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    // Clear authentication token (or other methods of sign out)
    localStorage.removeItem("authToken");
    setIsSignedIn(false);
    router.push("/signin"); // Redirect to the sign-in page
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
          {isSignedIn ? (
            <>
              <li className={router.pathname === '/profile' ? styles.active : ''}>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button className="text-red-500"
                onClick={handleSignOut}>Sign Out</button>
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
