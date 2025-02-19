import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
    companyAddress: "",
    companyEmail: "",
    gstNumber: "",
    registerWithGST: false,
    promotionalConsent: false, // Promotional consent
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    const formErrors = {};

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      formErrors.email = "Invalid email format.";

    // Password validation
    if (!passwordRegex.test(formData.password))
      formErrors.password = "Password must be strong.";

    // GST-related validation
    if (formData.registerWithGST && !formData.companyName) {
      formErrors.companyName = "Company name is required.";
    }

    if (formData.registerWithGST && !formData.gstNumber) {
      formErrors.gstNumber = "GST number is required.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post("http://localhost:3007/api/register", formData);
        toast.success("Registration successful! Redirecting to login page...", {
          autoClose: 2000,
          onClose: () => navigate("/my-account"),
        });
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Registration failed. Try again.",
          { autoClose: 2000 }
        );
      }
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8 mb-5">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <FaUserPlus className="mx-auto h-12 w-12 text-gray-600" />
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-600">
          Create a new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-base font-medium text-gray-900"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 outline-gray-300 focus:outline-maroon-600 sm:text-sm"
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-900"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 outline-gray-300 focus:outline-maroon-600 sm:text-sm"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 outline-gray-300 focus:outline-maroon-600 sm:text-sm"
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="registerWithGST"
              name="registerWithGST"
              checked={formData.registerWithGST}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="registerWithGST" className="text-gray-900">
              Register using GST details
            </label>
          </div>

          {formData.registerWithGST && (
            <>
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-base font-medium text-gray-900"
                >
                  Company Name
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 outline-gray-300 focus:outline-maroon-600 sm:text-sm"
                />
                {errors.companyName && (
                  <p className="text-sm text-red-600">{errors.companyName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="companyAddress"
                  className="block text-base font-medium text-gray-900"
                >
                  Company Address
                </label>
                <input
                  id="companyAddress"
                  name="companyAddress"
                  type="text"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 outline-gray-300 focus:outline-maroon-600 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="gstNumber"
                  className="block text-base font-medium text-gray-900"
                >
                  GST Number
                </label>
                <input
                  id="gstNumber"
                  name="gstNumber"
                  type="text"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 outline-gray-300 focus:outline-maroon-600 sm:text-sm"
                />
              </div>
            </>
          )}

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="promotionalConsent"
              name="promotionalConsent"
              checked={formData.promotionalConsent}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="promotionalConsent" className="text-gray-900">
              I agree to receive promotional content.
            </label>cd 
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 text-gray-800 bg-gray-200 rounded font-semibold transition-all duration-200 hover:bg-black hover:text-gray-50"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-lg text-gray-800">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-red-800 hover:text-black"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
