import React from "react";
import styles from './Arrows.module.css';

const ArrowLeft = () => {
  return (
    <div className={styles.arrowContainer}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="18"
        fill="none"
        viewBox="0 0 12 18"
      >
        <path
          fill="#222"
          d="M4.437 9l6.6 6.6-1.885 1.885L.667 9 9.152.515 11.037 2.4 4.437 9z"
        ></path>
      </svg>
    </div>
  );
}

export default ArrowLeft;


