"use client";

const LabelComponent = ({ value }: { value: string }) => {
    return <label className="font-medium text-[20px]">{value}</label>;
};

export default LabelComponent;
