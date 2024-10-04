'use client';
import { useState, useEffect } from 'react';
import styles from "../styles/Services.module.css";
import Link from "next/link";

const DisplayServices = () => {
  // Define Service interface
  interface Service {
    _id: string;
    name: string;
    description: string;
    cost: number;
    location: string;
    eligibility: string;
    languagesSupported: string[]
    createdAt: string
    updatedAt: string
    __v: number 
  }

  // Define ServiceData interface
  interface ServiceData {
    serviceData: Service[];
  }

  const [servicesData, setServicesData] = useState<ServiceData>({ serviceData: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Function to fetch services
  const fetchServices = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service`);
      
      if (!res.ok) {
        throw new Error("Network response was not okay");
      }

      const data = await res.json();
      console.log(data);
      setServicesData({ serviceData: data });
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
    console.log(servicesData.serviceData);
    fetchServices();
  }, []);

  

  // Map services to JSX elements
  const renderedServices = servicesData.serviceData.map((service, key) => (
    <div className={styles.item} key={key}>
      <div>
        <h4 className={styles.cost}>${service.cost}/month</h4>
        <h2 className={styles.name}>{service.name}</h2>
        <h3 className='my-4'>Eligibility: {service.eligibility}</h3>
        <button className={styles.details}>
          <Link href={`/services/${service._id}`}>Learn More</Link>
        </button> 
      </div>
    </div>
  ))


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
        <p>Loading...</p>
      ) : (
        <div className={styles.container_grid}>
          {renderedServices}
        </div>
      )}
    </div>
  );
  
};

export default DisplayServices;
