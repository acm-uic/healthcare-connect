'use client';
import styles from '../../styles/ServiceDetails.module.css';
import { useRouter } from "next/router";
import {useState, useEffect} from 'react'


export default function Insurance() {
    const router = useRouter()
    const { id } = router.query
    const [insuranceID, setInsuranceID] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (router.isReady) {
            setInsuranceID(router.query.id as string); // Only set when query is ready
            console.log(router.query.id); 
        }
    }, [router.isReady, router.query.id]);

    // Interface for insurance data
    interface Insurance {
        _id: string
        name: string
        description: string
        monthlyPremium: number 
        coverageDetails: string
        eligibility: string
        __v: number 
    }

    // State to hold insurance data, initialized with default values
    const [insuranceData, setInsuranceData] = useState<Insurance>({
        _id: "",
        name: "",
        description: "",
        monthlyPremium: 0,
        coverageDetails: "", 
        eligibility: "", 
        __v: 0, 
    })
    

    // Fetch insurance data from API
    const fetchInsurance = async () => {
        try {

            // Exit if insuranceID not set
            if (!insuranceID) return
                
            // Use insuranceID to create API URL
            const insurance_uri =  `${process.env.NEXT_PUBLIC_API_URL}/insurance/${insuranceID}`
            const res = await fetch(`${insurance_uri}`)

            // Check response
            if (!res.ok) {
                throw new Error("Network wasn't okay")
            }

            // Parse JSON response and update state with insurance data
            const result:Insurance = await res.json() 
            setInsuranceData(result)

        }
        catch (err) {
            console.log("error:", err)
        }
    }

    // Fetch insurance data when insuranceID is set
    useEffect( () => {
        if (insuranceID) {
            fetchInsurance();
        }
    }, [insuranceID])

    console.log(insuranceData)

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.holder}>
                <div className={styles.head}>
                    <h2>{insuranceData.name}</h2>
                    <button>Select</button>
                </div>
                <p>{insuranceData.description}</p>
                <p>${insuranceData.monthlyPremium}</p>
                <p>{insuranceData.coverageDetails}</p>
                <p>{insuranceData.eligibility}</p>
                </div>
            </div>
        </div>
    )
}