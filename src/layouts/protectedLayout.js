import { isLoggedIn } from "../commons";
import { SidebarsLeft, SidebarsTop } from "../components/sidebars";
import { NotLoggedInPage } from "../pages/notLoggedin";
export default function ProtectedLayout( { children , title} ) {
    
    if(!isLoggedIn()) return <NotLoggedInPage />
    return <>
    &lt;&gt;
    {/* ======= Header ======= */}
    <SidebarsTop />
    {/* End Header */}
    {/* ======= Sidebar ======= */}
    <SidebarsLeft />
    {/* End Sidebar*/}
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>{title}</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">Pages</li>
            <li className="breadcrumb-item active">Blank</li>
          </ol>
        </nav>
      </div>
      {/* End Page Title */}
      {children}
      
    </main>
    {/* End #main */}
    {/* ======= Footer ======= */}
    <footer id="footer" className="footer">
      {/* <div className="copyright">
        © Copyright{" "}
        <strong>
          <span>NiceAdmin</span>
        </strong>
        . All Rights Reserved
      </div> */}
    </footer>
    {/* End Footer */}
    <a
      href="#"
      className="back-to-top d-flex align-items-center justify-content-center"
    >
      <i className="bi bi-arrow-up-short" />
    </a>
  </>
  
}