const validation = (form) => {
  const errs = {};
  if (!form.email) {
    errs.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
    errs.email = "Invalid email address";
  }
  if (!form.password) {
    errs.password = "Password is required";
  } else if (form.password.length < 6) {
    errs.password = "Password must be at least 6 characters";
  }
  return errs;
};

export default validation;
