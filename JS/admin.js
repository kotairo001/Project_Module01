function addAdminAccount() {
  let adminAccount = {
    email: "admin@gmail.com",
    password: 1234567,
    status: false,
  };
  let listAdmin = [];
  listAdmin.push(adminAccount);
  localStorage.setItem("adminAccount", JSON.stringify(listAdmin));
}
addAdminAccount();



