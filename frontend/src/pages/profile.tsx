import React from 'react';
import styles from '../styles/Profile.module.css';
import ServiceList from '../components/ServiceList';

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
    <div className={styles.profilePageContainer}> {/* Class is correctly applied */}
      <div className={styles.profileHeader}> {/* Correct class */}
        <h1 className={styles.profileTitle}>My Profile</h1> {/* Correct class */}
        <p className={styles.profileDetail}><strong>Full Name:</strong> John Doe</p> {/* Correct class */}
        <p className={styles.profileDetail}><strong>Email:</strong> johndoe@email.com</p> {/* Correct class */}
        <p className={styles.profileDetail}><strong>Role:</strong> User</p> {/* Correct class */}
      </div>

      <div className={styles.section}> {/* Correct class */}
        <h2 className={styles.sectionTitle}>Saved Insurances</h2> {/* Correct class */}
        <div className={styles.gridContainer}> {/* Correct class */}
          {savedInsurances.map((insurance) => (
            <div className={styles.gridCard} key={insurance.id}> {/* Correct class */}
              {insurance.name}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}> {/* Correct class */}
        <h2 className={styles.sectionTitle}>Saved Services</h2>
        {/* ServiceList component */}
        {/* <ServiceList services={savedServices} userId="1" /> */}
      </div>
    </div>
  );
};

export default ProfilePage;