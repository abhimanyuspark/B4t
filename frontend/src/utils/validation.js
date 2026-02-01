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

  if ("flightNumber" in form) {
    if (!form.flightNumber) {
      errs.flightNumber = "Flight number is required";
    }
  }

  if ("date" in form) {
    if (!form.date) {
      errs.date = "Date is required";
    }
  }

  if ("from" in form) {
    if (!form.from) {
      errs.from = "From is required";
    }
  }

  if ("to" in form) {
    if (!form.to) {
      errs.to = "To is required";
    }
  }

  if ("gender" in form) {
    if (!form.gender) {
      errs.gender = "Gender is required";
    }
  }

  if ("languages" in form) {
    if (!form.languages || form.languages.length === 0) {
      errs.languages = "Please select at least one language";
    }
  }

  return errs;
};

export default validation;
