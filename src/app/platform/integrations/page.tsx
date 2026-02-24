"use client";

import { useState, useMemo } from "react";
import { integrations } from "../_data/mock-data";
import { PlatformHeader, type SortOption } from "../_components/platform-header";
import { PlatformItemRow } from "../_components/platform-item-row";

const categories = [...new Set(integrations.map((i) => i.category))].sort();

export default function IntegrationsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");

  const filteredIntegrations = useMemo(() => {
    let result = integrations;

    // Filter by search
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (integration) =>
          integration.name.toLowerCase().includes(query) ||
          integration.description.toLowerCase().includes(query) ||
          integration.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((integration) => integration.category === selectedCategory);
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
        title="Integrations"
        count={filteredIntegrations.length}
        searchValue={search}
        onSearchChange={setSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {filteredIntegrations.map((integration) => (
          <PlatformItemRow
            key={integration.id}
            href={`/platform/integrations/${encodeURIComponent(integration.id)}`}
            name={integration.name}
            id={integration.id}
            version={integration.version}
            description={integration.description}
            installations={integration.metrics.activeInstallations}
            tags={integration.tags}
          />
        ))}
      </div>
      {filteredIntegrations.length === 0 && (
        <p className="py-12 text-center text-zinc-500 dark:text-zinc-400">
          No integrations found matching your search.
        </p>
      )}
    </div>
  );
}
