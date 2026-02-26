"use client";

import { useState, useMemo } from "react";
import { agents } from "../_data/mock-data";
import { PlatformHeader, type SortOption } from "../_components/platform-header";
import { PlatformItemRow } from "../_components/platform-item-row";

const categories = [...new Set(agents.map((a) => a.category))].sort();

export default function AgentsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");

  const filteredAgents = useMemo(() => {
    let result = agents;

    // Filter by search
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (agent) =>
          agent.name.toLowerCase().includes(query) ||
          agent.description.toLowerCase().includes(query) ||
          agent.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((agent) => agent.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case "popular":
        result = [...result].sort((a, b) => b.metrics.activeInstallations - a.metrics.activeInstallations);
        break;
      case "name-asc":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [search, selectedCategory, sortBy]);

  return (
    <div>
      <PlatformHeader
        title="Agents"
        count={filteredAgents.length}
        searchValue={search}
        onSearchChange={setSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {filteredAgents.map((agent) => (
          <PlatformItemRow
            key={agent.id}
            href={`/docs/agents/${encodeURIComponent(agent.id)}`}
            name={agent.name}
            id={agent.id}
            version={agent.version}
            description={agent.description}
            installations={agent.metrics.activeInstallations}
            tags={agent.tags}
          />
        ))}
      </div>
      {filteredAgents.length === 0 && (
        <p className="py-12 text-center text-zinc-500 dark:text-zinc-400">
          No agents found matching your search.
        </p>
      )}
    </div>
  );
}
