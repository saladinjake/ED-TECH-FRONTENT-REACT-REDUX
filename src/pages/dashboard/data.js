export const CATEGORIES = [
  {
    name: "Art & Humanities",
    id: 10,
  },
  {
    name: "Business",
    id: 2,
  },
  {
    name: "Engineering",
    id: 8,
  },
  {
    name: "Health & Nutrition",
    id: 5,
  },
  {
    name: "Languages",
    id: 11,
  },
  {
    name: "Law",
    id: 9,
  },
  {
    name: "Social Sciences",
    id: 12,
  },
  {
    name: "Technology",
    id: 1,
  },
];

export const PACES = [
  {
    name: "Self paced",
    id: 10,
    link: "/courses?method=pace&pace=self&filter=course",
  },
  {
    name: "Instructor led",
    id: 2,
    link: "/courses?method=pace&pace=instructor&filter=course",
  },
];

export const FEES = [
  {
    name: "Free",
    id: 10,
    link: "/courses?method=fee&amount=free&filter=course",
  },
  {
    name: "Paid",
    id: 2,
    link: "/courses?method=fee&amount=paid&filter=course",
  },
];

export const AUTHLINKS = [
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "My Learning",
    link: "/mycourses",
  },
  {
    name: "Wishlist",
    link: "/learner/wishlist",
  },
  {
    name: "Accomplishment",
    link: "/learner/accomplishment",
  },
  {
    name: "Notifications",
    link: "/notifications",
  },
  {
    name: "Account Settings",
    link: "/notifications",
  },
  {
    name: "Subscriptions",
    link: "/notifications",
  },
  {
    name: "Purchase History",
    link: "/notifications",
  },
  {
    name: "Profile",
    link: "/learner/profile",
  },
  {
    name: "Help",
    link: "/notifications",
  },
  {
    name: "Billing",
    link: "/billing",
  },
];

export const INSTRUCTORLINKS = [
  {
    name: "Dashboard",
    link: "/instructor/dashboard",
  },
  {
    name: "Profile",
    link: "/instructor/profile",
  },
  {
    name: "My Courses",
    link: "/instructor/mycourses",
  },
  {
    name: "Notifications",
    link: "/instructor/notifications",
  }
];
