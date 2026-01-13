import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import z from "zod"

const fakeExpenses = [
  { title: "beer", amount: 12 },
  { title: "fruit", amount: 15 },
  { title: "rent", amount: 600 },
]

const expenseSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
})

type Expenses = z.infer<typeof expenseSchema>

const createPostSchema = expenseSchema.omit({ id: true })

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expenses: fakeExpenses })
  })
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const data = c.req.valid("json")
    const expense = createPostSchema.parse(data)
    console.log(data, expense)
    return c.json({})
  })
