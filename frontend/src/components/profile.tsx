import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Styled Components 
const ProfilePageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const ProfileTitle = styled.h1`
  font-size: 2rem;
  color: #000000;
  margin-bottom: 10px;
`;

const ProfileDetail = styled.p`
  font-size: 1rem;
  color: #666666; /* Lighter color for role and email */
  strong {
    font-weight: bold;
  }
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #000000;
  margin-bottom: 20px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const GridCard = styled.div`
  background-color: #e0f7fa;
  border-radius: 12px;
  padding: 20px;
  font-size: 1.2rem;
  color: #000000;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  font-size: 1.2rem;
  padding: 20px;
`;

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

const paginate = (items: any[]) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  return items.slice(indexOfFirstItem, indexOfLastItem);
};


  useEffect(() => {
    const token = localStorage.getItem('authToken'); 

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (err) {
        setError('Failed to load user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <LoadingSpinner>Loading...</LoadingSpinner>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!userData) {
    return <ErrorMessage>No user data available.</ErrorMessage>;
  }

  const { name, email, role, savedInsurances, savedServices } = userData;

  return (
    <ProfilePageContainer>
      <ProfileHeader>
        <ProfileTitle>My Profile</ProfileTitle>
        <ProfileDetail><strong>Full Name:</strong> {name}</ProfileDetail>
        <ProfileDetail><strong>Email:</strong> {email}</ProfileDetail>
        <ProfileDetail><strong>Role:</strong> {role}</ProfileDetail>
      </ProfileHeader>

    
      <Section>
        <SectionTitle>Saved Insurances</SectionTitle>
        {savedInsurances && savedInsurances.length > 0 ? (
          <GridContainer>
            {savedInsurances.map((insurance: { id: number, name: string }) => (
              <GridCard key={insurance.id}>
                {insurance.name}
              </GridCard>
            ))}
          </GridContainer>
        ) : (
          <p>No saved insurances found.</p>
        )}
      </Section>

  
      <Section>
        <SectionTitle>Saved Services</SectionTitle>
        {savedServices && savedServices.length > 0 ? (
          <GridContainer>
            {savedServices.map((service: { id: number, name: string }) => (
              <GridCard key={service.id}>
                {service.name}
              </GridCard>
            ))}
          </GridContainer>
        ) : (
          <p>No saved services found.</p>
        )}
      </Section>
    </ProfilePageContainer>
  );
};

export default ProfilePage;
