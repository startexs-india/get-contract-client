'use client'

const TenderTable = () => {
    return (
        <div className="w-full overflow-x-auto overflow-y-hidden bg-white border border-gray-300">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-[6px] text-left text-sm">Tender Title</th>
                        <th className="border border-gray-300 p-[6px] text-left text-sm">Reference No</th>
                        <th className="border border-gray-300 p-[6px] text-left text-sm">Tender Value</th>
                        <th className="border border-gray-300 p-[6px] text-left text-sm">Closing Date</th>
                        <th className="border border-gray-300 p-[6px] text-left text-sm">Bid Opening Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-300 p-[6px] text-left text-sm">Road Construction Work Bihar</td>
                        <td className="border border-gray-300 p-[6px] text-left text-sm">BHAGALPUR-20</td>
                        <td className="border border-gray-300 p-[6px] text-left text-sm">Tender value-20000</td>
                        <td className="border border-gray-300 p-[6px] text-left text-sm">25-Feb-2026</td>
                        <td className="border border-gray-300 p-[6px] text-left text-sm">25-Feb-2026</td>
                    </tr>

                    <tr>
                        <td className="border border-gray-300 p-[6px] text-left text-sm">Bridge Construction Project</td>
                        <td className="border border-gray-300 p-[6px] text-left text-sm">MGY-2025-22</td>
                        <td className="border border-gray-300 p-[6px] text-left text-sm">28-Feb-2026</td>
                        <td className="border border-gray-300 p-[6px] text-left text-sm">28-Feb-2026</td>
                        <td className="border border-gray-300 p-[6px] text-left text-sm">28-Feb-2026</td>
                    </tr>

                    <tr>
                        <td className="border border-gray-300 p-[6px] text-left text-sm">NH Road Repair Work</td>
                        <td className="border border-gray-300 p-[6px] text-left text-sm">NH-2026-04</td>
                        <td className="border border-gray-300 p-[6px] text-left text-sm">05-Mar-2026</td>
                        <td className="border border-gray-300 p-[6px] text-left text-sm">05-Mar-2026</td>
                        <td className="border border-gray-300 p-[6px] text-left text-sm">05-Mar-2026</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TenderTable;