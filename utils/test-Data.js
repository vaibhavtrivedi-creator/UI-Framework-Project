const testData = {
  registerData: {
    blankEmail: "",
    blankPassword: "",
    invalidEmail: "vaibhav@",
    password: "Test@1234",
    confirmPassword: "Test@1234",
    invalidPassword: "test",
    randomEmail: `test${Date.now()}@gmail.com`,
    validEmail: "vaibhav.esprit@gmail.com",
  },
  loginData: {
    emailPlaceholder: "you@email.com",
    passwordPlaceholder: "••••••",
    blankEmail: "",
    blankPassword: "",
    invalidEmail: "vaibhav@",
    invalidPassword: "test",
    validEmail: "vaibhav.esprit@gmail.com",
    validPassword: "Vibhu@990",
  },
  eventValiodationErrorMessage: {
    errorMessages: [
      "Name must be at least 2 chars",
      "Enter a valid email",
      "Enter a valid 10-digit phone",
    ],
  },
  eventBookingInfo: {
    name: "Vaibhy",
    email: "vaibhav.esprit@gmail.com",
    phone: "1234567890",
  },
};
module.exports = testData;
