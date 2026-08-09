function Hero()
{
    return(
        <section className="min-h-[90vh] flex items-center justify-center">
            <div className="max-w-4xl text-center px-6">
                <h1 className="text-6xl font-bold leading-tight">
                    Exchange{" "}
                    <span className="text-blue-600">Skills.</span><br/> 
                    Learn Together.
                </h1>
                <p className="text-xl text-gray-600 mt-6">
                    Learn new skills by teaching what you already know.
                    Connect with students, professionals, and mentors around the world.
                </p>
                <div className="mt-10 flex justify-center gap-6">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                        Get Started
                    </button>
                    <button className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                        Browse skills
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Hero;