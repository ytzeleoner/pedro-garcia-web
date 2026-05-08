---
tags: [wiki/proyectos, publicable, agile/scrum, agile/nexus, técnico/devops, gestión/equipos]
created: 2026-05-07
updated: 2026-05-07
source: "[[Transformación Agile en Acciona Mobility]]"
status: completado
periodo: "2019-10 / 2021-12"
cliente: Acciona
---

# Transformación Agile a escala — Acciona Mobility (2019–2021)

## Contexto

Acciona Mobility era una mini startup dentro de Acciona con alta autonomía. Llegué en octubre de 2019 como Agile Coach, con un equipo de desarrollo que trabajaba con despliegues monolíticos, sin estructura Agile y con una cola de peticiones que equivalía a más de un año de trabajo — que los stakeholders creían poder resolver en semanas.

## Problema

Tres problemas simultáneos y relacionados:

1. **Sin proceso**: sin sprints, sin backlog priorizado, sin visibilidad de qué estaba en progreso.
2. **Arquitectura monolítica**: un único `.WAR` que tardaba 30 minutos en desplegarse. Un cambio pequeño bloqueaba todo el equipo.
3. **Demanda invisible**: stakeholders con expectativas imposibles porque nadie había calculado la capacidad real del equipo frente a las peticiones entrantes.

## Qué hice

### Equipos y proceso

Creé **6 equipos Scrum** funcionales desde cero, con buenas prácticas de ingeniería (calidad, entrega continua, orientación a valor). Implementé **Nexus** para gestionar dependencias cross-equipo y establecí reuniones de priorización de Roadmap con stakeholders con medición de capacidad real.

### Arquitectura y despliegues

Rompí el monolito: la infraestructura migró de un `.WAR` único a componentes modulares independientes. Los despliegues pasaron de **30 minutos a 3 minutos** — solo se compila y despliega el módulo modificado.

### Visibilidad de la demanda

En una reunión con todos los stakeholders, mostré con datos que las peticiones entrantes equivalían a más de un año de trabajo. Hasta ese momento, cada área pedía sus proyectos "para la semana que viene". El cálculo forzó una priorización real que antes se evitaba.

## Resultado

- 6 equipos Scrum operativos y autónomos.
- Despliegues optimizados ×10 (30 min → 3 min).
- Stakeholders priorizando con datos reales en lugar de con urgencia percibida.
- El framework de Nexus + Roadmap se replicó posteriormente en **Innovación Digital (TIC Construcción)**, donde sigue en uso.

## Por qué importa

Es un caso completo de transformación Agile a escala (0 → 6 equipos) con resultados medibles que combina cultura, proceso y técnica. Y tiene un efecto multiplicador: el modelo no quedó en Mobility — se exportó a otra área y sobrevivió a las personas que lo construyeron.

---

## Ver también

- [[logros]]
- [[perfil]]
