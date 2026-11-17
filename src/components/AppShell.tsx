import Link from "next/link";
import type { ReactNode } from "react";
export function AppShell({children,active}:{children:ReactNode;active?:string}) {
 const links=[["/","⌂","Overview","overview"],["/characters","♙","Characters","characters"],["/events","✧","Story","events"],["/social","◉","Social","social"],["/relationships","♡","Relationships","relationships"],["/world","▤","World Bible","world"]];
 return <main className="shell"><aside className="sidebar"><Link className="brand" href="/">LIFE<span>VERSE</span></Link><p className="eyebrow">YOUR PRIVATE WORLD</p><nav aria-label="Main navigation">{links.map(([href,icon,label,key])=><Link key={key} className={`navItem ${active===key?"active":""}`} href={href}>{icon} <span>{label}</span>{["social","relationships","world"].includes(key)&&<small className="navSoon">SOON</small>}</Link>)}</nav><div className="sidebarFoot">LOCAL WORLD · PRIVATE SPACE</div></aside><section className="content">{children}</section></main>;
}