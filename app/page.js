import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="py-4">

      {/* Hero */}
      <div className="text-center mb-6 pt-2">
        <h1 className="text-white mb-1">
          Medical help when
          <span className="text-red-500"> you need it most</span>
        </h1>
        <p className="text-gray-400 text-sm">
          Step-by-step guidance when doctors aren't available.
          Works offline.
        </p>
      </div>

      {/* EMERGENCY — takes visual priority */}
      <Link href="/emergency" className="block mb-4">
        <div className="card-emergency block w-full text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-4xl">🚨</span>
            <span className="bg-red-800 text-red-200 text-xs 
                             px-2 py-1 rounded-full font-medium">
              CRITICAL
            </span>
          </div>
          <h2 className="text-white text-xl font-bold mb-1">
            Emergency
          </h2>
          <p className="text-red-200 text-sm">
            Severe bleeding · Unconscious · Choking · 
            Heart attack · Childbirth · Drowning
          </p>
          <div className="mt-3 bg-red-700 rounded-xl px-4 py-2 
                          text-center text-white font-semibold 
                          text-sm">
            TAP FOR EMERGENCY HELP →
          </div>
        </div>
      </Link>

      {/* AI Triage — second most prominent */}
      <Link href="/triage" className="block mb-4">
        <div className="bg-gray-800 border border-gray-600 
                        rounded-2xl p-4 block w-full text-left
                        active:bg-gray-750 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔍</span>
            <div>
              <h2 className="text-white font-bold text-lg">
                Describe Your Situation
              </h2>
              <p className="text-gray-400 text-sm">
                Not sure what's wrong? Tell me your symptoms 
                and I'll guide you.
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* Section header */}
      <h3 className="text-gray-400 text-xs font-semibold 
                     uppercase tracking-wider mb-3 mt-2">
        Medical Guidance
      </h3>

      {/* Category grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">

        <Link href="/category/acute" className="block">
          <div className="card-acute h-full min-h-24">
            <span className="text-2xl block mb-2">🤒</span>
            <h3 className="font-bold text-sm mb-1">
              Acute Illness
            </h3>
            <p className="text-orange-200 text-xs">
              Malaria · Typhoid · Fever · Chest pain
            </p>
          </div>
        </Link>

        <Link href="/category/common" className="block">
          <div className="card-common h-full min-h-24">
            <span className="text-2xl block mb-2">💊</span>
            <h3 className="font-bold text-sm mb-1">
              Common Conditions
            </h3>
            <p className="text-blue-200 text-xs">
              Cold · Infection · Headache · Diarrhoea
            </p>
          </div>
        </Link>

        <Link href="/category/womens-health" className="block">
          <div className="card-womens h-full min-h-24">
            <span className="text-2xl block mb-2">🌸</span>
            <h3 className="font-bold text-sm mb-1">
              Women's Health
            </h3>
            <p className="text-purple-200 text-xs">
              Period pain · Discharge · Pregnancy signs
            </p>
          </div>
        </Link>

        <Link href="/category/chronic" className="block">
          <div className="card-chronic h-full min-h-24">
            <span className="text-2xl block mb-2">🫀</span>
            <h3 className="font-bold text-sm mb-1">
              Chronic Conditions
            </h3>
            <p className="text-teal-200 text-xs">
              Hypertension · Diabetes · Asthma · Sickle cell
            </p>
          </div>
        </Link>

        <Link href="/category/maternal-child" 
              className="block col-span-2">
          <div className="card-maternal">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👶</span>
              <div>
                <h3 className="font-bold text-sm mb-1">
                  Maternal & Child Health
                </h3>
                <p className="text-green-200 text-xs">
                  Newborn care · Child fever · 
                  Breastfeeding · Dehydration
                </p>
              </div>
            </div>
          </div>
        </Link>

      </div>

      {/* Quick Reference */}
      <Link href="/quick-reference" className="block mb-4">
        <div className="bg-gray-800 border border-gray-700 
                        rounded-2xl p-4 flex items-center gap-3
                        active:bg-gray-750">
          <span className="text-2xl">📋</span>
          <div>
            <h3 className="text-white font-bold text-sm">
              Quick Reference
            </h3>
            <p className="text-gray-400 text-xs">
              Normal vital signs · Drug doses · ORS recipe · 
              Danger signs
            </p>
          </div>
          <span className="text-gray-500 ml-auto">→</span>
        </div>
      </Link>

      {/* Trust indicators */}
      <div className="bg-gray-900 rounded-2xl p-4 mb-4">
        <h3 className="text-white font-semibold text-sm mb-3">
          About FirstCare Africa
        </h3>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <p className="text-gray-400 text-xs">
              Based on universal medical guidelines and 
              WHO-endorsed first aid protocols
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <p className="text-gray-400 text-xs">
              Works offline after first visit — 
              no internet required
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <p className="text-gray-400 text-xs">
              Written for untrained individuals in 
              low-resource settings
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <p className="text-gray-400 text-xs">
              Free forever. No account required. 
              No data collected.
            </p>
          </div>
        </div>
      </div>

      {/* Medical review pending notice */}
      <div className="bg-yellow-950 border border-yellow-800 
                      rounded-xl p-3 mb-4">
        <p className="text-yellow-400 text-xs text-center">
          ⚕️ Content under medical review. 
          Use professional judgment alongside this guidance.
        </p>
      </div>

    </div>
  )
}
