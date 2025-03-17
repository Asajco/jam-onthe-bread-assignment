import React from "react";

const Filters = () => {
  return (
    <div className="p-4 w-64 border-r hidden md:block h-full">
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold">NFT&apos;s</span>
        <input type="checkbox" className="toggle" />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Type</h3>
        <input
          type="text"
          placeholder="Search"
          className="w-full p-1 border rounded mb-2"
        />
        <div className="space-y-1">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Human (4200)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Blue (600)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Green (3000)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Spirit (2000)
          </label>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Material</h3>
        <div className="space-y-1">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Bull Horns (3600)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Bull Sibre (1200)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Pointed Horns (2400)
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Blunt Horns (2600)
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filters;
