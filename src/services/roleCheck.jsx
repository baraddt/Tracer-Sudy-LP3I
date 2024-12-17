// services/RoleService.js
const roles = [
    { _id: "675112cf0a99a51d309ed817", role: "Super Admin" },
    { _id: "675112d60a99a51d309ed819", role: "Admin" },
    { _id: "675114850a99a51d309ed823", role: "Prodi Admin" },
    { _id: "675114c31b35b0fc936672b0", role: "Mahasiswa" },
  ];
  
  const getRoleName = (id) => {
    const role = roles.find((r) => r._id === id);
    return role ? role.role : "Role tidak dikenal";
  };
  
  export default getRoleName;
  