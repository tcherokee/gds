<script lang="ts">
  import { onMount } from "svelte";
  import { fetchSitemapData } from "../../../utils/fetch-sitemap-data";
  import type { TSitemapData } from "../../../interfaces/common/types";
  import Link from "../helpers/link.svelte";
  export let totalRecords: number[];
  export let page: number;
  export let sitemapData: TSitemapData[];
  export let lastRecordId = 0;
  export let translationStore: any;
  let totalRecordsCount = 0;
  let paginationList: Array<number | string> = [];

  let sitemapDataColumns: Array<Array<TSitemapData>> = [];
  let sitemapRecordMap = {
    users: [0, 0],
    "casino-live": [0, 0],
    "custom-pages": [0, 0],
    "slot-categories": [0, 0],
    "slot-providers": [0, 0],
    games: [0, 0],
    "casino-providers": [0, 0],
    casinos: [0, 0],
  };

  const headerMapObj: Record<string, string> = {
    users: "Authors",
    "casino-live": "Casino Live",
    "custom-pages": "Custom Pages",
    "slot-categories": "Slot Categories",
    "slot-providers": "Software Slot Machines",
    games: "Slot Machines",
    "casino-providers": "Casino Providers",
    casinos: "Casinos",
  };

  const generatePagination = (
    perPage = 150,
    currentPage = 1,
    maxPagesToShow = 10
  ) => {
    const totalPages = Math.ceil(totalRecordsCount / perPage);
    if (totalPages <= 1) return [1];

    let pages = [];
    let startPage, endPage;

    // Always include first and last page
    pages.push(1);

    if (totalPages > maxPagesToShow) {
      const half = Math.floor(maxPagesToShow / 2);

      if (currentPage <= half) {
        startPage = 2;
        endPage = maxPagesToShow - 1;
      } else if (currentPage >= totalPages - half) {
        startPage = totalPages - maxPagesToShow + 2;
        endPage = totalPages - 1;
      } else {
        startPage = currentPage - half + 1;
        endPage = currentPage + half - 1;
      }

      if (startPage > 2) pages.push("...");
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (endPage < totalPages - 1) pages.push("...");
    } else {
      for (let i = 2; i < totalPages; i++) {
        pages.push(i);
      }
    }

    pages.push(totalPages);
    return pages;
  };

  const sitemapDataColumnsHandler = () => {
    sitemapDataColumns = [
      sitemapData.length > 0 ? [...sitemapData.slice(0, 50)] : [],
      sitemapData.length > 50 ? [...sitemapData.slice(50, 100)] : [],
      sitemapData.length > 100 ? [...sitemapData.slice(100, 150)] : [],
    ];

    const headerList = [
      ...new Set(sitemapData.map((item) => item.endpoint)),
    ] as Array<keyof typeof sitemapRecordMap>;
    for (const header of headerList) {
      const headerFirstIndex = sitemapData.findIndex(
        (item) => item.endpoint === header
      );
      const headerLastIndex = sitemapData.findLastIndex(
        (item) => item.endpoint === header
      );
      console.log(header, '==>', headerFirstIndex, headerLastIndex);
      const firstIndex =
        headerLastIndex < 50 || headerFirstIndex < 50
          ? 0
          : (headerLastIndex > 49 && headerLastIndex < 100) ||
              (headerFirstIndex > 49 && headerFirstIndex < 100)
            ? 1
            : 2;
      const secondIndex =
        headerFirstIndex < 50
          ? headerFirstIndex
          : headerFirstIndex > 50 && headerFirstIndex < 100
            ? headerFirstIndex%50
            : headerFirstIndex%100;
      sitemapRecordMap[header] = [firstIndex, secondIndex];
    }
    console.log(sitemapDataColumns);
    console.log(sitemapRecordMap);
  };

  const sitemapLastRecordHandler = async (
    page: number,
    lastRecordId: number
  ) => {
    const sitemapLastRecordObjResponse =
      await window.localStorage?.getItem("sitemapLastRecord");
    if (sitemapLastRecordObjResponse) {
      const sitemapLastRecordObj = JSON.parse(sitemapLastRecordObjResponse);
      const newSitemapLastRecordObj = JSON.stringify({
        ...sitemapLastRecordObj,
        [page]: lastRecordId,
      });
      await window.localStorage?.setItem(
        "sitemapLastRecord",
        newSitemapLastRecordObj
      );
    } else {
      await window.localStorage?.setItem(
        "sitemapLastRecord",
        JSON.stringify({
          [page]: lastRecordId,
        })
      );
    }
  };

  const getSitemapLastRecordByPage = async (page: number): Promise<number> => {
    const sitemapLastRecordObjResponse =
      await window.localStorage?.getItem("sitemapLastRecord");
    let lastRecordId = 0;
    if (sitemapLastRecordObjResponse) {
      const sitemapLastRecordObj = JSON.parse(sitemapLastRecordObjResponse);
      lastRecordId = sitemapLastRecordObj[page];
    }
    return lastRecordId;
  };

  onMount(async () => {
    if (!sitemapData || !sitemapData?.length) {
      let lastPageLastRecordId = await getSitemapLastRecordByPage(page - 1);
      if (!lastPageLastRecordId) {
        for (let i = 1; i < page; i++) {
          let previousLastRecordId = 0;
          if (i > 1) {
            previousLastRecordId = await getSitemapLastRecordByPage(i - 1);
          }

          const response = await fetch(
            `/api/sitemap?totalRecords=${JSON.stringify(totalRecords)}&page=${i}&lastRecordId=${previousLastRecordId}`
          );
          const result = await response.json();
          await sitemapLastRecordHandler(i, result.lastRecordId);
        }
      }
      lastPageLastRecordId = await getSitemapLastRecordByPage(page - 1);
      const response = await fetch(
        `/api/sitemap?totalRecords=${JSON.stringify(totalRecords)}&page=${page}&lastRecordId=${lastPageLastRecordId}`
      );
      const result = await response.json();
      sitemapData = result.data as TSitemapData[];
    }
    console.log(sitemapData);
    sitemapDataColumnsHandler();
    totalRecordsCount = totalRecords.reduce((acc, curr) => acc + curr, 0);
    paginationList = generatePagination(150, page, 10);
    console.log(paginationList);
  });
</script>

<div class="md:flex gap-x-4">
  {#each sitemapDataColumns as column, i}
    <div class="md:w-1/3">
      {#each column as item, index}
        {#if sitemapRecordMap[item.endpoint][0] === i && sitemapRecordMap[item.endpoint][1] === index}
          <h2 class="text-2xl my-3">{translationStore[item.endpoint]}</h2>
        {/if}
        <div>
          <a href={item.url}>{item.title}</a>
        </div>
      {/each}
    </div>
  {/each}
</div>

<div class="">
  {#if totalRecordsCount > 1}
    <nav aria-label="page navigation" class="w-full mt-3">
      <ul class="flex pagination justify-center">
        {#if page !== 1}
          <li class="page-item hidden sm:flex">
            <Link
              class="px-3 py-2 border border-pagination-border-color bg-pagination-bg-color text-link-color hover:text-link-hover-color hover:bg-pagination-hover-bg transition-colors ease-in-out duration-150 rounded-l-md"
              href={`/sitemap${page === 2 ? "" : "/?page=" + (page - 1)}`}
            >
              {translationStore?.paginationFirst}
            </Link>
          </li>
        {/if}
        {#each paginationList as item}
          <li
            class="group {page === item || item === '...'
              ? 'pointer-events-none text-pagination-disabled-color'
              : 'bg-pagination-bg-color'} {item !== '...'
              ? 'border border-pagination-border-color'
              : ''}"
          >
            <Link
              class="px-3 py-2 group-first:rounded-tl-md group-first:rounded-bl-md block text-link-color hover:text-link-hover-color hover:bg-pagination-hover-bg transition-colors ease-in-out duration-150"
              href={item === "..."
                ? "#"
                : `/sitemap${item === 1 ? "" : "/?page=" + item}`}
            >
              {item}
            </Link>
          </li>
        {/each}
        {#if page !== totalRecordsCount}
          <li class="page-item hidden sm:flex">
            <Link
              class="px-3 py-2 border border-pagination-border-color bg-pagination-bg-color text-link-color hover:text-link-hover-color hover:bg-pagination-hover-bg transition-colors ease-in-out duration-150 rounded-r-md"
              href={`/sitemap/?page=${page + 1}`}
            >
              {translationStore?.paginationLast}
            </Link>
          </li>
        {/if}
      </ul>
    </nav>
  {/if}
</div>
