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
    languagesSupported: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  // Define ServiceData interface
  interface ServiceData {
    serviceData: Service[];
  }

  const [servicesData, setServicesData] = useState<ServiceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [language, setLanguage] = useState<string>(''); // State to track selected language
  const [searchTerm, setSearchTerm] = useState<string>(''); // New state for search term

  // Function to fetch services, optionally filtered by language
  const fetchServices = async (filterLanguage?: string) => {
    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/service`;

      if (filterLanguage) {
        url = `${process.env.NEXT_PUBLIC_API_URL}/service/filter-language?language=${filterLanguage}`;
      }

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not okay");
      }

      const data = await res.json();
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

  // Fetch all services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  // Handle language filter form submission
  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchServices(language); // Fetch services by the selected language
  };

  // Filter services based on the search term
  const filteredServices =  servicesData?.serviceData.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );


// Map services to JSX elements
  const renderedServices = filteredServices?.map((service, key) => (
    <div className={styles.item} key={key}>
      <div>
        <h4 className={styles.cost}>${service.cost}/month</h4>
        <h2 className={styles.name}>{service.name}</h2>
        <h3 className='my-4'>Eligibility: {service.eligibility}</h3>
        <button className={styles.details}>
          <Link href={`/services/${service._id}`}>View Details</Link>
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

      {/* Search bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for services..."
        />
      </div>

      {/* Language Filter */}
      <form onSubmit={handleFilter} className={styles.filterForm}>
        <label htmlFor="language">Filter by language: </label>
        <input
          type="text"
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          placeholder="Enter language"
        />
        <button type="submit">Apply</button>
      </form>

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
