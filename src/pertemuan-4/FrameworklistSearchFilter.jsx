import { useState } from "react";
import frameworkData from "./framework.json";

export default function FrameworkListSearchFilter() {
  // SEARCH
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  //FILTTER
  const _searchTerm = searchTerm.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm) ||
      framework.details.developer.toLowerCase().includes(_searchTerm) ||
      framework.details.releaseYear.toString().includes(_searchTerm)
    const matchesTag = selectedTag
      ? framework.tags.includes(selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });
  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8 font-serif">
      <div className="max-w-4xl mx-auto">
        {/* Header dengan gaya vintage */}
        <div className="text-center mb-12">
          <div className="inline-block border-b-4 border-amber-700 pb-2 px-8">
            <h1 className="text-5xl font-bold text-amber-900 tracking-wide">
              Framework <span className="text-amber-700">Legacy</span>
            </h1>
          </div>
          <p className="text-amber-800 mt-4 italic text-lg">
            "Koleksi Framework Web Terbaik Sepanjang Masa"
          </p>
          <div className="w-24 h-0.5 bg-amber-600 mx-auto mt-4"></div>
        </div>

        {/* Daftar Framework */}
        <div className="space-y-6">
          <input
            type="text"
            name="searchTerm"
            placeholder="Search framework..."
            className="w-full p-2 border border-gray-300 rounded mb-4"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            name="selectedTag"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            onChange={(e) => setSearchTerm(e.target.value)}
          >
            <option value="">All Tags</option>
            {allTags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
            onChange
          </select>
          {filteredFrameworks.map((item) => (
            <div
              key={item.id}
              className="group relative bg-amber-50/90 backdrop-blur-sm border-2 border-amber-700/30 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Efek vintage paper texture */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none bg-repeat"
                style={{
                  backgroundImage:
                    "url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\' viewBox=\'0 0 4 4\'%3E%3Cpath fill=\'%239C27B0\' fill-opacity=\'0.4\' d=\'M1 3h1v1H1V3zm2-2h1v1H3V1z\'%3E%3C/path%3E%3C/svg%3E')",
                }}
              ></div>

              <div className="relative p-6">
                {/* Decorative corner */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-700/40"></div>
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-700/40"></div>
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-700/40"></div>
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-700/40"></div>

                {/* Title dengan gaya vintage */}
                <h2 className="text-3xl font-bold text-amber-900 mb-3 group-hover:text-amber-700 transition-colors">
                  {item.name}
                </h2>

                {/* Description */}
                <p className="text-amber-800/80 text-lg leading-relaxed mb-4 italic border-l-4 border-amber-700/40 pl-4">
                  "{item.description}"
                </p>

                {/* Detail developer dan tahun */}
                <div className="flex items-center gap-4 mb-4 text-sm text-amber-800">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">✍️ Developer:</span>
                    <span className="font-serif">{item.details.developer}</span>
                  </div>
                  <div className="w-px h-4 bg-amber-700/30"></div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">📅 Rilis:</span>
                    <span className="font-serif">
                      {item.details.releaseYear}
                    </span>
                  </div>
                </div>

                {/* Tags dengan gaya retro */}
                <div className="mb-4">
                  <p className="text-amber-800 text-sm font-bold mb-2 uppercase tracking-wide">
                    🏷️ Tags:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-amber-800/10 text-amber-900 px-3 py-1 text-xs rounded-full font-mono border border-amber-700/30 hover:bg-amber-800/20 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Website link dengan gaya vintage */}
                <div className="mt-4 pt-3 border-t border-amber-700/20">
                  <a
                    href={item.details.officialWebsite}
                    className="inline-flex items-center gap-2 text-amber-800 font-bold underline decoration-amber-700/50 hover:decoration-amber-700 transition-all group-hover:gap-3"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>🔗 Kunjungi Website Resmi</span>
                    <span className="text-lg group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer vintage */}
        <div className="mt-12 text-center pt-6 border-t-2 border-amber-700/30">
          <p className="text-amber-800/60 text-sm italic">
            © 2026 Framework Legacy Collection — Dibuat dengan ☕ dan semangat
            retro
          </p>
        </div>
      </div>
    </div>
  );
}
