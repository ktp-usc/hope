import type { Metadata } from "next";
import HistoricalStoryTemplate from "../_components/HistoricalStoryTemplate";
import heroImage from "./images/09_HOPE_Face_Shield_Frames.png";
import shippingImage from "./images/15_Face_Shields_Boxed_For_Shipping.jpg";

export const metadata: Metadata = { title: "When HOPE Shifted Its 3D Printers to PPE | H.O.P.E. Stories", description: "During the COVID-19 response, HOPE members shifted part of their 3D-printing work toward personal protective equipment." };

export default function StoryPage() {
  return <HistoricalStoryTemplate
    title={"When HOPE Shifted Its 3D Printers to PPE"}
    introduction={"During the COVID-19 response, HOPE members shifted part of their 3D-printing work toward personal protective equipment."}
    heroBackground="blue"
    heroImage={{ src: heroImage, width: heroImage.width, height: heroImage.height, alt: "Stacks of colorful 3D-printed face-shield frames around a HOPE sign", unoptimized: true }}
    paragraphs={[
      "Working alongside a University of South Carolina professor and graduate students, HOPE students produced mask extenders and face-shield components using the same design, printing, and fabrication skills they had developed through other projects.",
      "The effort showed how HOPE members could adapt their technical skills to a different kind of need. Students used the equipment and experience available to them to contribute to the COVID-19 response while continuing the hands-on learning that is central to HOPE.",
      "It remains a strong example of HOPE’s model: students learning by designing, making, and responding to real problems as they arise."
]}
    supportingImages={[
      { src: shippingImage, width: shippingImage.width, height: shippingImage.height, alt: "Packaged face shields arranged in a cardboard shipping box" },
    ]}
  />;
}
