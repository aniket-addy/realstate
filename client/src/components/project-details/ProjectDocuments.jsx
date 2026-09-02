import {
  Download,
  FileText,
  IndianRupee,
} from "lucide-react";

function ProjectDocuments({ project }) {
  return (
    <section className="bg-white py-14 sm:py-16">

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        <div className="mb-8">

          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b88b32]">
            Documents
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-[#0f172a]">
            Project Documents
          </h2>

        </div>

        <div className="grid gap-4 sm:grid-cols-2">

          {/* BROCHURE */}

          <DocumentCard
            icon={<FileText size={22} />}
            title="Project Brochure"
            description="Download the complete project brochure."
            url={project?.brochurePdf}
            buttonText="Download Brochure"
          />

          {/* PRICE LIST */}

          <DocumentCard
            icon={<IndianRupee size={22} />}
            title="Price List"
            description="View or download the latest price list."
            url={project?.priceListPdf}
            buttonText="Download Price List"
          />

        </div>

      </div>

    </section>
  );
}

function DocumentCard({
  icon,
  title,
  description,
  url,
  buttonText,
}) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:flex-row sm:items-center">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#c49438] shadow-sm">
          {icon}
        </div>

        <div>
          <h3 className="font-bold text-[#0f172a]">
            {title}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>
        </div>

      </div>

      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-[#0f172a] px-4 py-3 text-xs font-bold text-white transition hover:bg-slate-800 sm:mt-0"
        >
          <Download size={15} />
          {buttonText}
        </a>
      ) : (
        <span className="mt-5 text-xs font-medium text-slate-400 sm:mt-0">
          Coming Soon
        </span>
      )}

    </div>
  );
}

export default ProjectDocuments;