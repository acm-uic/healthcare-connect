'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';
import styles from "../styles/Services.module.css";
import Link from "next/link";
import cart from '../../public/cart.png';

const DisplayServices = () => {
  // Define Service interface
  interface Service {
    _id: string;
    name: string;
    description: string;
    cost: number;
    location: string;
    eligibility: string;
    languagesSupported: string[];
  }

  // Define ServiceData interface
  interface ServiceData {
    message: string;
    serviceData: Service[];
  }

  const [servicesData, setServicesData] = useState<ServiceData>({
    message: "",
    serviceData: []
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch API URL from environment, add fallback in case it's undefined
  const services_uri = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/service`
    : "/fallback-url/service";

  // Function to fetch services
  const fetchServices = async () => {
    try {
      const res = await fetch(services_uri);
      
      if (!res.ok) {
        throw new Error("Network response was not okay");
      }

      const result: ServiceData = await res.json();
      setServicesData(result);
    } catch (err) {
      console.error("Error fetching services:", err);

      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unknown error has occurred"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect to fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  const { serviceData } = servicesData;

  // Map services to JSX elements
  const renderedServices = serviceData.map((service: Service, key: number) => (
    <div className={styles.item} key={key}>
      <div>
        <div className={styles.card_top}>
          <h4 className={styles.cost}>${service.cost}/mo</h4>
          <button className={styles.cart}>
            <Image src={cart} alt="shopping cart" width={24} height={24} />
          </button>
        </div>
        <h2 className={styles.name}>{service.name}</h2>
        <h3>{service.eligibility}</h3>

        <button className={styles.details}>
          <Link href={`/services/${service._id}`}>Learn More</Link>
        </button>
      </div>
    </div>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1>Medical Services</h1>
        <hr />
        <h2>
          We provide the best choices for you. Adjust them to your health needs and ensure you undergo treatment
          <br />
          with highly qualified doctors. You can consult with us to find out which type of service is suitable for your health.
        </h2>
      </div>
  
      {/* Error and loading states */}
      {error && <p>Error: {error.message}</p>}
      {isLoading ? (
        <div className={styles.container_grid}>
          <div className={styles.item}>Loading...</div>
          <div className={styles.item}>Loading...</div>
          <div className={styles.item}>Loading...</div>
          <div className={styles.item}>Loading...</div>
          <div className={styles.item}>Loading...</div>
          <div className={styles.item}>Loading...</div>
        </div>
      ) : (
        <div className={styles.container_grid}>
          {renderedServices}
        </div>
      )}
    </div>
  );
  
};

export default DisplayServices;
