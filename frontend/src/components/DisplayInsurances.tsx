'use client'
import { useEffect } from "react";


const DisplayInsurances = () => {

    useEffect(() => {
        const fetchInsurances = async () => {
            try {
                const response = await fetch('http://localhost:4000/insurance-plan');
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchInsurances();
    }, []);

    return (
        <div>
            <h1>Insurances</h1>
        </div>
    );
}

export default DisplayInsurances;