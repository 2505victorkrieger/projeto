export type User = {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Workspace = {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type WorkspaceMember = {
  id: string;
  workspaceId: string;
  userId: string;
  role: "admin" | "member";
  createdAt: Date;
  updatedAt: Date;
};
