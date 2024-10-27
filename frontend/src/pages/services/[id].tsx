'use client';
import styles from '../../styles/ServiceDetails.module.css';

import { useRouter } from "next/router";
import {useState, useEffect} from 'react'

export default function Service() {
    const router = useRouter()
    const { id } = router.query

    const [serviceID, setServiceID] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (router.isReady) {
            setServiceID(router.query.id as string); // Only set when query is ready
            //console.log(router.query.id); 
        }
    }, [router.isReady, router.query.id]);

    interface Service {
        _id: string
        name: string
        description: string
        cost: number 
        location: string
        eligibility: string
        languagesSupported: string[]
        createdAt: string
        updatedAt: string
        __v: number 
    }

    const [serviceData, setServiceData] = useState<Service>({
        _id: "",
        name: "",
        description: "",
        cost: 0,
        location: "", 
        eligibility: "", 
        languagesSupported: [],
        createdAt: "", 
        updatedAt: "", 
        __v: 0, 
    })
    

    const fetchService = async () => {
        try {
            if (!serviceID) return
                
            const service_uri =  `${process.env.NEXT_PUBLIC_API_URL}/service/${serviceID}`
            const res = await fetch(`${service_uri}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization : `Bearer ${localStorage.getItem('access_token')}`
                }
            })

            if (!res.ok) {
                throw new Error("network was not okay")
            }

            const result:Service = await res.json() 
            setServiceData(result)

        }
        catch (err) {
            console.log("err:", err)
        }
    }

    useEffect( () => {
        if (serviceID) {
            fetchService();
        }
    }, [serviceID])

    console.log(serviceData)

    const displayLanguages = serviceData.languagesSupported.length === 1 ? serviceData.languagesSupported[0] : serviceData.languagesSupported.join(", ");
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.holder}>
                <div className={styles.head}>
                    <h2>{serviceData.name}</h2>
                    <button>Save</button>
                </div>
                <p>{serviceData.description}</p>
                <p>${serviceData.cost}</p>
                <p>{serviceData.location}</p>
                <p>{serviceData.eligibility}</p>
                <p>{displayLanguages}</p>
                </div>
            </div>
        </div>
    )
}
