"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui";

/** Centered "nothing here" illustration with a message. */
export function NotFoundMessage({ message }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="mt-24">
      <Container>
        <div className="px-8 py-16 text-center">
          <img src="/assets/images/no_data.svg" width={200} alt="" className="mx-auto" />
          <h4 className="py-6">{message}</h4>
        </div>
      </Container>
    </div>
  );
}

export default function PageNotFound() {
  return <NotFoundMessage message="Sorry! 404 Page Not Found" />;
}
