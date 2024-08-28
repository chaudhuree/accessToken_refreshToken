import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/protected")
      .then((res) => {
        console.log(res.data);
        if (res.data.valid === false) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleLogout = () => {
    axios
      .get("http://localhost:3000/logout")
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div
        className=" text-center bg-image d-flex justify-content-center align-items-center"
        style={{
          backgroundImage:
            "url('https://mdbootstrap.com/img/new/slides/041.webp')",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        <div
          className="mask d-flex justify-content-center p-5"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">Dashboard - Protected Route</h1>
              <h4 className="mb-3">Testing Access Token and Refresh Token</h4>
              <button
                className="btn btn-outline-light btn-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
