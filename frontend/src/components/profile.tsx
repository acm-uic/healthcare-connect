import React from 'react';
import styled from 'styled-components';

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

const ProfilePage: React.FC = () => {
  const savedInsurances = [
    { id: 1, name: 'Health Insurance' },
    { id: 2, name: 'Car Insurance' },
    { id: 3, name: 'Home Insurance' }
  ];

  const savedServices = [
    { id: 1, name: 'Plumbing Service' },
    { id: 2, name: 'Cleaning Service' },
    { id: 3, name: 'Electrical Service' }
  ];

  return (
    <ProfilePageContainer>
     
      <ProfileHeader>
        <ProfileTitle>My Profile</ProfileTitle>
        <ProfileDetail><strong>Full Name:</strong> John Doe</ProfileDetail>
        <ProfileDetail><strong>Email:</strong> johndoe@email.com</ProfileDetail>
        <ProfileDetail><strong>Role:</strong> Lighter color, under the email</ProfileDetail>
      </ProfileHeader>

     
      <Section>
        <SectionTitle>Saved Insurances</SectionTitle>
        <GridContainer>
          {savedInsurances.map((insurance) => (
            <GridCard key={insurance.id}>
              {insurance.name}
            </GridCard>
          ))}
        </GridContainer>
      </Section>

    
      <Section>
        <SectionTitle>Saved Services</SectionTitle>
        <GridContainer>
          {savedServices.map((service) => (
            <GridCard key={service.id}>
              {service.name}
            </GridCard>
          ))}
        </GridContainer>
      </Section>
    </ProfilePageContainer>
  );
};

export default ProfilePage;
