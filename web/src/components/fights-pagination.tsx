"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function FightsPagination({ hydraView }: { hydraView: any }) {
  let currentPageNumber: string = hydraView["@id"].slice(19);

  let lastPageNumber: string = hydraView["hydra:last"].slice(19);
  return (
    <Pagination className="mt-8">
      <PaginationContent>
        {hydraView["hydra:previous"] && "1" !== currentPageNumber && (
          <PaginationItem>
            <PaginationPrevious
              href={`/fighters?page=${Number(currentPageNumber) - 1}`}
            />
          </PaginationItem>
        )}
        {hydraView["hydra:first"] && "1" !== currentPageNumber && (
          <PaginationItem>
            <PaginationLink href="/fighters?page=1">1</PaginationLink>
          </PaginationItem>
        )}
        {hydraView["@id"] && (
          <PaginationItem>
            <PaginationLink
              isActive
              href={`/fighters?page=${currentPageNumber}`}
            >
              {currentPageNumber}
            </PaginationLink>
          </PaginationItem>
        )}{" "}
        {hydraView["hydra:last"] && lastPageNumber !== currentPageNumber && (
          <PaginationItem>
            <PaginationLink href={`/fighters?page=${lastPageNumber}`}>
              {lastPageNumber}
            </PaginationLink>
          </PaginationItem>
        )}
        {hydraView["hydra:next"] && (
          <PaginationItem>
            <PaginationNext
              href={`/fighters?page=${Number(currentPageNumber) + 1}`}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
