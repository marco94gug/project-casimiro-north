import styles from "./index.module.scss";
import ItemCard from "../ItemCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GET from "../../utils/GET/GET";
import { IMPORT_URL } from "../../utils/GET/URL";

const ItemCardList = ({modalVisibility}) => {
  const dispatch = useDispatch();
  const { activities } = useSelector((state) => state);

  useEffect(() => {
    GET(IMPORT_URL.ACTIVITIES, "", dispatch, "SET_ACTIVITY_LIST");
  }, [dispatch]);

  return (
    <div className={styles.ItemCardList}>
      <div className={styles.FavoritesSublist}>
        {activities?.activityList?.data
          ?.filter((item) => item?.cover_image_url)
          .filter((_, index) => index <= 5)
          .map((activity, index) => (
            <ItemCard cardData={activity} key={index} modalVisibility={modalVisibility}/>
          ))}
        <div></div>
      </div>
    </div>
  );
};

export default ItemCardList;
