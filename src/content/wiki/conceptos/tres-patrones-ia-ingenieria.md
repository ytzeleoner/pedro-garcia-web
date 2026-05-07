---
tags: [wiki/conceptos, publicable, ia/estrategia, ia/casos-de-uso]
created: 2026-05-07
updated: 2026-05-07
source: "[[Tres patrones de uso IA en Key Players de Ingeniería]]"
---

# Tres patrones de uso de IA en ingeniería

Observación extraída de sesiones con Key Players de IA en Acciona Ingeniería (marzo 2026). Cada perfil tiene necesidades radicalmente distintas y necesita una herramienta distinta.

> La implicación estratégica es directa: **no existe una herramienta única de IA**. Imponer Copilot (o cualquier otra) para todos los casos es ineficiente.

---

## Patrón 1 — Consulta y resumen documental

**Qué hacen**: Consultar cláusulas legales, resumir contratos, buscar información en grandes volúmenes de documentación.

**Herramienta adecuada**: Perplexity, NotebookLM, o cualquier RAG conversacional.

**Perfil**: No técnico. Quiere respuestas rápidas sobre documentos. No le importa el proceso — le importa la respuesta.

**Error frecuente**: Darles una herramienta de extracción estructurada cuando solo necesitan una búsqueda inteligente.

---

## Patrón 2 — Clasificación y extracción estructurada

**Qué hacen**: Subir lotes de documentos (PDFs de ofertas, certificados, actas) y extraer parámetros clave: resumen, idioma, presupuesto, divisa, tipo de contrato.

**Herramienta adecuada**: Copilot, Gemini Enterprise, o cualquier modelo con procesamiento de múltiples documentos.

**Perfil**: Semi-técnico. Construye prompts parametrizados por tipo de documento. Puede aprender a definir esquemas de extracción.

**Evolución natural**: Conectar el agente directamente al sistema documental (SharePoint, Google Drive) para eliminar la subida manual.

---

## Patrón 3 — Automatización determinística

**Qué hacen**: Transformar modelos 3D, aplicar parámetros y fórmulas, convertir exportaciones de software especializado. No quieren respuestas generativas — quieren **código que funcione siempre igual**.

**Herramienta adecuada**: Vibe Coding — un LLM (Claude, Copilot en IDE) que genera Python o scripts. El LLM escribe el código; el ingeniero lo valida y lo conserva.

**Perfil**: Técnico. Tiene VBA heredado o procesos manuales que quiere automatizar. Sabe lo que quiere pero no siempre sabe programarlo.

**Error frecuente**: Empujarles hacia agentes conversacionales cuando lo que necesitan es código reutilizable y bien documentado.

**Recomendación**: Darles una herramienta de desarrollo con IA (Claude Code, Copilot en IDE) para que construyan y preserven conocimiento en código.

---

## Implicación para la estrategia

Antes de recomendar una herramienta, hay que clasificar la iniciativa:

| Patrón | Tipo de problema | Herramienta |
|--------|-----------------|-------------|
| Consulta documental | Buscar y resumir | RAG conversacional |
| Extracción estructurada | Clasificar y extraer | LLM con procesamiento de lotes |
| Automatización determinística | Transformar con código | Vibe Coding + IDE con IA |

La estrategia que no clasifica acaba usando Copilot para todo — y frustrando a los tres perfiles por razones distintas.

---

## Ver también

- [[rol-ia-acciona]]
- [[specs-driven-development]]
