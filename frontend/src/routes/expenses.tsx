import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/expenses")({
  component: Expenses,
})

const getExpenses = async () => {
  await new Promise((r) => setTimeout(r, 1000))
  const response = await api.expenses.$get()
  if (!response.ok) throw new Error("server error")
  const data = await response.json()
  return data
}

function Expenses() {
  const { data, error, isPending } = useQuery({
    queryKey: ["get-expenses"],
    queryFn: getExpenses,
  })

  if (error) return `Error: ${error.message}`
  return (
    <div className="p-2 max-w-3xl m-auto">
      <Table>
        <TableCaption>A list of your recent expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4"></Skeleton>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4"></Skeleton>
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4"></Skeleton>
                    </TableCell>
                  </TableRow>
                ))
            : data.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  )
}
