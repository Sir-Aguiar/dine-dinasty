import { Response } from "express";
import { ServerError } from "./ServerError";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";

export class HTTPHandler {
  constructor(private response: Response) {}

  sendJson(status: number, body: object) {
    return this.response.status(status).json(body || {});
  }

  ok(body: object) {
    return this.sendJson(200, body || {});
  }

  created(body: object) {
    return this.sendJson(201, body || {});
  }

  clientError(message: string) {
    return this.sendJson(400, { error: { message } });
  }

  notFound(message: string) {
    return this.sendJson(404, { error: { message } });
  }

  unauthorized(message: string) {
    return this.sendJson(401, { error: { message } });
  }

  forbidden(message: string) {
    return this.sendJson(403, { error: { message } });
  }

  expected(error: ServerError) {
    return this.sendJson(error.code, { error: { message: error.message } });
  }

  unexpected(error: any) {
    if (error instanceof PrismaClientInitializationError) return this.databaseInitialization();

    return this.sendJson(500, { message: "Houve um erro desconhecido, aguarde um instante enquanto resolvemos" });
  }

  databaseInitialization() {
    return this.sendJson(500, {
      error: { message: "Nosso banco de dados se encontra fora do ar, tente novamente mais tarde" },
    });
  }
}
