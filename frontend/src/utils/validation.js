const validation = (form) => {
  const errs = {};
  if ("email" in form) {
    if (!form.email) {
      errs.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      errs.email = "Invalid email address";
    }
  }
  if ("password" in form) {
    if (!form.password) {
      errs.password = "Password is required";
    } else if (form.password.length < 6 || form.password.length > 10) {
      errs.password =
        "Password must be at least 6 characters and at most 10 characters";
    }
  }
  if ("name" in form) {
    if (!form.name) {
      errs.name = "Name is required";
    }
  }
  return errs;
};

export default validation;
