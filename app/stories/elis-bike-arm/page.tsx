import type { Metadata } from "next";
import HistoricalStoryTemplate from "../_components/HistoricalStoryTemplate";
import heroImage from "./images/02_Eli_On_Bicycle.jpg";
import detailImage from "./images/01_Eli_Bike_Arm_Detail.jpg";
import assemblyImage from "./images/04_Eli_Bike_Assembly.jpg";

export const metadata: Metadata = { title: "Eli’s Bike Arm — Designing for the Ride | H.O.P.E. Stories", description: "Eli’s Bike Arm started as a custom engineering challenge: add an arm to the bicycle that Eli could use as another point of contact and press against for counterforce while riding." };

export default function StoryPage() {
  return <HistoricalStoryTemplate
    title={"Eli’s Bike Arm — Designing for the Ride"}
    introduction={"Eli’s Bike Arm started as a custom engineering challenge: add an arm to the bicycle that Eli could use as another point of contact and press against for counterforce while riding."}
    heroBackground="yellow"
    heroImage={{ src: heroImage, width: heroImage.width, height: heroImage.height, alt: "Eli smiling on his adapted bicycle with the custom bike arm attached", focalPosition: "center 45%" }}
    paragraphs={[
      "Research started in 2017, with the prototype being fitted in spring 2018, followed by continued design work that included development of a telescoping arm socket.",
      "The device took on a personality of its own along the way. Its shape resembled a dinosaur arm, leading to the nickname “Elijasaur.”",
      "As the project progressed, Eli was able to ride the adapted bicycle through his neighborhood using the bike-arm design.",
      "The project shows the iterative side of HOPE’s work: understanding a specific need, designing around it, fitting and testing prototypes, and continuing to refine the solution through real-world use."
]}
    supportingImages={[
      { src: detailImage, width: detailImage.width, height: detailImage.height, alt: "Close view of the custom bike-arm attachment on Eli’s bicycle" },
      { src: assemblyImage, width: assemblyImage.width, height: assemblyImage.height, alt: "Bike-arm components and tools arranged on a wooden table" },
    ]}
  />;
}
