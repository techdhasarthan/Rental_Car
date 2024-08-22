import React, { useEffect ,useState} from "react";
import { Link , useNavigate } from "react-router-dom";
import "../styles/signup.css";

const SignUp = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
      event.preventDefault(); // Prevent default form submission
      setLoading(true); // Show loading message

      // Simulate a 2-second delay
      setTimeout(() => {
          setLoading(false); // Hide loading message
          navigate('/home'); // Redirect to /home
      }, 2000);
  };
  useEffect(() => {
    // Get all input fields with labels
    const inputs = document.querySelectorAll(".input-field");

    // Iterate over each input field
    inputs.forEach((input) => {
      const label = input.nextElementSibling; // Get the associated label
      // Check if input already has a value
      if (input.value.trim() !== "") {
        label.classList.add("active"); // Add 'active' class to label
      }
    });
  }, []);

  return (
    <main className="">
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            <form
              action="index.html"
              autoComplete="off"
              className="sign-in-form    froms"
              onSubmit={handleSubmit}
            >
              <div className="heading">
                <h2>Get Started</h2>
                <h6>Already have an account?</h6>
                &nbsp; <Link to="/sign-in">Sign in</Link>
              </div>
              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="text"
                    className="input-field"
                    id="input"
                    required
                    placeholder=" " // Empty placeholder to enable `:placeholder-shown` selector
                  />
                  <label    className='label' htmlFor="input">Name</label>
                </div>
                <div className="input-wrap">
                  <input
                    type="tel"
                    className="input-field"
                    autoComplete="off"
                    placeholder=" "
                    required
                  />
                  <label className='label'   htmlFor="input">Phone   Number</label>
                </div>
                <div className="input-wrap">
                  <input
                    type="password"
                    minLength="4"
                    className="input-field"
                    autoComplete="off"
                    required
                    placeholder=" "
                  />
                  <label className='label'   htmlFor="input">Password</label>
                </div>
                <input type="submit" value="Sign Up" className="sign-btn" />
                {loading && <div className="loading ">Signing up, please wait...</div>}
                <p className="text">
                  By signing up, I agree to the &nbsp;
                  <Link to="#">Terms of Services</Link> and &nbsp;
                  <Link to="#">Privacy Policy</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="car-rental-info ">
  <h3 className="mb-4">Car Rental Specials(Replace  by  Lionea)  </h3>

  <p  className="mt-4">Check out our latest deals on car rentals!</p>
</div>
      </div>
    </main>
  );
};

export default SignUp;
