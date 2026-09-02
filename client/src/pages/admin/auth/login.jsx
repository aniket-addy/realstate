import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../../services/authApi";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // ==========================================
  // LOGIN
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.email ||
      !formData.password
    ) {
      setError(
        "Please enter your email and password."
      );

      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Invalid email or password."
        );
      }

      // ==========================================
      // SAVE AUTH DATA
      // ==========================================

      if (rememberMe) {
        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      } else {
        sessionStorage.setItem(
          "token",
          data.token
        );

        sessionStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      setSuccess(
        "Login successful! Redirecting..."
      );

      // ==========================================
      // ADMIN DASHBOARD
      // ==========================================

      setTimeout(() => {
        navigate("/admin/profile");
      }, 800);

    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      setError(
        error.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        w-full
        bg-slate-100
        flex
        items-center
        justify-center
        px-4
        py-6
        sm:px-6
      "
    >

      {/* ==========================================
          LOGIN CARD
      ========================================== */}

      <div
        className="
          w-full
          max-w-[520px]
          bg-white
          rounded-2xl
          shadow-[0_15px_45px_rgba(15,35,65,0.12)]
          px-6
          py-8
          sm:px-10
          sm:py-10
          md:px-12
          md:py-11
        "
      >

        {/* ==========================================
            HEADING
        ========================================== */}

        <div className="text-center mb-8">

          <h1
            className="
              text-2xl
              sm:text-3xl
              font-bold
              text-[#10284b]
            "
          >
            Admin Login
          </h1>

          <p
            className="
              mt-2
              text-xs
              sm:text-sm
              text-[#71809a]
            "
          >
            Please enter your credentials to continue
          </p>

        </div>


        {/* ==========================================
            FORM
        ========================================== */}

        <form onSubmit={handleSubmit}>

          {/* ==========================================
              EMAIL
          ========================================== */}

          <div className="mb-5">

            <label
              htmlFor="email"
              className="
                block
                mb-2
                text-xs
                sm:text-sm
                font-semibold
                text-[#142945]
              "
            >
              Email Address
            </label>

            <div className="relative">

              {/* Email Icon */}

              <svg
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  w-5
                  h-5
                  text-[#71809a]
                "
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >

                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                />

                <path d="M3 7l9 6 9-6" />

              </svg>


              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="
                  w-full
                  h-[52px]
                  rounded-lg
                  border
                  border-[#d8dfe8]
                  bg-white
                  pl-12
                  pr-4
                  text-sm
                  text-[#172b4d]
                  outline-none
                  transition
                  focus:border-blue-600
                  focus:ring-2
                  focus:ring-blue-100
                "
              />

            </div>

          </div>


          {/* ==========================================
              PASSWORD
          ========================================== */}

          <div className="mb-5">

            <label
              htmlFor="password"
              className="
                block
                mb-2
                text-xs
                sm:text-sm
                font-semibold
                text-[#142945]
              "
            >
              Password
            </label>

            <div className="relative">

              {/* Lock Icon */}

              <svg
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  w-5
                  h-5
                  text-[#71809a]
                "
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >

                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="10"
                  rx="2"
                />

                <path d="M8 10V7a4 4 0 018 0v3" />

                <circle
                  cx="12"
                  cy="15"
                  r="1"
                />

              </svg>


              <input
                id="password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="
                  w-full
                  h-[52px]
                  rounded-lg
                  border
                  border-[#d8dfe8]
                  bg-white
                  pl-12
                  pr-12
                  text-sm
                  text-[#172b4d]
                  outline-none
                  transition
                  focus:border-blue-600
                  focus:ring-2
                  focus:ring-blue-100
                "
              />


              {/* Show / Hide Password */}

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  w-8
                  h-8
                  flex
                  items-center
                  justify-center
                  text-[#687993]
                  hover:text-[#10284b]
                "
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >

                {showPassword ? (

                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >

                    <path d="M3 3l18 18" />

                    <path
                      d="M10.6 10.6a2 2 0 002.8 2.8"
                    />

                    <path
                      d="M9.9 4.2A10.7 10.7 0 0112 4c5.5 0 9.5 5 9.5 5s-1.5 1.9-4 3.5"
                    />

                    <path
                      d="M6.1 6.1C3.8 7.6 2.5 9 2.5 9S6.5 14 12 14c.8 0 1.5-.1 2.2-.3"
                    />

                  </svg>

                ) : (

                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >

                    <path
                      d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="2.5"
                    />

                  </svg>

                )}

              </button>

            </div>

          </div>


          {/* ==========================================
              REMEMBER + FORGOT
          ========================================== */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-3
              mb-6
            "
          >

            {/* Remember Me */}

            <label
              className="
                flex
                items-center
                gap-2
                text-xs
                sm:text-sm
                text-[#243854]
                cursor-pointer
              "
            >

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(
                    e.target.checked
                  )
                }
                className="
                  w-4
                  h-4
                  accent-blue-600
                  cursor-pointer
                "
              />

              Remember Me

            </label>


            {/* Forgot Password */}

            <Link
              to="/admin/forgot-password"
              className="
                text-xs
                sm:text-sm
                font-semibold
                text-blue-600
                hover:underline
                whitespace-nowrap
              "
            >
              Forgot Password?
            </Link>

          </div>


          {/* ==========================================
              ERROR MESSAGE
          ========================================== */}

          {error && (
            <div
              className="
                mb-5
                rounded-lg
                border
                border-red-100
                bg-red-50
                px-4
                py-3
                text-sm
                text-red-600
              "
            >
              {error}
            </div>
          )}


          {/* ==========================================
              SUCCESS MESSAGE
          ========================================== */}

          {success && (
            <div
              className="
                mb-5
                rounded-lg
                border
                border-green-100
                bg-green-50
                px-4
                py-3
                text-sm
                text-green-600
              "
            >
              {success}
            </div>
          )}


          {/* ==========================================
              LOGIN BUTTON
          ========================================== */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-[52px]
              rounded-lg
              bg-blue-600
              hover:bg-blue-700
              active:bg-blue-800
              text-white
              text-sm
              font-semibold
              shadow-lg
              shadow-blue-200
              transition
              duration-200
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>


        {/* ==========================================
            DIVIDER
        ========================================== */}

        <div
          className="
            flex
            items-center
            gap-4
            my-7
          "
        >

          <div className="flex-1 h-px bg-gray-200" />

          <span className="text-xs text-gray-400">
            or
          </span>

          <div className="flex-1 h-px bg-gray-200" />

        </div>


        {/* ==========================================
            GOOGLE LOGIN
        ========================================== */}

        <button
          type="button"
          className="
            w-full
            h-[52px]
            rounded-lg
            border
            border-[#d8dfe8]
            bg-white
            flex
            items-center
            justify-center
            gap-3
            text-sm
            font-semibold
            text-[#243854]
            hover:bg-gray-50
            transition
          "
        >

          <span
            className="
              font-bold
              text-lg
            "
          >
            G
          </span>

          Login with Google

        </button>

        {/* ==========================================
            FOOTER
        ========================================== */}

        <p
          className="
            mt-6
            text-center
            text-[10px]
            sm:text-xs
            text-[#6e7c91]
          "
        >
          © 2025 Dream Home Real Estate.
          All rights reserved.
        </p>

      </div>

    </div>
  );
};

export default Login;
