"use client";
import { sidebarLeft } from "@/data/homeSidebarDara";

const HomeLeft = () => {
    return (
        <aside className="bg-gray-200 p-2 rounded">
            <ul className="text-base">
                {sidebarLeft.map((item) => {
                    return (
                        <li
                            key={item.id}
                            className="list-none bg-gray-50 p-[7px] mb-1 border border-gray-300 rounded cursor-pointer text-base hover:bg-blue-700 hover:text-white transition-colors"
                        >
                            {item.title}
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default HomeLeft;