import styles from './modalStyles.module.css';
import React from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { ReactDOM } from 'react';

const Modal = ({ isOpen, onClose, message }) => {
  // if (!isOpen) return null;
  return (
    <div className=''>
      <div className={`${styles.darkBG} z-50`} onClick={onClose} />
      <div className={`${styles.centered} z-50 `}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Dialog</h5>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <RiCloseLine style={{ marginBottom: '-3px' }} />
          </button>
          <div className={styles.modalContent}>{message}</div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={onClose}>
                Delete
              </button>
              <button className={styles.cancelBtn} onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
