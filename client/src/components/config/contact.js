// =========================================================
// CENTRAL CONTACT CONFIG
// =========================================================

export const CONTACT_CONFIG = {
  // YAHAN future mein ek hi baar phone number change karna hai
  phone: "9458883806",

  // Website par display karne ke liye
  phoneDisplay: "9458883806",

  // Future use
  whatsapp: "945883806",

  // Future use
  email: "",
};


// =========================================================
// CALL CLIENT
// =========================================================

export const callClient = () => {
  if (!CONTACT_CONFIG.phone) {
    return false;
  }

  window.location.href = `tel:${CONTACT_CONFIG.phone}`;

  return true;
};