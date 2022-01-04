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
  {
    name: "By Training Partner",
    id: 2,
    link: "/courses?method=pace&pace=partners&filter=course",
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
    link: "/learner/wishlists",
  },

  {
    name: "Notifications",
    link: "/notifications",
  },
  {
    name: "Account Settings",
    link: "/learner/accounts",
  },

  // {
  //   name: "Accomplishment",
  //   link: "/learner/accomplishment",
  // },

  // {
  //   name: "Subscriptions",
  //   link: "/notifications",
  // },
  // {
  //   name: "Purchase History",
  //   link: "/notifications",
  // },
  {
    name: "Profile",
    link: "/learner/profile",
  },
  // {
  //   name: "Help",
  //   link: "#",
  // },
  // {
  //   name: "Billing",
  //   link: "/billing",
  // },
];

export const INSTRUCTORLINKS = [
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  // {
  //   name: "Dashboard",
  //   link: "/instructor-pages/dashboard",
  // },
  {
    name: "Profile",
    link: "/instructor-pages/profile",
  },
  {
    name: "Authored Courses",
    link: "/instructor-pages/mycourses",
  },
  {
    name: "My Learning",
    link: "/mycourses",
  },
  {
    name: "Notifications",
    link: "/instructor-pages/notifications",
  },

  {
    name: "Wishlist",
    link: "/learner/wishlists",
  },

  {
    name: "Account Settings",
    link: "/instructor-account/reset",
  },

  {
    name: "Accomplishment",
    link: "#",
  },

  {
    name: "Subscriptions",
    link: "#",
  },
  {
    name: "Purchase History",
    link: "#",
  },

  {
    name: "Help",
    link: "",
  },
  {
    name: "Billing",
    link: "",
  },
];

export const PROGRAM_LINK = [
  // {
  //   id:"1",
  //   name:"Institute of Chartered Institute Of Personnel Management"
  // },

  {
    id: "3",
    name: "Nigerian Institute Of Management",
    logo:   "http://tqfe.org/assets/images/institutions/nim.png",
    link: process.env.PUBLIC_URL + "institute/" + 3,
  },

  {
    id: 6,
    name: "Institute of Chartered Secretaries and Administrators of Nigeria ",
    logo: "http://tqfe.org/assets/images/institutions/icsan.jpg",
    link: process.env.PUBLIC_URL + "institute/" + 6,
  },

  {
    id: "2",
    name: "Institute Of Chattered Accountant Of Nigeria",
    logo: "http://tqfe.org/assets/images/institutions/ican.jpg",
    link: process.env.PUBLIC_URL + "institute/" + 2,
  },

  {
    id: "5",
    name: "Association Of National Accountant Of Nigeria",
    logo: "http://tqfe.org/assets/images/institutions/anan.jpg",
    link: process.env.PUBLIC_URL + "institute/" + 5,
  },

  {
    id: 4,
    name: "Chartered Institute of Taxation Of Nigeria ",
    logo: "http://tqfe.org/assets/images/institutions/citn.png",
    link: process.env.PUBLIC_URL + "institute/" + 4,
  },

  {
    id: 1,
    name: "Chartered Institute of Personnel Management of Nigeria ",
    logo: "http://tqfe.org/assets/images/institutions/cipm.jpg",
    link: process.env.PUBLIC_URL + "institute/" + 1,
  },

  {
    id: 8,
    name: "Chartered Institute of Bankers of Nigeria ",
    logo: "http://tqfe.org/public/images/institutions/cibn.jpg",
    link: process.env.PUBLIC_URL + "institute/" + 8,
  },

];


