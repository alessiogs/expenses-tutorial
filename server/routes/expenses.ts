import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import z from "zod"

const expenseSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
})

type Expense = z.infer<typeof expenseSchema>

const createPostSchema = expenseSchema.omit({ id: true })
const fakeExpenses: Expense[] = [
  { id: 1, title: "beer", amount: 12 },
  { id: 2, title: "fruit", amount: 15 },
  { id: 3, title: "rent", amount: 600 },
]

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses })
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const data = c.req.valid("json")
    const expense = createPostSchema.parse(data)
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 })
    return c.json({})
  })
  .get("/total", (c) => {
    const total = fakeExpenses.reduce((acc, current) => acc + current.amount, 0)
    return c.json({ total })
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"))
    const expense = fakeExpenses.find((expense: Expense) => expense.id === id)
    return c.json({ expense })
  })
  .delete("/:id", (c) => {
    const id = Number.parseInt(c.req.param("id"))
    return c.json({})
  })
