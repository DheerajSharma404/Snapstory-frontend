import React from "react";
import { getAllStory, getStoryByCategory } from "../../../api/story";
import {
  CategoryFilterCard,
  CategorySectionCard,
  Modal,
} from "../../../components/index.js";
import CATEGORY from "../../../constants/categories";
import { AuthContext } from "../../../contexts/AuthContexts";
import { ModalContext } from "../../../contexts/ModalContexts";
import styles from "./Homepage.module.css";

const Homepage = () => {
  const { isModalOpen, ModalContent } = React.useContext(ModalContext);

  const { user } = React.useContext(AuthContext);
  const [Stories, setStories] = React.useState([]);
  const [category] = React.useState(CATEGORY);
  const [storiesByCategory, setStoriesByCategory] = React.useState([]);

  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const userStories = Stories?.filter((story) => story.userId === user?._id);

  const FilteredStories = Stories?.filter(
    (story) => selectedCategory === "All" || story.category === selectedCategory
  );

  React.useEffect(() => {
    const fetchStories = async () => {
      try {
        if (setSelectedCategory && selectedCategory !== "All") {
          const response = await getStoryByCategory(selectedCategory);
          setStoriesByCategory(response?.data);
        } else {
          const response = await getAllStory();
          setStories(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchStories();
  }, [user?._id, selectedCategory]);

  return (
    <>
      <div className={styles.categoryFilter}>
        {category.map((category) => (
          <CategoryFilterCard
            key={category.title}
            title={category.title}
            imageUrl={category.imageUrl}
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
                key={category.title}
                categoryName={category.title}
                stories={FilteredStories?.filter(
                  (story) => story.category === category.title
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
          />
        </section>
      )}
      {isModalOpen && <Modal>{ModalContent}</Modal>}
    </>
  );
};

export default Homepage;
