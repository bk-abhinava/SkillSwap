const steps = [
    {

        number: "01",
        title: "Create your profile",
        description: "Tell the community about yourself.",
    },
    {
        number: "02",
        title: "Add your skills",
        description: "Add skills you can teach and skills you want to learn.",
    },
    {
        number: "03",
        title: "Find people",
        description: "Discover people whose skills match what you want to learn"

    },
    {
        number: "04",
        title: "Send a swap request",
        description: "Connect with them and start exchanging skills"
    },


];



function HWI() {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold">
                        How SkillSwap Works
                    </h2>
                    <p className="text-gray-600 mt-4">
                        Start exchanging skills in four simple steps.
                    </p>
                </div>
                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step) => (
                        <div key={step.number}>
                            <span className="text-blue-600 font-bold">
                                {step.number}
                            </span>
                            <h3 className="text-xl font-semibold mt-3">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 mt-2">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>


        </section>
    );
}

export default HWI;