/* eslint-disable react/prop-types */
import React from "react";
import { AuthContext } from "../../../contexts/AuthContexts";
import { ModalContext } from "../../../contexts/ModalContexts";
import StoryForm from "../../forms/storyForm/StoryForm";
import StorySlider from "../storySlider/StorySlider";
import styles from "./StoryCard.module.css";
//we neet the whole story object in order to display it in the model

const StoryCard = ({ story }) => {
  const { user } = React.useContext(AuthContext);
  const { toggleModal } = React.useContext(ModalContext);
  const handleClick = () => {
    toggleModal(<StorySlider story={story} />);
  };

  const handleEditStory = (event) => {
    event.stopPropagation();
    toggleModal(<StoryForm story={story} />);
  };

  return (
    <div className={styles.storyCard} onClick={handleClick}>
      <img
        src={story.slides[0].imageUrl}
        alt={story.slides[0].heading}
        className={styles.storyCardImage}
      />
      <div className={styles.storyCardText}>
        <p className={styles.storyCardTitle}>{story.slides[0].heading}</p>
        <p className={styles.storyCardDescription}>
          {story.slides[0].description}
        </p>
      </div>
      {user?._id === story?.userId && (
        <div className={styles.editBtn}>
          <button
            className={styles.btn}
            onClick={(event) => handleEditStory(event)}
          >
            <img
              src='/assets/icons/edit.svg'
              alt='Edit icon'
              className={styles.editIcon}
            />
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default StoryCard;
