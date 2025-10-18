export type TUser = {
  id: string;
  email: string;
  fullName: string;
  role: "USER" | "ADMIN" | string; // adjust if more roles exist
  isVerified: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  profilePhoto: string;
};
