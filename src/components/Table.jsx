export default function Table({ headers, children }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-4 font-semibold text-gray-900 border-b border-gray-200"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 border-t border-gray-200">
          {children}
        </tbody>
      </table>
    </div>
  );
}