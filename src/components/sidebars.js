import { APP_NAME, getUser, removeUser } from "../commons"
import { NavLink, useNavigate  } from "react-router-dom";

export const SidebarsTop = props => {

  const navigate = useNavigate()
  const authData = getUser();
  const names = authData.name.split( " " );
  let initial = names[0]?.charAt(0)
  let fullName = names[0]
  if( names.length > 1 ) {
    initial = initial+"."+names[1]
    fullName = fullName + " " +names[1]
  }
  const logout = () => {
    removeUser();//we delete everything
    navigate('/login')
  }
    return <>
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a href="index.html" className="logo d-flex align-items-center">
          <img src="assets/img/logo.png" alt="" />
          <span className="d-none d-lg-block">{APP_NAME}</span>
        </a>
        <i className="bi bi-list toggle-sidebar-btn" />
      </div>
      {/* 
      End Logo 
      <div className="search-bar">
        <form
          className="search-form d-flex align-items-center"
          method="POST"
          action="#"
        >
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter search keyword"
          />
          <button type="submit" title="Search">
            <i className="bi bi-search" />
          </button>
        </form>
      </div>
      */}
      {/* End Search Bar */}
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle " href="#">
              <i className="bi bi-search" />
            </a>
          </li>
          {/* End Search Icon*/}
          
          {/* End Notification Nav */}
          
          {/* End Messages Nav */}
          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              {/* <img
                src="assets/img/profile-img.jpg"
                alt="Profile"
                className="rounded-circle"
              /> */}
              <i className="bx bx-user text-info"></i>
              <span className="d-none d-md-block dropdown-toggle ps-2 text-dark">
               {initial}
              </span>
            </a>
            {/* End Profile Iamge Icon */}
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              {/* <li className="dropdown-header">
                <h6>Kevin Anderson</h6>
                <span>Web Designer</span>
              </li> */}
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
              <li className="dropdown-header">
                <h6>{fullName}</h6>
                {/* <span>{role(authData.admin)}</span> */}
              </li>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              {/* <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="users-profile.html"
                >
                  <i className="bi bi-gear" />
                  <span>Account Settings</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="pages-faq.html"
                >
                  <i className="bi bi-question-circle" />
                  <span>Need Help?</span>
                </a>
              </li> */}
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <span className="dropdown-item d-flex align-items-center curser-pointer" onClick = {logout}>
                  <i className="bi bi-box-arrow-right" />
                  <span>Sign Out</span>
                </span>
              </li>
            </ul>
            {/* End Profile Dropdown Items */}
          </li>
          {/* End Profile Nav */}
        </ul>
      </nav>
      {/* End Icons Navigation */}
    </header>
    </>
}

export const SidebarsLeft = props => {
    return <>
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <NavLink to = "/" className="nav-link collapsed" href="index.html">
            <i className="bi bi-grid" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        {/* End Dashboard Nav */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#components-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-menu-button-wide" />
            <span>Others</span>
            <i className="bi bi-chevron-down ms-auto" />
          </a>
          <ul
            id="components-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <NavLink to = "/">
                <i className="bi bi-circle" />
                <span>Summary</span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink to = "/locations">
                <i className="bi bi-circle" />
                <span>Locations</span>
              </NavLink>
            </li> */}
            <li>
            <NavLink to = "/add-house">
                <i className="bi bi-circle" />
                <span>Subjects</span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink to = "/decorations">
                <i className="bi bi-circle" />
                <span>Decorations</span>
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink to = "/house-requests">
                <i className="bi bi-circle" />
                <span>Pending Requests</span>
              </NavLink>
            </li> */}
            <li>
              <NavLink to = "/manage-users">
                <i className="bi bi-circle" />
                <span>Manage Users</span>
              </NavLink>
            </li>
          </ul>
        </li>
       
      </ul>
    </aside>
    </>
}