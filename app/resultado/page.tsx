"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  Shield,
  ArrowRight,
  Check,
  Clock,
  Users,
  Heart,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CountdownTimer } from "@/components/countdown-timer"
import { enviarEvento } from "../../lib/analytics"

export default function ResultPageOptimized() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [recentBuyers, setRecentBuyers] = useState(3)
  const [userGender, setUserGender] = useState<string>("")
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedGender = localStorage.getItem("userGender")
    if (savedGender) setUserGender(savedGender)

    setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    // Simular compradores recientes
    const interval = setInterval(() => {
      setRecentBuyers((prev) => {
        const increase = Math.floor(Math.random() * 2) + 1
        return Math.min(prev + increase, 23)
      })
    }, 45000)

    // Registra visualización
    try {
      enviarEvento("visualizou_resultado")
    } catch (error) {
      console.error("Error al registrar evento:", error)
    }

    // Carrega script do VTurb
    const loadVTurbScript = () => {
      if (!document.querySelector('script[src*="68c885a9cd2fbb4c19f84a1e"]')) {
        const script = document.createElement("script")
        script.src = "https://scripts.converteai.net/498be6ac-2d19-4386-aba2-c11c84449107/players/68c885a9cd2fbb4c19f84a1e/v4/player.js"
        script.async = true
        document.head.appendChild(script)
      }
    }

    loadVTurbScript()

    return () => clearInterval(interval)
  }, [])

  const handlePurchase = () => {
    try {
      enviarEvento("clicou_comprar", {
        posicao: "principal",
      })
    } catch (error) {
      console.error("Error al registrar evento de clic:", error)
    }
    window.open("https://pay.hotmart.com/F100142422S?off=51wn2b7b&checkoutMode=10", "_blank")
  }

  const getPersonalizedPronoun = () => {
    return userGender === "FEMININO" ? "él" : "ella"
  }

  const handleTouchFeedback = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  return (
    <>
      {/* META TAGS MOBILE OTIMIZADAS */}
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>

      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-x-hidden w-full max-w-[100vw]" ref={contentRef}>
        
        {/* ✅ SEÇÃO 1: RESULTADO + VSL INTEGRADOS */}
        <div className="relative overflow-hidden w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 animate-pulse"></div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
            className="relative z-10 px-4 py-6 sm:py-8 text-center w-full"
          >
            {/* ✅ HEADLINE OTIMIZADA - MENOS AGRESSIVA */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight max-w-full break-words">
              Tu evaluación está completa
              <br />
              <span className="text-green-400">PROBABILIDAD DE ÉXITO: 90,5%</span>
            </h1>

            {/* Resultado Visual Simples */}
            <div className="max-w-sm mx-auto mb-6 sm:mb-8 w-full">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 border-4 border-yellow-400 rounded-2xl p-4 sm:p-6 shadow-2xl max-w-full">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-white mb-4">
                  <div className="text-center">
                    <span className="text-xl sm:text-2xl font-extrabold text-black">90,5%</span>
                    <p className="text-xs font-bold text-black">ÉXITO</p>
                  </div>
                </div>
                
                <div className="text-white space-y-2 text-sm sm:text-base">
                  <p><strong>Tiempo estimado:</strong> 14-21 días</p>
                  <p><strong>Estrategia:</strong> Plan A</p>
                  <p><strong>Tipo:</strong> Altamente recuperable</p>
                </div>
              </div>
            </div>

            {/* Transição para VSL */}
            <p className="text-lg sm:text-xl text-gray-300 mb-4 font-semibold max-w-full break-words px-2">
              Descubre <span className="text-orange-400 font-bold">cómo es posible</span> este resultado:
            </p>

            {/* ✅ VSL INTEGRADO NA MESMA SEÇÃO */}
            <div className="max-w-4xl mx-auto w-full">
              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 max-w-full break-words">
                  <span className="text-orange-400">EL MÉTODO</span> QUE HACE POSIBLE TU RESULTADO
                </h2>
                
                <div className="max-w-2xl mx-auto mb-6 w-full">
                  <p className="text-base sm:text-lg text-gray-300 mb-4 break-words">
                    Mira este vídeo donde 3 especialistas revelan:
                  </p>
                  <div className="text-left bg-black/30 rounded-lg p-3 sm:p-4 space-y-2 w-full">
                    <div className="flex items-start text-white text-sm sm:text-base">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="break-words">Por qué tu caso tiene <strong className="text-orange-400">90,5% de éxito</strong></span>
                    </div>
                    <div className="flex items-start text-white text-sm sm:text-base">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="break-words">Los <strong className="text-orange-400">disparadores</strong> que funcionan en 21 días</span>
                    </div>
                    <div className="flex items-start text-white text-sm sm:text-base">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="break-words">Cómo aplicarlo <strong className="text-orange-400">paso a paso</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* VSL CENTRALIZADA COM VTURB */}
              <div className="flex justify-center mb-6 sm:mb-8 w-full">
                <div className="w-full max-w-3xl">
                  <div className="relative bg-black rounded-xl sm:rounded-2xl p-2 sm:p-4 border-2 sm:border-4 border-orange-500 shadow-2xl w-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-xl sm:rounded-2xl animate-pulse"></div>
                    <div className="relative z-10 w-full">
                      <vturb-smartplayer 
                        id="vid-68c885a9cd2fbb4c19f84a1e" 
                        style={{
                          display: 'block',
                          margin: '0 auto',
                          width: '100%',
                          maxWidth: '100%',
                          borderRadius: '8px',
                          overflow: 'hidden'
                        }}
                      ></vturb-smartplayer>
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ CTA UNIFICADO - LINGUAGEM CONSISTENTE */}
              <div className="text-center w-full">
                <div className="bg-orange-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-full inline-block font-bold text-base sm:text-lg mb-4 sm:mb-6 animate-bounce max-w-full">
                  👆 APLICA ESTO Y VERÁS RESULTADOS EN DÍAS
                </div>

                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="w-full"
                >
                  <Button
                    onClick={handlePurchase}
                    size="lg"
                    className="w-full max-w-md mx-auto bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-black py-4 sm:py-6 px-4 sm:px-8 rounded-full text-lg sm:text-xl shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 sm:border-4 border-yellow-400 min-h-[56px] sm:min-h-[64px] flex items-center justify-center box-border"
                    onTouchStart={handleTouchFeedback}
                  >
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 mr-2 flex-shrink-0" />
                    <span className="text-center leading-tight break-words">ACCEDER AL MÉTODO - 19€</span>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 flex-shrink-0" />
                  </Button>
                </motion.div>

                <p className="text-white text-base sm:text-lg font-semibold mt-4 max-w-full break-words px-2">
                  Ahora que conoces el método, es hora de <span className="text-orange-400">ponerlo en práctica</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ✅ SEÇÃO 2: PROVA SOCIAL SIMPLIFICADA */}
        <div className="px-4 py-6 sm:py-8 bg-gradient-to-r from-black to-gray-900 w-full">
          <div className="max-w-4xl mx-auto w-full">
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 max-w-full break-words">
                <span className="text-orange-400">TESTIMONIO REAL</span> DE QUIEN YA LO LOGRÓ
              </h3>
              <p className="text-gray-300 text-sm sm:text-base break-words">
                Escucha la historia de transformación usando exactamente el mismo método
              </p>
            </div>

            {/* Depoimento em Vídeo Centralizado */}
            <div className="flex justify-center mb-6 sm:mb-8 w-full">
              <div className="w-full max-w-xs">
                <div className="relative bg-black rounded-xl sm:rounded-2xl p-2 border-2 border-orange-500 shadow-xl overflow-hidden w-full">
                  
                  {/* Header do Story */}
                  <div className="flex items-center p-2 pb-1">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-orange-400 overflow-hidden mr-2 flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">FB</span>
                      </div>
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <h4 className="text-white font-bold text-xs truncate">Facundo B.</h4>
                      <p className="text-green-400 text-xs font-semibold">✅ Reconciliado en 15 días</p>
                    </div>
                  </div>

                  {/* Vídeo Story - Mantendo Wistia para o depoimento */}
                  <div className="relative aspect-[9/16] bg-gray-900 rounded-xl overflow-hidden w-full" style={{height: '260px'}}>
                    <script src="https://fast.wistia.com/player.js" async></script>
                    <script src="https://fast.wistia.com/embed/3rj8vdh574.js" async type="module"></script>
                    <wistia-player 
                      media-id="3rj8vdh574" 
                      aspect="0.5625"
                      className="w-full h-full"
                      style={{width: '100%', height: '100%', maxWidth: '100%'}}
                    ></wistia-player>
                  </div>

                  {/* Footer com CTA */}
                  <div className="p-2 text-center w-full">
                    <Button
                      onClick={handlePurchase}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-2 px-2 rounded-full text-xs shadow-lg transition-all duration-300 min-h-[36px] flex items-center justify-center box-border"
                      onTouchStart={handleTouchFeedback}
                    >
                      <Play className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">ACCEDER AL MÉTODO</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Números de Prova Social */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto w-full">
              <div className="bg-gray-800 p-3 sm:p-4 rounded-lg border border-orange-500 text-center">
                <div className="text-xl sm:text-2xl font-bold text-orange-400 mb-1">87%</div>
                <p className="text-white text-xs sm:text-sm break-words">Ven resultados en 14 días</p>
              </div>
              <div className="bg-gray-800 p-3 sm:p-4 rounded-lg border border-orange-500 text-center">
                <div className="text-xl sm:text-2xl font-bold text-orange-400 mb-1">3.847+</div>
                <p className="text-white text-xs sm:text-sm break-words">Relaciones recuperadas</p>
              </div>
              <div className="bg-gray-800 p-3 sm:p-4 rounded-lg border border-orange-500 text-center">
                <div className="text-xl sm:text-2xl font-bold text-orange-400 mb-1">21</div>
                <p className="text-white text-xs sm:text-sm break-words">Días o menos</p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ SEÇÃO 3: OFERTA SIMPLIFICADA */}
        <div className="px-4 py-6 sm:py-8 w-full">
          <div className="max-w-4xl mx-auto w-full">
            <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-2xl border-2 sm:border-4 border-yellow-400 w-full">
              <CardContent className="p-4 sm:p-6 md:p-8 text-center w-full">
                
                {/* ✅ BADGE SIMPLIFICADO - MENOS AGRESSIVO */}
                <div className="bg-yellow-400 text-black font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full inline-block mb-4 sm:mb-6 text-base sm:text-lg max-w-full">
                  OFERTA ESPECIAL
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 break-words">PLAN A - RECUPERACIÓN RÁPIDA</h2>

                {/* Preço Simples */}
                <div className="bg-black/20 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 w-full">
                  <div className="text-center mb-4">
                    <div className="text-4xl sm:text-6xl font-black text-yellow-300 mb-2">19€</div>
                    <div className="text-lg sm:text-xl">
                      <span className="line-through text-gray-400 mr-3">99,90€</span>
                      <span className="text-green-400 font-bold">AHORRAS 80€</span>
                    </div>
                  </div>

                  {/* O que inclui */}
                  <div className="text-left space-y-2 sm:space-y-3 max-w-md mx-auto w-full">
                    <div className="flex items-start text-white text-sm sm:text-base">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="break-words">Sistema completo Plan A</span>
                    </div>
                    <div className="flex items-start text-white text-sm sm:text-base">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="break-words">21 Disparadores Emocionales (47€)</span>
                    </div>
                    <div className="flex items-start text-white text-sm sm:text-base">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="break-words">Protocolo de Emergencia 72H (37€)</span>
                    </div>
                    <div className="flex items-start text-white text-sm sm:text-base">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="break-words">Garantía 30 días</span>
                    </div>
                    <div className="flex items-start text-white text-sm sm:text-base">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="break-words">Acceso inmediato</span>
                    </div>
                  </div>
                </div>

                {/* ✅ CTA UNIFICADO */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="mb-4 sm:mb-6 w-full"
                >
                  <Button
                    onClick={handlePurchase}
                    size="lg"
                    className="w-full max-w-lg mx-auto bg-yellow-500 hover:bg-yellow-600 text-black font-black py-4 sm:py-6 px-4 sm:px-8 rounded-full text-lg sm:text-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 sm:border-4 border-white min-h-[60px] sm:min-h-[72px] flex items-center justify-center box-border"
                    onTouchStart={handleTouchFeedback}
                  >
                    <span className="text-center leading-tight break-words">ACCEDER AL MÉTODO - 19€</span>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 flex-shrink-0" />
                  </Button>
                </motion.div>

                {/* Social Proof Final */}
                <div className="flex justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-white mb-4 flex-wrap">
                  <div className="flex items-center">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400 mr-1" />
                    <span><strong>{recentBuyers}</strong> compraron hoy</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 mr-1" />
                    <span>Últimas horas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ✅ SEÇÃO 4: GARANTIA SIMPLES */}
        <div className="px-4 py-6 sm:py-8 bg-gradient-to-r from-green-900/30 to-emerald-900/30 w-full">
          <div className="max-w-4xl mx-auto w-full">
            <Card className="bg-green-50 border-2 sm:border-4 border-green-400 shadow-2xl w-full">
              <CardContent className="p-4 sm:p-6 text-center w-full">
                <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold text-green-800 mb-4 break-words">GARANTÍA TOTAL DE 30 DÍAS</h2>
                <p className="text-green-700 text-base sm:text-lg font-semibold mb-4 break-words">
                  Si no ves resultados, te devolvemos el 100% de tu dinero
                </p>
                <p className="text-green-600 max-w-2xl mx-auto text-sm sm:text-base break-words">
                  Prueba el método durante 30 días. Si no funciona, te devolvemos todo sin hacer preguntas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ✅ FAQ SIMPLIFICADO (SÓ 3 PERGUNTAS) */}
        <div className="px-4 py-6 sm:py-8 w-full">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-6 sm:mb-8 break-words">PREGUNTAS FRECUENTES</h2>

            <div className="space-y-4 max-w-2xl mx-auto w-full">
              <Card className="bg-gray-800 border border-gray-700 w-full">
                <CardContent className="p-3 sm:p-4 w-full">
                  <h3 className="text-base sm:text-lg font-bold text-orange-400 mb-2 break-words">
                    ¿Y si {getPersonalizedPronoun()} ya está con otra persona?
                  </h3>
                  <p className="text-gray-300 text-sm break-words">
                    El método funciona incluso cuando hay terceras personas. El 67% de nuestros casos exitosos comenzaron en esta situación.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border border-gray-700 w-full">
                <CardContent className="p-3 sm:p-4 w-full">
                  <h3 className="text-base sm:text-lg font-bold text-orange-400 mb-2 break-words">¿Cuánto tiempo tarda en ver resultados?</h3>
                  <p className="text-gray-300 text-sm break-words">
                    El 87% ve cambios positivos en menos de 14 días. El sistema completo funciona en 21 días máximo.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border border-gray-700 w-full">
                <CardContent className="p-3 sm:p-4 w-full">
                  <h3 className="text-base sm:text-lg font-bold text-orange-400 mb-2 break-words">¿Cómo recibo el acceso?</h3>
                  <p className="text-gray-300 text-sm break-words">
                    Inmediatamente después del pago recibes un email con tus credenciales. Todo queda disponible al momento.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* ✅ CTA FINAL COM COUNTDOWN ÚNICO */}
        <div className="px-4 py-6 sm:py-8 bg-gradient-to-r from-red-600 to-orange-600 w-full">
          <div className="max-w-4xl mx-auto text-center w-full">
            <div className="bg-black/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 sm:border-4 border-yellow-400 w-full">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 break-words">Accede ahora por 19€</h2>
              <p className="text-lg sm:text-xl text-white mb-4 sm:mb-6 font-semibold break-words">
                Después vuelve a 99€.
              </p>

              {/* ✅ COUNTDOWN ÚNICO - REMOVIDO O SEGUNDO */}
              <div className="bg-red-800 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 w-full">
                <p className="text-yellow-300 font-bold text-base sm:text-lg mb-2">TIEMPO RESTANTE:</p>
                <div className="text-3xl sm:text-4xl font-black text-white">
                  <CountdownTimer minutes={15} seconds={0} />
                </div>
              </div>

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="w-full"
              >
                <Button
                  onClick={handlePurchase}
                  size="lg"
                  className="w-full max-w-md mx-auto bg-yellow-500 hover:bg-yellow-600 text-black font-black py-4 sm:py-6 px-4 sm:px-8 rounded-full text-lg sm:text-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 sm:border-4 border-white min-h-[60px] sm:min-h-[72px] flex items-center justify-center box-border"
                  onTouchStart={handleTouchFeedback}
                >
                  <span className="text-center leading-tight break-words">ACCEDER AL MÉTODO</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 flex-shrink-0" />
                </Button>
              </motion.div>

              <p className="text-yellow-300 text-xs sm:text-sm mt-4 font-semibold break-words">
                Haz clic ahora antes de que sea demasiado tarde
              </p>
            </div>
          </div>
        </div>

        {/* Estilos CSS Otimizados MOBILE-FIRST */}
        <style jsx global>{`
          /* META VIEWPORT CRÍTICO */
          @viewport {
            width: device-width;
            initial-scale: 1.0;
            maximum-scale: 1.0;
            user-scalable: no;
          }

          /* RESET MOBILE-FIRST */
          * {
            box-sizing: border-box !important;
            margin: 0;
            padding: 0;
            max-width: 100% !important;
          }

          html {
            overflow-x: hidden !important;
            max-width: 100vw !important;
            -webkit-text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          body {
            overflow-x: hidden !important;
            max-width: 100vw !important;
            position: relative;
            width: 100%;
          }

          /* CONTAINER PRINCIPAL */
          .min-h-screen {
            max-width: 100vw !important;
            overflow-x: hidden !important;
            width: 100% !important;
            position: relative;
          }

          /* PLAYERS DE VÍDEO MOBILE-FIRST */
          vturb-smartplayer {
            border-radius: 8px !important;
            overflow: hidden !important;
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            display: block !important;
            aspect-ratio: 16/9 !important;
            contain: layout style paint;
          }

          wistia-player[media-id='3rj8vdh574']:not(:defined) { 
            background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/3rj8vdh574/swatch'); 
            display: block; 
            filter: blur(5px); 
            padding-top: 177.78%; 
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box;
          }
          
          wistia-player {
            border-radius: 8px !important;
            overflow: hidden !important;
            width: 100% !important;
            max-width: 100% !important;
            height: 100% !important;
            display: block;
            box-sizing: border-box;
          }

          /* BOTÕES MOBILE-OPTIMIZED */
          button {
            min-height: 48px !important;
            min-width: 48px !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
            user-select: none !important;
            box-sizing: border-box !important;
            max-width: 100% !important;
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
          }

          /* TEXTO RESPONSIVO */
          p, span, div, h1, h2, h3, h4, h5, h6 {
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            hyphens: auto !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }

          /* IMAGENS E MÍDIA */
          img, video {
            max-width: 100% !important;
            height: auto !important;
            display: block;
            box-sizing: border-box;
          }

          /* INPUTS MOBILE-FRIENDLY */
          input, select, textarea {
            font-size: 16px !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }

          /* LINKS E ÁREAS DE TOQUE */
          a, button, [role="button"] {
            min-height: 44px !important;
            min-width: 44px !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
          }

          /* GRID E FLEXBOX MOBILE */
          .grid {
            gap: 0.5rem !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }

          .flex {
            flex-wrap: wrap !important;
            box-sizing: border-box !important;
          }

          /* OTIMIZAÇÕES ESPECÍFICAS MOBILE */
          @media (max-width: 768px) {
            /* TIPOGRAFIA MOBILE */
            .text-xs { font-size: 0.75rem !important; line-height: 1rem !important; }
            .text-sm { font-size: 0.875rem !important; line-height: 1.25rem !important; }
            .text-base { font-size: 1rem !important; line-height: 1.5rem !important; }
            .text-lg { font-size: 1.125rem !important; line-height: 1.75rem !important; }
            .text-xl { font-size: 1.25rem !important; line-height: 1.75rem !important; }
            .text-2xl { font-size: 1.5rem !important; line-height: 2rem !important; }
            .text-3xl { font-size: 1.875rem !important; line-height: 2.25rem !important; }
            .text-4xl { font-size: 2.25rem !important; line-height: 2.5rem !important; }
            .text-5xl { font-size: 3rem !important; line-height: 1 !important; }
            .text-6xl { font-size: 3.75rem !important; line-height: 1 !important; }

            /* ESPAÇAMENTO MOBILE */
            .px-4 { padding-left: 1rem !important; padding-right: 1rem !important; }
            .py-6 { padding-top: 1.5rem !important; padding-bottom: 1.5rem !important; }
            .py-8 { padding-top: 2rem !important; padding-bottom: 2rem !important; }
            .mb-4 { margin-bottom: 1rem !important; }
            .mb-6 { margin-bottom: 1.5rem !important; }
            .mb-8 { margin-bottom: 2rem !important; }

            /* GRID MOBILE */
            .grid-cols-3 {
              grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
              gap: 0.5rem !important;
            }

            /* PLAYERS MOBILE */
            vturb-smartplayer {
              height: auto !important;
              aspect-ratio: 16/9 !important;
              min-height: 200px !important;
            }

            /* CARDS MOBILE */
            .rounded-2xl { border-radius: 1rem !important; }
            .rounded-xl { border-radius: 0.75rem !important; }
            .border-4 { border-width: 2px !important; }
            .border-2 { border-width: 1px !important; }

            /* BOTÕES MOBILE */
            .min-h-\[72px\] { min-height: 60px !important; }
            .min-h-\[64px\] { min-height: 56px !important; }
            .min-h-\[60px\] { min-height: 56px !important; }
            .min-h-\[56px\] { min-height: 52px !important; }

            /* TRUNCATE E OVERFLOW */
            .truncate {
              overflow: hidden !important;
              text-overflow: ellipsis !important;
              white-space: nowrap !important;
            }

            .break-words {
              word-wrap: break-word !important;
              overflow-wrap: break-word !important;
              word-break: break-word !important;
            }
          }

          /* OTIMIZAÇÕES EXTRA SMALL */
          @media (max-width: 375px) {
            .px-4 { padding-left: 0.75rem !important; padding-right: 0.75rem !important; }
            .text-2xl { font-size: 1.25rem !important; line-height: 1.75rem !important; }
            .text-3xl { font-size: 1.5rem !important; line-height: 2rem !important; }
            .text-4xl { font-size: 1.875rem !important; line-height: 2.25rem !important; }
            
            vturb-smartplayer {
              min-height: 180px !important;
            }

            .grid-cols-3 {
              gap: 0.25rem !important;
            }

            button {
              min-height: 44px !important;
              font-size: 0.875rem !important;
            }
          }

          /* PERFORMANCE E ANIMAÇÕES */
          .bg-gradient-to-r, .bg-gradient-to-br {
            will-change: transform;
            backface-visibility: hidden;
            transform: translateZ(0);
          }

          /* SCROLL SUAVE */
          html {
            scroll-behavior: smooth;
          }

          /* PREVENÇÃO DE ZOOM IOS */
          @supports (-webkit-touch-callout: none) {
            input, select, textarea {
              font-size: 16px !important;
            }
          }

          /* GARANTIR RESPONSIVIDADE TOTAL */
          * {
            max-width: 100% !important;
            box-sizing: border-box !important;
          }

          /* CONTAINER QUERIES FALLBACK */
          @container (max-width: 768px) {
            .text-3xl { font-size: 1.5rem !important; }
            .text-4xl { font-size: 1.875rem !important; }
          }
        `}</style>
      </div>
    </>
  )
}
