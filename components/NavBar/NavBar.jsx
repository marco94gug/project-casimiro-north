import styles from './index.module.scss';
import {HiSearch} from 'react-icons/hi';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router"
import Link from 'next/link';
import { useEffect, useRef, useState, memo } from 'react';
import Modal from '../Modal/Modal';
import Logo from '../../assets/Logo.png';
import GET from '../../utils/GET/GET';
import { IMPORT_URL } from '../../utils/GET/URL';
import ArrowUp from '../ArrowUp';

import {
    AiFillHome,
    AiFillCompass,
    AiOutlineStar,
    AiFillInfoCircle,
  } from "react-icons/ai";
  import { FaShoppingCart } from "react-icons/fa";

export default memo(function NavBar ({lang, currency}) {
    const searchRef = useRef(null);
    const [isScrollDown, setIsScrollDown] = useState(false)

    const {navBarStatus, modalVisibility} = useSelector(state => state)
    const dispatch = useDispatch();
    const router = useRouter();
    const [searchInput, setSearchInpt] = useState("")
    const data = useSelector((state) => state);

    const { cartData } = data

    const menu = [
        {
          name: "Home",
          path: "/",
          icon: <AiFillHome className={styles.icon} />,
        },
        {
          name: "My Trip",
          path: "/mytrip",
          icon: <AiFillCompass className={styles.icon} />,
        },
        {
          name: "Favorites",
          path: "/favorites",
          icon: <AiOutlineStar className={styles.icon} />,
        },
        {
          name: "Cart",
          path: "/cart",
          icon: <FaShoppingCart className={styles.icon} />,
          quantity: cartData.cartList.length,
        },
        {
          name: "About us",
          path: "/aboutus",
          icon: <AiFillInfoCircle className={styles.icon} />,
        },
      ];

    const eventScrollDown = () => {
        
        if (window.scrollY > 400) {
            setIsScrollDown(true);
        } else if (window.scrollY < 400){
            setIsScrollDown(false);
        }  
    }

    const handleHamClick = () => {
        dispatch({type: 'SET_OPEN'})

        if (navBarStatus.isActive === true) {
            dispatch({type: 'SET_CLOSE'})
        }
    }

    const handleSearchClick = () => {
        dispatch({type: 'SET_INPUT_ACTIVE'})
        searchRef.current.focus();

        if (navBarStatus.isInputActive === true) {
            dispatch({type: 'SET_INPUT_INACTIVE'})
            setSearchInpt(prev => prev = "")
        }    
    }

    const handleResultLinkClick = () => {
        dispatch({type: 'SET_INPUT_INACTIVE'})
        setSearchInpt(prev => prev = "")
    }

    const handleOverlayClick = () => {
        dispatch({type: 'SET_INPUT_INACTIVE'})
        setSearchInpt(prev => prev = "")
    }

    const handleLogoClick = () => {
        router.push('/');
        dispatch({type: 'SET_CLOSE'})
    }

    const handleOnChangeSearchInput = (e) => {
        setSearchInpt((prev) => prev = e.target.value)
        
    }

    useEffect(() => {
        if (navBarStatus.isActive === true ) {
            window.document.body.style.overflowY = 'hidden'
        } else {
            window.document.body.style.overflowY = 'scroll'
        }

    }, [navBarStatus.isActive])

    useEffect(() => {
        if (searchInput.length >= 3) {
            GET(IMPORT_URL.SEARCH, `?activity_limit=10&text=${searchInput}`, dispatch, "SET_SEARCH_RESULTS", lang, currency)
            } else {
                dispatch({type: "CLEAN_SEARCH_RESULTS", lang, currency})
            }
    }, [searchInput, lang, currency])

    useEffect(()=> {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', () => eventScrollDown())
        }
    return removeEventListener('scroll', () => eventScrollDown())
    }, [])

    return (
        <>
        <div className={`${styles.Main_Navbar} ${isScrollDown ? styles.active : ''}`}>
        <div className={styles.NavBar}>
            <img src={Logo.src} onClick={handleLogoClick} className={styles.logo} alt=""/>
            <div className={`${styles.menu} ${navBarStatus.isActive && styles.active}`}>
                <ul className={styles.navbar_list}>
                    {menu.map((item, index)=> 
                        <Link href={item.path} key={index}>
                            <li onClick={() => dispatch({type: 'SET_CLOSE'})} >
                                <span>{item.icon}</span>
                                <span>{item.name}</span>
                                <span className={styles.quantity}>{item.quantity ? item.quantity : null}</span>
                                <span className={`${styles.circle} ${router.asPath === item.path ? styles.active : ''}`}/>
                            </li>
                        </Link>
                    )}
                    
                    <div className={styles.row} >
        </div>

                </ul>
            </div>
            <div className={styles.navbar_container}>
                <div className={styles.search_container}>
                    
                    <HiSearch onClick={handleSearchClick} className={`${styles.search_icon} ${navBarStatus.isInputActive ? styles.active : ''}`}/>
                    <input ref={searchRef} type='text' value={searchInput} onChange={(e) => handleOnChangeSearchInput(e)} className={`${styles.search_input} ${navBarStatus.isInputActive ? styles.active : ''}`} placeholder="Search"/>
                    <div className={`${styles.results} ${searchInput ? styles.active : ''}`} >
                        <ul>
                            {data?.activities?.searchResults[0]?.items?.map((item) => <Link key={item.uuid} href={`/../activity/${item.id}`}><li  onClick={handleResultLinkClick}>{item.title}</li></Link>)}
                        </ul>
                    </div>
                </div>
                <div onClick={handleHamClick} className={styles.ham_btn}>
                    <span />
                    <span />
                    <span />
                </div>
            </div>
            
        </div>
        
        
        </div>
        <div className={styles.overlay} onClick={handleOverlayClick} style={navBarStatus.isInputActive ? {display: 'block'} :{display: 'none', pointerEvents: "none"} }/>
        <ArrowUp />
        {modalVisibility && <Modal />}
        </>
    )
})