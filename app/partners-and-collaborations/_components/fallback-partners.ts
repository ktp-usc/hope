import type { Partner } from "@/sanity/queries/partners";

// Used only when Sanity returns no partners or the fetch fails.
export const fallbackPartners: Partner[] = [
    {
        _id: "fallback-enable",
        name: "e-NABLE",
        category: "primary-network",
        description:
            "HOPE has longstanding ties to the global e-NABLE community, which helped shape HOPE's early work with 3D-printed prosthetic hands. As a certified e-NABLE chapter, HOPE draws on the community's open-source designs, resources, and worldwide maker network while continuing to develop custom projects and local capabilities.",
        websiteUrl: "https://enablingthefuture.org/",
        logoUrl: null,
    },
    {
        _id: "fallback-musc",
        name: "Medical University of South Carolina (MUSC)",
        category: "institutional",
        description:
            "HOPE is developing an institutional collaboration with the Medical University of South Carolina focused on opportunities where engineering, digital design, 3D printing, and healthcare education can intersect. Current work includes supporting students in learning CAD and additive-manufacturing skills that can be applied to assistive and rehabilitation-related challenges.",
        websiteUrl: "https://web.musc.edu/",
        logoUrl: "/images/partners/musc.png",
    },
    {
        _id: "fallback-usc",
        name: "University of South Carolina",
        category: "institutional",
        description:
            "The University of South Carolina is home to the HOPE student organization at USC and provides the campus community where students recruit, train, organize, and carry out much of HOPE’s hands-on work. HOPE Inc. and the student organization are separate organizations that collaborate closely.",
        websiteUrl: "https://sc.edu/",
        logoUrl: "/images/partners/usc.png",
    },
    {
        _id: "fallback-mix",
        name: "The Midlands Innovation X-Change (The MIX)",
        category: "incubator",
        description:
            "HOPE’s history includes support from the University of South Carolina’s entrepreneurship and innovation ecosystem. HOPE previously worked through the USC/Columbia Technology Incubator, which has since transitioned into The Midlands Innovation X-Change (The MIX), continuing entrepreneurial-support, mentorship, and resources for developing ventures.",
        websiteUrl: "https://themixsc.org/",
        logoUrl: "/images/partners/the-mix-full.jpg",
    },
    {
        _id: "fallback-ktp",
        name: "Kappa Theta Pi",
        category: "community",
        description:
            "Kappa Theta Pi at the University of South Carolina contributed its technology and development expertise to the redesign and development of the HOPE Inc. website. Through its nonprofit consulting program, KTP students work with nonprofit organizations on real technology projects while gaining practical project experience.",
        websiteUrl: "https://www.ktpusc.com/",
        logoUrl: "/images/partners/ktp.png",
    },
];
