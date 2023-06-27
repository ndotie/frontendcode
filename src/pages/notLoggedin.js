export const NotLoggedInPage = props => {
    return <main>
    <div className="container">
      <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <h1>401</h1>
        <h2>Un authorized Access please login first</h2>
        <a className="btn" href="index.html">
          Back to login
        </a>
        <img
          src="assets/img/not-found.svg"
          className="img-fluid py-5"
          alt="Page Not Found"
        />
      </section>
    </div>
  </main>
  
}