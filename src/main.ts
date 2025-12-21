import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

createApp(App).mount("#app");

type Status = "open" | "in progress" | "done" | "blocked";
type Priority = "low" | "medium" | "high";

type Ticket = {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  description: string;
};

let tickets: Array<Ticket> = [];

console.log("These are the tickets for your team: ", tickets);

const testTicket1: Ticket = {
  id: "t-1",
  title: "first ticket",
  status: "open",
  priority: "low",
  description: "this is the first ticket - yay!",
};

tickets.push(testTicket1);

console.log("These are the tickets for your team: ", tickets);
