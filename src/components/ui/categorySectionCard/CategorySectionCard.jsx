/* eslint-disable no-constant-condition */
/* eslint-disable react/prop-types */
import React from "react";

import StoryCard from "../storyCard/StoryCard";
import styles from "./CategorySectionCard.module.css";

const CategorySectionCard = ({ categoryName, stories }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [displayedStories, setDisplayedStories] = React.useState(
    stories?.slice(0, 4)
  );

  console.log(stories);

  const handleSeeMore = () => {
    setDisplayedStories(stories);
    setIsExpanded((prev) => !prev);
  };
  React.useEffect(() => {
    setDisplayedStories(stories?.slice(0, 4));
  }, [stories]);
  return (
    <div className={styles.categorySectionCardWrapper}>
      <p className={styles.categoryName}>
        {categoryName === "Your Stories" || categoryName == "Your Bookmarks"
          ? categoryName
          : `Top stories about ${categoryName}`}
      </p>
      {stories?.length > 0 ? (
        <div className={`${styles.categorySectionStoryCardWrapper}`}>
          {displayedStories?.map((story, _id) => (
            <StoryCard key={_id} story={story} />
          ))}
        </div>
      ) : (
        <div className={styles.noStory}>No stories available</div>
      )}
      {stories?.length > 4 && !isExpanded && (
        <div className={styles.seeMoreBtn}>
          <button className={styles.btn} onClick={handleSeeMore}>
            See more
          </button>
        </div>
      )}
    </div>
  );
};

export default CategorySectionCard;
