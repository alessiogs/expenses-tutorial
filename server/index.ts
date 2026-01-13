import { Hono } from "hono"
import { expensesRoute } from "./routes/expenses"
import { logger } from "hono/logger"
const app = new Hono()

app.use("*", logger())
app.get("/", (c) => c.text("Hono!"))

app.route("/api/expenses", expensesRoute)

export default app
