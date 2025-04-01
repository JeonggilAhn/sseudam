"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  headerName?: string;
  headerLink?: string;
}

interface TitleProps {
  pageTitle?: string;
}

interface PageSettingProps {
  headerName?: string;
  pageTitle?: string;
  headerLink?: string;
  children: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ headerName, headerLink }) => {
  const router = useRouter();

  const handlePage = headerLink
    ? () => {
        router.push(headerLink);
      }
    : undefined;

  return (
    <>
      <header className="p-4">
        <div className="flex items-center">
          {headerLink && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full mr-2 p-0"
              onClick={handlePage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}
          <h1 className="text-lg font-bold text-[#7b7b7b]">{headerName}</h1>
        </div>
      </header>
    </>
  );
};

const Title: React.FC<TitleProps> = ({ pageTitle }) => {
  return (
    <header className="mt-[20px] mb-[60px]">
      <h1 className="text-[28px] font-bold flex justify-start">{pageTitle}</h1>
    </header>
  );
};

const PageSetting: React.FC<PageSettingProps> = ({
  headerName,
  pageTitle,
  headerLink,
  children,
}) => {
  return (
    <>
      <PageHeader headerName={headerName} headerLink={headerLink} />
      <div className="ml-8 mr-8">
        <Title pageTitle={pageTitle} />
        <div className="ml-2 mr-2">{children}</div>
      </div>
    </>
  );
};

export default PageSetting;
