import { authOptions } from "../../../lib/auth";
import Nextauth from "next-auth";
const handler = Nextauth(authOptions);
export { handler as GET, handler as POST };