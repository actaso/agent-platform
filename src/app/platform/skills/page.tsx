"use client";

import { useState, useMemo } from "react";
import { skills } from "../_data/mock-data";
import { PlatformHeader, type SortOption } from "../_components/platform-header";
import { PlatformItemRow } from "../_components/platform-item-row";

const categories = [...new Set(skills.map((s) => s.category))].sort();

export default function SkillsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");

  const filteredSkills = useMemo(() => {
    let result = skills;

    // Filter by search
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (skill) =>
          skill.name.toLowerCase().includes(query) ||
          skill.description.toLowerCase().includes(query) ||
          skill.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((skill) => skill.category === selectedCategory);
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
        title="Skills"
        count={filteredSkills.length}
        searchValue={search}
        onSearchChange={setSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {filteredSkills.map((skill) => (
          <PlatformItemRow
            key={skill.id}
            href={`/platform/skills/${encodeURIComponent(skill.id)}`}
            name={skill.name}
            id={skill.id}
            version={skill.version}
            description={skill.description}
            installations={skill.metrics.activeInstallations}
            tags={skill.tags}
          />
        ))}
      </div>
      {filteredSkills.length === 0 && (
        <p className="py-12 text-center text-zinc-500 dark:text-zinc-400">
          No skills found matching your search.
        </p>
      )}
    </div>
  );
}
