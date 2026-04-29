/**
 * Validation Utilities
 * These functions match the backend logic to ensure consistency 
 * across the entire BuyLo stack.
 */

// Basic Email Validation
export const isValidEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

// Validates names (First/Last) - Letters only
export const isNameValid = (name) => {
  if (!name) return false;
  const nameRegex = /^[A-Za-z]+$/;
  return nameRegex.test(name.trim());
};

// Validates product titles - allows alphanumeric and common punctuation
export const isProductNameValid = (name) => {
  if (!name) return false;
  const nameRegex = /^[A-Za-z0-9 .,''\-&:]+$/;
  return nameRegex.test(name.trim());
};

// Validates URLs (Product images, profile pictures)
export const isUrlValid = (url) => {
  if (!url) return false;
  const urlRegex = /^https?:\/\/([\da-z\.-]+)\.([a-z]{2,6})(\/[\w\.-]*)*(\?[;&\w\.\+=\-]*)?\/?$/;
  return urlRegex.test(url.trim());
};

// Validates Physical Addresses (Street number + Street Name)
export const isAddressValid = (address) => {
  if (!address) return false;
  const addressRegex = /^\d+\s[\w\s.,-]+$/;
  return addressRegex.test(address.trim());
};

// Validates Phone Numbers (US Format and International)
export const isPhoneNumberValid = (phone) => {
  if (!phone) return false;
  const phoneRegex = /^\+?1?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  return phoneRegex.test(phone.trim());
};

/**
 * NEW: Combined Form Validator 
 * Useful for checking an entire object at once
 */
export const validateSignUp = (data) => {
  const errors = {};

  if (!isNameValid(data.first_name)) errors.first_name = "Invalid first name.";
  if (!isNameValid(data.last_name)) errors.last_name = "Invalid last name.";
  if (!isValidEmail(data.email)) errors.email = "Invalid email address.";
  if (data.password?.length < 6) errors.password = "Password must be 6+ characters.";

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};