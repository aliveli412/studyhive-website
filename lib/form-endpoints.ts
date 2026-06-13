/** Form POST endpoints — PHP on Hostinger, Next API routes in local dev only. */
export const contactFormEndpoint =
  process.env.NODE_ENV === "development"
    ? "/api/contact"
    : "/api/contact.php";

export const tutorApplicationEndpoint =
  process.env.NODE_ENV === "development"
    ? "/api/tutor-application"
    : "/api/tutor-application.php";

export const reviewFormEndpoint =
  process.env.NODE_ENV === "development"
    ? "/api/review"
    : "/api/review.php";
