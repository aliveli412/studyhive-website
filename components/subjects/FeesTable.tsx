import { fees } from "@/lib/content";

export function FeesTable() {
  return (
    <section className="px-6 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-display text-3xl font-semibold text-cocoa-900 md:text-4xl">
          Fees
        </h2>
        <p className="mt-3 text-center text-base text-cocoa-700">
          GCSE rates shown. Other levels and subjects on request.
        </p>

        <div className="mt-10 overflow-hidden rounded-2xl border border-cocoa-800/10 bg-cream shadow-sm">
          <table className="w-full">
            <thead className="bg-honey-500">
              <tr>
                <th className="px-4 py-4 text-left font-display text-base font-semibold text-cocoa-900 md:px-6 md:text-lg">
                  Subject
                </th>
                <th className="px-4 py-4 text-right font-display text-base font-semibold text-cocoa-900 md:px-6 md:text-lg">
                  1:1 / hr
                </th>
                <th className="px-4 py-4 text-right font-display text-base font-semibold text-cocoa-900 md:px-6 md:text-lg">
                  Group / hr
                </th>
              </tr>
            </thead>
            <tbody>
              {fees.map((fee, i) => (
                <tr
                  key={fee.subject}
                  className={`border-t border-cocoa-800/5 ${
                    i % 2 === 0 ? "bg-cream" : "bg-honey-50"
                  }`}
                >
                  <td className="px-4 py-4 text-sm text-cocoa-900 md:px-6 md:text-base">
                    {fee.subject}
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-semibold text-cocoa-900 md:px-6 md:text-base">
                    {fee.oneToOne}
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-semibold text-cocoa-900 md:px-6 md:text-base">
                    {fee.group}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-center text-sm text-cocoa-700">
          Online-only tutoring. We also offer French, History, Separate Sciences and more - just ask.
        </p>
      </div>
    </section>
  );
}
