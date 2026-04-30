const users = [
  {
    first_name: "john",
    last_name: "doe",
    phone_number: "818-555-0123",
    email: "john.manager@buylo.com",
    password: "$2a$12$x03Xnw2dWFYb5paUFP8oDuFWThrsiBJNnhDvofpzVbUwswUXgaL86", // Use bcrypt later!
    address_line_1: "14500 Sherman Circle",
    address_line_2: "Apt 202",
    city: "Van Nuys",
    state: "CA",
    zipcode: "91405",
    user_role: "manager"
  },
  {
    first_name: "Sarah",
    last_name: "Chen",
    phone_number: "213-555-9876",
    email: "sarah.c@gmail.com",
    password: "$2a$12$fQIg/B9eb8pS2Z60lAZuneCkWxGLtz/mOXPkY43VABuViteDFu/S2",
    address_line_1: "742 Evergreen Terrace",
    address_line_2: "",
    city: "Los Angeles",
    state: "CA",
    zipcode: "90001",
    user_role: "shopper"
  },
  {
    first_name: "Marcus",
    last_name: "Rodriguez",
    phone_number: "310-555-4321",
    email: "marcus.rod@outlook.com",
    password: "$2a$12$fQIg/B9eb8pS2Z60lAZuneCkWxGLtz/mOXPkY43VABuViteDFu/S2", 
    address_line_1: "123 Ocean Ave",
    address_line_2: "Unit B",
    city: "Santa Monica",
    state: "CA",
    zipcode: "90401",
    user_role: "shopper"
  }
];

export default users;