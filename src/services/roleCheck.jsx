// services/RoleService.js
const roles = [
    { _id: "672d79e1861bcc3c8128d855", role: "Super Admin" },
    { _id: "672d79e7861bcc3c8128d857", role: "Admin" },
    { _id: "Mahasiswa", role: "Mahasiswa" },
  ];
  
  const getRoleName = (id) => {
    const role = roles.find((r) => r._id === id);
    return role ? role.role : "Role tidak dikenal";
  };
  
  export default getRoleName;
  