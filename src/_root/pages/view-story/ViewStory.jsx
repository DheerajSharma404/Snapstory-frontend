import React from "react";
import { useParams } from "react-router-dom";
import { getStoryById } from "../../../api/story";
import { Modal, StorySlider } from "../../../components/index.js";

const ViewStory = () => {
  const { storyId } = useParams();
  const [story, setStory] = React.useState(null);

  const fetchStory = async () => {
    const response = await getStoryById(storyId);
    setStory(response.data);
  };

  React.useEffect(() => {
    fetchStory();
  }, []);

  return (
    <Modal>
      <StorySlider story={story} />
    </Modal>
  );
};

export default ViewStory;
