import { APP_NAME } from "../commons"

export const UnprotectedLayout = ({children}) => {
    return <>
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <a
                    href="index.html"
                    className="logo d-flex align-items-center w-auto"
                  >
                    <img src="assets/img/logo.png" alt="" />
                    <span className="d-none d-lg-block">{APP_NAME}</span>
                  </a>
                </div>
                {/* End Logo */}
                {children}
               
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
    {/* End #main */}
  </>
  
}