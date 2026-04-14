"use client";

import { useState, useMemo } from "react";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Item, Items } from "@/interfaces/items";

export function IngredientPicker({
  onSelect,
  data,
}: {
  onSelect: (item: Item)=>void;
  data: Items | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const items = data?.data.data ?? [];


  return (
    <div className="relative w-full">
      <Popover open={open} onOpenChange={setOpen} >
        <PopoverAnchor asChild>
      <Input
        value={searchTerm}
        placeholder="Search ingredient..."
        className="w-full"
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setOpen(true);
        }}
      />
</PopoverAnchor>
      
      
        <PopoverContent
          className="p-0 w-[var(--radix-popover-trigger-width)]"
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()} 
        >
          <Command>
            <CommandList>
              <CommandEmpty>No results</CommandEmpty>

              {items.map((item) => (
                item.name.toLowerCase().includes(searchTerm.toLowerCase())&&
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => {
                    onSelect(item)
                    setSearchTerm("");
                    setOpen(false);
                  }}
                >
                  {item.name} ({item.base_unit.symbol})
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}