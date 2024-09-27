'use client';

import {useState, useEffect} from 'react'
import styles from "../styles/Services.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

const DisplayServices = () => {
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

    interface ServiceData {
        message: string;
        serviceData: Service[]
    }

    const [servicesData, setServicesData] = useState<ServiceData>({
        message: "",
        serviceData: []
    })

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const services_uri = `${process.env.NEXT_PUBLIC_API_URL}/service`

    const fetchServices = async () => {
        try { 
            const res = await fetch(`${services_uri}`)

            if (!res.ok) {
                throw new Error("network was not okay")

            }
            const result:ServiceData = await res.json() 
            //console.log(result)
            setServicesData(result)
            setIsLoading(false)
        } catch (err) {
            console.log("err:", err)
            
            if (err instanceof Error) {
                setError(err)
            } else {
                setError(new Error("An unknown error has occured"))
            }

            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchServices()
        console.log("fetched!")
    }, [])
    
    const { serviceData } = servicesData
    //console.log(serviceData)
   
    const renderedServices = serviceData.map((service: Service, key: number) => {
        return (
            <div className={styles.item} key={key}>
                <div>
                    <h2 className={styles.name}>{service.name}</h2>
                    <h3>{service.eligibility}</h3>
                    <h3>Cost: ${service.cost}</h3>
                    
                    <button className={styles.details}>
                        <Link href={`/services/${service._id}`}>Learn More</Link>
                    </button> 
                </div>
            </div>
        )
    })

    return (
        <div className={styles.container}>
            <h1>Services</h1> 
            {isLoading && <p>Loading...</p>} 
            {error && <p>Error: {error.message}</p>}
            <div className={styles.container_grid}>
                {renderedServices}
            </div>
        </div>
    )
}

export default DisplayServices
