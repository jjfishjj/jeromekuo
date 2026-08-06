from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether,
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "Jerome-Kuo-Resume.pdf"
PUBLIC = ROOT / "public" / "Jerome-Kuo-Resume.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)
PUBLIC.parent.mkdir(parents=True, exist_ok=True)

INK = colors.HexColor("#17261F")
LIME = colors.HexColor("#D9FF43")
MUTED = colors.HexColor("#526058")
PALE = colors.HexColor("#F0EFE9")
LINE = colors.HexColor("#B8BDB9")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Hero", fontName="Helvetica-Bold", fontSize=28, leading=30, textColor=INK, spaceAfter=7*mm))
styles.add(ParagraphStyle(name="Deck", fontName="Helvetica", fontSize=10.2, leading=15, textColor=MUTED, spaceAfter=5*mm))
styles.add(ParagraphStyle(name="Section", fontName="Helvetica-Bold", fontSize=17, leading=20, textColor=INK, spaceBefore=4*mm, spaceAfter=4*mm))
styles.add(ParagraphStyle(name="Label", fontName="Helvetica-Bold", fontSize=6.8, leading=9, textColor=MUTED, tracking=1.2, spaceAfter=2*mm))
styles.add(ParagraphStyle(name="Role", fontName="Helvetica-Bold", fontSize=11.5, leading=14, textColor=INK))
styles.add(ParagraphStyle(name="Meta", fontName="Helvetica", fontSize=7.5, leading=10, textColor=MUTED))
styles.add(ParagraphStyle(name="Body", fontName="Helvetica", fontSize=8.6, leading=12.2, textColor=INK))
styles.add(ParagraphStyle(name="ResumeBullet", fontName="Helvetica", fontSize=8.1, leading=11.2, textColor=MUTED, leftIndent=3*mm, firstLineIndent=-2.5*mm, bulletIndent=0))
styles.add(ParagraphStyle(name="CardTitle", fontName="Helvetica-Bold", fontSize=10, leading=13, textColor=INK, spaceAfter=2*mm))
styles.add(ParagraphStyle(name="CardBody", fontName="Helvetica", fontSize=7.8, leading=11, textColor=MUTED))


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.line(18*mm, 15*mm, 192*mm, 15*mm)
    canvas.setFont("Helvetica-Bold", 7)
    canvas.setFillColor(INK)
    canvas.drawString(18*mm, 10*mm, "JEROME KUO  /  AI PRODUCT & PROJECT MANAGER")
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(192*mm, 10*mm, f"{doc.page}")
    canvas.restoreState()


doc = BaseDocTemplate(str(OUT), pagesize=A4, leftMargin=18*mm, rightMargin=18*mm, topMargin=15*mm, bottomMargin=20*mm,
                      title="Jerome Kuo - AI Product & Project Manager", author="Jerome Kuo")
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="resume")
doc.addPageTemplates(PageTemplate(id="main", frames=frame, onPage=header_footer))
story = []

story += [
    Paragraph("AI PRODUCT  /  DATA  /  GPU ECOSYSTEM", styles["Label"]),
    Paragraph("Turning complex technology<br/><font backColor='#D9FF43'>into products people can use.</font>", styles["Hero"]),
    Paragraph("Jerome Kuo is a product and project manager spanning generative AI, game analytics, creative technology, semiconductor research, and hardware supply chains. He connects emerging technical capabilities with user needs, cross-functional execution, and business outcomes.", styles["Deck"]),
]

contact = Table([
    [Paragraph("Taipei, Taiwan", styles["Meta"]), Paragraph("guocheju@gmail.com", styles["Meta"]), Paragraph("github.com/jjfishjj", styles["Meta"]), Paragraph("LinkedIn: Jerome Kuo", styles["Meta"])],
], colWidths=[35*mm, 43*mm, 43*mm, 53*mm])
contact.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),PALE),("BOX",(0,0),(-1,-1),0.6,LINE),("INNERGRID",(0,0),(-1,-1),0.4,LINE),("VALIGN",(0,0),(-1,-1),"MIDDLE"),("LEFTPADDING",(0,0),(-1,-1),3*mm),("TOPPADDING",(0,0),(-1,-1),3*mm),("BOTTOMPADDING",(0,0),(-1,-1),3*mm)]))
story += [contact, Spacer(1, 6*mm), Paragraph("CORE POSITIONING", styles["Section"])]

cards = [
    ("AI PRODUCT / TPM", "AI product lifecycle, cross-functional delivery, data-driven decisions, and product awareness of GPU economics and the hardware ecosystem."),
    ("SOLUTION ARCHITECTURE", "Turns GenAI tools, prototypes, and customer needs into clear solution narratives; developing deeper NIM, RAG, and inference-service integration."),
    ("TECHNICAL MARKETING / DEVREL", "International events, awards, workshops, product storytelling, and bilingual content experience connecting technology, community, and market."),
]
card_table = Table([
    [Paragraph(item[0], styles["CardTitle"]) for item in cards],
    [Paragraph(item[1], styles["CardBody"]) for item in cards],
], colWidths=[58*mm]*3)
card_table.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),PALE),("BOX",(0,0),(-1,-1),0.7,INK),("INNERGRID",(0,0),(-1,-1),0.5,LINE),("VALIGN",(0,0),(-1,-1),"TOP"),("LEFTPADDING",(0,0),(-1,-1),4*mm),("RIGHTPADDING",(0,0),(-1,-1),4*mm),("TOPPADDING",(0,0),(-1,-1),4*mm),("BOTTOMPADDING",(0,0),(-1,-1),4*mm)]))
story += [card_table, Spacer(1, 5*mm), Paragraph("NVIDIA DLI COMPLETED", styles["Label"]), Paragraph("Fundamentals of Deep Learning  /  Rapid Application Development with LLMs  /  AI Development with Jetson Nano", styles["Body"]), Spacer(1, 5*mm), Paragraph("DISTINCTIVE FOUNDATION", styles["Section"])]

foundation = Table([[Paragraph("GENAI WORKFLOWS", styles["CardTitle"]), Paragraph("PRODUCT ANALYTICS", styles["CardTitle"]), Paragraph("HARDWARE + SEMICONDUCTOR", styles["CardTitle"])],
                    [Paragraph("Text, image, video, 3D, and code prototyping; workflow design and internal AI enablement.", styles["CardBody"]), Paragraph("GA events, RFM, segmentation, retention, funnels, dashboards, and SQL/Python/Tableau-oriented analysis.", styles["CardBody"]), Paragraph("TiO2 thin-film research plus CPU, GPU, motherboard, and component supply-chain experience.", styles["CardBody"])]], colWidths=[58*mm]*3)
foundation.setStyle(TableStyle([("BOX",(0,0),(-1,-1),0.7,INK),("INNERGRID",(0,0),(-1,-1),0.5,LINE),("VALIGN",(0,0),(-1,-1),"TOP"),("LEFTPADDING",(0,0),(-1,-1),4*mm),("RIGHTPADDING",(0,0),(-1,-1),4*mm),("TOPPADDING",(0,0),(-1,-1),4*mm),("BOTTOMPADDING",(0,0),(-1,-1),4*mm)]))
story += [foundation, PageBreak(), Paragraph("EXPERIENCE", styles["Section"])]

jobs = [
    ("2025 - NOW", "CodeNet", "Project Manager | Taipei", "Lead product planning, data integrations, and development coordination for campus-community and matching products.", ["Designed career-path and event segmentation experiences to improve retention, browsing depth, and student engagement.", "Led frontend and moderation workflows, integrating course reviews, education data, and an AI interview service.", "Improved matching logic, analytics tracking, identity verification, and product subdomain migration."]),
    ("2024 - 2026", "Gamania Digital Entertainment (HK)", "AI, Data & Media Project Manager | Taipei", "Led AI and data initiatives across game production, internal workflow optimization, and creative asset development.", ["Integrated AI into Google Analytics workflows using events, funnels, cohorts, and retention signals for decisions.", "Designed player-behavior analytics and dashboards while aligning data definitions and reporting logic.", "Introduced AI-assisted video iteration and coordinated game prototypes, creative production, and instrumentation."]),
    ("2023 - 2024", "A.V. Mapping", "Project Manager | Taipei", "Planned creator workflows and go-to-market narratives for an AI video/music matching platform.", ["Supported communications for the 2024 iF Design Award and Berlinale / European Film Market.", "Planned creator tools, interactive journeys, gamified campaigns, AI workshops, and partner events."]),
    ("2020 - 2023", "METASENS / MetaFame", "Deputy Marketing Lead / Project Manager | Taipei", "Connected Web3 product planning, NFT operations, token campaigns, and gaming-community growth.", ["Designed gamified journeys, reward mechanics, community missions, and NFT campaigns.", "Analyzed campaign and behavioral data to support product and marketing decisions."]),
    ("2018 - 2023", "Imperium Technology Group", "Data Analyst | Hong Kong / Shenzhen", "Supported digital products and regional decisions through user analytics and market research.", ["Applied Google Analytics, RFM, segmentation, retention, and tagging analysis.", "Improved platform sustainability from 10% to 60%."]),
    ("2014 - 2018", "Huiria Financial Leasing", "Electronics Procurement & Product Manager | Shenzhen", "Managed computer-hardware procurement and product planning across an international supply chain.", ["Covered CPU, GPU, motherboard, semiconductor, and wafer-related component categories.", "Coordinated suppliers across Taiwan, China, and Europe; reduced air-freight costs by about 20%."]),
    ("2012 - 2014", "Chenghsi.com", "Project Manager / Co-founder", "Developed Yogosong, a social music app concept built on the Facebook API.", ["Contributed to product features, market research, and early operations."]),
]

for year, company, role, intro, bullets in jobs:
    right = [Paragraph(company, styles["Role"]), Paragraph(role, styles["Meta"]), Spacer(1, 1.5*mm), Paragraph(intro, styles["Body"])]
    right += [Paragraph(f"• {b}", styles["ResumeBullet"]) for b in bullets]
    row = Table([[Paragraph(year, styles["Label"]), right]], colWidths=[31*mm, 143*mm])
    row.setStyle(TableStyle([("VALIGN",(0,0),(-1,-1),"TOP"),("LINEBELOW",(0,0),(-1,-1),0.45,LINE),("LEFTPADDING",(0,0),(-1,-1),0),("RIGHTPADDING",(0,0),(-1,-1),2*mm),("TOPPADDING",(0,0),(-1,-1),4*mm),("BOTTOMPADDING",(0,0),(-1,-1),4*mm)]))
    story.append(KeepTogether(row))

story += [PageBreak(), Paragraph("RESEARCH, EDUCATION & CREDENTIALS", styles["Section"]), Paragraph("SEMICONDUCTOR RESEARCH FOUNDATION", styles["Label"]), Paragraph("Researched carbon-doped TiO2 semiconductor thin films at National Chiao Tung University's Solid State Laboratory using XANES, XRD, ESCA/XPS, synchrotron analysis, and magnetic measurements. Studied crystal structure, defect states, dipole/spin behavior, and potential sensing applications.", styles["Deck"])]

edu = Table([
    [Paragraph("2012", styles["Label"]), Paragraph("Tsinghua University", styles["Role"]), Paragraph("Exchange Program", styles["Meta"])],
    [Paragraph("2009 - 2011", styles["Label"]), Paragraph("National Chiao Tung University", styles["Role"]), Paragraph("Electrophysics", styles["Meta"])],
    [Paragraph("2005 - 2009", styles["Label"]), Paragraph("National Central University", styles["Role"]), Paragraph("Electrical Engineering", styles["Meta"])],
], colWidths=[31*mm, 90*mm, 53*mm])
edu.setStyle(TableStyle([("BOX",(0,0),(-1,-1),0.6,LINE),("INNERGRID",(0,0),(-1,-1),0.4,LINE),("VALIGN",(0,0),(-1,-1),"MIDDLE"),("LEFTPADDING",(0,0),(-1,-1),4*mm),("TOPPADDING",(0,0),(-1,-1),4*mm),("BOTTOMPADDING",(0,0),(-1,-1),4*mm)]))
story += [edu, Spacer(1, 7*mm), Paragraph("ADDITIONAL CREDENTIALS", styles["Label"]), Paragraph("Google Ads Display / Search Certification  /  Taiwan English Tour Guide  /  Epson CSR Japan Project  /  Milano Expo 2015 Volunteer & Museum Docent", styles["Body"]), Spacer(1, 9*mm), Paragraph("SELECTED LINKS", styles["Section"])]

links_table = Table([
    [Paragraph("GitHub Portfolio", styles["Role"]), Paragraph("github.com/jjfishjj", styles["Body"])],
    [Paragraph("3D Career Dashboard", styles["Role"]), Paragraph("jjfishjj.github.io/linkedin", styles["Body"])],
    [Paragraph("Data Analytics Case Study", styles["Role"]), Paragraph("jjfishjj.github.io/projects/data-analytics-visualization", styles["Body"])],
], colWidths=[60*mm, 114*mm])
links_table.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,-1),PALE),("BOX",(0,0),(-1,-1),0.6,LINE),("INNERGRID",(0,0),(-1,-1),0.4,LINE),("VALIGN",(0,0),(-1,-1),"MIDDLE"),("LEFTPADDING",(0,0),(-1,-1),4*mm),("TOPPADDING",(0,0),(-1,-1),4*mm),("BOTTOMPADDING",(0,0),(-1,-1),4*mm)]))
story += [links_table, Spacer(1, 12*mm), Paragraph("PRODUCT + DATA + CREATIVE TECHNOLOGY + HARDWARE", styles["Label"]), Paragraph("A cross-domain operator who translates emerging technology into structured decisions, workflows, and products.", styles["Deck"])]

doc.build(story)
PUBLIC.write_bytes(OUT.read_bytes())
print(OUT)
