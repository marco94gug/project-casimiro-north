import styles from "./index.module.scss";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GET from "../../utils/GET/GET";
import { IMPORT_URL } from "../../utils/GET/URL";
import { useRouter } from "next/router";

const Hero = ({ type }) => {
  const [rightValue, setRightValue] = useState(0);
  const [isStoppedInterval, setIsStoppedInterval] = useState(false);
  const dispatch = useDispatch();

  const interval = () => {}

  const { cities } = useSelector((state) => state);
  const router = useRouter();

  const touchStartX = 0;
  let touchEndX = 0;

  const onTouchStart = (e) => {
    touchStartX = e.changedTouches[0].clientX;
  };

  const onTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].clientX;
    change();
  };

  const change = () => {
    if (touchStartX > touchEndX && rightValue < 7) {
      setRightValue((prev) => prev + 1);
      setIsStoppedInterval(true);
    }
    if (touchStartX < touchEndX && rightValue > 0) {
      setRightValue((prev) => prev - 1);
      setIsStoppedInterval(true);
    }
  };

  const handleBackClick = () => {
    if (rightValue > 0) {
      setRightValue((prev) => prev - 1);
    }
  }

  const handleNextClick = () => {
    if (rightValue < 7) {
      setRightValue((prev) => prev + 1);
    }
  }

  const handleRoundButtonClick = (item) => {
    setRightValue(item);
    setIsStoppedInterval(true);
  };

  const handleExploreButtonClick = () => {
    router.push(`city/${cities?.cityListHero[rightValue]?.name}&=${cities?.cityListHero[rightValue]?.id}`);
  }

  useEffect(() => {
if (!isStoppedInterval) {
    interval = setInterval(() => {
      setRightValue((prev) => prev + 1);
    }, 5000);

    if (rightValue === 7) {
      setTimeout(() => {
        setRightValue(0);
      }, 5000);
    }
  } else { clearInterval(interval) }

    return () => clearInterval(interval);
  }, [rightValue, isStoppedInterval]);

  useEffect(() => {
    GET(IMPORT_URL.CITIES, "?limit=8", dispatch, "SET_CITY_HERO_LIST");
  }, []);

  return (
    <div className={styles.hero}>
      {type === "Home" && (
        <>
          <div
            onTouchStart={(e) => onTouchStart(e)}
            onTouchEnd={(e) => onTouchEnd(e)}
            className={styles.slider_container}
          >
            <div className={styles.swiper_button_container}>
              <button onClick={handleBackClick} style={rightValue > 0 ? {opacity: '1'} : {opacity: 0, pointerEvents: 'none'}}>
                <MdArrowBackIosNew />
              </button>
              <button onClick={handleNextClick} style={rightValue < 7 ? {opacity: '1'} : {opacity: 0, pointerEvents: 'none'}}>
                <MdArrowForwardIos />
              </button>
            </div>
            {cities?.cityListHero?.map((item, index) => (
              <div
                style={{ right: `${rightValue * 100}vw` }}
                className={styles.img_container}
                key={index}
              >
                <div className={styles.overlay_gradient} />
                <img
                  className={styles.background}
                  src={item.cover_image_url}
                  alt="heroimg"
                />
              </div>
            ))}
          </div>
          <div className={styles.maintexthero}>
            <h1> {cities?.cityListHero[rightValue]?.name} </h1>
            <h2>
              {" "}
              {cities?.cityListHero[rightValue]?.headline ??
                cities?.cityListHero[rightValue]?.meta_description.split(
                  ","
                )[0]}{" "}
            </h2>
          </div>
          <div className={styles.buttonslider}>
            {cities?.cityListHero?.map((_, index) => (
              <button
                onClick={() => handleRoundButtonClick(index)}
                className={`${styles.button_page} ${
                  index === rightValue && styles.active
                }`}
                key={index}
              ></button>
            ))}
          </div>
          <button
            onClick={handleExploreButtonClick}
            className={styles.explorebtn}
          >
            EXPLORE
          </button>
        </>
      )}
      {type === "CityPage" && (
        <>
          <div className={styles.slider_container}>
            <div className={styles.img_container} >
              <div className={styles.overlay_gradient} />
              <img
                className={styles.background}
                src="https://img.freepik.com/premium-photo/haew-narok-chasm-hell-waterfall-kao-yai-national-park-thailand_109643-40.jpg?w=1060"
                alt="heroimg"
              />
            </div>
          </div>
          <div className={styles.maintexthero}>
            <h1> {cities.cityData.name} </h1>
            <h2 >
             {cities.cityData.headline}
            </h2>
          </div>

          <button
            onClick={() => console.log(cities.cityData)}
            className={styles.explorebtn}
          >
            {" "}
            EXPLORE{" "}
          </button>
        </>
      )}
    </div>
  );
};

export default Hero;

