import { TodoAction } from "./todo";
import { AddressAction } from "./address";

export * from "./todo";
export * from "./address";

export type Action = TodoAction | AddressAction;
