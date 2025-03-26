<script lang="ts">
  import { onMount } from "svelte";

  // Types and TypeGuards
  import {
    isFaqBlockType,
    isHowToBlockType,
    isImageWithParagraphType,
    isIntroductionWithImageBlock,
    isProsAndConsType,
    isSingleContentBlock,
  } from "../../../interfaces/common/typeguards";
  import type {
    Block,
    quicklinksObj,
  } from "../../../interfaces/common/types.ts";

  // Helpers
  import { sanitizeAndHyphenate } from "../../../lib/sanitizeAndHyphenate";

  //Components
  import Collapse from "./collapse.svelte";
  import Link from "./link.svelte";
  import MediaQuery from "./mediaQuery.svelte";
  export let data;
  export let block = [];
  export let translationStore;
  export let isGamePage = false;
  export let orderMap: { [key: string]: number } = {
    heading: 1,
    introduction: 2,
    gameInfoTable: 3,
    content1: 4,
    content2: 5,
    content3: 6,
    content4: 7,
    howTo: 8,
    faqs: 9,
  };

  // Regex to target H2 Headings
  // /<h2>(.*?)<\/h2>/g;
  const h2Regex = /<h2[^>]*>(.*?)<\/h2>/g;

  //Function to Extract H2 Headings from Content Blocks
  const extractH2TextBlock = (components: Block[]): quicklinksObj[] => {
    // Boolean toggle to determine when one FAQ has been processed.
    let faqProcessed: Boolean = false;

    return components.flatMap((component): quicklinksObj[] => {
      if (isSingleContentBlock(component)) {
        const matches = [...component.content.matchAll(h2Regex)];
        return matches.map((match) => ({
          text: match[1],
          id: sanitizeAndHyphenate(match[1]) || "",
        }));
      } else if (isHowToBlockType(component)) {
        return [
          {
            text: component.title,
            id: sanitizeAndHyphenate(component.title) || "",
          },
        ];
      } else if (isFaqBlockType(component) && !faqProcessed) {
        // Set FAQ Processed to true to ensure only One heading gets created for the FAQs.
        faqProcessed = true;
        return [
          {
            text: translationStore.faq,
            id: sanitizeAndHyphenate(translationStore.faq) || "",
          },
        ];
      } else if (isProsAndConsType(component)) {
        return [
          {
            text: component.heading,
            id: sanitizeAndHyphenate(component.heading) || "",
          },
        ];
      } else if (isImageWithParagraphType(component)) {
        return [
          {
            text: component.title,
            id: sanitizeAndHyphenate(component.title) || "",
          },
        ];
      } else if (isIntroductionWithImageBlock(component)) {
        return [
          {
            text: component.heading,
            id: sanitizeAndHyphenate(component.heading) || "",
          },
        ];
      } else {
        return [];
      }
    });
  };

  const extractH2Text = (element: any) => {
    const quickLinkKeys = [
      "heading",
      "introduction",
      "content1",
      "content2",
      "content3",
      "content4",
      "howTo",
      "proscons",
      "faqs",
      "gameInfoTable",
    ];

    const qlArray = [];

    for (const key in element) {
      if (quickLinkKeys.includes(key) && element[key]) {
        switch (key) {
          case "heading":
            if (isGamePage) {
              qlArray.push({
                text: element[key],
                id: sanitizeAndHyphenate(element[key]),
                order: orderMap.heading,
              });
            }
            break;
          case "content1":
          case "content2":
          case "content3":
          case "content4":
          case "introduction":
            const matches = [...element[key].matchAll(h2Regex)];
            qlArray.push(
              ...matches.map((match) => ({
                text: match[1],
                id: sanitizeAndHyphenate(match[1]),
                order: orderMap[key],
              }))
            );
            break;
          // case "proscons":
          //   qlArray.push({
          //     text: element[key].heading,
          //     id: sanitizeAndHyphenate(element[key].heading),
          //   });
          //   break;
          case "gameInfoTable":
            qlArray.push({
              text: translationStore.gameInfoTableH2,
              id: sanitizeAndHyphenate(translationStore.gameInfoTableH2),
              order: orderMap.gameInfoTable,
            });
            break;
          case "howTo":
            qlArray.push({
              text: element[key].title,
              id: sanitizeAndHyphenate(element[key].title),
              order: orderMap.howTo,
            });
            break;
          case "faqs":
            if (element[key].length > 0) {
              qlArray.push({
                text: translationStore.faq,
                id: sanitizeAndHyphenate(translationStore.faq),
                order: orderMap.faqs,
              });
            }
            break;
          default:
            break;
        }
      }
    }

    return qlArray;
  };

  const optimizedSortByOrder = (arr) => {
    return arr.sort((a, b) => {
      // Handle cases where order might be missing or not a number
      const orderA = typeof a.order === "number" ? a.order : Infinity;
      const orderB = typeof b.order === "number" ? b.order : Infinity;
      return orderA - orderB;
    });
  };

  const quickLinks = block.length > 0
    ? extractH2TextBlock(block)
    : extractH2Text(data.attributes);
  const filterQuickLinks = optimizedSortByOrder(
    quickLinks.filter((elem) => elem.text)
  );

  // Quicklinks order
  let reorderedQuickLinks: quicklinksObj[] = [];
  const quickLinksMedian = Math.ceil(filterQuickLinks.length / 2);
  for (let i = 0; i < quickLinksMedian; i++) {
    reorderedQuickLinks.push(filterQuickLinks[i] as quicklinksObj);
    if (quickLinksMedian + i < filterQuickLinks.length) {
      reorderedQuickLinks.push(
        filterQuickLinks[quickLinksMedian + i] as quicklinksObj
      );
    }
  }

  onMount(() => {
    const quickLinkNodes = document.querySelectorAll(
      "h2.intro-title, .content-block h2, .howto-container h2, .howto-title h2, h2.game-info-table-title, h2.faq-title"
    );

    const processQuickLinkNodes = (nodes: any) => {
      let qLObjs: Array<any> = [];
      const nodeMedian = Math.round(nodes.length / 2);

      Array.from(nodes).map((h: any, index: number) => {
        const safeHeading = h.innerHTML
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "");

        h.setAttribute("id", safeHeading + "/");
      });
    };
    processQuickLinkNodes(quickLinkNodes);
  });
</script>

<Collapse
  id="quickLinks"
  label={translationStore.quickLinks}
  containerClass="mb-5"
  labelClass="text-base md:text-xl font-medium bg-quicklinks-btn-bkg text-white p-3"
  collapseClass="bg-white rounded-b-md"
  checked={true}
>
  <div slot="content" class="flex">
    <ul class="grid capitalize m-0 p-0 pr-4 md:grid-cols-2 w-full gap-2">
      <MediaQuery query="(min-width: 768px)" let:matches>
        {#if matches}
          {#each reorderedQuickLinks as link}
            <li class="py-0.5 px-0 m-0">
              <a class="underline underline-offset-4" href={`#${link.id}/`}>
                {link.text}
              </a>
            </li>
          {/each}
        {:else}
          {#each filterQuickLinks as link}
            <li class="py-0.5 px-0 m-0">
              <a class="underline underline-offset-4" href={`#${link.id}/`}>
                {link.text}
              </a>
            </li>
          {/each}
        {/if}
      </MediaQuery>
    </ul>
  </div>
</Collapse>
