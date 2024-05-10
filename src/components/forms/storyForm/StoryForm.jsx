/* eslint-disable react/prop-types */
import React from "react";
import { useMediaQuery } from "react-responsive";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { createStory, editStory } from "../../../api/story.js";
import { ModalContext } from "../../../contexts/ModalContexts.jsx";
import { StoryContext } from "../../../contexts/StoryContexts";
import { createStoryValidationSchema } from "../../../validations/story.validation.js";
import CustomDropdown from "../../ui/customDropdown/CustomDropdown.jsx";
import styles from "./StoryForm.module.css";

const StoryForm = ({ story, actionType }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 769px)" });

  const { setStories } = React.useContext(StoryContext);

  const { toggleModal } = React.useContext(ModalContext);
  const [formErrors, setFormErrors] = React.useState(null); //[category: "category is required", slides: "slides is required"]
  const [formData, setFormData] = React.useState({
    category: story ? story.category : "Select Category",
    slides: story
      ? story?.slides
      : [
          { id: uuidv4(), heading: "", description: "", imageUrl: "" },
          { id: uuidv4(), heading: "", description: "", imageUrl: "" },
          { id: uuidv4(), heading: "", description: "", imageUrl: "" },
        ],
  });
  const [activeSlide, setActiveSlide] = React.useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedSlides = formData.slides.map((slide, index) =>
      index === activeSlide ? { ...slide, [name]: value } : slide
    );
    setFormData({
      ...formData,
      slides: updatedSlides,
    });
  };

  const handleAddSlide = (e) => {
    e.preventDefault();
    const newSlide = {
      id: uuidv4(),
      heading: "",
      description: "",
      imageUrl: "",
    };
    setFormData({
      ...formData,
      slides: [...formData.slides, newSlide],
    });
    setActiveSlide(formData.slides.length);
  };

  const handleRemoveSlide = (idx, e) => {
    e.stopPropagation();
    const newSlides = formData.slides.filter((_, index) => index !== idx);
    setFormData({ ...formData, slides: newSlides });
    if (activeSlide >= newSlides.length) {
      setActiveSlide(newSlides.length - 1);
    }
  };

  const handleNextSlide = (e) => {
    e.preventDefault();
    if (activeSlide < formData.slides.length - 1) {
      setActiveSlide(activeSlide + 1);
    }
  };

  const handlePreviousSlide = (e) => {
    e.preventDefault();
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1);
    }
  };

  const handleOnSlideClick = (id, index) => {
    setActiveSlide(index);
  };

  const handleCloseModal = () => {
    toggleModal(null);
  };

  const handlePostAndEditPost = async (e) => {
    e.preventDefault();
    const validation = createStoryValidationSchema.safeParse(formData);
    if (!validation.success) {
      const error = validation.error;
      let newError = {};
      for (const issue of error.issues) {
        newError = { ...newError, [issue.path[0]]: issue.message };
      }
      return setFormErrors(newError);
    }
    setFormErrors({});
    if (actionType === "edit") {
      const response = await editStory(story._id, formData);
      if (response?.success) {
        toggleModal();
        toast.success(response?.message);
        setStories((prev) => {
          const updatedStories = prev.map((prevStory) => {
            if (prevStory._id === story._id) {
              return {
                ...prevStory,
                ...response.data,
              };
            } else {
              return prevStory;
            }
          });
          return updatedStories;
        });
      } else {
        toast.error(response?.error?.explanation);
      }
    } else {
      const response = await createStory(formData);
      if (response?.success) {
        toggleModal();
        toast.success(response?.message);
        setStories((prev) => [response.data, ...prev]);
      } else {
        toast.error(response?.error?.explanation);
      }
    }
  };

  return (
    <div className={styles.storyFormWrapper}>
      {isMobile && <h2 className={styles.formHeader}>Add story to feed</h2>}
      <div className={styles.slidesWrapper}>
        {isDesktop && <p>Add up to 6 slides.</p>}
        <div className={styles.slides}>
          {formData?.slides.map((slide, index) => (
            <div
              key={index}
              className={`${styles.slide} ${
                index === activeSlide ? styles.activeSlide : ""
              }`}
              onClick={() => handleOnSlideClick(slide.id, index)}
            >
              <div className={styles.slideTitle}>
                <p>Slide</p>
                <p>{index + 1}</p>
              </div>
              {index >= 3 && (
                <div
                  className={styles.removeSlide}
                  onClick={(e) => handleRemoveSlide(index, e)}
                >
                  <img
                    src='/assets/icons/cancel.svg'
                    alt='Remove icon for slide'
                  />
                </div>
              )}
            </div>
          ))}
          {formData?.slides.length <= 5 && (
            <div
              className={`${styles.addSlide} ${styles.slide}`}
              onClick={(e) => handleAddSlide(e)}
            >
              <p>Add</p>
              <p>+</p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.slideFormWrapper}>
        <form className={styles.slideForm}>
          <div className={styles.slidefieldWrapper}>
            <div className={styles.slideInputWrapper}>
              <label htmlFor='heading'>Heading:</label>
              <input
                type='text'
                name='heading'
                value={formData.slides[activeSlide]?.heading}
                required
                onChange={(e) => handleChange(e)}
                placeholder='Your heading.'
              />
            </div>
          </div>
          <div className={styles.slidefieldWrapper}>
            <div className={styles.slideInputWrapper}>
              <label htmlFor='description'>Description:</label>
              <textarea
                name='description'
                rows={5}
                value={formData.slides[activeSlide]?.description}
                onChange={(e) => handleChange(e)}
                required
                placeholder='Story Description.'
              />
            </div>
          </div>
          <div className={styles.slidefieldWrapper}>
            <div className={styles.slideInputWrapper}>
              <label htmlFor='imageUrl'>Image:</label>
              <input
                type='url'
                name='imageUrl'
                value={formData.slides[activeSlide]?.imageUrl}
                required
                onChange={(e) => handleChange(e)}
                placeholder='Add Image url'
              />
            </div>
          </div>
          <div className={styles.slidefieldWrapper}>
            <div className={styles.slideInputWrapper}>
              <label htmlFor='category'>Category:</label>
              <CustomDropdown
                options={[
                  "Food",
                  "Health and Fitness",
                  "Movies",
                  "Education",
                  "Travel",
                ]}
                value={formData.category}
                onChange={(selectedCategory) =>
                  setFormData({
                    ...formData,
                    category: selectedCategory,
                  })
                }
                disabled={activeSlide !== 0}
              />
              {isDesktop && <p>This field will be common for all slides</p>}
            </div>
          </div>
          {formErrors?.category && (
            <div className={styles.formError}>
              <p>All Fields are Required</p>
            </div>
          )}
          {formErrors?.slides && (
            <div className={styles.formError}>
              <p>All Fields are Required</p>
            </div>
          )}
          <div className={styles.btnWrapper}>
            {isDesktop && (
              <div className={styles.btnWrapper}>
                <button
                  onClick={(e) => handlePreviousSlide(e)}
                  className={`${styles.previousBtn} ${styles.btn}`}
                >
                  Previous
                </button>
                <button
                  onClick={(e) => handleNextSlide(e)}
                  className={`${styles.nextBtn} ${styles.btn}`}
                >
                  Next
                </button>
              </div>
            )}
            <div className={styles.postBtnWrapper}>
              <button
                onClick={(e) => handlePostAndEditPost(e)}
                className={`${styles.postBtn} ${styles.btn}`}
              >
                {actionType === "edit" ? "Edit Post" : "Post"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className={styles.closeModalBtn} onClick={handleCloseModal}>
        <img src='/assets/icons/cancel.svg' alt='Remove icon for slide' />
      </div>
    </div>
  );
};

export default StoryForm;
