import Admin from "./admin.model.js";

export async function findByEmail(email: string) {
  return Admin.findOne({ email }).select("+password");
}

export async function findById(id: string) {
  return Admin.findById(id);
}
