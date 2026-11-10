import type { MediaMilestone } from "@/components/about/MediaMilestones";

// Content Packet v0.2, sections 10, 11 and 15. No approved press URL or
// publication date has been supplied. The PPE year is explicitly supplied by KAN-24.
export const mediaMilestones = [
  {
    yearOrDate: "2016",
    category: "Milestone",
    title: "H.O.P.E. Established at USC",
    storyHref: "/stories/hands-on-beginnings",
    description: "The H.O.P.E. student organization was established at the University of South Carolina in 2016. Early work centered on printing, assembling, fitting, and adapting prosthetic hands and other upper-limb solutions for children, drawing on the open-source prosthetics community.",
  },
  {
    yearOrDate: "2017",
    category: "Milestone",
    title: "Formation of H.O.P.E. Inc.",
    description: "In 2017, H.O.P.E. Inc. was incorporated in South Carolina as an independent 501(c)(3) nonprofit organization to provide greater continuity, resources, and organizational support beyond any single student leadership cycle.",
  },
  {
    yearOrDate: "2018",
    category: "Media Coverage",
    title: "Eli’s Bike Arm — A Custom Engineering Solution",
    storyHref: "/stories/elis-bike-arm",
    description: "Eli’s Bike Arm, which received WLTX News coverage, added a point of contact and counterforce to help Eli ride his bicycle. Research started in 2017, with the prototype fitted in spring 2018. Continued development included a telescoping arm socket. Its dinosaur-like appearance led to the nickname “Elijasaur.”",
  },
  {
    yearOrDate: "2020",
    category: "Milestone",
    title: "COVID-19 PPE Response",
    storyHref: "/stories/ppe-response",
    description: "During the COVID-19 response, H.O.P.E. students produced mask extenders and face-shield components alongside a University of South Carolina professor and graduate students. They applied existing design, printing, and fabrication skills to a different community need.",
  },
] satisfies readonly MediaMilestone[];
