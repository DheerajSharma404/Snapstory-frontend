/* eslint-disable react/prop-types */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { toggleStoryBookmark, toggleStoryLike } from "../../../api/story.js";
import { AuthContext } from "../../../contexts/AuthContexts.jsx";
import { ModalContext } from "../../../contexts/ModalContexts.jsx";
import { StoryContext } from "../../../contexts/StoryContexts.jsx";
import SignInForm from "../../forms/signin/SignInForm.jsx";
import styles from "./StorySlider.module.css";

const StorySlider = ({ story }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setStories } = React.useContext(StoryContext);

  const { toggleModal, changeModalContent } = React.useContext(ModalContext);
  const { isAuthenticated, user } = React.useContext(AuthContext);

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isBookmarked, setIsBookmarked] = React.useState(story?.isBookmarked);
  const [isLiked, setIsLiked] = React.useState(story?.isLiked);
  const [likeCount, setLikeCount] = React.useState(story?.likes?.length);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) =>
      prev === story.slides?.length - 1 ? prev : prev + 1
    );
  };
  const handleModalClose = () => {
    if (location.pathname === `/${story._id}`) {
      navigate("/");
    } else {
      toggleModal();
    }
  };
  const handleShare = () => {
    navigator.clipboard
      .writeText(window.location.href + story._id)
      .then(() => {
        toast.success("URL copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy URL");
      });
  };
  const handleBookmark = async () => {
    if (isAuthenticated) {
      const response = await toggleStoryBookmark(story._id);
      if (response?.success) {
        setIsBookmarked((prev) => !prev);
        toast.success("Successfully toggled bookmark");
        setStories((prev) => {
          const updataedStories = prev.map((prevStory) => {
            if (prevStory?._id === story?._id) {
              return {
                ...prevStory,
                isBookmarked: !prevStory.isBookmarked,
              };
            }
          });
          return updataedStories;
        });
      } else {
        toast.error(response?.message);
      }
    } else {
      changeModalContent(<SignInForm />);
    }
  };

  const handleLike = async () => {
    if (isAuthenticated) {
      const response = await toggleStoryLike(story._id);
      if (response?.success) {
        setIsLiked((prev) => !prev);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
        setStories((prev) => {
          const updatedStories = prev.map((prevStory) => {
            if (prevStory?._id === story?._id) {
              return {
                ...prevStory,
                isLiked: !prevStory.isLiked,
                likes: isLiked
                  ? prevStory.likes.filter((like) => like !== user._id)
                  : [...prevStory.likes, user._id],
              };
            } else {
              return prevStory;
            }
          });
          return updatedStories;
        });
        toast.success("Successfully toggled like");
      } else {
        toast.error(response?.message);
      }
    } else {
      changeModalContent(<SignInForm />);
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === story?.slides?.length - 1 ? prev : prev + 1
      );
    }, 1500);

    return () => clearInterval(interval);
  }, [currentSlide, story?.slides?.length]);

  React.useEffect(() => {
    setIsBookmarked(story?.isBookmarked);
    setIsLiked(story?.isLiked);
    setLikeCount(story?.likes?.length);
  }, [story]);
  return (
    <div className={styles.storySliderWrapper}>
      <div className={styles.storySlider}>
        {story?.slides?.map((slide, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: "0",
              left: `${index * 100}%`,
              transition: "left 0.5s",
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            <img
              src={slide.imageUrl}
              alt={slide.heading}
              className={styles.slideImage}
            />

            <div className={styles.slideContentWrapper}>
              <h2>{slide.heading}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
        <button
          className={`${styles.closeBtn} ${styles.btn}`}
          onClick={handleModalClose}
        >
          <img src='/assets/icons/cross.svg' alt='close icon' />
        </button>
        <button
          className={`${styles.shareBtn} ${styles.btn}`}
          onClick={handleShare}
        >
          <img src='/assets/icons/share.svg' alt='share icon' />
        </button>
        <button
          className={`${styles.bookmarkBtn} ${styles.btn}`}
          onClick={handleBookmark}
        >
          <img
            src={`/assets/icons/${
              isBookmarked ? "bookmark-filled" : "bookmark"
            }.svg`}
            alt='bookmark icon'
          />
        </button>
        <button
          className={`${styles.likeBtn} ${styles.btn}`}
          onClick={handleLike}
        >
          <img
            src={`assets/icons/${isLiked ? "like-filled" : "like"}.svg`}
            alt='like icon'
          />
          <span>{likeCount}</span>
        </button>
      </div>
      <div className={styles.slideIndicatorWrapper}>
        {story?.slides?.map((slide, index) => (
          <div
            key={slide._id}
            style={{
              width: `${100 / story.slides.length}%`,
              height: "0.2rem",
              background: index === currentSlide ? "#fff" : "#aaa",
              animation: `${styles.progress} 5s infinite`,
              animationDelay: `${index * 0.5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className={styles.storySliderControls}>
        <button onClick={handlePrevious} className={styles.previousBtn}>
          <img src='/assets/icons/left-chevron.svg' alt='previous' />
        </button>
        <button onClick={handleNext} className={styles.nextBtn}>
          <img src='/assets/icons/right-chevron.svg' alt='next' />
        </button>
      </div>
    </div>
  );
};

export default StorySlider;
