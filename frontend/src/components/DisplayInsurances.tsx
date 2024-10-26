'use client';
import { useState, useEffect } from 'react';
import styles from "../styles/Insurances.module.css"; // Ensure this path is correct
import Link from "next/link";

const DisplayInsurances = ({ userId }: { userId: string }) => {
  // Define Insurance interface
  interface Insurance {
    _id: string;
    name: string;
    description: string;
    monthlyPremium: number;
    coverageDetails: string;
    eligibility: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  // Define InsuranceData interface
  interface InsuranceData {
    insuranceData: Insurance[];
  }

  const [insuranceData, setInsuranceData] = useState<InsuranceData>({ insuranceData: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [saveLoading, setSaveLoading] = useState<string | null>(null);

  // Function to fetch insurance plans
  const fetchInsurancePlans = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/insurance-plan`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not okay");
      }

      const data = await res.json();
      setInsuranceData({ insuranceData: data });
    } catch (err) {
      console.error("Error fetching insurance plans:", err);

      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unknown error has occurred"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect to fetch insurance plans on component mount
  useEffect(() => {
    fetchInsurancePlans();
  }, []);

  // Map insurance plans to JSX elements
  const renderedInsurances = insuranceData.insuranceData.map((insurance) => (
    <div className={styles.item} key={insurance._id}>
      <h2 className={styles.name}>{insurance.name}</h2>
      {/* <p>{insurance.description}</p>
      <p>Monthly Premium: ${insurance.monthlyPremium}</p>
      <p>Coverage Details: {insurance.coverageDetails}</p> */}
      <p>Eligibility: {insurance.eligibility}</p>
      <button className={styles.details}>
        <Link href={`/insurances/${insurance._id}`}>View Details</Link>
      </button>
      <button
        className={styles.details}
        onClick={() => saveInsurance(insurance._id)}
        disabled={saveLoading === insurance._id}  // Disable while saving this insurance
      >
        {saveLoading === insurance._id ? "Saving..." : "Save"}
      </button>

    </div>
  ));

  const saveInsurance = async (insuranceId: string) => {
    setSaveLoading(insuranceId);  // Set loading state for the specific insurance
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/save-insurance/${insuranceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!res.ok) {
        throw new Error("Failed to save insurance.");
      }
      alert("Insurance saved successfully!");
    } catch (err) {
      console.error("Error saving insurance:", err);
      alert("Error occurred while saving insurance.");
    } finally {
      setSaveLoading(null);  // Reset loading state
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1>Medical Insurances</h1>
        <hr />
        <h2>
          We provide to you the best choices for you. Adjust to your health needs and make sure you undergo treatment with our highly qualified doctors. You can consult with us to find out which type of service is suitable for your health.
        </h2>
      </div>
      
      {/* Error and loading states */}
      {error && <p>Error: {error.message}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.container_grid}>
          {renderedInsurances.length > 0 ? renderedInsurances : <p>No insurance plans available.</p>}
        </div>
      )}
    </div>
  );
};

export default DisplayInsurances;