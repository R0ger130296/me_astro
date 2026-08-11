from pathlib import Path
from shutil import copyfile

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "Roger-Cedeno-CV.pdf"
PUBLIC = ROOT / "public" / "Roger-Cedeno-CV.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

PURPLE = colors.HexColor("#7D02C2")
DARK = colors.HexColor("#160920")
INK = colors.HexColor("#24152D")
MUTED = colors.HexColor("#685A70")
LINE = colors.HexColor("#E6D9ED")
SOFT = colors.HexColor("#F7F1FA")

styles = getSampleStyleSheet()
body = ParagraphStyle("Body", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.7, leading=12.2, textColor=INK, spaceAfter=4)
small = ParagraphStyle("Small", parent=body, fontSize=7.6, leading=10.2, textColor=MUTED)
section = ParagraphStyle("Section", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=10.5, leading=13, textColor=PURPLE, spaceBefore=8, spaceAfter=6, uppercase=True)
role_title = ParagraphStyle("Role", parent=styles["Heading3"], fontName="Helvetica-Bold", fontSize=9.2, leading=11.5, textColor=DARK, spaceAfter=1)
project_title = ParagraphStyle("Project", parent=role_title, textColor=PURPLE)


def header_footer(canvas, document):
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(DARK)
    canvas.rect(0, height - 76, width, 76, fill=1, stroke=0)
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica-Bold", 22)
    canvas.drawString(18 * mm, height - 31, "Roger Cedeño")
    canvas.setFillColor(colors.HexColor("#D9B8ED"))
    canvas.setFont("Helvetica", 10)
    canvas.drawString(18 * mm, height - 47, "Full Stack Developer | Product Builder")
    canvas.setFillColor(colors.HexColor("#E9DEEF"))
    canvas.setFont("Helvetica", 7.7)
    canvas.drawString(18 * mm, height - 62, "Ecuador (GMT-5)  |  grarogccee@gmail.com  |  github.com/R0ger130296  |  me-astro-alpha.vercel.app")
    canvas.setStrokeColor(LINE)
    canvas.line(18 * mm, 14 * mm, width - 18 * mm, 14 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7)
    canvas.drawString(18 * mm, 9 * mm, "CV generado desde el portafolio profesional")
    canvas.drawRightString(width - 18 * mm, 9 * mm, f"Página {document.page}")
    canvas.restoreState()


def heading(text):
    return Paragraph(text.upper(), section)


def experience(role, company, period, summary, skills):
    title_row = Table(
        [[Paragraph(f"{role}<br/><font color='#7D02C2'>{company}</font>", role_title), Paragraph(period, small)]],
        colWidths=[125 * mm, 44 * mm],
    )
    title_row.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("ALIGN", (1, 0), (1, 0), "RIGHT"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0), ("BOTTOMPADDING", (0, 0), (-1, -1), 2)]))
    return KeepTogether([title_row, Paragraph(summary, body), Paragraph(f"<b>Tecnologías:</b> {skills}", small), Spacer(1, 4)])


def project(name, status, description, stack):
    return KeepTogether([
        Paragraph(f"{name} <font color='#685A70' size='7'>| {status}</font>", project_title),
        Paragraph(description, body),
        Paragraph(f"<b>Stack:</b> {stack}", small),
        Spacer(1, 5),
    ])


doc = SimpleDocTemplate(
    str(OUTPUT),
    pagesize=A4,
    rightMargin=18 * mm,
    leftMargin=18 * mm,
    topMargin=31 * mm,
    bottomMargin=19 * mm,
    title="Roger Cedeño - Full Stack Developer",
    author="Roger Cedeño",
    subject="Currículum profesional",
)

story = [
    heading("Perfil profesional"),
    Paragraph("Desarrollador Full Stack con experiencia profesional desde 2019 construyendo productos web, móviles y empresariales. Integro experiencia de usuario, frontend, APIs, reglas de negocio, datos, nube y entrega continua para convertir procesos complejos en soluciones claras, mantenibles y útiles para el negocio.", body),
    heading("Competencias principales"),
]

skills_table = Table([
    [Paragraph("<b>Frontend</b><br/>React, Angular, Astro, Next.js, TypeScript, Tailwind CSS", body), Paragraph("<b>Backend</b><br/>.NET, Node.js, Spring Boot, REST, GraphQL, JWT", body)],
    [Paragraph("<b>Mobile</b><br/>React Native, Expo, Flutter, Apache Cordova, PWA", body), Paragraph("<b>Cloud y datos</b><br/>Azure, Firebase, Docker, SQL Server, MongoDB, CI/CD", body)],
], colWidths=[84.5 * mm, 84.5 * mm])
skills_table.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), SOFT), ("BOX", (0, 0), (-1, -1), 0.6, LINE), ("INNERGRID", (0, 0), (-1, -1), 0.4, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8), ("TOPPADDING", (0, 0), (-1, -1), 7), ("BOTTOMPADDING", (0, 0), (-1, -1), 7)]))
story.extend([skills_table, heading("Experiencia profesional")])

story.extend([
    experience("Desarrollador Semi Senior", "EOS TECH COMPANY", "may. 2026 - actualidad", "Desarrollo y soporte de aplicaciones móviles, integraciones y soluciones de software orientadas a operación.", "JavaScript, Apache Cordova, Mobile, Integraciones"),
    experience("Desarrollador Semi Senior", "EOS TECH COMPANY", "nov. 2025 - abr. 2026", "Construcción de soluciones web con énfasis en arquitectura mantenible, patrones de diseño y trabajo colaborativo.", "React, Tailwind CSS, Arquitectura hexagonal, GitFlow"),
    experience("Full-stack Developer", "Kruger Corp", "ago. 2023 - sept. 2025", "Participación en productos empresariales cubriendo frontend, backend, integración y evolución de aplicaciones.", "Angular, TypeScript, APIs, Full Stack"),
    experience("Ingeniero de software - Profesional independiente", "Jeremy SAS", "nov. 2024 - jun. 2025", "Desarrollo e implementación de microservicios y APIs REST para necesidades específicas de negocio.", "React, Next.js, Microservicios, REST API"),
    experience("Technical Consultant", "Kruger Corp", "may. 2021 - jul. 2023", "Consultoría técnica, desarrollo de soluciones y acompañamiento a equipos en iniciativas digitales.", "React, Git, Consultoría, Delivery"),
    experience("Desarrollador Junior", "UTIC-ESPE", "sept. 2019 - ago. 2021", "Construcción de soluciones web y backend dentro de un entorno institucional.", "Spring Boot, Spring MVC, Java, SQL"),
    PageBreak(),
    heading("Proyectos seleccionados"),
    project("FinanciaApp", "En producción", "PWA para controlar ingresos, gastos, cuentas y presupuestos desde cualquier dispositivo, orientada a decisiones financieras simples y hábitos sostenibles.", "React, TypeScript, PWA"),
    project("Auriga", "En desarrollo", "Plataforma para talleres automotrices con órdenes de trabajo, citas, técnicos e indicadores operativos.", "React, .NET 8, SQL Server, Azure"),
    project("App Colaboradores", "En producción", "Aplicación móvil interna para comunicaciones, tareas, notificaciones y acceso rápido a servicios.", "React Native, Expo, Firebase"),
    project("Apollo GraphQL", "Proyecto técnico", "Backend GraphQL modular con autenticación, autorización, documentación y despliegue en contenedores.", "Node.js, GraphQL, MongoDB, Docker"),
    heading("Educación"),
    experience("Ingeniería de Software", "Universidad Iberoamericana del Ecuador", "may. 2023 - sept. 2024", "Formación en ingeniería de software, programación y aplicaciones específicas.", "Ingeniería de software, Programación"),
    experience("Tecnólogo Superior en Desarrollo de Software", "Instituto Superior Tecnológico Yavirac Quito", "2018 - 2021", "Formación técnica en desarrollo de software y tecnologías de la información.", "SQL, Node.js, Desarrollo de software"),
    heading("Credenciales destacadas"),
])

credentials = [
    ["2026", "Curso de Bases de Datos en Azure", "Platzi"],
    ["2026", "Curso de Almacenamiento en Azure", "Platzi"],
    ["2026", ".NET Backend: .NET Core, SQL Server y seguridad JWT", "Udemy"],
    ["2026", "Cybersecurity Awareness Professional Certification CAPC", "CertiProf"],
    ["2025", "Spring Framework 6 & Spring Boot 3", "Udemy"],
    ["2025", "Next.js: El framework de React para producción", "Udemy"],
    ["2024", "Principios SOLID y Clean Code", "Udemy"],
    ["2024", "Micro-Frontend: Arquitectura de aplicaciones web escalables", "Udemy"],
]
credential_rows = [[Paragraph(f"<b>{year}</b>", small), Paragraph(title, body), Paragraph(issuer, small)] for year, title, issuer in credentials]
credential_table = Table(credential_rows, colWidths=[18 * mm, 125 * mm, 26 * mm])
credential_table.setStyle(TableStyle([("ROWBACKGROUNDS", (0, 0), (-1, -1), [colors.white, SOFT]), ("GRID", (0, 0), (-1, -1), 0.35, LINE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("LEFTPADDING", (0, 0), (-1, -1), 6), ("RIGHTPADDING", (0, 0), (-1, -1), 6), ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5)]))
story.extend([
    credential_table,
    Spacer(1, 6),
    Paragraph("Más credenciales verificables y detalles de proyectos en <link href='https://me-astro-alpha.vercel.app' color='#7D02C2'><b>me-astro-alpha.vercel.app</b></link>.", small),
])

doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
copyfile(OUTPUT, PUBLIC)
print(OUTPUT)
print(PUBLIC)
