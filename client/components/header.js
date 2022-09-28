import React from 'react'
import Link from 'next/link'
function Header({currentUser}) {
  return (
    // <nav classNameName="navbar navbar-dark bg-dark">
    //   <Link classNameName="navbar-brand active" href="/" style={{textDecoration:"none",color:"#fff"}}>
    //     GitTix
    //   </Link>
    
    //         <div classNameName="d-flex justify-content-end" >
    //           <ul classNameName="nav d-flex justify-content-center">
                
    //             <li classNameName="nav-item" >
    //               <Link classNameName="nav-link text-white" href="/#" style={{textDecoration:"none",color:"#fff"}}>
    //                 Tickets
    //               </Link>
    //             </li>
                
    //           </ul>
    //           <Link style={{textDecoration:"none",color:"#fff"}} classNameName="btn btn-outline-info my-2 my-sm-0 text-white" href={currentUser ? '/auth/signout' :'/auth/signin'}>
    //             {currentUser ?  'Sign Out' : 'Sign In'}
    //           </Link>
              
    //         </div>
    //       </nav>
    <nav className="navbar navbar-expand-lg navbar-light" style={{background:'#e3f2fd'}}>
  <a className="navbar-brand" href="/">GitTix</a>
  <div className="collapse navbar-collapse " id="navbarText">
    <ul className="navbar-nav mr-auto">
      
      <li className="nav-item">
        <a className="nav-link" href="/tickets/new">Sell Tickets</a>
      </li>
      <li>
        <a className='nav-link' href='/orders'>My Orders</a>
      </li>
      <li>
        <a className='nav-link' href='/auth/signin'>Sign In</a>
      </li>
      <li className="nav-item">
        <a className="nav-link"  href={currentUser ? '/auth/signout' :'/auth/signin'}>{currentUser ?  'Sign Out' : 'Sign In'}</a>
      </li>

      <li className="nav-item">
        <a className="nav-link"  href={currentUser ? '/auth/signout' :'/auth/signup'}>{currentUser ?  '' : 'Sign Up'}</a>
      </li>
    </ul>
    
  </div>
</nav>
  )
}

export default Header