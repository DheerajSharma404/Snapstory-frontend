import React from "react";
import { CategorySectionCard, Modal } from "../../../components/index.js";
import { ModalContext } from "../../../contexts/ModalContexts";
import { StoryContext } from "../../../contexts/StoryContexts.jsx";
import styles from "./Bookmarkpage.module.css";

const Bookmarkpage = () => {
  const { bookmarkedStories } = React.useContext(StoryContext);

  const { isModalOpen, ModalContent } = React.useContext(ModalContext);

  return (
    <>
      <section className={styles.categorySection}>
        <CategorySectionCard
          categoryName='Your Bookmarks'
          stories={bookmarkedStories}
        />
      </section>
      {isModalOpen && <Modal>{ModalContent}</Modal>}
    </>
  );
};

export default Bookmarkpage;
