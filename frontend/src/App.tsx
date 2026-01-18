import { useQuery } from "@tanstack/react-query"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card"
import { api } from "./lib/api"

const getTotal = async () => {
  const response = await api.expenses["total"].$get()
  if (!response.ok) throw new Error("server error")
  const data = await response.json()
  return data
}

const App = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["get-total"],
    queryFn: getTotal,
  })

  if (error) return `Error: ${error.message}`

  return (
    <div className="w-md m-auto">
      <Card>
        <CardHeader>
          <CardTitle>Total expense</CardTitle>
          <CardDescription>The total amount you have spent</CardDescription>
        </CardHeader>
        <CardContent>{isPending ? "..." : data.total}</CardContent>
      </Card>
    </div>
  )
}

export default App
