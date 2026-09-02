import { useEffect, useState } from "react";
import API_URL from "../../services/authApi";

const AdminProfile = () => {
  // =====================================================
  // STATES
  // =====================================================

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [
    passwordSaving,
    setPasswordSaving,
  ] = useState(false);

  const [profile, setProfile] =
    useState({
      name: "",
      email: "",
      phone: "",
      role: "admin",
      profileImage: "",
      isActive: true,
      createdAt: "",
      lastLogin: null,
    });

  const [password, setPassword] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const [message, setMessage] =
    useState({
      type: "",
      text: "",
    });

  const [showPassword, setShowPassword] =
    useState(false);

  // =====================================================
  // TOKEN
  // =====================================================

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      sessionStorage.getItem("token")
    );
  };

  // =====================================================
  // FETCH PROFILE
  // =====================================================

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const token =
        getToken();

      if (!token) {
        setMessage({
          type: "error",
          text: "Please login first.",
        });

        return;
      }

      const response =
        await fetch(
          `${API_URL}/auth/profile`,
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to load profile."
        );
      }

      const user =
        data.user;

      setProfile({
        name:
          user.name || "",
        email:
          user.email || "",
        phone:
          user.phone || "",
        role:
          user.role || "admin",
        profileImage:
          user.profileImage || "",
        isActive:
          user.isActive !==
          undefined
            ? user.isActive
            : true,
        createdAt:
          user.createdAt || "",
        lastLogin:
          user.lastLogin ||
          null,
      });
    } catch (error) {
      console.error(error);

      setMessage({
        type: "error",
        text:
          error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD
  // =====================================================

  useEffect(() => {
    fetchProfile();
  }, []);

  // =====================================================
  // INPUT
  // =====================================================

  const handleProfileChange =
    (e) => {
      const {
        name,
        value,
      } = e.target;

      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

  // =====================================================
  // PASSWORD INPUT
  // =====================================================

  const handlePasswordChange =
    (e) => {
      const {
        name,
        value,
      } = e.target;

      setPassword((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSaveProfile =
    async (e) => {
      e.preventDefault();

      try {
        setSaving(true);

        setMessage({
          type: "",
          text: "",
        });

        const token =
          getToken();

        if (!token) {
          throw new Error(
            "Please login first."
          );
        }

        const response =
          await fetch(
            `${API_URL}/auth/profile`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body: JSON.stringify({
                name:
                  profile.name,

                email:
                  profile.email,

                phone:
                  profile.phone,

                profileImage:
                  profile.profileImage,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Profile update failed."
          );
        }

        setProfile(
          (prev) => ({
            ...prev,
            ...data.user,
          })
        );

        // Update local user data
        const oldUser =
          JSON.parse(
            localStorage.getItem(
              "user"
            ) || "{}"
          );

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...oldUser,
            ...data.user,
          })
        );

        setMessage({
          type: "success",
          text:
            "Profile updated successfully.",
        });
      } catch (error) {
        console.error(error);

        setMessage({
          type: "error",
          text:
            error.message,
        });
      } finally {
        setSaving(false);
      }
    };

  // =====================================================
  // CHANGE PASSWORD
  // =====================================================

  const handleChangePassword =
    async (e) => {
      e.preventDefault();

      setMessage({
        type: "",
        text: "",
      });

      if (
        !password.currentPassword ||
        !password.newPassword ||
        !password.confirmPassword
      ) {
        setMessage({
          type: "error",
          text:
            "Please fill all password fields.",
        });

        return;
      }

      if (
        password.newPassword.length <
        6
      ) {
        setMessage({
          type: "error",
          text:
            "New password must be at least 6 characters.",
        });

        return;
      }

      if (
        password.newPassword !==
        password.confirmPassword
      ) {
        setMessage({
          type: "error",
          text:
            "New password and confirm password do not match.",
        });

        return;
      }

      try {
        setPasswordSaving(
          true
        );

        const token =
          getToken();

        const response =
          await fetch(
            `${API_URL}/auth/change-password`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body: JSON.stringify({
                currentPassword:
                  password.currentPassword,

                newPassword:
                  password.newPassword,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Password change failed."
          );
        }

        setPassword({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        setMessage({
          type: "success",
          text:
            "Password changed successfully.",
        });
      } catch (error) {
        console.error(error);

        setMessage({
          type: "error",
          text:
            error.message,
        });
      } finally {
        setPasswordSaving(
          false
        );
      }
    };

  // =====================================================
  // DATE
  // =====================================================

  const formatDate = (
    date
  ) => {
    if (!date) {
      return "Not available";
    }

    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // INITIALS
  // =====================================================

  const initials =
    profile.name
      ? profile.name
          .split(" ")
          .map(
            (word) =>
              word[0]
          )
          .join("")
          .substring(0, 2)
          .toUpperCase()
      : "AD";

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">

          <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin" />

          <p className="text-sm text-gray-500">
            Loading profile...
          </p>

        </div>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-[#f5f7fa]">

      {/* =================================================
          SIDEBAR
          LATER INCLUDE
      ================================================= */}

      {/*
        import Sidebar from "../../components/Sidebar";

        <Sidebar />
      */}

      <main className="min-h-screen">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="h-[76px] bg-white border-b border-[#e6eaf0] px-8 flex items-center justify-between max-md:px-5">

          <div>

            <h1 className="text-[23px] font-bold text-[#10284b]">
              Admin Profile
            </h1>

            <p className="text-xs text-[#8290a5] mt-1">
              Manage your account information
            </p>

          </div>

          {/* TOP RIGHT */}

          <div className="flex items-center gap-3">

            <div className="hidden sm:flex flex-col items-end">

              <span className="text-xs font-bold text-[#162b49]">
                {profile.name}
              </span>

              <span className="text-[10px] text-gray-400">
                Administrator
              </span>

            </div>

            <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#10284b] flex items-center justify-center">

              {profile.profileImage ? (
                <img
                  src={
                    profile.profileImage
                  }
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-xs font-bold">
                  {initials}
                </span>
              )}

            </div>

          </div>

        </header>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="max-w-[1200px] mx-auto px-8 py-8 max-md:px-5 max-sm:px-4">

          {/* TITLE */}

          {/* <div className="mb-6">

            <h2 className="text-2xl font-bold text-[#10284b] max-sm:text-xl">
              Profile
            </h2>

            <p className="text-xs text-[#8b98aa] mt-1">
              View and update your personal
              information.
            </p>

          </div> */}

          {/* =================================================
              MESSAGE
          ================================================= */}

          {message.text && (
            <div
              className={`mb-5 px-4 py-3 rounded-xl text-sm font-medium ${
                message.type ===
                "success"
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-600"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* =================================================
              PROFILE INFORMATION
          ================================================= */}

          <section className="bg-white rounded-2xl border border-[#e3e7ed] shadow-sm">

            {/* CARD HEADER */}

            <div className="px-7 py-5 border-b border-[#edf0f4] max-sm:px-5">

              <h3 className="text-base font-bold text-[#142b49]">
                Profile Information
              </h3>

              <p className="text-xs text-[#929eae] mt-1">
                Update your personal details.
              </p>

            </div>

            {/* CARD BODY */}

            <div className="p-7 max-sm:p-5">

              {/* USER TOP */}

              <div className="flex items-center gap-5 mb-7 max-sm:flex-col max-sm:items-start">

                {/* AVATAR */}

                <div className="w-24 h-24 rounded-full bg-[#10284b] overflow-hidden flex items-center justify-center border-4 border-[#f4f6f9]">

                  {profile.profileImage ? (
                    <img
                      src={
                        profile.profileImage
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-2xl font-bold">
                      {initials}
                    </span>
                  )}

                </div>

                {/* INFO */}

                <div>

                  <h3 className="text-xl font-bold text-[#10284b]">
                    {profile.name ||
                      "Admin"}
                  </h3>

                  <p className="text-xs text-gray-400 mt-1">
                    {profile.email}
                  </p>

                  <span className="inline-block mt-2 px-3 py-1 rounded-md bg-[#fff7e6] text-[#b48732] text-[10px] font-bold uppercase">
                    {profile.role}
                  </span>

                </div>

              </div>

              {/* FORM */}

              <form
                onSubmit={
                  handleSaveProfile
                }
              >

                <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">

                  {/* NAME */}

                  <div>

                    <label className="block text-xs font-semibold text-[#324863] mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={
                        profile.name
                      }
                      onChange={
                        handleProfileChange
                      }
                      placeholder="Enter full name"
                      className="w-full h-11 rounded-lg border border-[#dce2e9] px-4 text-sm text-[#172b4d] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />

                  </div>

                  {/* EMAIL */}

                  <div>

                    <label className="block text-xs font-semibold text-[#324863] mb-2">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={
                        profile.email
                      }
                      onChange={
                        handleProfileChange
                      }
                      placeholder="Enter email"
                      className="w-full h-11 rounded-lg border border-[#dce2e9] px-4 text-sm text-[#172b4d] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />

                  </div>

                  {/* PHONE */}

                  <div>

                    <label className="block text-xs font-semibold text-[#324863] mb-2">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={
                        profile.phone
                      }
                      onChange={
                        handleProfileChange
                      }
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full h-11 rounded-lg border border-[#dce2e9] px-4 text-sm text-[#172b4d] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />

                  </div>

                  {/* ROLE */}

                  <div>

                    <label className="block text-xs font-semibold text-[#324863] mb-2">
                      Role
                    </label>

                    <input
                      type="text"
                      value={
                        profile.role
                      }
                      disabled
                      className="w-full h-11 rounded-lg border border-[#dce2e9] bg-[#f5f7fa] px-4 text-sm text-gray-500 outline-none cursor-not-allowed"
                    />

                  </div>

                </div>

                {/* PROFILE IMAGE URL */}

                <div className="mt-5">

                  <label className="block text-xs font-semibold text-[#324863] mb-2">
                    Profile Image URL
                  </label>

                  <input
                    type="url"
                    name="profileImage"
                    value={
                      profile.profileImage
                    }
                    onChange={
                      handleProfileChange
                    }
                    placeholder="https://example.com/profile.jpg"
                    className="w-full h-11 rounded-lg border border-[#dce2e9] px-4 text-sm text-[#172b4d] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />

                  <p className="text-[10px] text-gray-400 mt-1">
                    Enter the URL of your profile image.
                  </p>

                </div>

                {/* BUTTON */}

                <div className="mt-7 pt-5 border-t border-[#edf0f4] flex justify-end">

                  <button
                    type="submit"
                    disabled={saving}
                    className="profile-save-button"
                  >
                    {saving
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                </div>

              </form>

            </div>

          </section>

          {/* =================================================
              LOWER CARDS
          ================================================= */}

          <div className="grid grid-cols-2 gap-5 mt-5 max-lg:grid-cols-1">

            {/* =================================================
                SECURITY
            ================================================= */}

            <section className="bg-white rounded-2xl border border-[#e3e7ed] shadow-sm">

              <div className="px-7 py-5 border-b border-[#edf0f4] max-sm:px-5">

                <h3 className="text-base font-bold text-[#142b49]">
                  Security
                </h3>

                <p className="text-xs text-[#929eae] mt-1">
                  Change your account password.
                </p>

              </div>

              <div className="p-7 max-sm:p-5">

                <form
                  onSubmit={
                    handleChangePassword
                  }
                  className="space-y-4"
                >

                  {/* CURRENT */}

                  <div>

                    <label className="block text-xs font-semibold text-[#324863] mb-2">
                      Current Password
                    </label>

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="currentPassword"
                      value={
                        password.currentPassword
                      }
                      onChange={
                        handlePasswordChange
                      }
                      placeholder="Current password"
                      className="w-full h-11 rounded-lg border border-[#dce2e9] px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                  {/* NEW */}

                  <div>

                    <label className="block text-xs font-semibold text-[#324863] mb-2">
                      New Password
                    </label>

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="newPassword"
                      value={
                        password.newPassword
                      }
                      onChange={
                        handlePasswordChange
                      }
                      placeholder="New password"
                      className="w-full h-11 rounded-lg border border-[#dce2e9] px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                  {/* CONFIRM */}

                  <div>

                    <label className="block text-xs font-semibold text-[#324863] mb-2">
                      Confirm Password
                    </label>

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      value={
                        password.confirmPassword
                      }
                      onChange={
                        handlePasswordChange
                      }
                      placeholder="Confirm password"
                      className="w-full h-11 rounded-lg border border-[#dce2e9] px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                  {/* SHOW */}

                  <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">

                    <input
                      type="checkbox"
                      checked={
                        showPassword
                      }
                      onChange={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="accent-blue-600"
                    />

                    Show password

                  </label>

                  {/* BUTTON */}

                  <button
                    type="submit"
                    disabled={
                      passwordSaving
                    }
                    className="profile-password-button"
                  >
                    {passwordSaving
                      ? "Changing..."
                      : "Change Password"}
                  </button>

                </form>

              </div>

            </section>

            {/* =================================================
                ACCOUNT
            ================================================= */}

            <section className="bg-white rounded-2xl border border-[#e3e7ed] shadow-sm">

              <div className="px-7 py-5 border-b border-[#edf0f4] max-sm:px-5">

                <h3 className="text-base font-bold text-[#142b49]">
                  Account Details
                </h3>

                <p className="text-xs text-[#929eae] mt-1">
                  Your account information.
                </p>

              </div>

              <div className="p-7 max-sm:p-5">

                {/* STATUS */}

                <div className="flex items-center justify-between py-4 border-b border-[#edf0f4]">

                  <span className="text-xs text-gray-500">
                    Account Status
                  </span>

                  <span
                    className={`text-xs font-semibold flex items-center gap-2 ${
                      profile.isActive
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >

                    <span
                      className={`w-2 h-2 rounded-full ${
                        profile.isActive
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />

                    {profile.isActive
                      ? "Active"
                      : "Inactive"}

                  </span>

                </div>

                {/* ROLE */}

                <div className="flex items-center justify-between py-4 border-b border-[#edf0f4]">

                  <span className="text-xs text-gray-500">
                    Account Type
                  </span>

                  <span className="text-xs font-semibold text-[#172b4d] capitalize">
                    {profile.role}
                  </span>

                </div>

                {/* MEMBER */}

                <div className="flex items-center justify-between py-4 border-b border-[#edf0f4]">

                  <span className="text-xs text-gray-500">
                    Member Since
                  </span>

                  <span className="text-xs font-semibold text-[#172b4d]">
                    {formatDate(
                      profile.createdAt
                    )}
                  </span>

                </div>

                {/* LAST LOGIN */}

                <div className="flex items-center justify-between py-4">

                  <span className="text-xs text-gray-500">
                    Last Login
                  </span>

                  <span className="text-xs font-semibold text-[#172b4d]">
                    {formatDate(
                      profile.lastLogin
                    )}
                  </span>

                </div>

              </div>

            </section>

          </div>

        </div>

      </main>

    </div>
  );
};

export default AdminProfile;
