export const quizSteps = [
  {
    id: 1,
    question: "¿Quieres saber si puedes recuperar tu relación?",
    description: "Evaluación personalizada de 2 minutos basada en tu situación específica",
    subtext: "Primero, selecciona tu género:",
    options: ["MASCULINO", "FEMENINO"],
    note: "Información completamente confidencial",
    elements: {
      heartbeat: true,
      timer: "Evaluación de 2 minutos",
    },
  },
  {
    id: 2,
    question: "¿CUÁL ES TU EDAD?",
    description: "(Esta información es crucial para personalizar tu plan de reconquista)",
    options: [
      "18-29 - Fase de descubrimientos emocionales",
      "29-39 - Período de consolidación de valores",
      "39-49 - Momento de reevaluación de prioridades",
      "50+ - Fase de madurez emocional",
    ],
    elements: {
      ageIcons: true,
      counter: "personas que ya hicieron la prueba hoy",
    },
  },
  {
    id: 3,
    question: "¿CUÁNTO TIEMPO LLEVÁIS SEPARADOS?",
    description: "(El tiempo es un factor crítico para tu estrategia de reconquista)",
    options: {
      masculino: ["Menos de una semana", "Hace 1 mes", "De 2 a 6 meses", "Más de 6 meses"],
      feminino: ["Menos de una semana", "Hace 1 mes", "De 2 a 6 meses", "Más de 6 meses"],
    },
    bonusUnlock: {
      id: 1,
      title: "21 Disparadores Emocionales",
      value: 47,
      description: "Incluido en tu evaluación personalizada",
    },
  },
  {
    id: 4,
    question: {
      masculino: "¿CÓMO FUE VUESTRA SEPARACIÓN?",
      feminino: "¿CÓMO FUE VUESTRA SEPARACIÓN?",
    },
    description: "(Esta información es vital para determinar tu estrategia específica)",
    options: {
      masculino: ["Ella cortó conmigo", "Yo corté con ella", "Decidimos cortar de mutuo acuerdo"],
      feminino: ["Él cortó conmigo", "Yo corté con él", "Decidimos cortar de mutuo acuerdo"],
    },
    elements: {
      analysisText: "Calculando tasa de éxito para tu caso...",
      successRate: "Tu caso tiene características prometedoras",
    },
  },
  {
    id: 5,
    question: "¿CUÁNTO TIEMPO ESTUVISTEIS JUNTOS?",
    description: "(La duración de la relación influye directamente en tu estrategia)",
    options: ["Más de 3 años", "De 1 a 3 años", "De 6 meses a 1 año", "Menos de 6 meses"],
  },
  {
    id: 6,
    question: "¿CUÁL FUE LA PARTE MÁS DOLOROSA DE LA RUPTURA?",
    description: "(Identificar tu dolor principal es esencial para tu recuperación emocional y reconquista)",
    options: {
      masculino: [
        "🤔 Lidiar con la soledad y el vacío",
        "😔 La montaña rusa emocional: ira, tristeza, arrepentimiento",
        "💭 Lidiar con recuerdos y memorias",
        "💔 Imaginarla con otro hombre",
        "🤔 Darme cuenta de que los planes que hicimos nunca se harán realidad",
        "✓ Otro",
      ],
      feminino: [
        "🤔 Lidiar con la soledad y el vacío",
        "😔 La montaña rusa emocional: ira, tristeza, arrepentimiento",
        "💭 Lidiar con recuerdos y memorias",
        "💔 Imaginarlo con otra mujer",
        "🤔 Darme cuenta de que los planes que hicimos nunca se harán realidad",
        "✓ Otro",
      ],
    },
    elements: {
      profileAnalysis: "Personalizando tu estrategia emocional...",
      profileComplete: "46%",
    },
  },
  {
    id: 7,
    question: {
      masculino: "¿CUÁL ES TU SITUACIÓN ACTUAL CON TU EX?",
      feminino: "¿CUÁL ES TU SITUACIÓN ACTUAL CON TU EX?",
    },
    description: "(Esta información determinará tu punto de partida en el PLAN A)",
    options: {
      masculino: [
        "🤔 Estoy aplicando contacto cero",
        "😔 Ella me ignora completamente",
        "❌ Me ha bloqueado en todas las redes sociales",
        "🤝 Hablamos sólo de cosas necesarias",
        "💬 Charlamos de vez en cuando",
        "😌 Seguimos siendo amigos",
        "✓ Hemos tenido encuentros íntimos después de la ruptura",
      ],
      feminino: [
        "🤔 Estoy aplicando contacto cero",
        "😔 Él me ignora completamente",
        "❌ Me ha bloqueado en todas las redes sociales",
        "🤝 Hablamos sólo de cosas necesarias",
        "💬 Charlamos de vez en cuando",
        "😌 Seguimos siendo amigos",
        "✓ Hemos tenido encuentros íntimos después de la ruptura",
      ],
    },
    elements: {
      profileComplete: "62%",
      // 🔥 PRIMEIRO TESTEMUNHO - REPOSICIONADO PARA PERGUNTA 7
      testimonialDisplay: true,
      testimonialName: "Carlos M.",
      testimonialText: "El método me ayudó a entender mejor la situación y actuar de forma correcta",
      testimonialImage: "https://comprarplanseguro.shop/wp-content/uploads/2025/08/Captura-de-Tela-2025-08-08-as-19.01.05.png",
    },
  },
  {
    id: 8,
    question: {
      masculino: "¿ELLA YA ESTÁ SALIENDO CON OTRA PERSONA?",
      feminino: "¿ÉL YA ESTÁ SALIENDO CON OTRA PERSONA?",
    },
    description: "(Esta información es crucial para definir tu enfoque estratégico)",
    options: {
      masculino: [
        "🚫 No, está soltera",
        "🤔 No estoy seguro",
        "😔 Sí, está saliendo con alguien",
        "�� Sí, tiene una relación seria",
        "🔄 Está saliendo con varias personas",
      ],
      feminino: [
        "🚫 No, está soltero",
        "🤔 No estoy segura",
        "😔 Sí, está saliendo con alguien",
        "�� Sí, tiene una relación seria",
        "🔄 Está saliendo con varias personas",
      ],
    },
    bonusUnlock: {
      id: 2,
      title: "Protocolo de Emergencia 72H",
      value: 37,
      description: "Incluido en tu estrategia personalizada",
    },
    elements: {
      profileComplete: "77%",
      // 🔥 SEGUNDO TESTEMUNHO - MANTIDO NA PERGUNTA 8
      testimonialDisplay: true,
      testimonialName: "Rafael S.",
      testimonialText: "Estaba perdido después de la ruptura. El Plan A me dio dirección y confianza. Hoy estamos más unidos que nunca",
      testimonialImage: "https://nutricaoalimentos.shop/wp-content/uploads/2025/09/lg-9xvta-canva-couple-in-love-mafv-z4mya0.jpg",
    },
  },
  {
    id: 9,
    question: {
      masculino: "¿Qué tan importante es para ti recuperar esta relación?",
      feminino: "¿Qué tan importante es para ti recuperar esta relación?",
    },
    description: "(Tu nivel de compromiso determinará tu éxito)",
    subtext: "Tu nivel de compromiso nos ayuda a personalizar mejor tu estrategia",
    options: ["1 - No estoy seguro", "2 - Me lo estoy pensando", "3 - Es importante", "4 - Es muy importante"],
    note: "Trabajo con personas decididas a transformar su situación amorosa. El PLAN A fue desarrollado para quien está preparado para actuar.",
    elements: {
      thermometer: true,
      profileComplete: "85%",
    },
  },
  {
    id: 10,
    question: "EXPERTO ANALIZANDO TU CASO...",
    description: "Espera mientras analizo tus respuestas para crear tu estrategia personalizada.",
    options: [],
    autoAdvance: true,
    elements: {
      expertPhoto: true,
      expertImage: "https://comprarplanseguro.shop/wp-content/uploads/2025/09/Generated-Image-September-07_-2025-12_00AM-_1_-e1757389439336.webp",
      autoMessage: "Basándome en 7 años de experiencia ayudando a personas como tú...",
      profileComplete: "90%",
    },
  },
  {
    id: 11,
    question: "Perfecto. He analizado tus respuestas y los resultados son prometedores.",
    description:
      "Basándome en tu perfil y situación específica, el PLAN A tiene un 90,5% de probabilidades de funcionar en tu caso.",
    options: ["VAMOS AL SIGUIENTE PASO"],
    note: "Estoy aquí para guiarte personalmente en este viaje de reconquista. En los últimos 7 años, he ayudado a más de 3.847 personas a recuperar sus relaciones usando este método exclusivo.",
    elements: {
      expertPhoto: true,
      expertImage: "https://comprarplanseguro.shop/wp-content/uploads/2025/09/Generated-Image-September-07_-2025-12_00AM-_1_-e1757389439336.webp",
      profileComplete: "95%",
      helpedCounter: "Personas ayudadas hoy: 17",
      compatibilityCalc: "90,5%",
    },
  },
  {
    id: 12,
    question: "TU PLAN DE ACCIÓN PERSONALIZADO ESTÁ LISTO",
    description: "Basado en tus respuestas, he creado la estrategia exacta para que recuperes a tu amor.",
    options: ["QUIERO VER MI PLAN AHORA"],
    note: "Prepárate para descubrir los pasos que te llevarán al éxito.",
    elements: {
      finalReveal: true,
      profileComplete: "100%",
    },
  }
]

export const bonuses = [
  {
    id: 1,
    title: "21 Disparadores Emocionales",
    value: 47,
    description: "Las frases exactas que hacen que piense en ti de forma positiva.",
    details: ["✓ 7 Gatillos de Nostalgia", "✓ 7 Gatillos de Curiosidad", "✓ 7 Gatillos de Deseo"],
  },
  {
    id: 2,
    title: "Protocolo de Emergencia 72H",
    value: 37,
    description: "Qué hacer cuando todo parece perdido y tienes 72 horas para actuar.",
    details: ["✓ Plan de Acción Inmediata", "✓ Independencia Emocional", "✓ Comunicación Magnética"],
  },
]

export const testimonials = [
  {
    name: "Carlos M., 34 años",
    text: "El método me ayudó a entender mejor la situación y actuar de forma correcta",
    rating: 5,
  },
  {
    name: "Rafael, 32 años",
    text: "Estaba perdido después de la ruptura. El Plan A me dio dirección y confianza. Hoy estamos más unidos que nunca",
    rating: 5,
  },
  {
    name: "André, 28 años",
    text: "En sólo 2 semanas siguiendo el Plan A, logré reconquistar a mi ex. Los guiones funcionaron perfectamente",
    rating: 5,
  },
  {
    name: "Marcelo, 41 años",
    text: "Después de 6 meses separados, pensé que ya no tenía oportunidad. En el día 12 del Plan A me llamó queriendo volver",
    rating: 5,
  },
]

export const socialProofMessages = [
  "Estás entre el 17% más decidido a reconquistar",
  "Tu perfil muestra compatibilidad alta",
  "Bonificación incluida en tu evaluación",
  "Has desbloqueado los 2 bonos - valor total de 84€",
  "El 87% de las personas en tu situación lograron resultados en menos de 14 días",
  "Estás más comprometido que el 73% de las personas que hicieron esta prueba",
  "Tu caso tiene características muy prometedoras",
  "Evaluación personalizada completándose",
  "Estrategia adaptada a tu situación específica",
  "Plan de acción personalizado generándose",
]

// Función utilitaria para personalizar textos basados en el género
export function getPersonalizedContent(content, gender) {
  if (typeof content === "string") {
    return content
  }

  if (typeof content === "object" && content !== null) {
    if (content.masculino && content.feminino) {
      return gender === "MASCULINO" ? content.masculino : content.feminino
    }
    return content
  }

  return content
}
