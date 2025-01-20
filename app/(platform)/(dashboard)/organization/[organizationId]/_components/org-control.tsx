"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const OrgControl = () => {
  const params = useParams();

  // break down the properties and extract only setActive
  const { setActive } = useOrganizationList();

  useEffect(
    () => {
      // break the function if setActive is not happening
      if (!setActive) return;

      // assign active organization from url parameter organization id
      setActive({
        organization: params.organizationId as string,
      });
    },
    // dependencies
    // if organizationId in url parameter is not changing, it won't trigger
    [setActive, params.organizationId]
  );
  // return is null because it return nothing other than use effect
  return null;
};
