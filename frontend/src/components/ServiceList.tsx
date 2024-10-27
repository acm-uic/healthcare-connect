import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Profile.module.css'; 

interface Service {
  id: string;
  name: string;
}

interface ServiceListProps {
  services: Service[];
  userId: string;
}

const ServiceList: React.FC<ServiceListProps> = ({ services, userId }) => {
  const [serviceList, setServiceList] = useState<Service[]>(services);
  const [loadingServiceId, setLoadingServiceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null); 
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleRemoveService = async (serviceId: string) => {
    const isConfirmed = window.confirm("Are you sure you want to remove this service?");
    if (!isConfirmed) return;

    setLoadingServiceId(serviceId);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/${userId}/remove-service/${serviceId}`,{
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      console.log('Response:', response.data);

      if (response.status === 200) {
        setServiceList(prevList => prevList.filter(service => service.id !== serviceId));
        setSuccessMessage('Service removed successfully!');
      } else {
        throw new Error('Failed to remove service');
      }
    } catch (err: any) {
      setError('Failed to remove the service. Please try again.');
      console.error('Error removing service:', err.response ? err.response.data : err.message);
    } finally {
      setLoadingServiceId(null);
    }
  };

  return (
    <div className={styles.gridContainer}>
      {error && <p className={`${styles.message} ${styles.errorMessage}`}>{error}</p>}
      {successMessage && <p className={`${styles.message} ${styles.successMessage}`}>{successMessage}</p>}
      {serviceList.map(service => (
        <div key={service.id} className={styles.gridCard}>
          <p>{service.name}</p>
          <button
            onClick={() => handleRemoveService(service.id)}
            disabled={loadingServiceId === service.id}
            className={styles.removeBtn}
          >
            {loadingServiceId === service.id ? <div className={styles.spinner}></div> : 'Remove'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;