import { Link } from "react-router-dom";

export default function Home() {
  return (
    <header style={{ paddingLeft: 0 }}>
      <div
        className=' text-center bg-image d-flex justify-content-center align-items-center'
        style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')",backgroundRepeat:"no-repeat", height: '100vh' }}
      >
        <div className='mask d-flex justify-content-center p-5' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'>CHAUDHUREE</h1>
              <h4 className='mb-3'>Testing Access Token and Refresh Token</h4>
              <Link to="/login" className='btn btn-outline-light btn-lg' role='button'>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
