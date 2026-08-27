function ProjectEmptyState() {
  return (
    <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-dashed border-border-primary bg-background-secondary px-5 text-center">

      <div>

        <h3 className="text-lg font-semibold text-primary">
          No projects found
        </h3>

        <p className="mt-2 text-xs text-text-secondary">
          Try changing your filters to find more projects.
        </p>

      </div>

    </div>
  );
}

export default ProjectEmptyState;