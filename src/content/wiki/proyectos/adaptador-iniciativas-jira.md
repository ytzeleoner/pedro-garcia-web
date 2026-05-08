---
tags: [wiki/proyectos, publicable, técnico/automatización, ia/iniciativas]
created: 2026-05-07
updated: 2026-05-07
source: "[[Adaptador Iniciativas IA a Jira]]"
status: activo
cliente: Acciona
---

# Adaptador de iniciativas IA a Jira Advanced Roadmaps

## Contexto

Acciona Ingeniería tenía docenas de iniciativas de IA dispersas en documentos y hojas de cálculo sin visibilidad en el roadmap estratégico. El objetivo: llevarlas automáticamente a Jira Advanced Roadmaps para que pudieran gestionarse junto al resto del portfolio.

## Problema

El proceso manual era insostenible: alguien tenía que copiar datos de un Excel a Jira cada vez que algo cambiaba. Con 30+ iniciativas y actualizaciones frecuentes, el roadmap siempre estaba desactualizado.

## Solución

Pipeline de sincronización automática de tres capas:

```
Excel (entrada manual)
    ↓ Power Automate (cada hora)
Google Sheets (fuente de verdad normalizada)
    ↓ Cloud Run job (programado)
Jira Advanced Roadmaps (portfolio visible)
```

**Google Apps Script** adapta el formato del documento fuente al esquema de Jira (campos, fechas, tipos de epics).

**Power Automate** sincroniza el Excel de entrada con Google Sheets cada hora, sin intervención manual.

**Cloud Run job** lee el Google Sheets y actualiza los registros existentes en Jira, creando nuevos cuando aparecen códigos nuevos.

## Estado

- ✅ Sincronización de nuevas iniciativas funcionando en producción
- ⚠️ Bug activo: la lógica de actualización sobreescribe fechas existentes en Jira que no debería tocar
- 🔲 Pendiente: incorporar Plan Atlas (estrategia a 5 años)

## Lo que aprendí

La parte más compleja no fue la integración técnica — fue modelar la taxonomía de iniciativas de forma que Jira la representara fielmente. El tipo de epic, las dependencias y el campo de clasificación (Tipo A/B/C) requirieron varias iteraciones con el cliente interno.

## Tecnologías

Google Apps Script · Google Sheets · Power Automate · Cloud Run · Jira API · Jira Advanced Roadmaps · Python

---

## Ver también

- [[rol-ia-acciona]]
- [[tres-patrones-ia-ingenieria]]
