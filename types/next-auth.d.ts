import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface User {
    ThaiName: string;
    username: string;
    employeeId: string;
    image_url: string;
  }
  interface Session {
    user: User & {
      ThaiName: string;
      username: string;
      employeeId: string;
      image_url : string;
    }
    token: {
      ThaiName: string;
      username: string;
      employeeId: string;
      image_url : string;
    };
  }
}
