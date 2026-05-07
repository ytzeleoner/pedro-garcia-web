---
tags: [wiki/conceptos, publicable, ia/agentes, técnico/devops, gestión/estrategia]
created: 2026-05-07
updated: 2026-05-07
source: "[[Specs Driven Development]]"
---

# Specs Driven Development

Metodología para construir software con IA sin acumular deuda técnica invisible.

## El problema

Cuando un equipo empieza a construir con IA **a golpe de prompt**, aparecen cuatro problemas encadenados:

1. **Fragilidad**: un prompt nuevo puede romper lo que funcionaba antes, sin que nadie lo sepa hasta que falla.
2. **Lock-in de IA**: el código está implícitamente acoplado al modelo y al estilo de prompt que lo generó. Cambiar de herramienta obliga a reescribir desde cero.
3. **Opacidad**: ni un humano nuevo ni otra IA entienden qué hace el código, porque no hay ningún documento que explique qué se quería conseguir ni cómo ha evolucionado.
4. **Deuda técnica invisible**: cada script suelto es conocimiento que vive en la cabeza de quien lo hizo o en un chat que nadie revisitará.

Este patrón es especialmente común en ingeniería cuando los técnicos empiezan a usar IA sin metodología — tienen scripts Python que funcionan, pero nadie sabe exactamente por qué ni qué pasa si se cambia algo.

## Qué es

Specs Driven Development es el enfoque de **definir primero qué quieres** — en texto, estructurado — antes de generar código con IA. Y de **mantener esa definición viva** a medida que el código evoluciona.

La spec no es el código. Es el contrato entre lo que el humano quiere, lo que la IA genera, y lo que el siguiente humano (o la siguiente IA) va a modificar.

## Los tres niveles

| Nivel | Descripción | Cuándo aplicarlo |
|-------|-------------|-----------------|
| **Spec First** | Se escribe la spec completa antes de generar una sola línea de código. | Proyectos nuevos con alcance claro. |
| **Spec Anchor** | Se genera código rápido para explorar, pero se escribe la spec antes de considerar el resultado como definitivo. | Prototipado o exploración técnica. |
| **Spec As Source** | La spec es la fuente de verdad; el código se regenera a partir de ella cuando hace falta. | Máxima portabilidad entre modelos y herramientas. |

En contextos con poca cultura de documentación técnica, **Spec Anchor** suele ser el punto de entrada más realista: no bloquea la velocidad inicial pero evita que el caos se consolide.

## Qué incluye una spec mínima

- **Qué hace**: objetivo funcional en lenguaje llano.
- **Entradas y salidas**: qué datos recibe, qué produce.
- **Restricciones técnicas**: lenguaje, entorno, dependencias, límites.
- **Casos de uso cubiertos**: los escenarios que debe manejar.
- **Lo que NO hace**: el alcance negativo evita malentendidos al modificar.

## El beneficio clave

Con una spec mantenida, cualquier persona o IA puede:
- Entender qué hace el código sin ejecutarlo.
- Modificarlo sin romper lo anterior (el contexto está en la spec).
- Reproducirlo en otro modelo o herramienta si hace falta.

Sin spec, el conocimiento muere con el prompt.

---

## Ver también

- [[tres-patrones-ia-ingenieria]]
- [[rol-ia-acciona]]
