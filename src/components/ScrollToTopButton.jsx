import { useEffect, useState } from "react";
import styles from "../styles/ScrollToTopButton.module.css";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 1000 ? setShowScroll(true) : setShowScroll(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  console.log(showScroll);

  return (
    <>
      {showScroll ? (
        <div className={styles.scrollTop} onClick={scrollToTop}>
          <FaArrowUp />
        </div>
      ) : null}
    </>
  );
}
