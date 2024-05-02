"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function HydraPagination({
  hydraView,
  target,
  pageSliceOffset,
}: {
  hydraView: any;
  target: string;
  pageSliceOffset: number;
}) {
  let currentPageNumber: string = hydraView["@id"].slice(pageSliceOffset);

  let lastPageNumber: string = hydraView["hydra:last"].slice(pageSliceOffset);

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        {hydraView["hydra:previous"] && "1" !== currentPageNumber && (
          <PaginationItem>
            <PaginationPrevious
              href={`/${target}?page=${Number(currentPageNumber) - 1}`}
            />
          </PaginationItem>
        )}
        {hydraView["hydra:first"] && "1" !== currentPageNumber && (
          <PaginationItem>
            <PaginationLink href={`/${target}?page=1`}>1</PaginationLink>
          </PaginationItem>
        )}
        {hydraView["@id"] && (
          <PaginationItem>
            <PaginationLink
              isActive
              href={`/${target}?page=${currentPageNumber}`}
            >
              {currentPageNumber}
            </PaginationLink>
          </PaginationItem>
        )}
        {Number(currentPageNumber) + 1 < Number(lastPageNumber) && (
          <PaginationItem>
            <PaginationLink
              href={`/${target}?page=${Number(currentPageNumber) + 1}`}
            >
              {Number(currentPageNumber) + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {hydraView["hydra:last"] && lastPageNumber !== currentPageNumber && (
          <PaginationItem>
            <PaginationLink href={`/${target}?page=${lastPageNumber}`}>
              {lastPageNumber}
            </PaginationLink>
          </PaginationItem>
        )}
        {hydraView["hydra:next"] && (
          <PaginationItem>
            <PaginationNext
              href={`/${target}?page=${Number(currentPageNumber) + 1}`}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
