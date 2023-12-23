import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface User {
    username: string;
    employeeId: string;
  }
  interface Session {
    user: User & {
      username: string;
      employeeId: string;
    }
    token: {
      username: string;
      employeeId: string;
    };
  }
}
