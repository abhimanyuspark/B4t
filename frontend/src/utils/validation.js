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
    } else if (form.password.length < 20 || form.password.length > 30) {
      errs.password =
        "Password must be at least 20 characters and at most 30 characters";
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

  if ("travelDate" in form) {
    if (!form.travelDate) {
      errs.travelDate = "Date is required";
    }
  }

  if ("availableDate" in form) {
    if (!form.availableDate) {
      errs.availableDate = "Date is required";
    }
  }

  if ("origin" in form) {
    if (!form.origin) {
      errs.origin = "From is required";
    }
  }

  if ("destination" in form) {
    if (!form.destination) {
      errs.destination = "To is required";
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
