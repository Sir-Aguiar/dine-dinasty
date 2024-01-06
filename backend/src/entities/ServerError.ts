export class ServerError {
  constructor(public code: number, public message: string, public stack?: string) {}
}
