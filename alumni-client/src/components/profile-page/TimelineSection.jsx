import React from 'react'

const TimelineSection = ({ data, isEducation = false }) => (
<div className="space-y-10">
    {data.map((item, index) => (
    <div key={index} className="flex gap-6 relative">
        {/* Timeline line and dot */}
        <div className="flex flex-col items-center">
        <div className="w-3 h-3 bg-teal-600 rounded-full z-5"></div>
        {index !== data.length - 1 && (
            <div className="w-px bg-teal-300 flex-1 mt-1" />
        )}
        </div>

        {/* Content area split into two columns */}
        <div className="grid grid-cols-12 gap-4 flex-1">
        <div className="col-span-3 text-gray-400 ">
            <p className="font-[500] ">
            {item.from} - {item.to}
            </p>
            {/* <p>{isEducation ? item.institution : ""}</p> */}
        </div>
        <div className="col-span-8">
            <p className="font-semibold text-teal-600 ">
            {isEducation ? item.degree : item.post}
            </p>
            <p className="text-gray-600">{isEducation ? item.institution : item.company}</p>
        </div>
        </div>
    </div>
    ))}
</div>
);

export default TimelineSection
