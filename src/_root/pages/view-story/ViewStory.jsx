import React from "react";
import { useParams } from "react-router-dom";
import { Modal, StorySlider } from "../../../components/index.js";
import { StoryContext } from "../../../contexts/StoryContexts";

const ViewStory = () => {
  const { storyId } = useParams();
  const { Stories } = React.useContext(StoryContext);

  const story = Stories.find((story) => story._id === storyId);
  console.log(story);

  return (
    <Modal>
      <StorySlider story={story} />
    </Modal>
  );
};

export default ViewStory;
