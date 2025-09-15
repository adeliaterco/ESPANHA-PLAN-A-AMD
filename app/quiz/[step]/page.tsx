"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Gift,
  Check,
  ArrowRight,
  ArrowLeft,
  Heart,
  Clock,
  AlertTriangle,
  User,
  TrendingUp,
  Target,
  Zap,
  Calendar,
  Users,
  MessageCircle,
  Smile,
  Star,
  CheckCircle,
  Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { quizSteps, socialProofMessages, getPersonalizedContent } from "@/lib/quiz-data"
import { BonusUnlock } from "@/components/bonus-unlock"
import { ValueCounter } from "@/components/value-counter"
import { LoadingAnalysis } from "@/components/loading-analysis"

// Función para enviar eventos a Google Analytics
function enviarEvento(nombre_evento, propriedades = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', nombre_evento, propriedades);
    console.log('Evento enviado:', nombre_evento, propriedades);
  }
}

export default function QuizStep() {
  const params = useParams()
  const router = useRouter()
  const step = Number.parseInt(params.step as string)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [quizData, setQuizData] = useState<any>({})
  const [unlockedBonuses, setUnlockedBonuses] = useState<number[]>([])
  const [totalValue, setTotalValue] = useState(0)
  const [showBonusUnlock, setShowBonusUnlock] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [newBonus, setNewBonus] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [peopleCount, setPeopleCount] = useState(17)
  const [userGender, setUserGender] = useState<string>("")

  const currentStep = quizSteps[step - 1]
  const progress = (step / 12) * 100

  useEffect(() => {
    // Cargar datos guardados
    const saved = localStorage.getItem("quizData")
    const savedBonuses = localStorage.getItem("unlockedBonuses")
    const savedValue = localStorage.getItem("totalValue")
    const savedGender = localStorage.getItem("userGender")

    if (saved) setQuizData(JSON.parse(saved))
    if (savedBonuses) setUnlockedBonuses(JSON.parse(savedBonuses))
    if (savedValue) setTotalValue(Number.parseInt(savedValue))
    if (savedGender) setUserGender(savedGender)

    // Retraso de animación optimizado
    setTimeout(() => {
      setIsLoaded(true)
    }, 200)

    // Registra visualización de la etapa del cuestionario
    enviarEvento('visualizou_etapa_quiz', {
      numero_etapa: step,
      pergunta: currentStep?.question || `Etapa ${step}`
    });

    // Avance automático para el paso de experto
    if (currentStep?.autoAdvance) {
      const timer = setTimeout(() => {
        proceedToNextStep()
      }, 3000)

      return () => clearTimeout(timer)
    }

    // Simular contador de personas (optimizado)
    const interval = setInterval(() => {
      setPeopleCount((prev) => prev + Math.floor(Math.random() * 2) + 1)
    }, 60000)

    return () => clearInterval(interval)
  }, [step])

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)

    // Registra evento de respuesta seleccionada
    enviarEvento('selecionou_resposta', {
      numero_etapa: step,
      pergunta: currentStep?.question || `Etapa ${step}`,
      resposta: answer
    });

    // Guardar selección de género en el primer paso
    if (step === 1) {
      setUserGender(answer)
      localStorage.setItem("userGender", answer)
    }

    // Retroalimentación visual optimizada
    const button = document.querySelector(`button[data-option="${answer}"]`)
    if (button) {
      button.classList.add("scale-102")
      setTimeout(() => button.classList.remove("scale-102"), 150)
    }
  }

  const handleNext = () => {
    // Registra evento de avance a la siguiente etapa
    enviarEvento('avancou_etapa', {
      numero_etapa: step,
      pergunta: currentStep?.question || `Etapa ${step}`,
      resposta_selecionada: selectedAnswer
    });

    // Guardar respuesta
    const newQuizData = { ...quizData, [step]: selectedAnswer }
    setQuizData(newQuizData)
    localStorage.setItem("quizData", JSON.stringify(newQuizData))

    // Mostrar análisis para ciertos pasos (optimizado)
    if (currentStep?.elements?.analysisText || currentStep?.elements?.profileAnalysis) {
      setShowAnalysis(true)
      setTimeout(() => {
        setShowAnalysis(false)
        proceedToNextStep()
      }, 1500)
      return
    }

    proceedToNextStep()
  }

  const proceedToNextStep = () => {
    // Capturar UTMs da URL atual
    const currentUrl = new URL(window.location.href);
    let utmString = '';
    
    const utmParams = new URLSearchParams();
    for (const [key, value] of currentUrl.searchParams.entries()) {
      if (key.startsWith('utm_')) {
        utmParams.append(key, value);
      }
    }
    
    if (utmParams.toString() !== '') {
      utmString = '?' + utmParams.toString();
    }

    // Verificar desbloqueo de bonificación
    if (currentStep?.bonusUnlock && !unlockedBonuses.includes(currentStep.bonusUnlock.id)) {
      enviarEvento('desbloqueou_bonus', {
        numero_etapa: step,
        bonus_id: currentStep.bonusUnlock.id,
        bonus_titulo: currentStep.bonusUnlock.title
      });

      const newUnlockedBonuses = [...unlockedBonuses, currentStep.bonusUnlock.id]
      const newTotalValue = totalValue + currentStep.bonusUnlock.value

      setUnlockedBonuses(newUnlockedBonuses)
      setTotalValue(newTotalValue)

      const personalizedBonus = {
        ...currentStep.bonusUnlock,
        title: getPersonalizedContent(currentStep.bonusUnlock.title, userGender),
        description: getPersonalizedContent(currentStep.bonusUnlock.description, userGender),
      }
      setNewBonus(personalizedBonus)

      localStorage.setItem("unlockedBonuses", JSON.stringify(newUnlockedBonuses))
      localStorage.setItem("totalValue", newTotalValue.toString())

      setShowBonusUnlock(true)
      return
    }

    if (step < 12) {
      router.push(`/quiz/${step + 1}${utmString}`)
    } else {
      enviarEvento('concluiu_quiz', {
        total_etapas_completadas: 12,
        total_bonus_desbloqueados: unlockedBonuses.length
      });
      
      router.push(`/resultado${utmString}`)
    }
  }

  const handleBonusUnlockComplete = () => {
    setShowBonusUnlock(false)
    
    const currentUrl = new URL(window.location.href);
    let utmString = '';
    
    const utmParams = new URLSearchParams();
    for (const [key, value] of currentUrl.searchParams.entries()) {
      if (key.startsWith('utm_')) {
        utmParams.append(key, value);
      }
    }
    
    if (utmParams.toString() !== '') {
      utmString = '?' + utmParams.toString();
    }
    
    if (step < 12) {
      router.push(`/quiz/${step + 1}${utmString}`)
    } else {
      router.push(`/resultado${utmString}`)
    }
  }

  const handleBack = () => {
    enviarEvento('retornou_etapa', {
      de_etapa: step,
      para_etapa: step > 1 ? step - 1 : 'inicio'
    });
    
    const currentUrl = new URL(window.location.href);
    let utmString = '';
    
    const utmParams = new URLSearchParams();
    for (const [key, value] of currentUrl.searchParams.entries()) {
      if (key.startsWith('utm_')) {
        utmParams.append(key, value);
      }
    }
    
    if (utmParams.toString() !== '') {
      utmString = '?' + utmParams.toString();
    }
    
    if (step > 1) {
      router.push(`/quiz/${step - 1}${utmString}`)
    } else {
      router.push(`/${utmString}`)
    }
  }

  const getStepIcon = (stepNumber: number, index: number) => {
    const iconMaps = {
      1: [User, Users],
      2: [Calendar, TrendingUp, Target, Zap],
      3: [Clock, Calendar, MessageCircle, Heart],
      4: [Heart, MessageCircle, Users],
      5: [Calendar, Heart, TrendingUp, Clock],
      6: [Smile, Heart, MessageCircle, TrendingUp, Target, Zap],
      7: [MessageCircle, Heart, Users, TrendingUp, Smile, Users, Heart],
      8: [MessageCircle, Heart, Users, TrendingUp, Smile],
      9: [Heart, TrendingUp, Target, Zap],
    }

    const icons = iconMaps[stepNumber] || [Heart]
    const Icon = icons[index] || Heart
    return <Icon className="w-5 h-5" />
  }

  // Obtener contenido personalizado basado en el género
  const getPersonalizedQuestion = () => {
    return getPersonalizedContent(currentStep.question, userGender)
  }

  const getPersonalizedOptions = () => {
    const options = getPersonalizedContent(currentStep.options, userGender)
    return Array.isArray(options) ? options : currentStep.options
  }

  if (!currentStep) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-4">
      {/* ✅ OTIMIZADO: Container reduzido de max-w-4xl para max-w-2xl */}
      <div className="max-w-2xl mx-auto">
        {/* Encabezado con progreso - SIMPLIFICADO */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-white hover:bg-white/10 border border-white/20 text-sm"
              disabled={currentStep?.autoAdvance}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>

            <div className="flex items-center gap-3">
              {totalValue > 0 && <ValueCounter value={totalValue} />}
              {currentStep?.elements?.timer && (
                <div className="flex items-center gap-2 text-white text-sm bg-white/10 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span>{currentStep.elements.timer}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-700 rounded-full h-2 mb-2">
            <motion.div 
              className="bg-orange-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-white text-sm">
              Pregunta {step} de 12 • {Math.round(progress)}% completado
            </p>
            {currentStep?.elements?.profileComplete && (
              <p className="text-green-400 text-sm font-semibold">
                {currentStep.elements.profileComplete} completo
              </p>
            )}
          </div>
        </div>

        {/* ✅ TESTEMUNHOS SIMPLIFICADOS - SEM "VERIFICADO" */}
        {currentStep?.elements?.testimonialDisplay && currentStep?.elements?.testimonialText && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <div className="flex items-center gap-3">
                {currentStep.elements.testimonialImage ? (
                  <img
                    src={currentStep.elements.testimonialImage}
                    alt={currentStep.elements.testimonialName || "Cliente"}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-300" />
                  </div>
                )}

                <div className="flex-1">
                  {/* Estrelas simplificadas */}
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-white text-sm italic mb-1">
                    "{currentStep.elements.testimonialText}"
                  </p>

                  {currentStep.elements.testimonialName && (
                    <p className="text-gray-400 text-xs">
                      - {currentStep.elements.testimonialName}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ✅ MANTIDO: Imagen de Testimonio para compatibilidade */}
        {step === 7 && currentStep?.elements?.testimonialImage && !currentStep?.elements?.testimonialDisplay && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h3 className="text-lg font-bold text-blue-400 mb-3 text-center">Testimonio Real</h3>
              <div className="w-full max-w-sm mx-auto rounded-lg overflow-hidden mb-3">
                {currentStep.elements.testimonialImage ? (
                  <img
                    src={currentStep.elements.testimonialImage}
                    alt="Testimonio de Cliente"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-700 rounded-lg flex items-center justify-center">
                    <Star className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              <p className="text-blue-300 text-sm text-center">
                Resultados reales de nuestros clientes
              </p>
            </div>
          </motion.div>
        )}

        {/* ✅ TARJETA DE PREGUNTA SIMPLIFICADA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 15 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-gray-900 border-gray-700 shadow-lg">
            <CardContent className="p-6">
              {/* Paso de avance automático de experto - SIMPLIFICADO */}
              {currentStep?.autoAdvance && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  {currentStep?.elements?.expertImage ? (
                    <img
                      src={currentStep.elements.expertImage}
                      alt="Experto en Reconquista"
                      className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 mx-auto mb-4"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-white" />
                    </div>
                  )}

                  <p className="text-blue-400 font-semibold mb-4">{currentStep.elements?.autoMessage}</p>

                  <div className="flex justify-center">
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-blue-500 rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1.2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ✅ NOVA LÓGICA: Renderização especial para finalReveal */}
              {currentStep?.elements?.finalReveal && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-6"
                >
                  <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>

                  <div className="bg-green-900/30 border border-green-600 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-green-400" />
                      <span className="text-xl font-bold text-green-400">
                        {currentStep.elements.profileComplete}
                      </span>
                    </div>
                    <p className="text-green-300">Análisis Completo</p>
                  </div>

                  <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-3">
                    <div className="flex items-center justify-center gap-2">
                      <Target className="w-5 h-5 text-blue-400" />
                      <span className="text-blue-300 font-semibold">Plan Personalizado Listo</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Foto de experto para el paso 11 - SIMPLIFICADA */}
              {currentStep?.elements?.expertPhoto && !currentStep?.autoAdvance && (
                <div className="flex justify-center mb-4">
                  {currentStep?.elements?.expertImage ? (
                    <img
                      src={currentStep.elements.expertImage}
                      alt="Experto en Reconquista"
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
              )}

              {/* Cálculo de compatibilidad - SIMPLIFICADO */}
              {currentStep?.elements?.compatibilityCalc && (
                <div className="mb-4">
                  <div className="bg-green-900/30 border border-green-500 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {currentStep.elements.compatibilityCalc} de compatibilidad
                    </div>
                  </div>
                </div>
              )}

              {!currentStep?.autoAdvance && (
                <>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">
                    {getPersonalizedQuestion()}
                  </h2>

                  {currentStep.subtext && (
                    <p className="text-orange-200 text-center mb-4 font-medium">{currentStep.subtext}</p>
                  )}

                  {currentStep.description && (
                    <p className="text-gray-300 text-center mb-6">{currentStep.description}</p>
                  )}

                  {/* ✅ TERMÓMETRO SIMPLIFICADO */}
                  {currentStep?.elements?.thermometer && (
                    <div className="mb-6">
                      <div className="flex justify-between text-gray-300 text-sm mb-2">
                        <span>No estoy seguro</span>
                        <span>Lo quiero mucho</span>
                      </div>
                      <div className="bg-gray-700 rounded-full h-3">
                        <motion.div
                          className="bg-gradient-to-r from-orange-500 to-red-600 h-full rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: selectedAnswer ? "100%" : "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  )}

                  {/* ✅ OPÇÕES SIMPLIFICADAS - SEM GIF DA MARILYN */}
                  {getPersonalizedOptions().length > 0 && (
                    <div className="space-y-3">
                      {getPersonalizedOptions().map((option, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                        >
                          <button
                            onClick={() => handleAnswerSelect(option)}
                            data-option={option}
                            className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                              selectedAnswer === option
                                ? "bg-orange-600 text-white border-orange-500"
                                : "bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
                            }`}
                          >
                            <div className="flex items-center">
                              <div className={`mr-3 ${selectedAnswer === option ? "text-white" : "text-orange-400"}`}>
                                {getStepIcon(step, index)}
                              </div>

                              <div
                                className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                                  selectedAnswer === option ? "border-white bg-white" : "border-gray-400"
                                }`}
                              >
                                {selectedAnswer === option && <Check className="w-2 h-2 text-orange-600" />}
                              </div>
                              <span className="font-medium">{option}</span>
                            </div>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {currentStep.note && (
                    <div className="mt-4 text-center text-amber-300 bg-amber-900/20 p-3 rounded-lg border border-amber-600">
                      <p className="text-sm">{currentStep.note}</p>
                    </div>
                  )}

                  {currentStep.warning && (
                    <div className="mt-4 text-center text-red-300 bg-red-900/20 p-3 rounded-lg border border-red-600 flex items-center justify-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      <p className="text-sm">{currentStep.warning}</p>
                    </div>
                  )}

                  {selectedAnswer && getPersonalizedOptions().length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 text-center"
                    >
                      <Button
                        onClick={handleNext}
                        className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg"
                      >
                        {step === 12 ? "Ver Resultado" : "Siguiente Pregunta"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* ✅ PROVA SOCIAL SIMPLIFICADA - APENAS UM ELEMENTO */}
        {step > 3 && !currentStep?.autoAdvance && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-4"
          >
            {/* Apenas UM elemento de prova social por vez */}
            {step > 5 ? (
              <p className="text-gray-400 text-sm">
                {peopleCount} personas completaron hoy
              </p>
            ) : currentStep?.elements?.counter ? (
              <p className="text-gray-400 text-sm">
                👥 {peopleCount} {currentStep.elements.counter}
              </p>
            ) : null}
          </motion.div>
        )}
      </div>

      {/* ✅ MODAIS MANTIDOS */}
      <AnimatePresence>
        {showAnalysis && (
          <LoadingAnalysis
            message={
              currentStep?.elements?.analysisText ||
              currentStep?.elements?.profileAnalysis ||
              "Analizando tus respuestas..."
            }
            successMessage={currentStep?.elements?.successRate}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBonusUnlock && newBonus && <BonusUnlock bonus={newBonus} onComplete={handleBonusUnlockComplete} />}
      </AnimatePresence>
    </div>
  )
}
