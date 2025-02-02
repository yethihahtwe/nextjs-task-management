"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";

interface SidebarProps {
  storageKey?: string;
}

export const Sidebar = ({
  // storage key is not hard-coded here as it is going to be reused for both mobile and web
  storageKey = "t-sidebar-state",
}: SidebarProps) => {
  // track which accordion is expanded and which is not
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    // default as empty object
    {}
  );

  // extract current active organization from use organization
  // alias are use for more meaningful names
  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();

  // extract organization list of the user
  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    // infinite true came from Clerk nextjs documentation
    // for paginatio purpose
    userMemberships: {
      infinite: true,
    },
  });

  /**
   * default accordion value is an array of strings
   * Objects.keys(expanded) extracts only keys from expanded object
   * reduce method converts the array of kesy to a new array. it takes two parameters
   * a callback function that poccesses each key
   * an initial value of empty array
   */

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      // if the value is true, its key is added to accumulator array using acc.push.
      // the final result will be an array containing only the keys of sections that are expanded
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  // onExpand takes id of the organization as a parameter
  const onExpand = (id: string) => {
    // get current expanding value
    setExpanded((curr) => ({
      // spread the current value
      ...curr,
      // toggle expanded id
      [id]: !expanded[id],
    }));
  };

  // create loading state
  // show the loading state when the user organization or the organization list, the user membership is not loaded yet
  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <Skeleton />
      </>
    );
  }

  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="px-4">
            Workspaces
        </span>
        <Button>
            <Link href="/select-org">
            <Plus></Plus>
            </Link>
        </Button>
        </div>
    </>
  );
};
