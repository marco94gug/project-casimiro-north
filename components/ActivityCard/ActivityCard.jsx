import styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
// import {POST_ITEM} from "../../utils/GET/CART_METHOD";

const ActivityCard = ({catData}) => {
  const { cover_image_url, id,  title, uuid } = catData;
  const router = useRouter();
  const dispatch = useDispatch();

  const {moneyValue, cartData, activities } = useSelector(state => state);

  

  const {cityname} = router.query

  const handleActivityClick = () => {
    router.push({
      pathname: `/../activity/[uuid]`,
      query: {uuid: uuid}
    });
  };

  const handleOnAddCart = () => {
    dispatch({type: "SET_TRUE"})
    dispatch({type: "ADD_PRODUCT", payload: catData})
    // POST_ITEM(catData, localStorage.getItem('cart_uuid'))
  }

  const handleHeartClick = () => {
    dispatch({type: "SET_FAVORITE", payload: catData});

    if (activities.favorites.find((item) => item.uuid === uuid)) {
      dispatch({type: "REMOVE_FAVORITE", payload: uuid});

    }
    
  }

  return (
    <div className={styles.ActivityCard_main} style={cityname && {width: '100%'}}>
      {cityname && <h5 className={styles.title_cat_page}>{title}</h5>}
      <div className={styles.ActivityCard} style={cityname && {borderRadius: '2px'}}>
        <img  className={styles.img} src={cover_image_url} alt="Activity photo" />
       {!cityname ? <div onClick={handleActivityClick} className={styles.overlay} /> : <div className={styles.overlay} />}
        {!cityname ? 
        <h5 className={styles.title}>{title}</h5> 
        : <>
        {/* <h5 className={styles.title_cat_page}>{title}</h5> */}
        <div className={styles.data_fav_container}>
          <p className={styles.hours}>12:00 - 13:00</p>
          { !activities.favorites.find((item) => item.uuid === uuid) ? <FaRegHeart onClick={handleHeartClick} className={styles.Heart} /> : <FaHeart onClick={handleHeartClick} className={styles.Heart}/>}
        </div>
        </>}
      </div>
      {cityname ? 
      <div className={styles.info_container}>
        <div className={styles.price_details}>  
          <h3>price:</h3>
          <h3><span>{moneyValue}</span>12,00</h3>
        </div>
        <div className={styles.more_details}>
          <p onClick={handleActivityClick}>see more</p>
          <BsCart2 onClick={handleOnAddCart} className={styles.cart}/>
        </div>
        </div> : null
        }
        
    </div>
  );
};

export default ActivityCard;
