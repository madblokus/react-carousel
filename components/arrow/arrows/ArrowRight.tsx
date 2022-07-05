import React from "react";
import styles from './Arrows.module.css'

const ArrowRight = () => {
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
          d="M7.563 9l-6.6-6.6L2.848.515 11.333 9l-8.485 8.485L.963 15.6l6.6-6.6z"
        ></path>
      </svg>
    </div>
  );
}

export default ArrowRight;


