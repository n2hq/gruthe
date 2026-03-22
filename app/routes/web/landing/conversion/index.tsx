import { Link } from "@remix-run/react";
import HomeLayout from "~/routes/landing/assets/HomeLayout";

export default function Conversion() {
    return (
        <HomeLayout>
            <ConversionContent />
        </HomeLayout>
    );
}

export const ConversionContent = () => {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* HERO SECTION */}
            <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-28 pb-20 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Discover and Connect with Trusted Businesses Worldwide
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-300">
                    Gruthe helps you find reliable businesses, build meaningful connections, and grow globally — all in one place.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link
                        to="/web/search"
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-xl"
                    >
                        Explore Businesses
                    </Link>
                    <Link
                        to="/web/account/create_business"
                        className="border border-white hover:bg-white hover:text-black px-6 py-3 rounded-xl"
                    >
                        List Your Business
                    </Link>
                </div>
                <p className="text-sm text-gray-400 mt-4">
                    Trusted by growing businesses worldwide
                </p>
            </section>

            {/* PROBLEM SECTION */}
            <section className="py-16 px-6 text-center max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">
                    Finding the Right Business Shouldn’t Be Hard
                </h2>
                <p className="text-gray-600 text-lg">
                    Searching for reliable businesses online can be overwhelming — too many options, not enough trust.
                    <br /><br />
                    <span className="font-semibold text-gray-900">Gruthe simplifies everything.</span>
                </p>
            </section>

            {/* FEATURES */}
            <section className="bg-gray-50 py-16 px-6">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Everything You Need to Discover and Grow
                </h2>
                <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            title: "Smart Discovery",
                            desc: "Search businesses by location, category, or name instantly.",
                        },
                        {
                            title: "Global Reach",
                            desc: "Connect with businesses across countries and industries.",
                        },
                        {
                            title: "Trusted Listings",
                            desc: "Find reliable and verified business information.",
                        },
                        {
                            title: "Built for Growth",
                            desc: "Expand your network and unlock opportunities.",
                        },
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow">
                            <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-16 px-6 text-center">
                <h2 className="text-3xl font-bold mb-10">Get Started in 3 Simple Steps</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {[
                        ["Search or Browse", "Explore businesses across categories and locations."],
                        ["Connect Instantly", "Find the right business and reach out quickly."],
                        ["Grow Your Network", "Build valuable relationships globally."],
                    ].map(([title, desc], i) => (
                        <div key={i}>
                            <div className="text-4xl font-bold text-yellow-500 mb-2">{i + 1}</div>
                            <h3 className="font-semibold text-xl mb-2">{title}</h3>
                            <p className="text-gray-600">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* BUSINESS CTA */}
            <section className="bg-gray-900 text-white py-16 px-6 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Own a Business? Get Discovered Globally
                </h2>
                <p className="text-gray-300 mb-6">
                    List your business on Gruthe and reach customers beyond your local market.
                </p>
                <Link
                    to="/web/account/create_business"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-xl"
                >
                    List Your Business Now
                </Link>
            </section>

            {/* FINAL CTA */}
            <section className="py-20 px-6 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Start Exploring Global Opportunities Today
                </h2>
                <p className="text-gray-600 mb-8">
                    Whether you're searching or listing, Gruthe helps you grow.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link
                        to="/web/search"
                        className="bg-gray-900 text-white px-6 py-3 rounded-xl"
                    >
                        Explore Businesses
                    </Link>
                    <Link
                        to="/web/account/create_business"
                        className="border border-gray-900 px-6 py-3 rounded-xl"
                    >
                        List Your Business
                    </Link>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-gray-100 py-10 text-center text-sm text-gray-600">
                <p>© {new Date().getFullYear()} Gruthe. All rights reserved.</p>
                <div className="flex justify-center gap-4 mt-2">

                    <Link to="/web/contact">Contact</Link>
                    <Link to="/web/privacy">Privacy</Link>
                    <Link to="/web/terms">Terms</Link>
                </div>
            </footer>
        </div>
    )
}
