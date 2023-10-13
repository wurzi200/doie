import { router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState, useEffect } from "react";
import { TextInputStyle, backgroundTertiary, border } from "@/constants";
import { HiSearch } from "react-icons/hi";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const searchParam = new URLSearchParams(window.location.search).get(
      "search"
    );
    setSearchTerm(searchParam || "");
  }, []);

  const handleSearch = () => {
    router.get(
      route(route().current()),
      { search: searchTerm },
      {
        preserveState: true,
        replace: true,
      }
    );
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <TextInput
        className={`border m-4`}
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <PrimaryButton className="my-4 " onClick={handleSearch}>
        Search
      </PrimaryButton>
    </>
  );
}