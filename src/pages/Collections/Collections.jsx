import React from "react";
import Container from "../../components/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import collections from "../../assets/data/collections";
import CollectionsCard from "./CollectionsCard";

const Collections = () => {
  return (
    <div className="pt-12 md:pt-24 dark:bg-gray-500">
      <Container>
        <SectionHeader heading={"Collections"} />
        <div>
          <div className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5 pb-10 md:pb-12">
            {collections.map((item) => (
              <CollectionsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Collections;
