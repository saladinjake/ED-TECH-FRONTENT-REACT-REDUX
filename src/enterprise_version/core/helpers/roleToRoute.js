const roleToRoute = (role) => {
  let route;
  switch (role) {
    case "ADMIN":
      route = "/admin";
      break;
    case "Instructor":
      route = "/instructor/dashboard";
      break;
    case "User":
      route = "/mycourses";
      break;
    case undefined:
      route = "/login";
      break;
    default:
      route = "/login";
  }

  return route;
};

export default roleToRoute;