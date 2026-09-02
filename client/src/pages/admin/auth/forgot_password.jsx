import { useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../../../services/authApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email) {
      setError(
        "Please enter your email address."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/auth/forgot-password`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to process request."
        );
      }

      setSuccess(data.message);

      setEmail("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="
      min-h-screen
      w-full
      bg-[#f3f7fb]
      flex
      items-center
      justify-center
      px-4
      py-8
    ">

      <div className="
        w-full
        max-w-[520px]
        bg-white
        rounded-[28px]
        shadow-[0_15px_45px_rgba(15,35,65,0.12)]
        px-6
        py-10
        sm:px-10
        sm:py-12
      ">

        {/* HEADING */}

        <div className="
          text-center
          mb-8
        ">

          <div className="
            mx-auto
            mb-5
            w-14
            h-14
            rounded-full
            bg-blue-50
            flex
            items-center
            justify-center
          ">

            <svg
              className="
                w-7
                h-7
                text-blue-600
              "
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
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

          </div>

          <h1 className="
            text-3xl
            sm:text-4xl
            font-light
            text-[#10284b]
          ">
            Forgot Password?
          </h1>

          <p className="
            mt-2
            text-sm
            sm:text-base
            text-[#71809a]
          ">
            Enter your email to reset
            your password
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
        >

          {/* EMAIL */}

          <div className="mb-6">

            <label className="
              block
              mb-2
              text-sm
              font-semibold
              text-[#142945]
            ">
              Email Address
            </label>

            <div className="relative">

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
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                required
                className="
                  w-full
                  h-[54px]
                  rounded-xl
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

          {/* ERROR */}

          {error && (
            <div className="
              mb-5
              rounded-lg
              bg-red-50
              border
              border-red-100
              px-4
              py-3
              text-sm
              text-red-600
            ">
              {error}
            </div>
          )}

          {/* SUCCESS */}

          {success && (
            <div className="
              mb-5
              rounded-lg
              bg-green-50
              border
              border-green-100
              px-4
              py-3
              text-sm
              text-green-600
            ">
              {success}
            </div>
          )}

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-[54px]
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              text-sm
              font-semibold
              shadow-lg
              shadow-blue-200
              transition
              disabled:opacity-60
            "
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>

        </form>

        {/* BACK LOGIN */}

        <div className="
          text-center
          mt-7
        ">

          <Link
            to="/admin/login"
            className="
              text-sm
              text-blue-600
              font-semibold
              hover:underline
            "
          >
            ← Back to Login
          </Link>

        </div>

        {/* FOOTER */}

        <p className="
          mt-8
          text-center
          text-xs
          text-[#6e7c91]
        ">
          © 2025 Dream Home Real Estate.
          All rights reserved.
        </p>

      </div>

    </div>
  );
};

export default ForgotPassword;
