export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string };

export type Article = {
  slug: string;
  date: string;
  tag: string;
  title: string;
  excerpt: string;
  readTime: string;
  content: ContentBlock[];
};

export const articles: Article[] = [
  {
    slug: "armonicos-redes-industriales",
    date: "Junio 2026",
    tag: "Calidad de Energía",
    title: "Armónicos en redes industriales: qué son y por qué importan",
    excerpt:
      "Las distorsiones armónicas pueden elevar el consumo energético hasta un 30% sin que lo notes. Conoce cómo identificarlas antes de que provoquen fallas graves en tus equipos.",
    readTime: "6 min",
    content: [
      {
        type: "p",
        text: "En una instalación eléctrica industrial moderna, la onda de corriente y tensión rara vez es perfectamente sinusoidal. La proliferación de variadores de frecuencia, UPS, rectificadores y fuentes conmutadas introduce distorsiones que se superponen a la señal fundamental de 50 Hz. Estas distorsiones se llaman armónicos, y su gestión es uno de los desafíos técnicos más relevantes en calidad de energía hoy.",
      },
      { type: "h2", text: "¿Qué son los armónicos?" },
      {
        type: "p",
        text: "Un armónico es una componente de frecuencia que es múltiplo entero de la frecuencia fundamental. En un sistema a 50 Hz, el 2.º armónico oscila a 100 Hz, el 3.º a 150 Hz, el 5.º a 250 Hz y así sucesivamente. Las cargas no lineales no consumen corriente en forma sinusoidal pura: la distorsionan, generando estas componentes adicionales que circulan por la red junto con la señal útil.",
      },
      {
        type: "callout",
        text: "La métrica clave es la Distorsión Armónica Total (THD). Una THD de corriente superior al 15 % ya representa un riesgo operativo real para transformadores y cableado. La norma IEEE 519 establece límites específicos según el nivel de tensión y la potencia de cortocircuito en el punto de acoplamiento.",
      },
      { type: "h2", text: "Fuentes de armónicos en la industria" },
      {
        type: "p",
        text: "Los variadores de frecuencia (VFD) son la fuente más prevalente en ambientes industriales. Al rectificar la corriente alterna para luego invertirla, crean pulsos de corriente que generan principalmente el 5.º y 7.º armónico. Los rectificadores de 12 pulsos reducen estos, pero no los eliminan del todo. Otras fuentes frecuentes incluyen:",
      },
      {
        type: "ul",
        items: [
          "UPS trifásicas de doble conversión",
          "Hornos de arco eléctrico e inductivo",
          "Fuentes de alimentación conmutadas en centros de datos y oficinas",
          "Equipos de soldadura por resistencia",
          "Cargadores de baterías industriales de alta potencia",
          "Sistemas de iluminación con balastos electrónicos",
        ],
      },
      { type: "h2", text: "Impacto real en tu instalación" },
      {
        type: "p",
        text: "Los efectos de los armónicos no son abstractos: se traducen directamente en costos y fallas concretas. El calentamiento excesivo en transformadores y cables es el más crítico: un transformador expuesto a alta THD puede operar a temperaturas 20–30 °C por encima de su rango de diseño, reduciendo su vida útil a la mitad o menos.",
      },
      {
        type: "ul",
        items: [
          "Disparo prematuro de disyuntores termomagnéticos, que no responden correctamente a frecuencias superiores a 50 Hz",
          "Resonancia capacitiva destructiva si existen bancos de corrección de factor de potencia sin reactor de desintonización",
          "Errores sistemáticos en medidores de energía que subestiman el consumo real hasta un 5–8 %",
          "Interferencias en sistemas de control: PLC, SCADA, redes industriales Profibus/EtherNet/IP",
          "Sobrecorriente en el conductor de neutro en sistemas trifásicos con cargas monofásicas no lineales",
          "Incremento de pérdidas técnicas en toda la red de distribución interna",
        ],
      },
      { type: "h2", text: "Cómo identificarlos antes de que falle el equipo" },
      {
        type: "p",
        text: "La herramienta indispensable es el analizador de calidad de energía (Power Quality Analyzer). Un diagnóstico profesional incluye medición de THDv y THDi en cada tablero crítico, espectro armónico hasta el orden 50, registro continuo de al menos 7 días para capturar variaciones por turno y nivel de carga, y correlación con el historial de fallas y mantenimientos.",
      },
      {
        type: "p",
        text: "En NM3E instalamos equipos registradores durante una semana completa, entregando un informe con el espectro armónico por punto de medición, la identificación de las fuentes generadoras y un plan de mitigación priorizado por nivel de riesgo y retorno de inversión estimado.",
      },
      { type: "h2", text: "Soluciones disponibles" },
      {
        type: "p",
        text: "No existe una solución única: la estrategia óptima depende del nivel de THD medido, la topología de la red, el tipo de cargas y el presupuesto disponible. Las principales opciones son:",
      },
      {
        type: "ul",
        items: [
          "Reactancias de línea (ACL/DCL) en los VFDs: solución económica que reduce el THDi entre un 30–40 %",
          "Filtros pasivos sintonizados: bajo costo, efectivos para armónicos específicos, pero pueden generar resonancias si cambia el perfil de cargas",
          "Filtros activos de potencia: compensan armónicos en tiempo real con eficiencias superiores al 97 %, independientes de la carga",
          "Transformadores de aislamiento con pantalla electrostática: atenúan el paso de armónicos hacia la red de distribución pública",
          "Configuraciones de 12 o 18 pulsos para rectificadores de gran potencia",
        ],
      },
      {
        type: "callout",
        text: "Una instalación bien gestionada mantiene el THDv por debajo del 5 % en la barra principal y el THDi por debajo del 8 % en los puntos de acoplamiento común, cumpliendo con IEEE 519 y la norma chilena NCh IEC 61000-2-4.",
      },
    ],
  },
  {
    slug: "factor-de-potencia",
    date: "Mayo 2026",
    tag: "Eficiencia",
    title: "Cómo el factor de potencia afecta tu factura eléctrica",
    excerpt:
      "Un factor de potencia bajo no solo genera multas en tu tarifa: sobrecalienta transformadores y reduce la vida útil de tus equipos. Te explicamos cómo corregirlo paso a paso.",
    readTime: "5 min",
    content: [
      {
        type: "p",
        text: "Si tu empresa opera en Chile bajo tarifa AT o BT con medición de potencia reactiva, el factor de potencia (FP) probablemente ya aparece en tu boleta eléctrica. Lo que muchos gestores técnicos y financieros no dimensionan correctamente es que un FP bajo penaliza de tres formas simultáneas: cargos directos en la tarifa, sobrecostos operativos invisibles en la instalación y reducción acelerada de la vida útil de los activos eléctricos.",
      },
      { type: "h2", text: "¿Qué es el factor de potencia?" },
      {
        type: "p",
        text: "El factor de potencia es la relación entre la potencia activa (kW, la que hace trabajo útil) y la potencia aparente (kVA, la que el sistema eléctrico debe suministrar). Un motor que consume 80 kW pero exige 100 kVA al transformador tiene un FP de 0,80. El 20 % restante es potencia reactiva (kVAr): necesaria para crear los campos magnéticos que permiten operar motores y transformadores, pero que circula sin producir trabajo útil, sobrecargando toda la infraestructura de distribución.",
      },
      {
        type: "callout",
        text: "La regulación tarifaria en Chile exige mantener un factor de potencia mínimo de 0,93 en el punto de medición. Por debajo de ese umbral, la distribuidora aplica un cargo adicional proporcional a la energía reactiva inductiva consumida en el período de punta.",
      },
      { type: "h2", text: "Impacto en la factura eléctrica" },
      {
        type: "p",
        text: "El cargo por energía reactiva en tarifa AT puede representar entre un 8 % y un 18 % de la boleta total, dependiendo del perfil de carga y el nivel de penalización. En instalaciones industriales con alta densidad de motores —plantas de proceso, minería, manufactura— corregir el FP a 0,95 o superior suele tener un retorno de inversión inferior a 18 meses.",
      },
      {
        type: "p",
        text: "Pero la factura es solo la parte visible. Un FP bajo implica que el transformador, la acometida y todo el cableado interno deben manejar una corriente mayor que la estrictamente necesaria para el proceso productivo. Esto genera consecuencias técnicas concretas:",
      },
      {
        type: "ul",
        items: [
          "Mayor caída de tensión en la red interna, afectando la regulación y estabilidad de los procesos",
          "Calentamiento adicional en conductores y bornes: las pérdidas resistivas (I²R) son proporcionales al cuadrado de la corriente",
          "Sobrecarga en el transformador, que opera a mayor temperatura y envejece hasta el doble de rápido",
          "Limitación de capacidad útil: un transformador de 1.000 kVA con FP 0,75 solo puede entregar 750 kW de potencia activa",
          "Mayor demanda contratada necesaria para cubrir la misma potencia de proceso",
        ],
      },
      { type: "h2", text: "Cómo se corrige el factor de potencia" },
      {
        type: "p",
        text: "La compensación de potencia reactiva se realiza instalando condensadores eléctricos que generan la kVAr capacitiva localmente, compensando la reactiva inductiva de las cargas. Esto libera al sistema de distribución de transportar esa corriente reactiva desde la subestación. Existen tres estrategias principales:",
      },
      {
        type: "ul",
        items: [
          "Compensación centralizada: banco de condensadores en la barra principal. Económica y simple, elimina el cargo tarifario, pero no reduce las pérdidas en la red interna ni la carga en el transformador.",
          "Compensación descentralizada: condensadores individuales en cada motor o grupo de cargas inductivas. Más eficiente, reduce pérdidas en toda la instalación y descarga el transformador.",
          "Compensación automática (APFC): bancos con regulador automático que conectan o desconectan pasos de condensadores según la demanda reactiva en tiempo real. Ideal para cargas variables o con alta diferencia entre turnos.",
        ],
      },
      { type: "h2", text: "El rol de los armónicos: un riesgo que se omite con frecuencia" },
      {
        type: "p",
        text: "Un error que vemos regularmente es instalar condensadores estándar en redes con distorsión armónica significativa. Los condensadores presentan impedancia baja a frecuencias elevadas: en lugar de compensar el FP, pueden entrar en resonancia con la inductancia de la red y amplificar los armónicos, dañando los propios condensadores por corrientes excesivas y agravando el problema original.",
      },
      {
        type: "callout",
        text: "En NM3E nunca instalamos condensadores sin antes medir el espectro armónico. Si el THDi en la barra supera el 8 %, el proyecto debe incluir reactores de desintonización o un filtro activo. Es la diferencia entre una solución de 18 meses de vida útil y una de 15 años.",
      },
      { type: "h2", text: "Proceso completo: del diagnóstico a la corrección" },
      {
        type: "ul",
        items: [
          "Medición de FP promedio y por franja horaria durante 7 días continuos (curvas de carga)",
          "Análisis del espectro armónico para definir si se requieren reactores de desintonización",
          "Ingeniería del banco: cálculo de la potencia reactiva a compensar por barra y nivel de tensión",
          "Simulación de flujo de cargas y verificación de posibles resonancias pre-instalación",
          "Instalación, pruebas de puesta en servicio y ajuste del regulador APFC",
          "Medición post-instalación: verificación del FP corregido y cálculo del ahorro real vs. proyectado",
        ],
      },
    ],
  },
  {
    slug: "senales-alerta-instalacion-electrica",
    date: "Abril 2026",
    tag: "Mantenimiento",
    title: "5 señales de alerta en una instalación eléctrica industrial",
    excerpt:
      "Desde disyuntores que saltan con frecuencia hasta iluminación inestable: estas señales indican que tu sistema eléctrico necesita diagnóstico urgente antes de la próxima parada.",
    readTime: "4 min",
    content: [
      {
        type: "p",
        text: "Los sistemas eléctricos industriales raramente fallan de forma abrupta y sin aviso previo. Casi siempre existen señales que, bien interpretadas, permiten intervenir antes de una parada no planificada o —peor aún— un siniestro eléctrico. El problema es que muchas de estas señales se normalizan con el tiempo hasta convertirse en parte del ruido de fondo de la planta. Este artículo describe las cinco más críticas y lo que realmente significan.",
      },
      { type: "h2", text: "1. Disyuntores que saltan con frecuencia" },
      {
        type: "p",
        text: "Un disyuntor que opera repetidamente no es un componente defectuoso: es el único dispositivo funcionando correctamente en un circuito con un problema real. Las causas más frecuentes son sobrecarga sostenida del circuito, corrientes de fuga elevadas que activan el diferencial, armónicos que acumulan calor en el bimetal del disyuntor a frecuencias superiores a 50 Hz, o una coordinación de protecciones mal ajustada tras modificaciones en la instalación.",
      },
      {
        type: "p",
        text: "El error clásico —y potencialmente catastrófico— es aumentar el calibre del disyuntor o bloquearlo mecánicamente. Esto elimina la señal de advertencia pero deja activa la causa, exponiendo el cableado a sobrecalentamiento crónico que puede derivar en un incendio.",
      },
      { type: "h2", text: "2. Equipos que se calientan más de lo habitual" },
      {
        type: "p",
        text: "Motores, transformadores y tableros tienen rangos de temperatura de operación definidos por norma. Cuando el personal de planta nota que un motor está más caliente que antes en condiciones similares de carga, indica que algo cambió: puede ser deterioro del aislamiento del bobinado, ventilación obstruida, desbalance de tensiones de alimentación, o presencia de armónicos que generan pérdidas adicionales en el hierro y el cobre.",
      },
      {
        type: "callout",
        text: "Una cámara termográfica infrarroja aplicada a tableros eléctricos, bornes y empalmes es la herramienta más efectiva para detectar puntos calientes antes de que generen un arco eléctrico. La norma NFPA 70E y las recomendaciones de CIGRE establecen que la termografía eléctrica debería realizarse al menos una vez al año en instalaciones críticas.",
      },
      { type: "h2", text: "3. Iluminación inestable o parpadeante" },
      {
        type: "p",
        text: "El parpadeo de la iluminación (flicker) no es solo una molestia para el personal: es un síntoma inequívoco de variaciones de tensión en la red. Las causas más comunes en ambientes industriales son arranques de motores de gran potencia sin suavizador (soft starter o VFD), soldadoras por arco, hornos de resistencia con ciclos rápidos de encendido/apagado, o cargas con alto contenido de 3.er armónico que saturan el conductor de neutro.",
      },
      {
        type: "p",
        text: "El índice Pst (Short-term Flicker Severity) se mide con analizadores de calidad de energía siguiendo la norma IEC 61000-4-15. Un valor de Pst superior a 1,0 ya es perceptible e indica que la fluctuación de tensión supera los límites aceptables para la distribución eléctrica en Chile.",
      },
      { type: "h2", text: "4. Ruidos o vibraciones inusuales en transformadores" },
      {
        type: "p",
        text: "Un transformador de distribución en condiciones normales emite un zumbido suave y constante a 100 Hz (el doble de la frecuencia de red). Si ese zumbido se intensifica, cambia de tono, o aparecen vibraciones mecánicas palpables, puede indicar saturación del núcleo magnético por sobretensión o por armónicos de baja frecuencia, daño en los aprietes del núcleo, o corrientes de neutro elevadas características de sistemas con alta carga de 3.er armónico.",
      },
      {
        type: "p",
        text: "Los transformadores no están diseñados para operar eficientemente con formas de onda distorsionadas. El K-Factor permite evaluar esta situación: un transformador estándar tiene K=1; si el análisis de armónicos indica que la carga requiere K=4 o K=7, el transformador está siendo solicitado más allá de su diseño.",
      },
      { type: "h2", text: "5. Consumo energético que sube sin cambios en producción" },
      {
        type: "p",
        text: "Un incremento del consumo de kWh sin un aumento correlativo de la producción o la actividad es quizás la señal más valiosa porque es objetivamente cuantificable. Las causas más frecuentes son deterioro del aislamiento con corrientes de fuga permanentes, motores operando fuera de su punto óptimo por desbalance de fases o tensión inadecuada, pérdidas adicionales por armónicos en toda la instalación, o equipos que han perdido eficiencia por desgaste.",
      },
      {
        type: "callout",
        text: "Una diferencia sostenida del 5 % o más en el consumo específico (kWh por unidad producida u hora de operación) justifica un diagnóstico eléctrico completo. En muchos casos, la inversión en el diagnóstico se recupera solo con los ahorros identificados.",
      },
      { type: "h2", text: "¿Qué hacer si identificas alguna de estas señales?" },
      {
        type: "p",
        text: "La respuesta no es esperar a que el problema se manifieste con mayor intensidad. Un diagnóstico de calidad de energía —que incluye medición registradora de 7 días, análisis espectral de armónicos, termografía infrarroja y revisión de la coordinación de protecciones— permite identificar la causa raíz y planificar una intervención controlada durante una parada programada, en lugar de reaccionar bajo presión ante una emergencia.",
      },
      {
        type: "p",
        text: "En NM3E entregamos un informe de diagnóstico estructurado con hallazgos priorizados por criticidad y riesgo operativo, recomendaciones técnicas detalladas y presupuesto para las acciones correctivas. El objetivo es que la dirección técnica tenga toda la información necesaria para decidir con criterio, no bajo la presión de una contingencia.",
      },
    ],
  },
];
