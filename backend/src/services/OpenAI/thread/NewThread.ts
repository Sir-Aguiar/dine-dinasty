import { ApiGPT } from "../API";

export const NewThread = async () => await ApiGPT.beta.threads.create();
