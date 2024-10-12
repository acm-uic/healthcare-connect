import React from 'react';
import styles from '../styles/Profile.module.css';

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
    <div className={styles.profilePageContainer}>
      <div className={styles.profileHeader}>
        <h1 className={styles.profileTitle}>My Profile</h1>
        <p className={styles.profileDetail}><strong>Full Name:</strong> John Doe</p>
        <p className={styles.profileDetail}><strong>Email:</strong> johndoe@email.com</p>
        <p className={styles.profileDetail}><strong>Role:</strong> User</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Saved Insurances</h2>
        <div className={styles.gridContainer}>
          {savedInsurances.map((insurance) => (
            <div className={styles.gridCard} key={insurance.id}>
              {insurance.name}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Saved Services</h2>
        <div className={styles.gridContainer}>
          {savedServices.map((service) => (
            <div className={styles.gridCard} key={service.id}>
              {service.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
