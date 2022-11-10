import dayjs from "dayjs";
import { useState } from "react";
import { TextInput } from "../../UiElements/Input";
import { properties } from "../../data/db";
import Filters from "./Filters";
import PropertyCard from "./PropertyCard";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/solid";
import { MailIcon, PhoneIcon } from "@heroicons/react/solid";

const initalFilter = {
  locationId: null,
  date: null,
  price: { min: 0, max: 1000000 },
  propertyTypeId: null,
  searchTerm: "",
};
const people = [
  {
    name: "Jane Cooper",
    title: "Paradigm Representative",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  // More people...
];

const filteredResponse = (filter, response) => {
  const sameLocation = (property) => {
    if (filter?.locationId)
      return property?.address?.city?.id === filter.locationId;

    return true;
  };

  const isAvailable = (property) => {
    if (filter?.date) {
      return filter?.date.diff(dayjs(property?.availableFrom)) > 0;
    }

    return true;
  };

  const inBudget = (property) => {
    return (
      property?.rent >= filter?.price?.min &&
      property?.rent <= filter?.price?.max
    );
  };

  const samePropertType = (property) => {
    if (filter?.propertyTypeId)
      return property?.propertyType?.id === filter?.propertyTypeId;

    return true;
  };

  const hasSearchTerm = (property) => {
    console.log(filter);
    if (filter?.searchTerm)
      return (
        property?.name
          ?.toLowerCase()
          .includes(filter.searchTerm.toLowerCase()) ||
        property?.address?.fullAddress
          .toLowerCase()
          .includes(filter.searchTerm.toLowerCase())
      );

    return true;
  };

  return response.filter((property) => {
    if (
      sameLocation(property) &&
      isAvailable(property) &&
      inBudget(property) &&
      samePropertType(property) &&
      hasSearchTerm(property)
    )
      return property;
  });
};

const RentPage = () => {
  const [filter, setFilter] = useState(
    JSON.parse(JSON.stringify(initalFilter))
  );

  const resetFilter = () => {
    setFilter(JSON.parse(JSON.stringify(initalFilter)));
  };

  return (
    <div className=" pt-10 max-w-7xl mx-auto px-5">
      <div className="  py-10 px-4 sm:py-18 sm:px-4 lg:px-4 lg:flex lg:justify-between">
        <div className="text-4xl text-indigo-800 font-bold sm:text-5xl">
          Search Properties to Rent
        </div>
        <div className=" w-full max-w-xs px-4 py-2 sm:px-6 sm:py-2 lg:px-8 md:justify-start ">
          <div>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="search"
                autoComplete="true"
                name="search"
                id="search"
                value={filter?.searchTerm}
                onChange={(e) =>
                  setFilter({ ...filter, searchTerm: e.target.value })
                }
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
      </div>

      
      <Filters filter={filter} setFilter={setFilter} />
        <div className="flex justify-between pb-5">
          {filteredResponse(filter, properties).length} results
          {(filter?.locationId ||
            filter?.date ||
            filter?.price?.id ||
            filter?.propertyTypeId ||
            filter?.seachTerm) && (
            <div
              className="text-red-600 bg-red-200 px-2 rounded-md cursor-pointer"
              onClick={resetFilter}
            >
              x reset
            </div>
          )}
        </div>

        {filteredResponse(filter, properties).length > 0 ? (
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
          >
            {filteredResponse(filter, properties).map((property) => (
              <div key={property?.id} className="text-center">
                <PropertyCard details={property} />
              </div>
            ))}
          </ul>
        ) : (
          <div className="text-center text-xl text-indigo-800">
            Sorry, no results.... <br />
            Try removing filters
          </div>
        )}
    </div>
  );
};

export default RentPage;
