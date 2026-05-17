'use client'
import TenderTable from './TenderTable';

const HomeMiddle = () => {
    return (
        <section className="max-w-full overflow-x-hidden">
            <div className="bg-white p-[25px_10px_10px_10px]">
                <div className="text-center">
                    <h1 className="text-[30px] text-[#054d7b] text-center">
                        Welcome to BidSmartAi System
                    </h1>
                    <p className="text-base mt-[15px] text-center">
                        The BidSmartAi System enables tenderers to download tender schedules free of cost and submit bids online through this portal.
                    </p>
                </div>
            </div>

            <div className="bg-white p-[25px_10px_10px_10px]">
                <h3 className="bg-blue-700 text-white py-[6px] px-[10px] text-base rounded-[3px]">
                    Latest Tenders
                </h3>
                <TenderTable />
                <div className="bg-gray-100 p-[10px_20px] rounded-[2px] flex items-center justify-between">
                    <p className="text-base font-normal">
                        Latest Tenders updates every 15 mins.
                    </p>
                    <button className="border-none outline-none cursor-pointer bg-transparent py-[4px] px-[6px] text-base hover:text-blue-700 transition-colors">
                        More...
                    </button>
                </div>
            </div>
        </section>
    )
}

export default HomeMiddle;