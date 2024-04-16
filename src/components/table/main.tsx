import ReactVirtualizedTable from "@/src/components/table/tables/virtualTable";
import Filters from "@/src/components/table/filters/main";

export default function Main({ movies }) {
  return (
    <>
      {/* <div>
        <DenseTable movies={movies} />
      </div>
      <div className="py-8"></div> */}
      <Filters />
      <div className="py-8" />
      <ReactVirtualizedTable movies={movies} />
      <div className="py-8"></div>
    </>
  );
}
