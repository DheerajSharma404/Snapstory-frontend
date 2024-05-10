import React from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signOut } from "../../../api/ auth";
import { AuthContext } from "../../../contexts/AuthContexts";
import { ModalContext } from "../../../contexts/ModalContexts";
import SignInForm from "../../forms/signin/SignInForm";
import SignUpForm from "../../forms/signup/SignUpForm";
import StoryForm from "../../forms/storyForm/StoryForm";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = React.useContext(AuthContext);
  const { toggleModal } = React.useContext(ModalContext);

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 769px)" });

  const handleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleRegisterClick = () => {
    toggleModal(<SignUpForm />);
  };
  const handleSigninClick = () => {
    toggleModal(<SignInForm />);
  };

  const handleAddStoryClick = () => {
    toggleModal(<StoryForm />);
  };

  const handleBookmarClick = () => {
    navigate("/bookmarks");
  };

  const handleLogout = async () => {
    if (isAuthenticated) {
      const response = await signOut();
      if (response.success) {
        logout(response?.data);
        setIsDropdownOpen(false);
        toast.success(response?.message);
      } else {
        toast.error(response?.error?.explanation);
      }
    }
  };
  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <nav className={styles.navWrapper}>
      <div className={styles.logoWrapper} onClick={handleLogoClick}>
        <h1>Snapstory</h1>
      </div>
      {isDesktop && (
        <div className={styles.menuWrapper}>
          {isAuthenticated ? (
            <>
              <button
                className={`${styles.btn} ${styles.bookmarkBtn}`}
                onClick={handleBookmarClick}
              >
                <img
                  src='/assets/icons/bookmark.svg'
                  alt='bookmark icon'
                  className={styles.bookmarkImage}
                />
                Bookmarks
              </button>
              <button
                className={`${styles.btn} ${styles.addBtn}`}
                onClick={handleAddStoryClick}
              >
                Add Story
              </button>

              <div className={styles.user}>
                <div className={styles.userImage}>
                  <img
                    src='/assets/icons/profile.svg'
                    alt='User Profile Image'
                  />
                </div>
                <div className={styles.menuImage} onClick={handleDropdown}>
                  <img src='/assets/icons/menu.svg' alt='Menu icon' />
                </div>
                {isDropdownOpen && (
                  <div className={styles.dropdown}>
                    {/* fetch user name and implement logout*/}
                    <p>Hello {user?.username}</p>
                    <button
                      className={`${styles.btn} ${styles.logoutBtn}`}
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                className={`${styles.btn} `}
                onClick={handleRegisterClick}
              >
                Register now
              </button>
              <button
                className={`${styles.btn} ${styles.signBtn}`}
                onClick={handleSigninClick}
              >
                Sign in
              </button>
            </>
          )}
        </div>
      )}
      {isMobile && (
        <div>
          <div className={styles.menuImage} onClick={handleDropdown}>
            <img src='/assets/icons/menu.svg' alt='Menu icon' />
          </div>
          {isDropdownOpen && (
            <div className={styles.dropdown}>
              {/* fetch user name and implement logout*/}
              {isAuthenticated ? (
                <>
                  <p>Hello {user?.username}</p>
                  <button
                    className={`${styles.btn} ${styles.bookmarkBtn}`}
                    onClick={handleBookmarClick}
                  >
                    <img
                      src='/assets/icons/bookmark.svg'
                      alt='bookmark icon'
                      className={styles.bookmarkImage}
                    />
                    Bookmarks
                  </button>
                  <button
                    className={`${styles.btn} ${styles.addBtn}`}
                    onClick={handleAddStoryClick}
                  >
                    Add Story
                  </button>
                  <button
                    className={`${styles.btn} ${styles.logoutBtn}`}
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                  <div
                    className={styles.closeDropdown}
                    onClick={handleDropdown}
                  >
                    <img src='/assets/icons/close.svg' alt='' />
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={styles.closeDropdown}
                    onClick={handleDropdown}
                  >
                    <img src='/assets/icons/close.svg' alt='' />
                  </div>
                  <button
                    className={`${styles.btn} `}
                    onClick={handleRegisterClick}
                  >
                    Register now
                  </button>
                  <button
                    className={`${styles.btn} ${styles.signBtn}`}
                    onClick={handleSigninClick}
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
