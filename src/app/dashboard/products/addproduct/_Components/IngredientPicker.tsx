"use client";

import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

type Ingredient = {
  id: string;
  name: string;
};


export function IngredientPicker({value,onChange,ingredients}: {
  value: string;
  onChange: (value: string) => void;
  ingredients: Ingredient[];
}) {
  const [open, setOpen] = useState(false);

  const selected = ingredients.find(i => i.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-40 justify-start">
          {selected ? selected.name : "Select ingredient"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-48">
        <Command>
          <CommandInput placeholder="Search ingredient..." />

          <CommandList>
            <CommandEmpty>No results</CommandEmpty>

            {ingredients.map(item => (
              <CommandItem
                key={item.id}
                value={item.name}
                onSelect={() => {
                  onChange(item.id);
                  setOpen(false);
                }}
              >
                {item.name}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}