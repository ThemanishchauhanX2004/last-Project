import { useDispatch, useSelector } from "react-redux"
import {Link ,useLocation} from "react-router-dom"
import  {TiShoppingCart}from "react-icons/ti"
import {CgProfile} from "react-icons/cg"
import "./Navbar.css"

export default function Navbar(){
    let location = useLocation()
    let dispatch = useDispatch()
    let cartCount = useSelector(state=>state.cart.productCount)
    state=>(state.cart?.product || []).reduce((sum , p)=>sum+(p.qty || 1),0)
    return(  
        <div className="navbar-container">
           <div className="left">
              <p>Shop Here</p>
           </div>
           <div className="certer">
            
            <Link to="/shop">
              <button className={location.pathname==="/shop" ? "active" : ""}>Shop</button>
            </Link>
            <Link to="/men/men">
              <button className={location.pathname==="/men" ? "active" : ""}>Men</button>
            </Link>
            <Link to="/woman.woman">
              <button className={location.pathname==="/woman" ? "active" : ""}>woman</button>
            </Link>
            <Link to="/kids/kids">
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