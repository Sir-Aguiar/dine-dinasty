import "dotenv/config"
import { httpServer } from "./server/server";

const PORT = Number(process.env.HTTP_PORT || 8080) ;
/* const HOSTNAME = process.env.HTTP_HOST || "localhost";
 */
httpServer.listen(PORT, () => console.log("Servidor funcionando"));
