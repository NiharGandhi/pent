import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">F</span>
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">faanj</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-6 py-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              href="/login"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            Powering Innovation Since 2024
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Transform Your Business
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              With Technology
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
            faanj delivers cutting-edge technology solutions including AI chatbots, cloud services,
            and custom website development to help your business thrive in the digital age.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              Get Started
            </Link>
            <a
              href="#products"
              className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-lg hover:shadow-xl transition-all"
            >
              View Products
            </a>
          </div>

          {/* Hero Image/Preview */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 p-8 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-2">🤖</div>
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">AI Chatbot</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-2">☁️</div>
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Cloud Services</div>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-2">🌐</div>
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Website Development</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-6 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Our Products
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Comprehensive technology solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">AI Chatbot</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Intelligent conversational AI that engages customers 24/7, automates support, and drives sales with natural language understanding.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">☁️</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Cloud Services</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Scalable cloud infrastructure with enterprise-grade security, automated backups, and 99.9% uptime guarantee for your critical applications.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🌐</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Website Development</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Custom-built, responsive websites optimized for performance, SEO, and user experience to establish your digital presence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose faanj
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Three reasons businesses trust us with their technology needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Cutting-Edge Technology</h3>
              <p className="text-slate-600 dark:text-slate-400">
                We leverage the latest AI, cloud, and web technologies to deliver innovative solutions that give you a competitive edge.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Tailored Solutions</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Every business is unique. Our custom solutions are designed specifically for your needs, goals, and industry.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Dedicated Support</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Our expert team provides ongoing support and maintenance to ensure your technology always performs at its best.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join hundreds of companies using faanj to power their digital transformation
            </p>
            <Link
              href="/login"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto text-center text-slate-600 dark:text-slate-400">
          <p className="mb-2">faanj - Your Technology Partner</p>
          <p className="text-sm">Delivering excellence in AI, cloud services, and web development</p>
        </div>
      </footer>
    </div>
  );
}
