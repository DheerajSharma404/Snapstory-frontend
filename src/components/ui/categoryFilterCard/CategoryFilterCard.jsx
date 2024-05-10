/* eslint-disable react/prop-types */
import styles from "./CategoryFilterCard.module.css";
import React from "react"
import { StoryContext } from "../../../contexts/StoryContexts";

const CategoryFilterCard = ({ title, imageUrl }) => {
  const { selectedCategory, setSelectedCategory } =
    React.useContext(StoryContext);

  return (
    <>
      <div
        key={title}
        className={`${styles.categoryFilterCard} ${
          selectedCategory === title && styles.selected
        }`}
        onClick={() => setSelectedCategory(title)}
      >
        <img
          src={imageUrl}
          alt={title}
          className={styles.categoryFilterCardImage}
        />
        <div className={styles.categoryFilterCardTitleWrapper}>
          <p className={styles.categoryFilterCardTitle}>{title}</p>
        </div>
      </div>
    </>
  );
};

export default CategoryFilterCard;
