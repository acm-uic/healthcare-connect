'use client';

import Image from "next/image";
import {useState, useEffect} from 'react'
import styles from "../styles/Services.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import cart from  '../../public/cart.png'

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
                    <div className={styles.card_top}>
                        <h4 className={styles.cost}>${service.cost}/mo</h4>
                        <button className={styles.cart}>
                            <Image src={cart} className={styles.cart} alt="shopping cart"/>
                        </button>
                    </div>
                    <h2 className={styles.name}>{service.name}</h2>
                    <h3>{service.eligibility}</h3>
                    
                    <button className={styles.details}>
                        <Link href={`/services/${service._id}`}>Learn More</Link>
                    </button> 
                </div>
            </div>
        )
    })
    
    
    return (
        <div className={styles.container}>
            <div className={styles.title_container}>
                <h1>Medical Services</h1> 
                <hr/>
                <h2>We prove to you the best choices for you. Adjust it to your health needs and make sure you undergo treatment<br/>with out highly qualified doctors you can consult with us which type of service is suitable for your health</h2>
            </div>

            {error && <p>Error: {error.message}</p>}
            {isLoading ? (
            <div className={styles.container_grid}>
                <div className={styles.item}>Loading...</div>
                <div className={styles.item}>Loading...</div>
                <div className={styles.item}>Loading...</div>
                <div className={styles.item}>Loading...</div>
                <div className={styles.item}>Loading...</div>
                <div className={styles.item}>Loading...</div>   
            </div>) : 
            (
            <div className={styles.container_grid}>
                {renderedServices}

                <div className={styles.item}>n/a</div>
            </div>)} 
        </div>
    )
}

export default DisplayServices
