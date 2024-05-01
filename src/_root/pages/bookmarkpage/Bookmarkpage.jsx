import React from "react";
import { getBookmarkStories } from "../../../api/story";
import { CategorySectionCard, Modal } from "../../../components/index.js";
import { ModalContext } from "../../../contexts/ModalContexts";
import styles from "./Bookmarkpage.module.css";

const Bookmarkpage = () => {
  const [bookmarkStories, setBookmarkStories] = React.useState([]);

  const { isModalOpen, ModalContent } = React.useContext(ModalContext);

  const fetchBookmarkStories = async () => {
    try {
      const stories = await getBookmarkStories();
      console.log("bookmarkStories", stories);
      setBookmarkStories(stories?.data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchBookmarkStories();
  }, []);

  return (
    <>
      <section className={styles.categorySection}>
        <CategorySectionCard
          categoryName='Your Bookmarks'
          stories={bookmarkStories}
        />
      </section>
      {isModalOpen && <Modal>{ModalContent}</Modal>}
    </>
  );
};

export default Bookmarkpage;
