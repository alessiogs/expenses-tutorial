import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card"
import { api } from "./lib/api"

const App = () => {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.expenses["total"].$get()
      const data = await response.json()
      setTotal(data.total)
    }
    fetchData()
  }, [])
  return (
    <div className="w-md m-auto">
      <Card>
        <CardHeader>
          <CardTitle>Total expense</CardTitle>
          <CardDescription>The total amount you have spent</CardDescription>
        </CardHeader>
        <CardContent>{total}</CardContent>
      </Card>
    </div>
  )
}

export default App
