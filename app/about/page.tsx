import { getLeadership } from "@/sanity/lib/leadership";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Handshake, Settings, Wrench } from "lucide-react";
import workshopImage from "./about-images/13_Creativibe_Display_Team.jpg";
import presentDayImage from "./about-images/11_First_HOPE_Printer_Build.jpg";
import { pageMetadata } from "@/lib/seo";
import StudentOrgModule from "@/components/about/StudentOrgModule";
import TransparencyModule from "@/components/about/TransparencyModule";

export const metadata = pageMetadata("About H.O.P.E.", "Hands on Prosthetic Engineering: our purpose, history, and the people helping shape H.O.P.E.", "/about");

const milestones = [
  { title: "Origins", description: "H.O.P.E. began at the University of South Carolina in 2016, when students came together to explore 3D-printed prosthetic hands and upper-limb solutions for children. Early projects drew on designs and resources shared through the open-source prosthetics community." },
  { title: "Creation of H.O.P.E. Inc.", description: "In 2017, H.O.P.E. Inc. was incorporated as a separate South Carolina nonprofit to provide long-term continuity, resources, partnerships, and organizational support beyond individual student leadership cycles." },
  { title: "Early projects", description: "As students gained experience, H.O.P.E. expanded beyond existing prosthetic-hand designs to develop customized solutions. Projects like Eli’s Bike Arm, researched beginning in 2017 and first fitted in spring 2018, demonstrated the value of iterative, task-specific engineering." },
  { title: "COVID-era PPE work", description: "During the COVID-19 response, H.O.P.E. redirected its 3D-printing capabilities toward producing mask extenders and face-shield components, applying its engineering skills to an urgent community need." },
  { title: "Rebuilding after COVID", description: "Like many student organizations, H.O.P.E. faced significant disruption during the pandemic. Its continued development has focused on building upon its original mission through student training, hands-on engineering, and expanded project opportunities." },
  { title: "Current partnerships & operations", description: "Today, H.O.P.E. continues its work in experimental prosthetics, adaptive technologies, accessibility solutions, and student-led engineering. Collaborations with universities, nonprofits, and community partners help expand its capabilities and opportunities." },
];

function HandMark({ outline = false }: { outline?: boolean }) {
  return <div aria-hidden="true" className={`flex h-[110px] [align-items:end] gap-[7px] [&>span]:h-[75%] [&>span]:w-[33px] [&>span]:rounded-[30px_30px_4px_4px] [&>span]:bg-[var(--yellow)] [&>span:nth-child(2)]:h-full [&>span:nth-child(3)]:h-[87%] [&>span:nth-child(4)]:h-[64%] [&>span:nth-child(4)]:bg-[var(--red)] ${outline ? "h-[135px]! gap-[12px]! [&>span]:w-[43px]! [&>span]:border-[5px] [&>span]:border-[#121212] [&>span]:bg-transparent! [&>span]:rounded-[30px_30px_3px_3px]! [@media(max-width:1100px)]:gap-[7px]! [@media(max-width:1100px)]:[&>span]:w-[35px]!" : ""}`}>
    <span /><span /><span /><span />
  </div>;
}

export const revalidate = 60;

export default async function AboutPage() {
  const leaders = await getLeadership();
  const nonprofitLeaders = leaders.filter((leader) => leader.affiliation !== "hope-student-org");
  const studentLeaders = leaders.filter((leader) => leader.affiliation === "hope-student-org");
  return (
    <main className="[--yellow:#f8cd53] [--blue:#458fd2] [--cream:#f5f2e9] [--red:#e95c36] bg-white text-[#121212] [font-family:Arial,Helvetica,sans-serif] text-[18px] leading-[1.4] [&_h1]:leading-[1.04] [&_h2]:leading-[1.04] [&_h3]:leading-[1.04] [&_h2]:text-[clamp(36px,3.75vw,56px)] [&_h2]:font-bold [&_h2]:tracking-[-0.8px] [&_h3]:font-bold [&_a:focus-visible]:outline-[3px] [&_a:focus-visible]:outline-solid [&_a:focus-visible]:outline-[#121212] [&_a:focus-visible]:outline-offset-[6px] [&_button:focus-visible]:outline-[3px] [&_button:focus-visible]:outline-solid [&_button:focus-visible]:outline-[#121212] [&_button:focus-visible]:outline-offset-[6px] [&_section]:min-w-0 [&_article]:min-w-0 [@media(max-width:700px)]:text-[16px] motion-safe:[html:has(&)]:scroll-smooth motion-safe:[&_section[id]]:scroll-mt-[24px]">
      <section className="grid grid-cols-[55%_45%] min-h-[780px] [@media(max-width:1100px)]:min-h-[650px] [@media(max-width:700px)]:grid-cols-[1fr]" aria-labelledby="about-title">
        <div className="flex min-w-0 flex-col items-start bg-[var(--yellow)] pt-[72px] pr-[7%] pb-[64px] pl-[9.1%] [@media(min-width:1600px)]:pl-[max(72px,calc((100vw-1296px)/2))] [@media(max-width:700px)]:min-h-[560px] [@media(max-width:700px)]:px-[5%] [@media(max-width:700px)]:py-[45px] [&_h1]:my-[24px] [&_h1]:text-[clamp(68px,6.2vw,92px)] [&_h1]:font-bold [&_h1]:tracking-[-1px] [@media(max-width:700px)]:[&_h1]:text-[clamp(56px,12vw,72px)]">
          <p className="inline-flex items-center gap-[10px] text-[12px] font-bold uppercase [&>span]:h-[5px] [&>span]:w-[48px] [&>span]:bg-[var(--red)]"><span />Hands on Prosthetic Engineering</p>
          <h1 id="about-title">About<br />H.O.P.E.</h1>
          <p>H.O.P.E. is a student-powered engineering community turning practical needs into practical solutions. From experimental prosthetics to custom assistive technologies, we bring students together to design, build, and make a difference.</p>
          <div className="mt-auto flex w-full items-center justify-between gap-[24px] pt-[100px] [@media(max-width:1100px)]:flex-col [@media(max-width:1100px)]:items-start [@media(max-width:700px)]:gap-[16px] [@media(max-width:700px)]:pt-[35px]">
            <a className="inline-flex items-center justify-center gap-[12px] rounded-[40px] border-0 border-current bg-white px-[24px] py-[18px] text-[14px] font-bold text-[#121212] no-underline whitespace-nowrap [&[href]:hover]:bg-[var(--cream)]! disabled:cursor-not-allowed [@media(max-width:700px)]:min-h-[44px] [@media(max-width:700px)]:px-[18px] [@media(max-width:700px)]:py-[16px]" href="/history">Explore our history <ArrowUpRight size={17} /></a>
            <a className="inline-flex items-center gap-[12px] text-[11px] font-bold text-inherit uppercase no-underline [@media(max-width:700px)]:min-h-[44px] [@media(max-width:700px)]:gap-[8px] [@media(max-width:700px)]:text-[12px]" href="#purpose">Scroll to learn more <ArrowDown size={17} /></a>
          </div>
        </div>
        <div className="relative isolate overflow-hidden bg-[#e7e9e7] p-[32px] [@media(max-width:700px)]:aspect-square [@media(max-width:700px)]:min-h-0 [@media(max-width:700px)]:p-[24px] [&>div]:absolute [&>div]:bottom-[32px] [&>div]:left-[32px] [@media(max-width:700px)]:[&>img]:object-[center_32%]">
          <Image
            src={workshopImage}
            alt="H.O.P.E. members with their engineering project display."
            fill
            sizes="(max-width: 700px) 100vw, 45vw"
            className="-z-[1] object-cover object-center"
            preload
          />
          <span className="inline-flex items-center gap-[6px] rounded-[30px] bg-white px-[12px] py-[7px] text-[11px] font-bold uppercase [&_i]:h-[6px] [&_i]:w-[6px] [&_i]:rounded-[50%] [&_i]:bg-[var(--blue)] [&_i]:bg-[var(--red)]!"><i />People · Process · Purpose</span>
          <HandMark />
        </div>
      </section>

      <div className="bg-white">
        <section id="purpose" className="mx-auto w-[90%] max-w-[1296px] pt-[100px] pb-[110px] [@media(max-width:700px)]:py-[65px]" aria-labelledby="purpose-title">
          <span className="inline-block rounded-[30px] bg-[#121212] px-[13px] py-[6px] text-[11px] leading-[1.3] font-bold text-white uppercase">Our purpose</span>
          <div className="mt-[22px] flex items-end justify-between gap-[32px] [&>p]:max-w-[460px] [&>p]:flex-[1] [&>p]:text-[16px] [&>h2]:shrink-0 [@media(max-width:1100px)]:[&>p]:pr-0 [@media(max-width:850px)]:flex-col [@media(max-width:850px)]:items-start [@media(max-width:850px)]:[&>h2]:shrink [@media(max-width:700px)]:gap-[25px]">
            <h2 id="purpose-title">Built around people.<br />Grounded in making.</h2>
            <ul className="m-0 flex list-none flex-wrap gap-[10px] p-0 [&>li]:rounded-[24px] [&>li]:border [&>li]:border-[#e3e0d9] [&>li]:bg-white [&>li]:px-[13px] [&>li]:py-[5px] [&>li]:text-[13px] [&>li]:whitespace-nowrap [&>li:nth-child(2)]:bg-[#d8eaf7] [@media(max-width:1100px)]:gap-[5px]" aria-label="Our values"><li>Hands on</li><li>Engineering</li><li>Community</li></ul>
          </div>
          <div className="mt-[52px] grid grid-cols-[1fr_1fr] gap-[24px] [@media(max-width:700px)]:mt-[30px] [@media(max-width:700px)]:grid-cols-[1fr]">
            <article className="relative flex min-h-[330px] flex-col justify-between gap-[40px] rounded-[30px] p-[34px] [&>h3]:pr-[65px] [&>h3]:text-[40px] [&>p]:pr-[85px] [@media(max-width:1100px)]:[&>h3]:text-[30px] [@media(max-width:700px)]:min-h-[290px] [@media(max-width:700px)]:p-[26px] [@media(max-width:700px)]:[&>h3]:text-[32px] [@media(max-width:700px)]:[&>p]:pr-0 [@media(max-width:700px)]:[&>p]:pb-[70px] bg-[var(--blue)]">
              <h3>What HOPE is</h3><span className="absolute top-[34px] right-[34px] grid h-[52px] w-[52px] place-items-center rounded-[50%] bg-white [@media(max-width:700px)]:top-[26px] [@media(max-width:700px)]:right-[26px]"><Handshake size={25} /></span>
              <p>H.O.P.E. brings students together to develop experimental prosthetics, assistive technologies, and practical engineering solutions. Through hands-on design, CAD, 3D printing, and prototyping, students gain real-world experience while contributing to meaningful projects.</p><span className="absolute right-[34px] bottom-[34px] h-[70px] w-[70px] rounded-[50%] bg-[var(--yellow)] [@media(max-width:700px)]:right-[26px] [@media(max-width:700px)]:bottom-[26px] [@media(max-width:700px)]:h-[60px] [@media(max-width:700px)]:w-[60px]" aria-hidden="true" />
            </article>
            <article className="relative flex min-h-[330px] flex-col justify-between gap-[40px] rounded-[30px] p-[34px] [&>h3]:pr-[65px] [&>h3]:text-[40px] [&>p]:pr-[85px] [@media(max-width:1100px)]:[&>h3]:text-[30px] [@media(max-width:700px)]:min-h-[290px] [@media(max-width:700px)]:p-[26px] [@media(max-width:700px)]:[&>h3]:text-[32px] [@media(max-width:700px)]:[&>p]:pr-0 [@media(max-width:700px)]:[&>p]:pb-[70px] bg-[var(--yellow)] [&>span:last-child]:bg-[var(--red)]!">
              <h3>Why we exist</h3><span className="absolute top-[34px] right-[34px] grid h-[52px] w-[52px] place-items-center rounded-[50%] bg-white [@media(max-width:700px)]:top-[26px] [@media(max-width:700px)]:right-[26px]"><Wrench size={25} /></span>
              <p>Our mission connects hands-on learning with real community needs. By designing adaptable, task-specific solutions, H.O.P.E. gives students the opportunity to develop technical and leadership skills while creating technologies that can make a difference in people’s lives.</p><span className="absolute right-[34px] bottom-[34px] h-[70px] w-[70px] rounded-[50%] bg-[var(--yellow)] [@media(max-width:700px)]:right-[26px] [@media(max-width:700px)]:bottom-[26px] [@media(max-width:700px)]:h-[60px] [@media(max-width:700px)]:w-[60px]" aria-hidden="true" />
            </article>
          </div>
        </section>

        <section id="history" className="mx-auto w-[90%] max-w-[1296px] pt-[90px] pb-[135px] [&_h2]:mt-[24px] [&_h2]:text-[clamp(40px,4.8vw,70px)]! [@media(max-width:700px)]:py-[65px] [@media(max-width:700px)]:[&_h2]:text-[39px]!" aria-labelledby="history-title">
          <div className="flex [align-items:end] justify-between [@media(max-width:700px)]:flex-wrap [@media(max-width:700px)]:gap-[20px]">
            <div><span className="inline-block rounded-[30px] bg-[#121212] px-[13px] py-[6px] text-[11px] leading-[1.3] font-bold text-white uppercase bg-[var(--yellow)]! text-[#121212]!">Our history</span>
              <h2 id="history-title">A history of<br />hands-on action.</h2></div>
            <div className="flex h-[170px] w-[170px] flex-col justify-between rounded-[28px] bg-[var(--blue)] p-[25px] [&>strong]:text-[58px] [&>strong]:leading-none [&>span]:text-[11px] [&>span]:font-bold [&>span]:uppercase [@media(max-width:700px)]:h-[110px] [@media(max-width:700px)]:w-[90px] [@media(max-width:700px)]:shrink-0 [@media(max-width:700px)]:rounded-[20px] [@media(max-width:700px)]:p-[16px] [@media(max-width:700px)]:[&>strong]:text-[38px] [@media(max-width:700px)]:[&>span]:text-[9px]"><strong>06</strong><span>Milestones</span></div>
          </div>
          <ol className="mt-[65px] mb-0 grid list-none grid-flow-col grid-cols-[1fr_1fr] grid-rows-[repeat(3,1fr)] gap-x-[72px] p-0 [@media(max-width:1100px)]:gap-x-[35px] [@media(max-width:700px)]:mt-[45px] [@media(max-width:700px)]:grid-flow-row [@media(max-width:700px)]:grid-cols-[1fr] [@media(max-width:700px)]:grid-rows-none">
            {milestones.map(({ title, description }, index) => <li key={title} className="relative flex min-h-[210px] gap-[20px] pb-[45px] pl-[70px] [--milestone-color:var(--yellow)] [&:nth-child(3n+2)]:[--milestone-color:var(--blue)] [&:nth-child(3n)]:[--milestone-color:var(--red)] after:absolute after:right-0 after:bottom-[28px] after:left-[70px] after:h-px after:bg-white after:content-[''] [&_h3]:mb-[22px] [&_h3]:text-[30px] [@media(max-width:1100px)]:pl-[45px] [@media(max-width:1100px)]:after:left-[45px] [@media(max-width:1100px)]:[&_h3]:text-[25px] [@media(max-width:700px)]:min-h-[150px] [@media(max-width:700px)]:[&_h3]:mb-[16px]">
              <span className="absolute top-[2px] left-[15px] h-[16px] w-[16px] rounded-[50%] border-[3px] border-white bg-[var(--milestone-color)]" aria-hidden="true" />
              <div><h3>{title}</h3><p>{description}</p></div>
              <span className="ml-auto text-[12px] font-bold text-[var(--milestone-color)]">{String(index + 1).padStart(2, "0")}</span>
            </li>)}
          </ol>
          <div className="mt-[48px] flex flex-wrap gap-[20px]">
            <Link className="inline-flex items-center justify-center gap-[12px] rounded-[40px] border-0 border-current bg-white px-[24px] py-[18px] text-[14px] font-bold text-[#121212] no-underline max-w-full text-center whitespace-normal [&_svg]:shrink-0 [&[href]:hover]:bg-[var(--cream)]! disabled:cursor-not-allowed [@media(max-width:700px)]:min-h-[44px] [@media(max-width:700px)]:px-[18px] [@media(max-width:700px)]:py-[16px] bg-[var(--yellow)]!" href="/history">
              Explore Full HOPE History &amp; Archive <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link className="inline-flex items-center justify-center gap-[12px] rounded-[40px] border-0 border-current bg-white px-[24px] py-[18px] text-[14px] font-bold text-[#121212] no-underline max-w-full text-center whitespace-normal [&_svg]:shrink-0 [&[href]:hover]:bg-[var(--cream)]! disabled:cursor-not-allowed [@media(max-width:700px)]:min-h-[44px] [@media(max-width:700px)]:px-[18px] [@media(max-width:700px)]:py-[16px] border! border-[#121212]!" href="/alumni">
              Alumni &amp; Legacy Directory <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>

      <section className="mx-auto w-[90%] max-w-[1296px] grid grid-cols-[1fr_1.06fr] gap-[56px] py-[92px] [@media(max-width:1100px)]:gap-[35px] [@media(max-width:850px)]:grid-cols-[1fr] [@media(max-width:700px)]:py-[65px]" aria-labelledby="present-title">
        <div className="relative isolate min-h-[465px] overflow-hidden rounded-[28px] bg-[#e7e9e7] p-[28px] [@media(max-width:850px)]:aspect-[4/3] [@media(max-width:850px)]:min-h-0">
          <Image
            src={presentDayImage}
            alt="Students gathered around a 3D printer during a hands-on H.O.P.E. workshop."
            fill
            sizes="(max-width: 700px) 90vw, (max-width: 1440px) 44vw, 630px"
            className="-z-[1] object-cover object-center"
          />
          <span className="inline-block rounded-[30px] bg-[#121212] px-[13px] py-[6px] text-[11px] leading-[1.3] font-bold text-white uppercase bg-[var(--yellow)]! text-[#121212]!">HOPE today</span>
          <div className="absolute bottom-[28px] left-[28px] flex gap-[7px] [&>span]:h-[13px] [&>span]:w-[55px] [&>span]:rounded-[15px] [&>span]:bg-[var(--blue)] [&>span+span]:w-[28px] [&>span+span]:bg-[var(--red)]" aria-hidden="true"><span /><span /></div>
        </div>
        <div className="flex min-w-0 flex-col items-start [&>h2]:my-[22px]">
          <span className="inline-block rounded-[30px] bg-[#121212] px-[13px] py-[6px] text-[11px] leading-[1.3] font-bold text-white uppercase">Present day</span>
          <h2 id="present-title">Partnerships &amp;<br />operations</h2><p>H.O.P.E. operates through two distinct but closely coordinated organizations: H.O.P.E. Inc., an independent 501(c)(3) nonprofit, and the H.O.P.E. student organization at the University of South Carolina. Together, they connect student-led engineering with long-term organizational support and community partnerships.</p>
          <div className="mt-auto grid w-full grid-cols-[1fr_1fr] gap-[28px] pt-[65px] [&>article]:border-t-2 [&>article]:border-t-[#333] [&>article]:pt-[26px] [&_h3]:mb-[20px] [&_h3]:flex [&_h3]:justify-between [&_h3]:gap-[10px] [&_h3]:text-[27px] [&_svg]:shrink-0 [&_svg]:text-[var(--blue)] [@media(max-width:1100px)]:[&_h3]:text-[21px] [@media(max-width:850px)]:mt-0 [@media(max-width:700px)]:grid-cols-[1fr] [@media(max-width:700px)]:gap-[20px] [@media(max-width:700px)]:pt-[55px]">
            <article><h3>Partnerships <Handshake size={24} /></h3><p>H.O.P.E. collaborates with universities, nonprofits, and community organizations to expand opportunities for engineering, education, and service. Its relationships include the University of South Carolina and e-NABLE. An institutional collaboration with the Medical University of South Carolina is still developing. Its historical relationship with the former USC/Columbia Technology Incubator connects it to the Midlands Innovation X-Change; an active formal partnership has not been confirmed.</p></article>
            <article><h3>Operations <Settings size={24} /></h3><p>H.O.P.E. Inc. provides nonprofit oversight, funding, resources, and external partnerships, while the USC student organization coordinates much of the hands-on design, prototyping, manufacturing, recruitment, and training. Each organization maintains its own governance and responsibilities.</p></article>
          </div>
        </div>
      </section>

      {/* Dual-Organization Module */}
      <StudentOrgModule garnetGateUrl="https://garnetgate.sa.sc.edu/organization/hope" />

      <section id="leadership" className="bg-white pt-[105px] pb-[120px] [@media(max-width:700px)]:py-[65px]" aria-labelledby="leadership-title">
        <div className="mx-auto w-[90%] max-w-[1296px]">
          <span className="inline-block rounded-[30px] bg-[#121212] px-[13px] py-[6px] text-[11px] leading-[1.3] font-bold text-white uppercase">Leadership</span>
          <div className="mt-[22px] flex items-end justify-between gap-[32px] [&>p]:max-w-[460px] [&>p]:flex-[1] [&>p]:text-[16px] [&>h2]:shrink-0 [@media(max-width:1100px)]:[&>p]:pr-0 [@media(max-width:850px)]:flex-col [@media(max-width:850px)]:items-start [@media(max-width:850px)]:[&>h2]:shrink [@media(max-width:700px)]:gap-[25px]"><h2 id="leadership-title">The people helping<br />shape H.O.P.E.</h2><p>H.O.P.E. combines student-driven leadership with long-term nonprofit oversight. Its Board of Directors provides continuity and governance, while executive and student leaders guide daily operations, projects, and organizational development.</p></div>
          <div className="mt-[55px] grid grid-cols-[repeat(4,1fr)] gap-[20px] [@media(max-width:1100px)]:grid-cols-[repeat(2,1fr)] [@media(max-width:700px)]:mt-[35px] [@media(max-width:700px)]:gap-[16px] [@media(max-width:600px)]:grid-cols-[1fr]">
            {nonprofitLeaders.map(({ _id, name, title, bio, headshotUrl }, index) => <article className="overflow-hidden rounded-[20px] bg-white [box-shadow:0_12px_22px_#00000008]" key={_id}>
              <div className="relative overflow-hidden h-[275px] bg-[#d7eaf7] p-[22px] [&>span]:px-[10px] [&>span]:py-[6px] [&>span]:text-[10px] [@media(max-width:700px)]:h-[210px] [@media(max-width:700px)]:p-[12px] [@media(max-width:700px)]:[&>span]:gap-[5px] [@media(max-width:600px)]:h-[230px]! [@media(max-width:600px)]:p-[20px]!">
                {headshotUrl ? <Image src={headshotUrl} alt={`Portrait of ${name}`} fill sizes="(max-width: 600px) 90vw, (max-width: 1100px) 44vw, 23vw" className="object-cover" /> : <span className="inline-flex items-center gap-[6px] rounded-[30px] bg-white px-[12px] py-[7px] text-[11px] font-bold uppercase [&_i]:h-[6px] [&_i]:w-[6px] [&_i]:rounded-[50%] [&_i]:bg-[var(--blue)]"><i className={index % 2 ? "bg-[var(--red)]!" : ""} />Photo Pending</span>}
              </div>
              <div className="min-h-[150px] px-[24px] py-[25px] [&>h3]:mb-[16px] [&>h3]:text-[25px] [&>h3]:font-normal! [&>p]:text-[16px] [@media(max-width:700px)]:px-[16px] [@media(max-width:700px)]:py-[20px] [@media(max-width:700px)]:[&>h3]:text-[21px] [@media(max-width:600px)]:p-[24px]!"><h3>{name}</h3><p className="mb-[16px] font-bold">{title}</p><p>{bio}</p></div>
            </article>)}
          </div>
          <section className="mt-[45px] [&>h3]:mb-[24px] [&>h3]:text-[27px]" aria-labelledby="student-leadership-title">
            <h3 id="student-leadership-title">Student Organization Leadership</h3>
            {studentLeaders.map(({ _id, name, title, bio, headshotUrl }) => <article className="max-w-[640px] rounded-[20px] bg-white px-[24px] py-[25px] [box-shadow:0_12px_22px_#00000008] [&>h4]:mb-[16px] [&>h4]:text-[25px] [&>h4]:leading-[1.1] [&>h4]:font-normal [&>p]:text-[16px]" key={_id}>
              {headshotUrl ? <Image src={headshotUrl} alt={`Portrait of ${name}`} width={80} height={80} className="mb-4 rounded-xl object-cover" /> : <span className="mb-4 inline-block rounded-[30px] bg-[#121212] px-[13px] py-[6px] text-[11px] leading-[1.3] font-bold text-white uppercase">Photo Pending</span>}
              <h4>{name}</h4>
              <p className="mb-[16px] font-bold">{title}</p>
              <p>{bio}</p>
            </article>)}

          </section>
        </div>
      </section>

      {/* Transparency Module */}
      <TransparencyModule />
    </main>
  );
}
