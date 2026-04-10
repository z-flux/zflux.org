import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import StockPage from './StockPage'
import IngredientsPage from './IngredientsPage'


export default function Inventory() {
  return (
    <div><Tabs defaultValue="stocks" className="w-full" >
  <TabsList>
    <TabsTrigger value="stocks" >Stock Status</TabsTrigger>
    <TabsTrigger value="Ingredient" >Ingredient Control</TabsTrigger>
  </TabsList>
  <TabsContent value="stocks"><StockPage/></TabsContent>
  <TabsContent value="Ingredient"><IngredientsPage/></TabsContent>
</Tabs>

</div>
  )
}
