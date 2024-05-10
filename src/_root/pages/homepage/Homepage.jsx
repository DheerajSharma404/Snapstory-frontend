import React from "react";
import {
  CategoryFilterCard,
  CategorySectionCard,
  Modal,
} from "../../../components/index.js";
import CATEGORY from "../../../constants/categories";
import { ModalContext } from "../../../contexts/ModalContexts";
import { StoryContext } from "../../../contexts/StoryContexts";
import styles from "./Homepage.module.css";

const Homepage = () => {
  const { isModalOpen, ModalContent } = React.useContext(ModalContext);
  const {
    Stories,
    userStories,
    selectedCategory,
    setSelectedCategory,
    storiesByCategory,
    setStoriesByCategory,
  } = React.useContext(StoryContext);
  const [category] = React.useState(CATEGORY);

  const FilteredStories = Stories?.filter(
    (story) => selectedCategory === "All" || story.category === selectedCategory
  );

  return (
    <>
      <div className={styles.categoryFilter}>
        {category.map((category) => (
          <CategoryFilterCard
            key={category?.title}
            title={category?.title}
            imageUrl={category?.imageUrl}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        ))}
      </div>
      {userStories?.length > 0 && (
        <section className={styles.categorySection}>
          <CategorySectionCard
            categoryName='Your Stories'
            stories={userStories}
          />
        </section>
      )}

      {selectedCategory === "All" ? (
        <section className={styles.categorySection}>
          {category.map((category) =>
            category.title === "All" ? null : (
              <CategorySectionCard
                key={category?.title}
                categoryName={category?.title}
                stories={FilteredStories?.filter(
                  (story) => story?.category === category?.title
                )}
              />
            )
          )}
        </section>
      ) : (
        <section className={styles.categorySection}>
          <CategorySectionCard
            categoryName={selectedCategory}
            stories={storiesByCategory}
            setStories={setStoriesByCategory}
          />
        </section>
      )}
      {isModalOpen && <Modal>{ModalContent}</Modal>}
    </>
  );
};

export default Homepage;
