# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Prospective Recipients & Families:** Individuals and families seeking pediatric upper-limb prosthetics, task-specific assistive adaptations, or accessibility devices. Situation: navigating physical limitations and seeking custom solutions without commercial barriers. Job: understand HOPE's capabilities, evaluate fit without technical or medical intimidation, and submit a low-friction initial inquiry.
- **University of South Carolina Students:** Undergraduates in engineering, computing, design, business, and health sciences. Situation: seeking practical, hands-on experience in CAD, 3D printing, prototyping, leadership, or nonprofit management. Job: discover the organization, connect with student leadership, and onboard via Garnet Gate.
- **Students at Other Institutions:** Collegiate makers and student engineers outside USC. Situation: exploring adaptive engineering or collaborative projects. Job: discover cross-campus collaboration or chapter opportunities and initiate contact.
- **Community Partners, Healthcare Collaborators & Sponsors:** Institutions such as MUSC, e-NABLE, The MIX, and KTP, alongside corporate and grant funders. Situation: evaluating organizational credibility and impact. Job: verify 501(c)(3) governance, review track record, inspect technical maturity, and explore formal partnerships.
- **Supporters & Donors:** Individuals and philanthropic groups wishing to contribute equipment, materials, expertise, or funding. Job: understand high-priority resource needs and participate via clear, verified contribution pathways (including toggleable direct giving).
- **Alumni & Historical Contributors:** Former student members, officers, and mentors. Situation: staying connected and tracking organizational growth. Job: reconnect, update contact details, provide historical records/corrections, and volunteer for mentorship.
- **General Public & Media:** Campus journalists, regional news, and community advocates. Job: learn the origin story, explore milestone case studies, and access verified leadership information.

## Product Purpose

The HOPE website (`handsonhope.ngo`) is the official public digital front door for Hands on Prosthetic Engineering. It bridges two distinct entities: H.O.P.E. Inc. (an independent 501(c)(3) nonprofit providing governance, funding, and operational continuity) and the H.O.P.E. student organization at USC (a university chapter executing hands-on design, CAD, 3D printing, and community outreach).

Success means:
- Visitors immediately understand the mission, the student-powered model, and the dual-organization governance.
- Each core audience (recipients, students, partners, donors, alumni) has a direct, intuitive, and accessible path to act.
- Authentic project documentation and real photography replace placeholders and stock cliches.
- Routine content (leadership, project stories, partners, alumni, resources) can be maintained seamlessly without developer intervention.

## Positioning

"Built around people. Grounded in making."

Unlike commercial medical prosthetics manufacturers or abstract academic clubs, HOPE pairs an agile, student-driven engineering lab with a permanent 501(c)(3) nonprofit backbone. We develop custom, task-specific, and experimental assistive solutions (from pediatric bike arms to adaptive grips) delivered directly to recipients without commercial costs, transforming real human needs into transformative educational experiences.

## Operating Context

- **Academic Calendar:** University rhythm at USC with semester cycles, officer transitions, and graduation turnovers, balanced by the year-round governance of the H.O.P.E. Inc. Board of Directors.
- **Workshop & Fab Lab:** Student work centers on rapid prototyping, CAD modeling, FDM 3D printing, assembly, fitting sessions, and iterative physical testing.
- **Collaborative Ecosystem:** Close coordination with Kappa Theta Pi (technology fraternity leading site engineering), e-NABLE (open-source designs), Medical University of South Carolina (developing healthcare/CAD education collaboration), and The MIX (entrepreneurship network).
- **Privacy & Sensitivity:** Interaction with families and recipients requires strict respect for privacy; initial inquiries deliberately avoid medical records or sensitive diagnostic data.

## Capabilities and Constraints

- **Technology Foundation:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Lucide React icons, Radix UI primitives, TanStack React Query, Zustand.
- **Content Management:** Planned Sanity CMS integration to provide draft/preview controls, global configuration, dynamic leadership rosters, project portfolios, partner directories, and milestone timelines.
- **Donation State Toggle:** Must support dual production states (direct giving `ON` vs `OFF`) configurable via site settings without codebase redeployment or broken UI layouts.
- **Privacy-Preserving Intake:** Forms must collect minimal initial information (need description, contact preference) and explicitly instruct users not to upload medical records or HIPAA-governed health history.
- **Open / Pending Decisions:**
  - Launch state for direct monetary donations (`ON` vs `OFF`), pending H.O.P.E. Inc. financial and compliance review.
  - Final recipient form routing and notification handling.
  - Sanity CMS production project deployment and schema migration.
  - Upload of final public governance documents (501(c)(3) determination letter, bylaws, annual reports) in the transparency section.

## Brand Commitments

- **Name & Entities:**
  - Formal: Hands on Prosthetic Engineering (H.O.P.E.).
  - Nonprofit: H.O.P.E. Inc. (independent 501(c)(3)).
  - Campus Chapter: H.O.P.E. Student Organization at the University of South Carolina.
- **Visual Identity:**
  - Color order of precedence: Blue → Yellow → Gray → Black → White. Red is reserved strictly for sparing accents (such as in the hand mark).
  - Distinct marks: H.O.P.E. Inc. uses the palm-facing hand logo (`hope-logo.jpg`); H.O.P.E. at USC uses the HOPE hand/P mark (`usc-logo.jpg`). These represent distinct entities and must not be treated as interchangeable variants.
- **Voice & Tone:** Credible, grounded, empathetic, and human. Avoid clinical detachment, corporate buzzwords, or exaggerated pity. Celebrate student initiative and recipient agency.
- **Visual Authenticity Rule:** Exclusively use real HOPE project imagery, students, workshop spaces, and prototypes. Stock imagery of prosthetics or generic models is strictly prohibited.

## Evidence on Hand

- **Curated Approved Image Package (`06 - Brand, Media & Assets/Website Imagery - Ready for KTP Development/`):**
  - Eli's Bike Arm: `01_Eli_Bike_Arm_Detail.jpg`, `02_Eli_On_Bicycle.jpg`, `03_Eli_Bike_Joint.jpg`, `04_Eli_Bike_Assembly.jpg` (custom pediatric adaptation).
  - Recipient Projects: `05_Courtney_Finger_Adaptation.jpg` (signed release on file), `07_Hand_Bottle_Opener_Adaptation.jpg`, `08_HOPE_Printed_Hand.png`.
  - Engineering Work: `06_3D_Printed_Stethoscope.jpg`.
  - COVID-19 PPE Response: `09_HOPE_Face_Shield_Frames.png`, `15_Face_Shields_Boxed_For_Shipping.jpg`.
  - Team & History: `10_Princeton_Buildathon_Team.jpg`, `11_First_HOPE_Printer_Build.jpg`, `12_Outdoor_Org_Fair_Team.jpg`, `13_Creativibe_Display_Team.jpg`, `14_Big_Wednesday_Team.jpg`.
- **Verified Roster:**
  - Board of Directors: Abby Herschman (Chair), Andrew Super (Vice Chair), Ashley Turner (Logistics).
  - Executive Leadership: Matthew Yvon (CEO).
  - Student Organization: Trinity Oglesby (President, USC Chapter).
- **Absences & Non-Fabrication Boundaries:** Do not fabricate financial audit numbers, Form 990 filings, IRS determination letters, medical claims, or unconfirmed institutional partnerships.

## Product Principles

1. **Built Around People, Grounded in Making:** Practical, individual human needs dictate engineering priorities; the person using the device always takes precedence over technical novelty.
2. **Student-Powered with Institutional Continuity:** Empower collegiate makers with end-to-end design, leadership, and operational ownership, supported by durable nonprofit governance.
3. **Ground Truth Over Polish:** Authenticity is our primary currency; celebrate real workshops, iterative prototype failures and triumphs, and unvarnished documentation.
4. **Task-Specific Iterative Adaptation:** Rather than one-size-fits-all manufacturing, embrace customized, iterative engineering adapted directly to specific tasks and recipients.
5. **Clear, Accessible Pathways:** Ensure every visitor—whether a parent seeking help, a freshman engineer wanting to build, an alumnus reconnecting, or a donor contributing—encounters immediate clarity and dignity.

## Accessibility & Inclusion

- **Universal Accessibility:** Strive for WCAG 2.1 AA compliance across all digital surfaces.
- **Visual Hierarchy & Contrast:** High contrast text, legible typography, and distinct focus rings across interactive elements.
- **Accessible Assistive Intake:** Clear, low-stress forms with accessible labels, logical tab order, and polite inline error guidance, ensuring individuals with diverse motor or cognitive abilities can easily request support.
- **Media Semantics:** Rich, descriptive alternative text for all engineering schematics, project photos, and prototype imagery.

