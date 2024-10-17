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
  const [serviceList, setServiceList] = useState<Service[]>(services); // State for services
  const [loadingServiceId, setLoadingServiceId] = useState<string | null>(null); // Track loading state for a specific service
  const [error, setError] = useState<string | null>(null); // State for any error messages
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success messages

  // Function to handle removing a service
  const handleRemoveService = async (serviceId: string) => {
    // Confirm the removal action
    const isConfirmed = window.confirm("Are you sure you want to remove this service?");
    if (!isConfirmed) return;

    setLoadingServiceId(serviceId); // Set loading state for the specific service
    setError(null); // Clear any previous error
    setSuccessMessage(null); // Clear any previous success messages

    try {
      // API call to remove the service
      const response = await axios.delete(
        `https://your-api-url.com/${userId}/remove-service/${serviceId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            // If your API requires an Authorization token:
            // Authorization: `Bearer ${yourAuthToken}`, which is needed for it to work !!
          },
        }
      );
      console.log('Response:', response.data); // Log response data for debugging for backend

      // Check if the response is successful
      if (response.status === 200) {
        // Update UI to remove the service from the list on success
        setServiceList(prevList => prevList.filter(service => service.id !== serviceId));
        setSuccessMessage('Service removed successfully!');
      } else {
        throw new Error('Failed to remove service');
      }
    } catch (err: any) {
      // Handle specific errors
      setError('Failed to remove the service. Please try again.');
      console.error('Error removing service:', err.response ? err.response.data : err.message);
    } finally {
      setLoadingServiceId(null); // Reset loading state
    }
  };

  return (
    <div className={styles.gridContainer}>
      {error && <p className={`${styles.message} ${styles.errorMessage}`}>{error}</p>} {/* Display error message if there's an error */}
      {successMessage && <p className={`${styles.message} ${styles.successMessage}`}>{successMessage}</p>} {/* Display success message if successful */}
      {serviceList.map(service => (
        <div key={service.id} className={styles.gridCard}>
          <p>{service.name}</p>
          {/* "Remove" button with loading state */}
          <button
            onClick={() => handleRemoveService(service.id)}
            disabled={loadingServiceId === service.id} // Disable while loading
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