import { useSelector } from "react-redux"
import {Link ,useLocation} from "react-router-dom"
import  {TiShoppingCart}from "react-icons/ti"
import {CgProfile} from "react-icons/cg"
import "./Navbar.css"

export default function Navbar(){
    let location = useLocation()
    let cartCount = useSelector(state=>state.cart.productCount)
    return(  
        <div className="navbar-container">
           <div className="left">
              <p>Shop Here</p>
           </div>
           <div className="certer">
            <Link to="/shop">
              <button className={location.pathname==="/shop" ? "active" : ""}>Shop</button>
            </Link>
            <Link to="/men">
              <button className={location.pathname==="/men" ? "active" : ""}>Men</button>
            </Link>
            <Link to="/kids">
              <button className={location.pathname==="/kids" ? "active" : ""}>Kids</button>
            </Link>
           </div>
           <div className="right">
            <Link to="/cart">
              <button className={location.pathname==="/cart" ? "active" : ""}>
              <TiShoppingCart/>
              <sup>
                {cartCount}
              </sup>
              </button>
            </Link>
             <Link to="/profile">
              <button className={location.pathname==="/profile" ? "active" : ""}><CgProfile/></button>
            </Link>
           </div>
        </div>
    )
}