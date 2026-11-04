import type { Metadata } from "next";
import HistoricalStoryTemplate from "../_components/HistoricalStoryTemplate";
import heroImage from "./images/11_First_HOPE_Printer_Build.jpg";
import handImage from "./images/08_HOPE_Printed_Hand.png";

export const metadata: Metadata = { title: "Where HOPE’s Hands-On Work Began | H.O.P.E. Stories", description: "3D-printed prosthetic hands were at the center of HOPE’s early work." };

export default function StoryPage() {
  return <HistoricalStoryTemplate
    title={"Where HOPE’s Hands-On Work Began"}
    introduction={"3D-printed prosthetic hands were at the center of HOPE’s early work."}
    heroBackground="yellow"
    heroImage={{ src: heroImage, width: heroImage.width, height: heroImage.height, alt: "Students gathered around a 3D printer on a classroom table", focalPosition: "center 40%" }}
    paragraphs={[
      "Students learned to print, assemble, and work with prosthetic-hand designs, drawing in part on designs and knowledge shared by the broader open-source prosthetics community. Early HOPE activities included hand and finger builds, student build-a-thons, and work intended to make these devices available without cost to recipients.",
      "Those projects also became a starting point for something broader. As students gained experience with CAD, 3D printing, fitting, and design iteration, HOPE began taking on problems that could not always be addressed with an existing design.",
      "Projects increasingly involved modifying components, developing task-specific adaptations, and creating custom approaches around an individual need.",
      "That progression helped shape the model HOPE continues to build on today: use accessible engineering tools as a starting point, give students meaningful hands-on experience, and be willing to design something different when the problem calls for it."
]}
    supportingImages={[
      { src: handImage, width: handImage.width, height: handImage.height, alt: "A white 3D-printed prosthetic hand resting on a wooden table" },
    ]}
  />;
}
