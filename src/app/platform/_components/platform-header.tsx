"use client";

import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export type SortOption = "popular" | "name-asc" | "name-desc";

interface PlatformHeaderProps {
  title: string;
  count: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortLabels: Record<SortOption, string> = {
  popular: "Most Popular",
  "name-asc": "Name A-Z",
  "name-desc": "Name Z-A",
};

export function PlatformHeader({
  title,
  count,
  searchValue,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: PlatformHeaderProps) {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h1
            className="text-2xl text-black dark:text-white sm:text-3xl"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            {title}
          </h1>
          <span className="bg-zinc-200 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {count}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="rounded-none pl-9"
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-none">
                {selectedCategory === "all" ? "All Categories" : selectedCategory}
                <ChevronDown className="ml-2 size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="rounded-none">
              <DropdownMenuLabel>Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={selectedCategory}
                onValueChange={onCategoryChange}
              >
                <DropdownMenuRadioItem value="all" className="rounded-none">
                  All Categories
                </DropdownMenuRadioItem>
                {categories.map((category) => (
                  <DropdownMenuRadioItem
                    key={category}
                    value={category}
                    className="rounded-none"
                  >
                    {category}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-none">
                {sortLabels[sortBy]}
                <ChevronDown className="ml-2 size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="rounded-none">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={sortBy}
                onValueChange={(value) => onSortChange(value as SortOption)}
              >
                <DropdownMenuRadioItem value="popular" className="rounded-none">
                  Most Popular
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="name-asc" className="rounded-none">
                  Name A-Z
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="name-desc" className="rounded-none">
                  Name Z-A
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
