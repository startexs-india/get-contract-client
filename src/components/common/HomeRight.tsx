'use client'

const HomeRight = () => {
    return (
        <aside className="bg-gray-200 p-2 rounded">
            <button className="w-full py-[10px] bg-[#24a0ed] border-none font-bold cursor-pointer rounded text-white text-base">
                Click here to Login
            </button>
            <ul className="my-0 p-[10px]">
                <li className="my-0 p-0 list-none">
                    <a className="block no-underline text-sm font-normal py-[5px] text-[#0056b3]" href="#">
                        Online Bidder Enrollment
                    </a>
                </li>
                <li className="my-0 p-0 list-none">
                    <a className="block no-underline text-sm font-normal py-[5px] text-[#0056b3]" href="#">
                        Generate / Forgot Password?
                    </a>
                </li>
            </ul>

            <div className="bg-white p-[25px_10px_10px_10px]">
                <h4 className="bg-[#0056b3] text-white p-[5px] text-sm rounded-[3px]">
                    Tender Search
                </h4>
                <input
                    type="text"
                    placeholder="Tender ID / Title"
                    className="w-full p-[6px] my-[6px] border border-gray-300 rounded"
                />
                <button className="w-full p-[6px] bg-[#003366] text-white border-none cursor-pointer rounded">
                    Go
                </button>
            </div>

            <ul className="list-none mt-5">
                <li className="bg-[#054d7b] text-white p-[7px] mb-2 rounded cursor-pointer text-base hover:bg-[#0056b3] transition-colors">
                    Help for Contractors
                </li>
                <li className="bg-[#054d7b] text-white p-[7px] mb-2 rounded cursor-pointer text-base hover:bg-[#0056b3] transition-colors">
                    Information About DSC
                </li>
                <li className="bg-[#054d7b] text-white p-[7px] mb-2 rounded cursor-pointer text-base hover:bg-[#0056b3] transition-colors">
                    Guidelines for Hassle Free Bid
                </li>
                <li className="bg-[#054d7b] text-white p-[7px] mb-2 rounded cursor-pointer text-base hover:bg-[#0056b3] transition-colors">
                    FAQ
                </li>
                <li className="bg-[#054d7b] text-white p-[7px] mb-2 rounded cursor-pointer text-base hover:bg-[#0056b3] transition-colors">
                    Feedback
                </li>
            </ul>
        </aside>
    )
}

export default HomeRight;